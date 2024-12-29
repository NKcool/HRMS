// middleware/loggerMiddleware.js

const loggerMiddleware = (req, res, next) => {
    // Log the incoming request (before the response is sent)
    const { method, originalUrl } = req;
    
    // Capture the original `send` method of the response
    const originalSend = res.send;
  
    // Intercept the response status code and log it after the response is sent
    res.send = function (body) {
      const statusCode = res.statusCode;
      console.log(`API HITTED: Route: ${method} ${originalUrl} | Status Code: ${statusCode}`);
      
      // Call the original `send` method to complete the response
      originalSend.call(this, body);
    };
  
    // Proceed to the next middleware/handler
    next();
  };
  
  module.exports = loggerMiddleware;
  