const success = (statuscode, result) => {
  return {
    status: "ok",
    statuscode,
    result,
  };
};

const error = (statuscode, message) => {
  return {
    status: "ok",
    statuscode,
    message,
  };
};

module.exports = {
  success,
  error,
};
