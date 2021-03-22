const {
  createLabel,
  getLabels,
  getLabelByMomentId
} = require("../service/label.service");

const serviceErrCatch = require("./service.error_catch");

const {
  PARAMETER_INCOMPLETE
} = require("../constants/error-types");


class labelController {
  async create(ctx, next) {
    // 获取信息
    const name = ctx.request.body.name;

    // 判断参数是否完整
    if (!name) {
      const error = new Error(PARAMETER_INCOMPLETE);
      return ctx.app.emit("error", error, ctx);
    }

    try {
      // 根据信息操作数据库
      const result = await createLabel(name);

      // 返回数据
      ctx.body = result;
    } catch (err) {
      serviceErrCatch()
    }
  }

  async getLabelsList(ctx, next) {
    // 获取信息
    const {
      limit,
      offset
    } = ctx.query;

    try {
      // 操作数据库
      const result = await getLabels(limit, offset);

      // 返回数据
      ctx.body = result;
    } catch (err) {
      serviceErrCatch()
    }
  }

  async getLabelByMomentId(ctx, next) {
    // 获取信息
    const momentId = ctx.params.momentId;

    try {
      // 操作数据库
      const result = await getLabelByMomentId(momentId);

      // 返回数据
      ctx.body = result;
    } catch (err) {
      serviceErrCatch();
    }
  }
}

module.exports = new labelController();