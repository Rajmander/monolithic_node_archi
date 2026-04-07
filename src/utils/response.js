const success = (res, status, data, message, meta = null) => {
  return res.status(status).json({
    success: true,
    data,
    meta,
    message,
  });
};

const error = (res, status, error, message) => {
  return res.status(status).json({
    success: false,
    message: message,
    error: error,
  });
};

export { success, error };
