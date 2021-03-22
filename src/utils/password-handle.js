// 使用Node中的内置库 crypto来对密码进行加密操作
const crypto = require("crypto");

// 加密函数
const md5password = (password) => {
  // 首先使用createHash方法来创建并返回一个Hash对象, 该方法传入加密方式, 这里使用md5加密方式
  const md5 = crypto.createHash('md5');

  // 然后使用update方法更新Hash内容, 然后通过digest方法将Hash内容转换为需要的字符编码
  const result = md5.update(password).digest("hex");

  // 返回结果
  return result;
}

module.exports = md5password;