const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode === 200 ? err.statusCode || 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    timestamp: new Date().toISOString(),
  });
  next();
};

module.exports = errorHandler;
