const {
  getLabelByName,
  createLabel
} = require("../service/label.service")

const {
  PARAMETER_INCOMPLETE
} = require("../constants/error-types")

const varifyLabelExists = async (ctx, next) => {
  // 获取需要验证的标签
  const {
    labels
  } = ctx.request.body;
  const momentId = ctx.params.momentId;

  // 判断参数是否完整
  if (!labels.length || !momentId) {
    const error = new Error(PARAMETER_INCOMPLETE);
    return ctx.app.emit("error", error, ctx);
  }

  const newLabels = [];
  // 遍历labels, 判断数据库中是否存在标签, 如果不存在则创建对应标签
  for (let name of labels) {
    // 操作数据库查询是否有对应标签
    const labelResult = await getLabelByName(name);
    const label = {
      name
    };
    if (!labelResult) { // 数据库中没有对应标签
      // 操作数据库创建对应标签
      const result = await createLabel(name);
      // 取到result中的id
      label.id = result.insertId;
    } else {
      label.id = labelResult.id;
    }
    newLabels.push(label)
  }

  ctx.labels = newLabels;

  await next();
}

module.exports = {
  varifyLabelExists
}