function validateStudent(data){
        return (1000000000<=data&&data<10000000000);
}
function validateCourse(data){
        if(data.length!==3){
                return false;
        }else if(Number.data){
                return false
        }
        return true;
}
function onChange(){     
        if(validateCourse(course.value)){
                document.querySelector('label[for="course"]').classList.remove('courseerror');
        }else{
                document.querySelector('label[for="course"]').classList.add('courseerror');
        }
        if(validateStudent(student.value)){
                document.querySelector('label[for="student"]').classList.remove('studenterror');
        }else{
                document.querySelector('label[for="student"]').classList.add('studenterror');
        }
}
function onclick(event){
        if(validateStudent(student.value) && validateCourse(course.value)){
                return;
        }else{
                event.preventDefault();
                onChange();
        }
}

const button = document.querySelector('#enAdd');
const student = document.querySelector('input[name="student"]');
const course = document.querySelector('input[name="course"]');
button.addEventListener('click', onclick);