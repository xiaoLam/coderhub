const connection = require("../app/database");

class fileService {
  async createAvatar(filename, mimetype, size, userId) {
    // 创建操作数据库语句
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`;

    // 操作数据库
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId]);

    // 返回数据
    return result;
  }

  async getAvatarByUserId(userId) {
    // 创建操作数据库语句
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;

    // 操作数据库
    const [result] = await connection.execute(statement, [userId]);

    // 返回数据
    return result[0];
  }

  async createPicture(filename, mimetype, size, userId, momentId) {
    // 创建操作数据库语句
    const statement = `INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?);`;

    // 操作数据库
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId, momentId]);

    // 返回数据
    return result;
  }
}

module.exports = new fileService();