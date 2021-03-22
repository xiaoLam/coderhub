const app = require("./app")
const config = require("./app/config");
const connection = require("./app/database")

app.listen(config.APP_PORT, () => {
  console.log(`端口${config.APP_PORT}服务器启动成功`);
})