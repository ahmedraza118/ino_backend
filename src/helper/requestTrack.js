// requestResponseLogger.js
const logRequest = (req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
  };
  
  const logResponse = (req, res, next) => {
    const startTime = Date.now();
    const originalSend = res.send;
  
    res.send = function (body) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
  
      // Choose colors for status codes
      let statusCodeColor = '\x1b[32m'; // Green for success (2xx status codes)
      if (res.statusCode >= 400 && res.statusCode <= 499) {
        statusCodeColor = '\x1b[33m'; // Yellow for client errors (4xx status codes)
      } else if (res.statusCode >= 500 && res.statusCode <= 599) {
        statusCodeColor = '\x1b[31m'; // Red for server errors (5xx status codes)
      }
  
      console.log(
        `Outgoing response: ${statusCodeColor}${res.statusCode}\x1b[0m (Response Time: ${responseTime}ms)`
      );
      originalSend.call(res, body);
    };
    next();
  };
  
  module.exports = { logRequest, logResponse };
  