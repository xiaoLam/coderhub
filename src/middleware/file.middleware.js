const Multer = require("koa-multer");
const Jimp = require("jimp");

const {
  AVATAR_PATH,
  PICTURE_PATH
} = require("../constants/file-path");

const path = require("path");

// 存储头像中间件
const avatarMulter = Multer({
  dest: AVATAR_PATH
});
const avatarHandler = avatarMulter.single("avatar");

// 存储动态图中间件
const pictureMulter = Multer({
  dest: PICTURE_PATH
});
const pictureHandler = pictureMulter.array("picture");

// 对传入的图片进行处理中间件
const pictureResize = async (ctx, next) => {
  // 首先获取到图像的信息
  const files = ctx.req.files;

  try {
    // 对图像进行处理
    for (let file of files) {
      // 获取图片的路径
      const filePath = path.resolve(file.destination, file.filename);

      // 使用第三方库 jimp来对图片进行处理
      // 使用read方法读取图片, 该方法返回一个promise对象
      Jimp.read(filePath).then(image => {
        // image为读取到的图片对象, 调用该对象中的resize方法调整图片的大小
        // resize方法返回stream, 将stream通过write方法写入到本地
        image.resize(1280, Jimp.AUTO).write(`${filePath}-large`);
        image.resize(640, Jimp.AUTO).write(`${filePath}-middle`);
        image.resize(320, Jimp.AUTO).write(`${filePath}-small`);
      })
    }

    // 完成调整, 进行下一步操作
    await next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}