const errorMiddleware = (err, req, res, next) => {
  const message = err.message || "Backend Error";
  const status = err.status || 500;
  const extraDetails = err.extraDetails || "Error from backend";
  return res.status(status).send({ message, extraDetails });
};

export default errorMiddleware;
