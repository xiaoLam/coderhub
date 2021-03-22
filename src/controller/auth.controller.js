const jwt = require("jsonwebtoken");

const {
  PRIVATE_KEY,
} = require("../app/config")

class authController {
  async login(ctx, next) {
    // 获取用户的登陆信息
    const {
      id,
      name
    } = ctx.user;

    const token = jwt.sign({
      id,
      name
    }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256"
    })

    // 返回结果
    ctx.body = {
      id,
      name,
      token
    }
  }

  async success(ctx, next) {
    ctx.body = ctx.user + "验证成功";
  }
}

module.exports = new authController();