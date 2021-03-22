const {
  inserComment,
  commentReply,
  commentUpdate,
  commentRemove,
  getCommentsByMommentId
} = require("../service/comment.service");

const serviceErrCatch = require("./service.error_catch")

const {
  PARAMETER_INCOMPLETE
} = require("../constants/error-types")

class commentController {
  async create(ctx, next) {
    // 首先获取到momentId(要评论哪一条动态), content(评论的内容), 以及id(评论者)
    const content = ctx.request.body.content;
    const momentId = ctx.params.momentId;
    const id = ctx.user.id;

    // 判断参数是否完整
    if (!content || !momentId) {
      const error = new Error(PARAMETER_INCOMPLETE);
      return ctx.app.emit("error", error, ctx);
    }

    try {
      // 根据信息操作数据库
      const result = await inserComment(momentId, content, id);
      // 返回数据
      ctx.body = result;
    } catch (err) {
      serviceErrCatch(ctx);
    }
  }

  async reply(ctx, next) {
    // 获取信息
    const momentId = ctx.params.momentId;
    const commentId = ctx.params.commentId;
    const content = ctx.request.body.content;
    const id = ctx.user.id;

    // 判断参数是否完整
    if (!content || !momentId || !commentId) {
      const error = new Error(PARAMETER_INCOMPLETE);
      return ctx.app.emit("error", error, ctx);
    }

    try {
      // 根据获取的信息操作数据库
      const result = await commentReply(momentId, commentId, content, id);
      // 返回数据
      ctx.body = result;
    } catch (err) {
      serviceErrCatch(ctx);
    }
  }

  async update(ctx, next) {
    // 1. 获取两个信息, 要修改哪一条评论 commentId, 修改内容content
    const content = ctx.request.body.content;
    const commentId = ctx.params.commentId;

    // 判断参数是否完整
    if (!content || !commentId) {
      const error = new Error(PARAMETER_INCOMPLETE);
      return ctx.app.emit("error", error, ctx)
    }

    try {
      // 2. 根据信息操作数据库
      const result = await commentUpdate(commentId, content);
      // 3. 返回数据
      ctx.body = result;
    } catch (err) {
      serviceErrCatch(ctx);
    }
  }

  async remove(ctx, next) {
    // 获取信息
    const commentId = ctx.params.commentId;

    // 判断参数是否完整
    if (!commentId) {
      const error = new Error(PARAMETER_INCOMPLETE);
      return ctx.app.emit("error", error, ctx)
    }

    try {
      // 操作数据库
      const result = await commentRemove(commentId);
      // 返回数据
      ctx.body = result;
    } catch (err) {
      serviceErrCatch(ctx);
    }
  }

  async list(ctx, next) {
    // 获取信息
    const momentId = ctx.query.momentId;

    // 判断参数是否完整
    if (!momentId) {
      const error = new Error(PARAMETER_INCOMPLETE);
      return ctx.app.emit("error", error, ctx)
    }

    try {
      // 操作数据库
      const result = await getCommentsByMommentId(momentId);

      // 返回数据
      ctx.body = result;
    } catch (err) {
      serviceErrCatch();
    }

  }
}

module.exports = new commentController();