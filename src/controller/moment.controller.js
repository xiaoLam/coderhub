const {
  insertContent,
  getMomentById,
  getMomentList,
  update,
  remove,
  hasLabel,
  addLabel,
  getFileByFilename
} = require("../service/moment.service.js");
const serviceErrCatch = require("./service.error_catch.js");

const fs = require("fs");

const {
  PARAMETER_INCOMPLETE
} = require("../constants/error-types");
const {
  PICTURE_PATH
} = require("../constants/file-path");

class momentController {
  async create(ctx, next) {
    // 1. 获取客户端传递过来的评论信息以及用户的id信息
    const id = ctx.user.id;
    const content = ctx.request.body.content;

    // 判断参数是否完整
    if (!content) {
      const error = new Error(PARAMETER_INCOMPLETE);
      return ctx.app.emit("error", error, ctx);
    }

    try {
      // 2. 将评论信息以及用户id存储到数据库中
      const result = await insertContent(content, id);

      // 3. 返回结果
      ctx.body = result;
    } catch (err) {
      serviceErrCatch(ctx);
    }
  }

  async momentDetail(ctx, next) {
    // 1. 获取到momentId
    const id = ctx.params.momentId;

    // 判断参数是否完整
    if (!id) {
      const error = new Error(PARAMETER_INCOMPLETE);
      return ctx.app.emit("error", error, ctx);
    }

    try {
      // 2. 根据获取到的id, 从数据库中查询对应的数据
      const result = await getMomentById(id);

      // 3. 返回数据
      ctx.body = result;
    } catch (err) {
      serviceErrCatch(ctx);
    }
  }

  async momentList(ctx, next) {
    // 1. 获取到offset(从哪一条开始获取), 和size(要获取多少条)
    const {
      offset,
      size
    } = ctx.query;

    // 判断参数是否完整
    if (!offset || !size) {
      const error = new Error(PARAMETER_INCOMPLETE);
      return ctx.app.emit("error", error, ctx);
    }

    try {
      // 2. 根据offset和size从数据库中获取数据
      const result = await getMomentList(offset, size);

      // 3. 返回数据
      ctx.body = result;
    } catch (err) {
      serviceErrCatch(ctx);
    }
  }

  async updateMoment(ctx, next) {
    // 获取信息
    const content = ctx.request.body.content;
    const momentId = ctx.params.momentId;

    // 判断参数是否完整
    if (!content || !momentId) {
      const error = new Error(PARAMETER_INCOMPLETE);
      return ctx.app.emit("error", error, ctx);
    }

    try {
      // 根据获取到的信息修改数据库中的信息
      const result = await update(content, momentId);

      // 返回结果
      ctx.body = result;
    } catch (err) {
      serviceErrCatch(ctx);
    }

  }

  async removeMoment(ctx, next) {
    // 获取信息
    const momentId = ctx.params.momentId;

    // 判断参数是否完整
    if (!momentId) {
      const error = new Error(PARAMETER_INCOMPLETE);
      return ctx.app.emit("error", error, ctx);
    }

    try {
      // 根据信息删除数据库中对应的评论
      const result = await remove(momentId);
      // 返回结果
      ctx.body = result;
    } catch (err) {
      serviceErrCatch(ctx);
    }
  }

  async addLabels(ctx, next) {
    // 获取数据
    const momentId = ctx.params.momentId;
    const labels = ctx.labels;

    // 遍历labels, 给动态添加标签
    for (let label of labels) {
      // 判断标签是否已经与动态有关系
      try {
        const isLabelExist = await hasLabel(momentId, label.id);
        if (!isLabelExist) {
          await addLabel(momentId, label.id);
        }
      } catch (err) {
        serviceErrCatch();
      }
    }

    // 返回数据
    ctx.body = "动态添加标签成功";
  }

  async getFileInfo(ctx, next) {
    // 获取信息
    let filename = ctx.params.filename;
    // 根据filename来获取图片信息
    const fileInfo = await getFileByFilename(filename);

    // 判断是否需要提供缩放的图像
    const type = ctx.query.type;
    const types = ["large", "midlle", "small"];
    if (types.some(item => item === type)) {
      filename = filename + `-${type}`;
    }

    // 返回数据
    ctx.response.set("content-type", fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);

  }
}

module.exports = new momentController();