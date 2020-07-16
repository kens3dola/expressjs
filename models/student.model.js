const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentId: { type: Number, require: true},
    firstName: { type: String, require: true},
    lastName: { type: String, require: true},
    address: String,
    dateOfBirth: Date,
    versionKey: false
});

// Virtual for student's URL
studentSchema
.virtual('url')
.get(function () {
  return '/students/' + this._id;
});
//Virtual for student's DateOfBirth
studentSchema
.virtual('dob')
.get(function() {
  const year = this.dateOfBirth.getFullYear();
  let month;
  if(this.dateOfBirth.getMonth()<=9){
    month= '0'+(this.dateOfBirth.getMonth()+1);
  }else{
    month= this.dateOfBirth.getMonth()+1;
  } 
  let date='';
  if(this.dateOfBirth.getDate()<10){
    date= '0'+this.dateOfBirth.getDate();
  }else{
    date= this.dateOfBirth.getDate();
  }
  return year+'-'+month+'-'+date;
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;