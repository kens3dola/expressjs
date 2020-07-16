var express = require('express');
var router = express.Router();
const enrolmentController = require('../controllers/enrolmentController');


router.get('/list', enrolmentController.enrolmentList);

router.get('/sortedlist', enrolmentController.enrolmentSortedList);

router.get('/:id/detail', enrolmentController.enrolmentDetail);

router.get('/create', enrolmentController.enrolmentCreateGet);

router.post('/create', enrolmentController.enrolmentCreatePost);

router.get('/:id/update', enrolmentController.enrolmentUpdateGet);

router.post('/:id/update', enrolmentController.enrolmentUpdatePost);

router.post('/:id/delete', enrolmentController.enrolmentDeletePost);

router.get('/studentreport', enrolmentController.studentRp);

router.get('/failedstudentreport', enrolmentController.rpOfFailure);

router.get('/coursereport', enrolmentController.courseRp);

router.post('/studentreport', enrolmentController.studentReport);

router.post('/failedstudentreport', enrolmentController.reportOfFailure);

router.post('/coursereport', enrolmentController.courseReport);

module.exports = router;