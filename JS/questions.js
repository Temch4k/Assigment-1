// we take the last character of the id, which is the number of the question
// and then attach it to divQ to control which div q to show
function updateCountry(question) 
{
    div = "divQ"+question.charAt(question.length-1)

    var textQuestion = document.getElementById(question);
    var divQuestion = document.getElementById(div);
    if (textQuestion.value != "n") {
        divQuestion.classList.remove("invisible");
    }
    else {
        divQuestion.classList.add("invisible");
    }
}