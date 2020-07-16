const Course = require('../models/course.model')

exports.courseList = function(req, res){
    Course.find()
    .exec(function (err, listCourse) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('./course/courseList', { title: 'Course List', List: listCourse });
    });
}

exports.courseDetail = function(req, res){
  Course.findOne({_id: req.params.id}, (err, result)=>{
      if(err){
          res.send(err);
      }else{
          res.render('./course/courseDetail', { title: 'Course Detail',course: result } );
      }
  })
};

exports.courseCreateGet = function(req, res){
  res.render('./course/courseAdd', {title: 'Create Course'});
}

exports.courseCreatePost = function(req, res){
  Course.findOne({courseId: req.body.id}, (err, result)=>{
    if(err){
        res.send(err);
    }else if(!result){
        course = new Course();
        course.name = req.body.name;
        course.courseId = req.body.id.toUpperCase();
        course.start = req.body.start;
        course.end = req.body.end;
        course.prerequisites = req.body.pre.toUpperCase(); 
        course.save(function(err, data){
        if(err){
          return err
        }else{
          res.redirect(course._id+'/detail');
        }
      })
    }else{
        res.render('./course/courseAdd', {title: 'Create course', err: 'Course existed!'});
    }
  })
}

exports.courseDeletePost = function(req, res){
  Course.deleteOne({_id: req.params.id}, (err)=>{
      if(err){res.send(err)}
      else{res.redirect('/courses/list')}
  })
}

exports.courseUpdateGet = function(req, res){
  Course.findOne({_id: req.params.id}, (err, data)=>{
      if(err){ 
          res.send(err);
      }else{
          // link= `/students/:${data._id}/update`;
          res.render('./course/courseUpdate', {title: ' update', course: data});
      }
  })
}

exports.courseUpdatePost = function(req, res){
  Course.updateOne({_id: req.params.id}, {
      courseId: req.body.id.toUpperCase(),
      name: req.body.name,
      prerequisites: req.body.pre.toUpperCase(),
      start: req.body.start,
      end: req.body.end
  },(err, raw)=>{
      if(err){
          res.send(err);
      }else{
        res.render('./course/courseDetail', { title: 'Updated',course:{
          courseId: req.body.id.toUpperCase(),
          name: req.body.name,
          prerequisites: req.body.pre.toUpperCase(),
          start: req.body.start,
          end: req.body.end }} );
      }
  })
}