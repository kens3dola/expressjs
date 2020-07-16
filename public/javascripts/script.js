function validateCourse(data){
        if(data.length!==3){
                return false;
        }else if(Number(data)){
                return false
        }
        return true;
}
function validateStudent(data) {
        return (1000000000 <= data && data < 10000000000);
      }
var err = 'a';
function validate(data){
        if(!data){
                err =  'error';
                return false;
        }else if(document.querySelector('input[type=number]')){
                err = 'studenterror';
                return validateStudent(data);
        }else{
                err = 'courseerror'
                return validateCourse(data);
        }
}
function onSubmitClick(event) {
        if(!validate(input.value)&&!validate(select.value)){
                validate(input.value);
                event.preventDefault();
                label.classList.add(err);
        }
}
const input = document.querySelector('input')
const label = document.querySelector('label')
const span = document.querySelector('span')
const select = document.querySelector('select')
const button = document.querySelector('.rp-button')
button.addEventListener('click', onSubmitClick)