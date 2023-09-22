module.exports = function errorHandler(error, req, res, next) {
  let status, msg;

  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400, msg = error.errors[0].message
      break;

    case "NotFound":
      status = 404, msg = error.msg;
      break;

    default:
      status = 500, msg = "Internal Server Error";
      break;
  }

  res.status(status).json({ msg });
}