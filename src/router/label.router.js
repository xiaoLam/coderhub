const Router = require("koa-router");

const {
  varifyAuth
} = require("../middleware/auth.middleware");

const {
  create,
  getLabelsList,
  getLabelByMomentId
} = require("../controller/label.controller");

const labelRouter = new Router({
  prefix: "/label"
});

// 创建标签接口
labelRouter.post("/", varifyAuth, create);
// 获取标签列表接口
labelRouter.get("/", getLabelsList);
// 通过momentId获取标签
labelRouter.get("/:momentId", getLabelByMomentId);

module.exports = labelRouter;