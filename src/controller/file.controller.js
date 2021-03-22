const {
  createAvatar,
  createPicture
} = require("../service/file.service");
const {
  updateAvatarUrl
} = require("../service/user.service");

const serviceErrCatch = require("./service.error_catch");

const {
  APP_HOST,
  APP_PORT
} = require("../app/config")

class fileController {
  async saveAvatarInfo(ctx, next) {
    // 获取信息
    const {
      filename,
      mimetype,
      size
    } = ctx.req.file;
    const userId = ctx.user.id;

    try {
      // 操作数据库上传
      const result = await createAvatar(filename, mimetype, size, userId);

      // 在用户头像上传完毕之后, 更新user数据
      const avatatUrl = `${APP_HOST}:${APP_PORT}/user/${userId}/avatar`;
      console.log(avatatUrl);
      await updateAvatarUrl(avatatUrl, userId);

      // 返回数据
      ctx.body = result;
    } catch (err) {
      serviceErrCatch();
    }
  }

  async savaPiceturInfo(ctx, next) {
    // 获取信息
    const files = ctx.req.files;
    const userId = ctx.user.id;
    const momentId = ctx.query.momentId;

    // 操作数据库
    for (let file of files) {
      const {
        filename,
        mimetype,
        size
      } = file;

      try {
        await createPicture(filename, mimetype, size, userId, momentId);
      } catch (err) {
        serviceErrCatch()
      }
    }

    ctx.body = "动态图上传完成"

  }
}

module.exports = new fileController()