const connection = require("../app/database");

class commentService {
  async inserComment(momentId, content, id) {
    // 创建操作数据库语句
    const statement = `INSERT INTO comment (moment_id, content, user_id) VALUES (?, ?, ?);`;

    // 操作数据库
    const [result] = await connection.execute(statement, [momentId, content, id]);

    // 返回数据
    return result;
  }

  async commentReply(momentId, commentId, content, id) {
    // 创建操作数据库语句
    const statement = `INSERT INTO comment (moment_id, comment_id, content, user_id) VALUES (?, ?, ?, ?);`;

    // 操作数据库
    const [result] = await connection.execute(statement, [momentId, commentId, content, id]);

    // 返回数据
    return result;
  }

  async commentUpdate(commentId, content) {
    // 1. 创建操作数据库语句
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;

    // 2. 操作数据库
    const [result] = await connection.execute(statement, [content, commentId]);

    // 3. 返回数据
    return result;
  }

  async commentRemove(commentId) {
    // 创建操作数据库语句
    const statement = `DELETE FROM comment WHERE id = ?;`;

    // 操作数据库
    const result = await connection.execute(statement, [commentId]);

    // 返回数据
    return result;
  }

  async getCommentsByMommentId(momentId) {
    // 创建操作数据库语句
    const statement = `
    SELECT
      c.id, c.content, c.comment_id commentId, c.createAt createTime, c.updateAt updateTime,
    JSON_OBJECT("id", u.id, "name", u.name) user
    FROM comment c
    LEFT JOIN user u ON u.id = c.user_id
    WHERE moment_id = ?;`;

    // 操作数据库
    const [result] = await connection.execute(statement, [momentId]);

    // 返回数据
    return result;
  }
}

module.exports = new commentService();