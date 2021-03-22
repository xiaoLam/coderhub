const Router = require("koa-router");

const {
  login,
  success
} = require("../controller/auth.controller.js");

const {
  varifyLogin,
  varifyAuth
} = require("../middleware/auth.middleware")

const authRouter = new Router();

authRouter.post("/login", varifyLogin, login);
authRouter.get("/test", varifyAuth, success);

module.exports = authRouter;