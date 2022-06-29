//button runs a function that begins the quiz, and starts a minute long timer - if the timer reaches zero, this quiz is forcibly ended
//the function needs to replace the text in h2 with a question, and the p tags should be replaced with possible answers
// if the correct answer is chosen, add 1 to a counter in the top right, this will be returned as a score, then go to the next question
// if the incorrect answer is chosen, do not add one to the counter, subtract 10 seconds from the clock,and go on to the next question.
// when the game is over, preompt for initials, return total score, seconds left on the timer will be added as bonus points, point that out




//defining variables for targeted elements/ids
var ques = document.querySelector("h2");
var countdown = document.querySelector("h3");
var upL = document.querySelector("#upper-left");
var upR = document.querySelector("#upper-right");
var botL = document.querySelector("#bottom-left");
var botR = document.querySelector("#bottom-right");
var reset = document.querySelector("li");

//Once the user clicks begin quiz, the below function will trigger

var quiz = function(){
    //Base quiz score, will be updated as questions are answered
    var score = 0
    //setting up quiz timer
    var time = 60;
    var timer = setInterval(function() {
        time--;
        countdown.textContent = `${time}S left`;
        if (time === 0){
            clearInterval(timer);
            quizEnd();
        }
    }, 1000);

    var ques1 = {
        question: "How long does it take for Fox's up tilt to come out?", 
        "ans1": "4 frames",
        "ans2": "5 frames",
        "ans3": "6 frames",
        "ans4": "7 frames"
    }

    var ques2 = {
        "question": "Where is Marth's fsmash the strongest?",
        "ans1": "The tip of the sword",
        "ans2": "The hilt of the sword",
        "ans3": "The middle of the sword",
        "ans4": "Behind him"
    }
    
    var ques3 = {
        "question": "What happens when JigglyPuff hits down b?", 
        "ans1":"She sings", 
        "ans2": "She instant kills most characters and goes to sleep", 
        "ans3":"She goes to sleep without doing damage",
        "ans4":"She turns green"
    }

    var ques4 = {
       "question": "What happens when Sheik hits down b?", 
        "ans1": "Sheik turns into Zelda", 
        "ans2":"Sheik causes an explosion", 
        "ans3":"Sheik turns into link", 
        "ans4": "Sheik does a forward double kick"
    }
    var ques5 = {
        "question": "How long does it take for Fox's up smash to come out?", 
        "ans1": "6 frames", 
        "ans2": "7 frames", 
        "ans3": "8 frames", 
        "ans4": "9 frames"
    }

    var iterable = [ques1, ques2, ques3, ques4, ques5]

    //puts object in question format and writes it to the page

    var questionizer = function(){
        for(i = 0; i < iterable.length; i++)
            ques.textContent = iterable[i].question;

            upL.textContent = iterable[i].ans1;

            upR.textContent = iterable[i].ans2;

            botL.textContent = iterable[i].ans3;

            botR.textContent =iterable[i].ans4 ;
            }
    
    questionizer()
     //   function userAns(){
      //      ans.push(event.target.textContent)
      //  }

      //  upL.addEventListener("click", userAns());
        //upR.addEventListener("click", userAns());
       // botL.addEventListener("click", userAns());
       // botR.addEventListener("click", userAns());
    } 
    
    

//This takes the user to the high scores page, it also ends the timer if completed within time limit
var quizEnd = function(){

}

reset.addEventListener("click", quiz)