// 导入连接池
const connection = require("../app/database")

class userService {
  async create(user) {
    // 获取用户信息
    const {
      name,
      password
    } = user;


    // 数据库操作
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
    const result = await connection.execute(statement, [name, password]);

    // 返回结果
    return result[0];
  };

  async getUserByName(name) {
    // 根据传入的name查询数据库中的用户
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);

    // 返回结果
    return result[0];
  };

  async updateAvatarUrl(avatarUrl, userId) {
    // 创建操作数据库语句
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;

    // 操作数据库
    const [result] = await connection.execute(statement, [avatarUrl, userId]);

    // 返回数据
    return result;
  }
}

module.exports = new userService();