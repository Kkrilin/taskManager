const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: 0,
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
