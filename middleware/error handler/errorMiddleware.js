const errorHandler = (err, req, res, next) => {
  const statusCode = req.statusCode ? req.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    timestamp: new Date().toISOString(),
  });
};

module.exports = errorHandler;
