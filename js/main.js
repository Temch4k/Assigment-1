function validateForm(){

    var formIsValid = true;
    var password = document.querySelector("#txtPW");
    var confirmPassword = document.querySelector("#txtPW2");
    var passwordError = document.querySelector("#passwordError")

    if(password.value != confirmPassword.value){
        formIsValid = false;
        passwordError.innerHTML = "Passwords must match."
        passwordError.classList.remove("invisible");
    }
    else{
        passwordError.innerHTML = ""
        passwordError.classList.add("invisible")
    }
    var elements = document.getElementsByTagName("input");
    var invalidChars = ['<','>','#','{','}','(',')','!','~','"',"'",''];

    for(let i = 0; i < elements.length; i++){
        for(let j = 0; j <invalidChars.length; j++){
            if(elements[i].value.indexOf(invalidChars[j]) != -1){
                elements[i].classList.add("hasError");
                formIsValid = false;
                var divInvalidChar = document.querySelector("#divInvalidCharError");
                divInvalidChar.classList.remove("invisible");
                divInvalidChar.innerHTML = "You have entered an invalid char(#, !, ~, {, }, (, ), ', ) in the form. Please remove the char and try again."
            }
        }
    }
    return formIsValid;
}