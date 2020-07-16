var express = require('express');
var router = express.Router();

var homepage = require('../controllers/homepage')

router.get('/', homepage.index);
router.get('/page', homepage.page);


module.exports = router;