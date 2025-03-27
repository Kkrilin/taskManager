const errorHandler = (err, req, res, next) => {
  console.error("error", err.stack); // Log the error stack for debugging
  const statusCode = err.status || 500;
  console.log(statusCode, "statusCode");
  res.status(statusCode).json({
    success: 0,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
