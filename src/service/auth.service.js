const connection = require("../app/database");

class authService {
  async resourceMoment(tableName, resourceId, id) {
    // 1. 创建数据库操作语句
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;

    // 2. 操作数据库
    const [result] = await connection.execute(statement, [resourceId, id]);

    // 3. 返回结果
    return result.length === 0 ? false : true;
  }
}

module.exports = new authService();