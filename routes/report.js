var express =require('express');
var router = express.Router;
var home = require('../controllers/homepage')
router.get('/student', home.student)
router.get('/course', home.course)
router.get('/failed', home.failed)

module.exports = router;