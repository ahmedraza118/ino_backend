const user = require('./api/v1/controllers/user/routes');

module.exports = function routes(app) {
  app.use('/api/v1/user', user);
  return app;
};