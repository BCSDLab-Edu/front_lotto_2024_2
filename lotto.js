const resultcontent = document.querySelector('.result-content');
const gray= document.querySelector('.gray');
const resultbtn= document.querySelector('.check-button');
const closebtn= document.querySelector('.close-button');


resultbtn.onclick = function(){
    gray.style.display= "block";
    resultcontent.style.display= "block";
}

closebtn.onclick =function(){
    resultcontent.style.display= "none";
    gray.style.display= "none";
}