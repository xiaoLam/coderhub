const {
  NAME_OR_PASSWORD_IS_REQUIRE,
  USER_HAS_ALREADLY_EXISTS
} = require("../constants/error-types");

const userServiec = require("../service/user.service");

const md5password = require("../utils/password-handle");

const varifyUser = async (ctx, next) => {
  // 获取用户信息
  const {
    name,
    password
  } = ctx.request.body;

  // 判断用户名或者密码是否为空
  if (!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRE);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断用户名是否存在
  const result = await userServiec.getUserByName(name);
  // 注意这里返回的result是一个大数组中包含两个小数组, 第一个小数组包含查找结果, 第二个小数组包含查找结果的字段
  if (result.length) {
    // 存在情况下抛出错误
    const error = new Error(USER_HAS_ALREADLY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  // 通过验证进行下一步
  await next()
};

// 对传入的密码进行加密操作
const passwordHandle = async (ctx, next) => {
  // 首先取得密码
  const {
    password
  } = ctx.request.body;

  // 使用utils中的password-handle加密函数对密码进行加密重新赋值操作
  ctx.request.body.password = md5password(password);

  // 加密成功进行下一步操作
  await next();
}

module.exports = {
  varifyUser,
  passwordHandle
}