const Enrolment = require('../models/enrolment.model');
const Student = require('../models/student.model');
const Course = require('../models/course.model');
const async = require('async')

exports.enrolmentList = function(req, res){
    Enrolment.find()
    .populate('student')
    .populate('course')
    .exec(function (err, list) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('./enrolment/enList', { title: 'Enrolment List', List: list });
    });
}
exports.enrolmentSortedList = function(req, res){
  Enrolment.find()
  .populate('student')
  .populate('course') 
  .sort({markToSort:1})
  .exec(function (err, list) {
    if (err) { return next(err); }
    // Successful, so render
    res.render('./enrolment/enList', { title: 'Enrolment List', List: list });
  });
}

exports.enrolmentDetail = function(req, res){
  Enrolment.findOne({_id: req.params.id})
  .populate('student')
  .populate('course')
  .exec((err, results)=>{
    if(err){
      res.send(err);
    }else{
      res.render('./enrolment/enDetail', {enrolment: results})
    }
  })
};

exports.enrolmentCreateGet = function(req, res){
  res.render('./enrolment/enAdd', {title: 'Create an enrolment'});
}

exports.enrolmentCreatePost = function(req, res){
  async.parallel({
    student: function(callback) {
      Student.findOne({studentId: req.body.student}, callback);
    },
    course: function(callback) {
      Course.findOne({courseId: req.body.course.toUpperCase()}, callback);
    }
}, async function(err, results) {
  if(!results.student){
    res.render('./enrolment/enAdd', {title: 'Cannot find student!'})
  }else if(!results.course){
    res.render('./enrolment/enAdd', {title: 'Cannot find course!'})
  }else{
    const enrolment = await Enrolment.findOne({student: results.student, course: results.course})
    if(enrolment){
      res.render('./enrolment/enAdd', {title: 'Duplicated infomation!'})
    }else{
      const enrolment = new Enrolment();
      enrolment.student = results.student;
      enrolment.course = results.course;
      enrolment.semester = req.body.semester;
      if(req.body.grade){
        enrolment.grade = req.body.grade;
        switch(enrolment.grade){
          case 'F':
            enrolment.markToSort = 1;
            break;
          case 'P':
              enrolment.markToSort = 2;
              break;
          case 'G':
              enrolment.markToSort = 3;
              break;
          default:
              enrolment.markToSort = 4;
        }
      }
      enrolment.save(function(err, data){
        if(err){
          return err;
        }else{
          res.redirect(enrolment._id+'/detail');
        }
    })
    }
  }
});
};

exports.enrolmentDeletePost = function(req, res){
  Enrolment.deleteOne({_id: req.params.id}, (err)=>{
      if(err){res.send(err)}
      else{res.redirect('/enrolments/list')}
  })
}

exports.enrolmentUpdateGet = function(req, res){
  Enrolment.findOne({_id: req.params.id})
  .populate('student')
  .populate('course')
  .exec((err, results)=>{
    if(err){
      res.send(err);
    }else{
      res.render('./enrolment/enUpdate', {title:'Update', enrolment: results})
    }
  })
};

exports.enrolmentUpdatePost = function(req, res){
  let mark = 0
  switch(req.body.grade.toUpperCase()){
    case 'F':
      mark = 1;
      break;
    case 'P':
      mark = 2;
      break;
    case 'G':
      mark = 3;
      break;
    default:
      mark = 4;
      break;
  }
  Enrolment.updateOne({_id: req.params.id},{grade: req.body.grade.toUpperCase(),markToSort:mark},(err, data)=>{
    if(err){
      return err;
    }else{
      res.redirect('detail');
    }
  })
};

exports.studentRp= function(req, res){
  Student.find().exec(function(err, listStudent){
    res.render('studentReport', {studentList: listStudent})
  })
}
exports.courseRp= function(req, res){
  Course.find()
    .exec(function (err, listCourse) {
    res.render('courseReport', {courseList: listCourse})
  })
}
exports.rpOfFailure= function(req, res){
  Course.find()
    .exec(function (err, listCourse) {
    res.render('failedStudentReport', {courseList: listCourse})
    })
}
exports.studentReport = async function(req, res){
  const listStudent = await Student.find();
  let studentId = '';
  if(req.body.studentId){
    studentId= req.body.studentId;
  }else{
    studentId= req.body.studentIdRp;
  }
  const student = await Student.findOne({studentId: studentId});
  if(student){
    const title = 'Student:' + student.studentId +' '+ student.firstName +' '+ student.lastName;
    Enrolment.find({student: student}).populate('student').populate('course').exec(function (err, data) {
      if(data[0]){
        res.render('studentReport', {title: title, list: data, studentList: listStudent})
      }else{
        res.render('studentReport', {title: title, error: data, studentList: listStudent})
      };
      });
  }else{
    res.render('studentReport', {title: 'student does not exist',studentList: listStudent})
  }
  
}
exports.reportOfFailure = async function(req, res){
  const listCourse = await Course.find();
  let courseId = '';
  if(req.body.courseId){
    courseId= req.body.courseId;
  }else{
    courseId= req.body.courseIdRp;
  }
  const course = await Course.findOne({courseId: courseId.toUpperCase()});
  if(course){
    const title = 'Course:' + course.courseId +' '+ course.name;
  Enrolment.find({course: course, grade: 'F'}).populate('student').populate('course').exec(function (err, data) {
    if(data[0]){
      res.render('failedStudentReport', {title: title, list: data, courseList: listCourse})
    }else{
      res.render('failedStudentReport', {title: title, error: data, courseList:listCourse})
    };
    });
  }else{
    res.render('failedStudentReport', {title: 'Course does not exist', courseList:listCourse})
  }
}
exports.courseReport = async function(req, res){
  const listCourse = await Course.find(); 
  let courseId = '';
  if(req.body.courseId){
    courseId= req.body.courseId;
  }else{
    courseId= req.body.courseIdRp;
  }
  const course = await Course.findOne({courseId: courseId.toUpperCase()});
  if(course){
    const title = 'Course:' + course.courseId +' '+ course.name;
  Enrolment.find({course: course}).populate('student').populate('course').exec(function (err, data) {
    if(data[0]){
      res.render('courseReport', {title: title, list: data, courseList: listCourse})
    }else{
      res.render('courseReport', {title: title, error: data, courseList: listCourse})
    };
  });
  }else{
    res.render('courseReport', {title: 'Course does not exist', courseList: listCourse})
  }
}