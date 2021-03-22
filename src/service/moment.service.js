const connection = require("../app/database");

class momentService {
  async insertContent(content, id) {
    // 创建数据库操作语句
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;

    // 操作数据库
    const [result] = await connection.execute(statement, [content, id]);

    // 返回结果
    return result;
  }

  async getMomentById(id) {
    // 创建数据库操作语句
    const statement = `
      SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
        JSON_OBJECT("id", u.id, "name", u.name, "avatavaUrl", u.avatar_url) author,
        (SELECT JSON_ARRAYAGG(CONCAT("http://localhost:8000/moment/images/", f.filename)) FROM file f WHERE m.id = f.moment_id) images
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      WHERE m.id = ?;
    `;

    // 如果想要在获取动态的同时获取该动态的评论的话使用这条数据库操作语句, 并且同时获取动态对应的标签
    // 但是实际工作中建议将三个接口分开, 这是由于一次性请求大量数据会导致传输的速度变差, 而且同时请求代码变得复杂
    /* const statement = `
        SELECT
          m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
          JSON_OBJECT("id", u.id, "name", u.name, "avatavaUrl", u.avatar_url) author,
          (SELECT 
            IF(c.id,JSON_ARRAYAGG(
                      JSON_OBJECT("id", c.id, "content", c.content, "commentId", c.comment_id, "createTime", c.createAt,
                                  "user", JSON_OBJECT("id", cu.id, "name", cu.name))
                      ),NULL) FROM comment c 
            LEFT JOIN user cu ON c.user_id = cu.id 
            WHERE m.id = c.moment_id) comments,
          IF(l.id,JSON_ARRAYAGG(
            JSON_OBJECT("id", l.id, "name", l.name)
          ),NULL) labels,
          (SELECT JSON_ARRAYAGG(CONCAT("http://localhost:8000/moment/images/", f.filename)) FROM file f WHERE m.id = f.moment_id) images
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        LEFT JOIN moment_label ml ON m.id = ml.moment_id
        LEFT JOIN label l ON ml.label_id = l.id
        WHERE m.id = ?;
      `; */

    // 操作数据库
    const [result] = await connection.execute(statement, [id]);

    // 返回结果
    return result;
  }

  async getMomentList(offset, size) {
    // 创建数据库操作语句
    const statement = `
      SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
        JSON_OBJECT("id", u.id, "name", u.name, "avatavaUrl", u.avatar_url) author,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE m.id = ml.moment_id) labelCount,
        (SELECT JSON_ARRAYAGG(CONCAT("http://localhost:8000/moment/images/", f.filename)) FROM file f WHERE m.id = f.moment_id) images
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LIMIT ?, ?;
    `;

    // 操作数据库
    const [result] = await connection.execute(statement, [offset, size]);

    // 返回结果
    return result;
  }

  async update(content, momentId) {
    // 创建操作数据库语句
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;

    // 操作数据库
    const [result] = await connection.execute(statement, [content, momentId]);

    // 返回结果
    return result;
  }

  async remove(momentId) {
    // 创建操作数据库语句
    const statement = `DELETE FROM moment WHERE id = ?;`;

    // 操作数据库
    const [result] = await connection.execute(statement, [momentId]);

    // 返回结果
    return result;
  }

  async hasLabel(momentId, labelId) {
    // 创建操作数据库语句
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;

    // 操作数据库
    const [result] = await connection.execute(statement, [momentId, labelId]);

    // 返回数据
    return result[0] ? true : false;
  }

  async addLabel(momentId, labelId) {
    // 创建操作数据库语句
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;

    // 操作数据库
    const [result] = await connection.execute(statement, [momentId, labelId]);

    // 返回数据
    return result;
  }

  async getFileByFilename(filename) {
    // 创建操作数据库语句
    const statement = `SELECT * FROM file WHERE filename = ?;`;

    // 操作数据库
    const [fileInfo] = await connection.execute(statement, [filename]);

    // 返回图片数据
    return fileInfo[0];
  }

}

module.exports = new momentService();