var mongoose = require('mongoose');
var Student = require('../models/student.model');
var Course = require('../models/course.model');

var Schema = mongoose.Schema;

var EnrolmentSchema = new Schema(
  {
    student: {type: Schema.Types.ObjectId, ref: 'Student', required: true},
    course: {type: Schema.Types.ObjectId, ref: 'Course', required: true},
    semester: {type: Number, max: 8, min: 1, required: true},
    grade: {type: String, enum: ['E', 'G', 'P', 'F']},
    markToSort: Number
  }
);

// Virtual for enrolment's URL
EnrolmentSchema
.virtual('url')
.get(function () {
  return '/enrolments/' + this._id;
});
//Export model
module.exports = mongoose.model('Enrolment', EnrolmentSchema);