const LoginController = require("../../controllers/login.controller");
module.exports = (router) => {
  router.post("/user_login", LoginController.signIn);
};
