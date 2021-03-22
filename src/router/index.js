const fs = require("fs");

// 通过fs模块中的readdirSync方法读取当前目录中的所有文件的文件名
const useRoutes = (app) => {
  fs.readdirSync(__dirname).forEach(filename => {
    // 不需要读取index.js文件
    if (filename == "index.js") return;

    // 利用forEach循环自动读取router文件夹中的文件, 并调用routes()和allowedMethods()方法
    let router = require(`./${filename}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  })
}

module.exports = useRoutes;