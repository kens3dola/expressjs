const Student = require('../models/student.model');
const async = require('async')


exports.studentList = function(req, res){
    Student.find({}, 'studentId firstName lastName address dateOfBirth') 
    .exec(function (err, data) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('./student/studentList', { title: 'Student List', studentList: data });
    });
}
exports.studentDetail = function(req, res){
        Student.findOne({_id: req.params.id}, (err, result)=>{
            if(err){
                res.send(err);
            }else{
                res.render('./student/studentDetail', { title: 'Student Detail',student: result } );
            }
        })
    };

exports.studentCreateGet = function(req, res){
    res.render('./student/studentAdd', {title: 'Create student'});
}

exports.studentCreatePost = function(req, res){
    Student.findOne({studentId: req.body.studentId}, (err, result)=>{
        if(err){
            res.send(err);
        }else if(!result){
            student = new Student();
            student.studentId = req.body.studentId;
            student.firstName = req.body.fname;
            student.lastName = req.body.lname;
            student.address = req.body.address;
            student.dateOfBirth = req.body.dob;
            student.save(function(err, data){
                if(err) return err
                res.render('./student/studentDetail', { title: 'Created!',student: student } );
            })
        }else{
            res.render('./student/studentAdd', {title: 'Create student', err: 'Student existed!'});
        }
    })
    
}

exports.studentDeletePost = function(req, res){
    Student.deleteOne({_id: req.params.id}, (err)=>{
        if(err){res.send(err)}
        else{res.redirect('/students/list')}
    })
}

exports.studentUpdateGet = function(req, res){
    Student.findOne({_id: req.params.id}, (err, data)=>{
        if(err){ 
            res.send(err);
        }else{
            // link= `/students/:${data._id}/update`;
            res.render('./student/studentUpdate', {title: 'Update', student: data});
        }
    })
}

exports.studentUpdatePost = function(req, res){
    Student.updateOne({_id: req.params.id}, {
        studentId: req.body.studentId,
        firstName: req.body.fname,
        lastName: req.body.lname,
        address: req.body.address,
        dateOfBirth: req.body.dob
    },(err, raw)=>{
        if(err){
            res.send(err);
        }else{
            res.render('./student/studentDetail', { title: 'Updated',student:{
                studentId: req.body.studentId,
                firstName: req.body.fname,
                lastName: req.body.lname,
                address: req.body.address,
                dateOfBirth: req.body.dob} } );
        }
    })
}
