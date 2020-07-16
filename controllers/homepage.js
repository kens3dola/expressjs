const Student = require('../models/student.model');
const Course = require('../models/course.model');
const Enrolment = require('../models/enrolment.model');
const async = require('async')

exports.index = function(req, res) {   
    
    async.parallel({
        studentCount: function(callback) {
            Student.countDocuments({}, callback);
        },
        courseCount: function(callback) {
            Course.countDocuments({}, callback);
        },
        enrolmentCount: function(callback) {
            Enrolment.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('homepage', { title: 'Group 5', error: err, data: results });
    });
}
exports.page = function(req, res) { 
    res.send({id:1, name:'a'});
}
