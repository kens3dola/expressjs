var express = require('express');
var router = express.Router();
const courseController = require('../controllers/courseController');


router.get('/list', courseController.courseList);

router.get('/:id/detail', courseController.courseDetail);

router.get('/create', courseController.courseCreateGet);

router.post('/create', courseController.courseCreatePost);

router.get('/:id/update', courseController.courseUpdateGet);

router.post('/:id/update', courseController.courseUpdatePost);

router.post('/:id/delete', courseController.courseDeletePost);

module.exports = router;
