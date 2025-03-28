import { quizData } from './data.js'; 
        
let currentquestion=0;
let score=0;

function loadquestion(){
    let que=document.getElementById("question").querySelector("h1")
    que.innerHTML=quizData[currentquestion].question

    let option1=document.getElementById("label1")
    option1.innerHTML=quizData[currentquestion].a

    let option2=document.getElementById("label2")
    option2.innerHTML=quizData[currentquestion].b

    let option3=document.getElementById("label3")
    option3.innerHTML=quizData[currentquestion].c

    let option4=document.getElementById("label4")
    option4.innerHTML=quizData[currentquestion].d
}

     window.submitfn = function() {
        console.log("hey")
       let correctans=document.querySelector(`input[type="radio"]:checked`)

    if(correctans&&correctans.value==quizData[currentquestion].correct){
        // document.querySelector("").innerHTML=" ";
        document.querySelector("h1").innerHTML="right answer"
        currentquestion++;
        loadquestion();
        
        // console.log("inside submit function"+currentquestion)
        // loadquestion();
        
    }
    else
    { 
        // document.querySelector("demo").innerHTML=" ";
        document.querySelector("h1").innerHTML="wrong"
        currentquestion++;
        loadquestion();
        
    }
    }
    loadquestion();



