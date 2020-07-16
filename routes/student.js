var express = require('express');
var router = express.Router();

var studentController = require('../controllers/studentController');

router.get('/list', studentController.studentList);

router.get('/:id/detail', studentController.studentDetail);

router.get('/create', studentController.studentCreateGet);

router.post('/create', studentController.studentCreatePost);

router.get('/:id/update', studentController.studentUpdateGet);

router.post('/:id/update', studentController.studentUpdatePost);

// router.get('/:id/delete', studentController.studentDeleteGet);
router.post('/:id/delete', studentController.studentDeletePost);
module.exports = router;
