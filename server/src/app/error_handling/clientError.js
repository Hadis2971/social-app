const errorHandler = (req, res, next) => {
  res.json({
    Error: 'Error 404 - Page Not Found'
  });
};

export default errorHandler;
