var express = require('express');
var router = express.Router();

const InstitucionController = require('../controllers/InstitucionesController');
const checkAuth = require('../middleware/check-auth');

router.get("/", InstitucionController.institucion_get);
router.post("/create", InstitucionController.institucion_create);
router.post("/imageupload", InstitucionController.image_upload);

module.exports = router;