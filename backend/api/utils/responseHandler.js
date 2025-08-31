// utils/responseHandler.js
export const sendResponse = (res, statusCode, success, message, data = null, error = null) => {
  const response = {
    success,
    statusCode,
    message,
  };

  if (data) response.data = data;

  if (error) {
    if (process.env.NODE_ENV === "development") {
      response.error = typeof error === "object" ? error.stack || error.message : error;
    } else {
      response.error = typeof error === "object" ? error.message : error;
    }
  }

  return res.status(statusCode).json(response);
};
