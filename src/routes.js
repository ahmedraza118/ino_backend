const user = require("./api/v1/controllers/user/routes");
const admin = require("./api/v1/controllers/admin/routes");

module.exports = function routes(app) {
  app.use("/api/v1/admin", admin);
  app.use("/api/v1/user", user);

  return app;
};
