const {
  create
} = require("../service/user.service");
const serviceErrCatch = require("./service.error_catch");
const {
  getAvatarByUserId
} = require("../service/file.service");

const fs = require("fs");

const {
  AVATAR_PATH
} = require("../constants/file-path")

class userController {
  async create(ctx, next) {
    // 获取用户信息
    const user = ctx.request.body;

    try {
      // 根据用户信息操作数据库
      const result = await create(user);

      // 返回结果
      ctx.body = result;
    } catch (err) {
      serviceErrCatch(ctx);
    }
  }

  async avatarInfo(ctx, next) {
    // 获取信息
    const userId = ctx.params.userId;

    try {
      // 根据userId获取头像信息
      const avatarInfo = await getAvatarByUserId(userId);

      // 根据头像信息返回头像
      // 注意需要设置请求头中的content-type, 否则浏览器会将返回头像做下载操作
      ctx.response.set("content-type", avatarInfo.mitetype);
      ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
    } catch (err) {
      serviceErrCatch();
    }
  }
}

module.exports = new userController();