const Router = require("koa-router");

const {
  varifyAuth,
  varifyPermission
} = require("../middleware/auth.middleware");

const {
  varifyLabelExists
} = require("../middleware/label.middleware")


const {
  create,
  momentDetail,
  momentList,
  updateMoment,
  removeMoment,
  addLabels,
  getFileInfo
} = require("../controller/moment.controller");

const momentRouter = new Router({
  prefix: "/moment"
});

// 添加动态接口
momentRouter.post("/", varifyAuth, create);
// 获取多条动态接口
momentRouter.get("/", momentList);
// 根据id获取单条动态接口
momentRouter.get("/:momentId", momentDetail);
// 修改动态内容接口
momentRouter.patch("/:momentId", varifyAuth, varifyPermission, updateMoment);
// 删除动态内容接口
momentRouter.delete("/:momentId", varifyAuth, varifyPermission, removeMoment);
// 动态添加标签接口
momentRouter.post("/:momentId/labels", varifyAuth, varifyPermission, varifyLabelExists, addLabels);
// 获取动态图片接口
momentRouter.get("/images/:filename", getFileInfo)

module.exports = momentRouter;