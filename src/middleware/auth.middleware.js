const jwt = require("jsonwebtoken");

const md5password = require("../utils/password-handle");
const userService = require("../service/user.service");
const authService = require("../service/auth.service");

const {
  NAME_OR_PASSWORD_IS_REQUIRE,
  USER_DOES_NOT_EXISTS,
  PASSWORD_MISTAKE,
  UNAUTHORIZATION,
  UNPERMISSION
} = require("../constants/error-types");
const {
  PUBLIC_KEY
} = require("../app/config")

const varifyLogin = async (ctx, next) => {
  // 0. 首先获取到传输过来的用户名和密码
  const {
    name,
    password
  } = ctx.request.body;

  // 1. 判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRE);
    return ctx.app.emit("error", error, ctx);
  }

  // 2. 判断用户名是否存在
  const result = await userService.getUserByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx)
  }

  // 3. 判断密码是否与数据库中的密码一致
  // 3.1 获取到加密后的密码
  const enPassword = md5password(password)
  // 3.2 根据加密后的密码和用户名与user中的密码做比较
  if (enPassword !== user.password) {
    const error = new Error(PASSWORD_MISTAKE);
    return ctx.app.emit("error", error, ctx)
  }

  // 4. 验证成功后, 保存用户的信息
  ctx.user = user;

  // 5. 通过验证, 进行下一步操作
  await next();
}

const varifyAuth = async (ctx, next) => {
  // 获取到token
  // 判断请求是否携带token
  const authorization = ctx.header.authorization;
  if (!authorization) {
    const error = new Error(UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");

  // 验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    // 将result存储起来
    ctx.user = result;
    // 验证通过进行下一步
    await next();
  } catch (err) {
    const error = new Error(UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx)
  }
}

const varifyPermission = async (ctx, next) => {
  // 1. 获取到用户的id和需要修改的评论id
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace("Id", "");
  const resourceId = ctx.params[resourceKey];
  const id = ctx.user.id;

  // 根据用户的id和需要修改的评论id查询数据库中是否有对应的评论
  const result = await authService.resourceMoment(tableName, resourceId, id);

  // 根据返回的result来判断是否具有权限
  if (!result) {
    const error = new Error(UNPERMISSION);
    return ctx.app.emit("error", error, ctx)
  }

  // 通过验证进行下一步操作
  await next();
}

module.exports = {
  varifyLogin,
  varifyAuth,
  varifyPermission
}