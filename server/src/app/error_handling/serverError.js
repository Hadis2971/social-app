const errorHandler = (error, req, res, next) => {
  console.log('server error', error);
  res.json({ Error: error });
};

export default errorHandler;
