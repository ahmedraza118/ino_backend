const apiError = require("./apiError.js");
const errors = require("./error.js"); // Replace 'path_to_errors_file' with the correct path to your errors file
const apiErrorHandler = (err, req, res, next) => {
  console.log("Request URL:", req.originalUrl);
  console.log("Request Method:", req.method);
  console.log("Request Body:", req.body);

  // Check if it's an API error (created using apiError class)
  if (err instanceof apiError) {
    console.error("API Error:", err);
    const errorDetails = {
      name: err.name,
      message: err.message,
      stack: err.stack,
    };
    res.status(err.responseCode).json({
      responseCode: err.responseCode,
      responseMessage: err.responseMessage,
      error: errorDetails,
    });
    return;
  }

  // Handle specific known errors
  if (err.message === "Validation error") {
    console.error("Validation Error:", err);
    const errorDetails = {
      name: err.name,
      message: err.message,
      stack: err.stack,
    };
    res.status(502).json({
      responseCode: 502,
      responseMessage: err.original.message,
      error: errorDetails,
    });
    return;
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    console.error("Mongoose Validation Error:", err);
    const validationErrors = [];
    for (let field in err.errors) {
      validationErrors.push(err.errors[field].message);
    }
    const errorDetails = {
      name: err.name,
      message: err.message,
      stack: err.stack,
    };
    res.status(400).json({
      responseCode: 400,
      responseMessage: "Validation failed",
      errors: validationErrors,
      error: errorDetails,
    });
    return;
  }

  // Handle JWT authentication errors
  if (err.name === "UnauthorizedError" || err.message === "Unauthorized") {
    console.error("JWT Unauthorized Error:", err);
    const errorDetails = {
      name: err.name,
      message: err.message,
      stack: err.stack,
    };
    res.status(401).json({
      responseCode: 401,
      responseMessage: "Unauthorized: Incorrect credentials",
      error: errorDetails,
    });
    return;
  }

  // Handle file upload errors
  if (err.code === "LIMIT_FILE_SIZE") {
    console.error("File Upload Error:", err);
    const errorDetails = {
      name: err.name,
      message: err.message,
      stack: err.stack,
    };
    res.status(413).json({
      responseCode: 413,
      responseMessage: "File size exceeds the limit",
      error: errorDetails,
    });
    return;
  }

  // Check if the 'errors' object is defined
  if (typeof errors !== "undefined") {
    // Check for known errors based on the errors object
    if (errors[err.code]) {
      console.error("Known Error:", err);
      const errorDetails = {
        name: err.name,
        message: err.message,
        stack: err.stack,
      };
      res.status(err.code).json({
        responseCode: err.code,
        responseMessage: errors[err.code],
        error: errorDetails,
      });
      return;
    }
  }

  // Check for TypeError
  if (err instanceof TypeError) {
    console.error("TypeError:", err);
    // Convert the error object to a JSON-serializable format
    const errorDetails = {
      name: err.name,
      message: err.message,
      stack: err.stack,
    };
    res.status(500).json({
      responseCode: 500,
      responseMessage: "Internal Error!: TypeError",
      error: errorDetails,
    });
    return;
  }
  // Check for castError
  if (err.name === "CastError") {
    console.error("CastError:", err);
    // Convert the error object to a JSON-serializable format
    const errorDetails = {
      name: err.name,
      message: err.message,
      stack: err.stack,
    };
    res.status(400).json({
      responseCode: 400,
      responseMessage: "Invalid Input! : Bad Request",
      error: errorDetails,
    });
    return;
  }

  // Check for common HTTP errors (e.g., 400, 401, 404, etc.)
  if (err instanceof Error && err.status >= 400 && err.status <= 511) {
    console.error("Common HTTP Error:", err);
    const errorDetails = {
      name: err.name,
      message: err.message,
      stack: err.stack,
    };
    res.status(err.status).json({
      responseCode: err.status,
      responseMessage: err.message,
      error: errorDetails,
    });
    return;
  }

  // For unhandled errors or generic errors, return a 500 status code
  console.error("Unhandled Error:", err);
  const errorDetails = {
    name: err.name,
    message: err.message,
    stack: err.stack,
  };
  res.status(500).json({
    responseCode: 500,
    responseMessage: "Internal Server Error",
    error: errorDetails,
  });
};

module.exports = apiErrorHandler;
