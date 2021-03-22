const {
  SERVICE_OPERATION_FAILED
} = require("../constants/error-types");

const serviceErrCatch = (ctx) => {
  const error = new Error(SERVICE_OPERATION_FAILED);
  return ctx.app.emit("error", error, ctx);
}

module.exports = serviceErrCatch;