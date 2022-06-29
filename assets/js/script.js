//button runs a function that begins the quiz, and starts a minute long timer - if the timer reaches zero, this quiz is forcibly ended
//the function needs to replace the text in h2 with a question, and the p tags should be replaced with possible answers
// if the correct answer is chosen, return a boolean matching the keys, and save it as a plus 1 to the score variable if true
// if the incorrect answer is chosen, do not add one to the counter, subtract 10 seconds from the clock,and go on to the next question.
// when the game is over, preompt for initials, return total score, and the time at which the function ended -> save this to local storage along with initials, and display it on the page

//defining variables for targeted elements/ids
var ques = document.querySelector("h2");
var countdown = document.querySelector("h3");
var upL = document.querySelector("#upper-left");
var upR = document.querySelector("#upper-right");
var botL = document.querySelector("#bottom-left");
var botR = document.querySelector("#bottom-right");
var reset = document.querySelector("li");
var score = 0
var index = 0;
var time = 60;

var ques1 = {
    "question": "How long does it take for Fox's up tilt to come out?",
    "corAns": "5 frames",
    "ans1": "4 frames",
    "ans2": "5 frames",
    "ans3": "6 frames",
    "ans4": "7 frames"
}

var ques2 = {
    "question": "Where is Marth's fsmash the strongest?",
    "corAns": "The tip of the sword",
    "ans1": "The tip of the sword",
    "ans2": "The hilt of the sword",
    "ans3": "The middle of the sword",
    "ans4": "Behind him"
}

var ques3 = {
    "question": "What happens when JigglyPuff hits down b?",
    "corAns": "She instant kills most characters and goes to sleep",
    "ans1": "She sings",
    "ans2": "She instant kills most characters and goes to sleep",
    "ans3": "She goes to sleep without doing damage",
    "ans4": "She turns green"
}

var ques4 = {
    "question": "What happens when Sheik hits down b?",
    "corAns": "Sheik turns into Zelda",
    "ans1": "Sheik turns into Zelda",
    "ans2": "Sheik causes an explosion",
    "ans3": "Sheik turns into link",
    "ans4": "Sheik does a forward double kick"
}

var ques5 = {
    "question": "How long does it take for Fox's up smash to come out?",
    "corAns": "7 frames",
    "ans1": "6 frames",
    "ans2": "7 frames",
    "ans3": "8 frames",
    "ans4": "9 frames"
}

//Once the user clicks begin quiz, the below function will trigger

var quiz = function () {
    //Base quiz score, will be updated as questions are answered
    //setting up quiz timer
    var timer = setInterval(function () {
        time--;
        countdown.textContent = `${time} seconds left`;
        if (time === 0) {
            clearInterval(timer);
            quizEnd();
        }
    }, 1000);

    var iterable = [ques1, ques2, ques3, ques4, ques5]

    //puts object in question format and writes it to the page


    //test to check if for loop is cause of bug
    var initQ = function (index) {
        ques.textContent = iterable[index].question;

        upL.textContent = iterable[index].ans1;

        upR.textContent = iterable[index].ans2;

        botL.textContent = iterable[index].ans3;

        botR.textContent = iterable[index].ans4;
    }

    initQ(0)

    function ansCheck(event) {
        var userChoice = event.target.textContent;
        console.log(userChoice)
        if (iterable[index].corAns === userChoice) {
            score++;
            index++;
            if (index === 5) {
                quizEnd();
            } else {
                initQ(index);
            }
        }
        else {
            index++;
            if (index === 5) {
                quizEnd();
            } else {
                initQ(index);
            }
        };
    }

    //event listeners wait for click and run a function that evaluates whether the chosen option is correct or not
    upL.addEventListener("click", function (event) {
        ansCheck(event)
    });

    upR.addEventListener("click", function (event) {
        ansCheck(event)
    });

    botL.addEventListener("click", function (event) {
        ansCheck(event)
    });

    botR.addEventListener("click", function (event) {
        ansCheck(event)
    });

}

//This takes the user to the high scores page, it also ends the timer if completed within time limit
var quizEnd = function () {
    localStorage.setItem("initials", prompt("Please type your initials"))
    localStorage.setItem("time left", time)
    localStorage.setItem("score", score)
    clearInterval(time)
    time=60;
    score=0;
    index=0;
}

reset.addEventListener("click", quiz)