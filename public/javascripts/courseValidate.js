function validateDate(data){
        const date = new Date(data);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        if((1994<year&&year<2019)&&(0<day&&day<32)&&(0<=month&&month<=11)){
                return true
        }
        return false

}
function validateId(data){
        if(data.length!==3){
                return false;
        }else if(Number(data)){
                return false
        }
        return true;

}
function compareDate(date1, date2){
        if(date1<date2){
                return true;
        }
        return false;
}
function onChange(){
        if(validateId(id.value)){
                id.previousSibling.classList.remove('iderror');
        }else{
                id.previousSibling.classList.add('iderror');
        }
        if(validateId(pre.value)){
                pre.previousSibling.classList.remove('iderror');
        }else{
                pre.previousSibling.classList.add('iderror');
        }
        if(validateDate(start.value)){
                start.previousSibling.classList.remove('dateerror');
        }else{
                start.previousSibling.classList.add('dateerror');
        }
        if(validateDate(end.value)){
                end.previousSibling.classList.remove('dateerror');
        }else{
                end.previousSibling.classList.add('dateerror');
        }
        if(validateText(name.value)){
                name.previousSibling.classList.remove('texterror');
        }else{
                name.previousSibling.classList.add('texterror');
        }
        if(!compareDate(start.value, end.value)){
                alert('Wrong time')
        }
}
function validateText(data){
        return !(/\d/.test(data))&&(data);
}

function onclick(event){
        
        if(validateId(id.value) &&
        validateText(name.value) &&
         validateDate(start.value)&&
         validateId(pre.value) &&
          validateDate(end.value) &&
          compareDate(start.value, end.value)){
                  return
        }else{
                event.preventDefault();
                onChange();
        }
}
const name = document.querySelector('input[name="name"]');
const start = document.querySelector('input[name="start"]');
const end = document.querySelector('input[name="end"]');
const id = document.querySelector('input[name="id"]');
const pre = document.querySelector('input[name="pre"]');
const button = document.querySelector('#submit');
button.addEventListener('click', onclick);