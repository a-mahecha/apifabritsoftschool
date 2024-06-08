var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController');
const checkAuth = require('../middleware/check-auth');

router.get("/", checkAuth, UserController.user_get);
router.post("/create", UserController.user_create);
router.post("/login", UserController.user_login);
router.post("/getbyid", UserController.userbyid_get);
router.post("/getbyuser", UserController.userbyuser_get);
router.post("/getbyemail", UserController.userbyemail_get);
router.post("/enable", checkAuth, UserController.user_enable);
router.post("/disable", checkAuth, UserController.user_disable);
router.post("/delete", checkAuth, UserController.user_delete);

module.exports = router;