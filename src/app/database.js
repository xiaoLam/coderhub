const mysql = require("mysql2");
// 引入变量
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = require("./config")

// 创建连接池
const connection = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD
});

// 测试服务器是否连接成功
connection.getConnection((err) => {
  if (err) {
    console.log("连接失败", err);
  } else {
    console.log("服务器连接成功");
  }
});

// 导出连接池
module.exports = connection.promise();