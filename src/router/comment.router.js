const Router = require("koa-router");

const {
  varifyAuth,
  varifyPermission
} = require("../middleware/auth.middleware");

const {
  create,
  reply,
  update,
  remove,
  list,
} = require("../controller/comment.controller");


const commentRouter = new Router({
  prefix: "/comment"
});

// 评论接口
commentRouter.post("/:momentId", varifyAuth, create);
// 评论评论接口
commentRouter.post("/:momentId/:commentId/reply", varifyAuth, reply);
// 修改评论接口
commentRouter.patch("/:commentId", varifyAuth, varifyPermission, update);
// 删除评论接口
commentRouter.delete("/:commentId", varifyAuth, varifyPermission, remove);
// 获取评论列表接口
commentRouter.get("/", list);


module.exports = commentRouter;