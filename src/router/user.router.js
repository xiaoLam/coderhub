const Router = require("koa-router");

const {
  create,
  avatarInfo
} = require("../controller/user.controller");
const {
  varifyUser,
  passwordHandle,
} = require("../middleware/user.middleware")


const userRouter = new Router({
  prefix: "/user"
});

// 注册用户接口
userRouter.post("/", varifyUser, passwordHandle, create)
// 根据userId获取用户头像接口
userRouter.get("/:userId/avatar", avatarInfo);

module.exports = userRouter;