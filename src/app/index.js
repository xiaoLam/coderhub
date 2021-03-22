const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const useRoutes = require("../router");
const errorHandler = require("./error_handler");

const app = new Koa();

// 使用bodyParser来解析JSON
app.use(bodyParser());

// 使用router
useRoutes(app);

// 监听错误信息
app.on("error", errorHandler)

module.exports = app;