const connection = require("../app/database");

class labelService {
  async createLabel(name) {
    // 创建操作数据库语句
    const statement = `INSERT INTO label (name) VALUES (?);`;

    // 操作数据库
    const [result] = await connection.execute(statement, [name]);

    // 返回数据
    return result;
  }

  async getLabelByName(name) {
    // 创建操作数据库语句
    const statement = `SELECT * FROM label WHERE name = ?;`;

    // 操作数据库
    const [result] = await connection.execute(statement, [name]);

    // 返回数据
    return result[0];
  }

  async getLabels(limit, offset) {
    // 创建操作数据库语句
    const statement = `SELECT * FROM label LIMIT ?, ?;`;

    // 操作数据库
    const [result] = await connection.execute(statement, [offset, limit]);

    // 返回数据
    return result;
  }

  async getLabelByMomentId(momentId) {
    // 创建操作数据库语句
    const statement = `
    SELECT 
      l.id, l.name
    FROM label l
    LEFT JOIN moment_label ml ON l.id = ml.label_id
    WHERE ml.moment_id = ?;`

    // 操作数据库
    const [result] = await connection.execute(statement, [momentId]);

    // 返回数据
    return result;
  }
}

module.exports = new labelService();