var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var courseSchema = new Schema(
  {
    courseId:{ type: String, require: true},
    name: {type: String, required: true},
    start: {type: Date},
    end: {type: Date},
    prerequisites: { type: String}
  }
);

courseSchema
.virtual('startBrief')
.get(function() {
  const year = this.start.getFullYear();
  let month;
  if(this.start.getMonth()<=9){
    month= '0'+(this.start.getMonth()+1);
  }else{
    month= this.start.getMonth()+1;
  } 
  let date='';
  if(this.start.getDate()<10){
    date= '0'+this.start.getDate();
  }else{
    date= this.start.getDate();
  }
  return year+'-'+month+'-'+date;
})

courseSchema
.virtual('endBrief')
.get(function() {
  const year = this.end.getFullYear();
  let month;
  if(this.end.getMonth()<=9){
    month= '0'+(this.end.getMonth()+1);
  }else{
    month= this.end.getMonth()+1;
  } 
  let date='';
  if(this.end.getDate()<10){
    date= '0'+this.end.getDate();
  }else{
    date= this.end.getDate();
  }
  return year+'-'+month+'-'+date;
})

// Virtual for course's URL
courseSchema
.virtual('url')
.get(function () {
  return '/courses/' + this._id;
});

//Export model
module.exports = mongoose.model('Course', courseSchema);
