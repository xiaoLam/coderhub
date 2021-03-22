const Router = require("koa-router");
const {
  avatarHandler,
  pictureHandler,
  pictureResize
} = require("../middleware/file.middleware")

const {
  saveAvatarInfo,
  savaPiceturInfo
} = require("../controller/file.controller")

const {
  varifyAuth
} = require("../middleware/auth.middleware");

const fileRouter = new Router({
  prefix: "/upload"
});

// 上传头像接口
fileRouter.post("/avatar", varifyAuth, avatarHandler, saveAvatarInfo);
// 上传动态图接口
fileRouter.post("/picture", varifyAuth, pictureHandler, pictureResize, savaPiceturInfo);

module.exports = fileRouter;