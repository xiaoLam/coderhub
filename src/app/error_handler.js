const {
  NAME_OR_PASSWORD_IS_REQUIRE,
  USER_HAS_ALREADLY_EXISTS,
  USER_DOES_NOT_EXISTS,
  PASSWORD_MISTAKE,
  UNAUTHORIZATION,
  UNPERMISSION,
  PARAMETER_INCOMPLETE,
  SERVICE_OPERATION_FAILED
} = require("../constants/error-types")

const errorHandler = (err, ctx) => {
  // 定义变量
  let message, status;

  // 错误类型判断
  switch (err.message) {
    case NAME_OR_PASSWORD_IS_REQUIRE:
      message = NAME_OR_PASSWORD_IS_REQUIRE + "请输入用户名和密码";
      status = 400; // bad request, 错误的请求
      break;
    case USER_HAS_ALREADLY_EXISTS:
      message = USER_HAS_ALREADLY_EXISTS + "用户名已经存在";
      status = 409; // 服务器冲突
      break;
    case USER_DOES_NOT_EXISTS:
      message = USER_DOES_NOT_EXISTS + "用户不存在";
      status = 400;
      break;
    case PASSWORD_MISTAKE:
      message = PASSWORD_MISTAKE + "密码错误";
      status = 400;
      break;
    case UNAUTHORIZATION:
      message = UNAUTHORIZATION + "无效的token";
      status = 401;
      break;
    case UNPERMISSION:
      message = UNPERMISSION + "您没有修改该数据的权限";
      status = 401;
      break;
    case PARAMETER_INCOMPLETE:
      message = PARAMETER_INCOMPLETE + "参数不完整";
      status = 400;
      break;
    case SERVICE_OPERATION_FAILED:
      message = SERVICE_OPERATION_FAILED + "服务器操作失败, 请检查参数是否正确传入";
      status = 400;
      break;
    default:
      message = "NOT FOUND";
      status = 404;
      break;
  }

  // 返回结果
  ctx.status = status;
  ctx.body = message;
}

module.exports = errorHandler;