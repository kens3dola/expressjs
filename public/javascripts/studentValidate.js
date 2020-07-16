function validateDate(data){
        const date = new Date(data);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        if((1994<year&&year<2005)&&(0<day&&day<32)&&(0<=month&&month<=11)){
                return true
        }
        return false

}
function validateId(data){
        return (1000000000<=data&&data<10000000000);

}
function validateText(data){
        return !(/\d/.test(data))&&(data);
}
function onChange(){
        if(validateId(id.value)){
                document.querySelector('label[for="studentId"]').classList.remove('iderror');
        }else{
                document.querySelector('label[for="studentId"]').classList.add('iderror');
        }
        if(validateDate(date.value)){
                document.querySelector('label[for="dob"]').classList.remove('dateerror');
        }else{
                document.querySelector('label[for="dob"]').classList.add('dateerror');
        }
        if(validateText(fname.value)){
                fname.previousSibling.classList.remove('texterror');
        }else{
                fname.previousSibling.classList.add('texterror');
        }
        if(validateText(lname.value)){
                lname.previousSibling.classList.remove('texterror');
        }else{
                lname.previousSibling.classList.add('texterror');
        }
        if(validateText(address.value)){
                address.previousSibling.classList.remove('texterror');
        }else{
                address.previousSibling.classList.add('texterror');
        }
}


function onclick(event){
        if(validateId(id.value) &&
         validateDate(date.value) &&
          validateText(fname.value) &&
          validateText(lname.value) &&
          validateText(address.value)){
                return;
        }else{
                event.preventDefault();
                onChange();
        }
}
const fname = document.querySelector('input[name="fname"]')
const lname = document.querySelector('input[name="lname"]')
const address = document.querySelector('input[name="address"]')
const date = document.querySelector('input[type="date"]');
const id = document.querySelector('input[name="studentId"]');
const button = document.querySelector('#create');
button.addEventListener('click', onclick);