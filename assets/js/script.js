//defining variables for targeted elements/ids
var ques = document.querySelector("h2");
var countdown = document.querySelector("h3");
var upL = document.querySelector("#upper-left");
var upR = document.querySelector("#upper-right");
var botL = document.querySelector("#bottom-left");
var botR = document.querySelector("#bottom-right");
var table = document.querySelector("table")
var reset = document.querySelector("li");
if (JSON.parse(localStorage.getItem("scores")) !== null) {
    var savedScores = [JSON.parse(localStorage.getItem("scores"))]
} else {
    var savedScores = []
};
var score;
var index;
var time;

var ques1 = {
    "question": "How long does it take for Fox's up tilt to come out?",
    "corAns": "5 frames",
    "ans1": "4 frames",
    "ans2": "5 frames",
    "ans3": "6 frames",
    "ans4": "7 frames",
};

var ques2 = {
    "question": "Where is Marth's fsmash the strongest?",
    "corAns": "The tip of the sword",
    "ans1": "The tip of the sword",
    "ans2": "The hilt of the sword",
    "ans3": "The middle of the sword",
    "ans4": "Behind him",
};

var ques3 = {
    "question": "What happens when JigglyPuff hits down b?",
    "corAns": "She instant kills most characters and goes to sleep",
    "ans1": "She sings",
    "ans2": "She instant kills most characters and goes to sleep",
    "ans3": "She goes to sleep without doing damage",
    "ans4": "She turns green",
};

var ques4 = {
    "question": "What happens when Sheik hits down b?",
    "corAns": "Sheik turns into Zelda",
    "ans1": "Sheik turns into Zelda",
    "ans2": "Sheik causes an explosion",
    "ans3": "Sheik turns into link",
    "ans4": "Sheik does a forward double kick",
};

var ques5 = {
    "question": "How long does it take for Fox's up smash to come out?",
    "corAns": "7 frames",
    "ans1": "6 frames",
    "ans2": "7 frames",
    "ans3": "8 frames",
    "ans4": "9 frames",
};

//Once the user clicks begin quiz, the below function will trigger

var quiz = function () {
    event.stopPropagation;
    reset.textContent = "Reset Quiz"
    //setting up quiz timer
    time = 60;
    score = 0;
    index = 0;
    var interval = setInterval(function () {
        if (time > 0) {
            time--;
            countdown.textContent = `${time} seconds left`;
        }
        if (time === 0) {
            clearInterval(interval);
            quizEnd();
        }
    }, 1000);

    //adding one to index to display next question object in the array
    var iterable = [ques1, ques2, ques3, ques4, ques5];

    //puts object in question format and writes it to the page
    var initQ = function (index) {
        ques.textContent = iterable[index].question;

        upL.textContent = iterable[index].ans1;

        upR.textContent = iterable[index].ans2;

        botL.textContent = iterable[index].ans3;

        botR.textContent = iterable[index].ans4;
    }

    initQ(0);

    //updates scores and questions on answer click, checks if the quiz is finished
    function ansCheck(event) {
        event.stopPropagation()
        var userChoice = event.target.textContent;

        console.log(userChoice);
        if (iterable[index].corAns === userChoice) {
            score++;
            index++;
            if (index === 5) {
                quizEnd();
            }
            else {
                initQ(index);
            };
        }
        else {
            index++;
            if (index === 5) {
                quizEnd();
            }
            else {
                time -= 10;
                initQ(index);
            };
        };
    };

    //event listeners wait for click and run a function that evaluates whether the chosen option is correct or not (ansCheck)
    upL.addEventListener("click", function (event) {
        event.stopPropagation()
        ansCheck(event);
    });

    upR.addEventListener("click", function (event) {
        event.stopPropagation()
        ansCheck(event);
    });

    botL.addEventListener("click", function (event) {
        event.stopPropagation()
        ansCheck(event);
    });

    botR.addEventListener("click", function (event) {
        event.stopPropagation()
        ansCheck(event);
    });

    //ends the game function and rewrites the content of the quiz. if the user is mid quiz, the interval, score, and index are reset.
    var quizEnd = function () {
        event.stopPropagation()
        countdown.textContent = "Check the highscores below!";
        reset.textContent = "Begin Quiz";
        upL.textContent = "?";
        upR.textContent = "?";
        botL.textContent = "?";
        botR.textContent = "?";

        var initialsPrompt = prompt("Please type your initials, if you'd like to remain anonymous, please press ok without input");

        //limits the amount of characters input for initials to 3 (first, last, middle)
        var initials = initialsPrompt.split('');

        var initJoin = undefined;
        if (initials.length > 2) {
            var initCut = initials.splice(0, 3);
            initJoin = initCut.join('')
        } else {
            initJoin = initials.join('')
        }

        console.log(initJoin)

        //object to be saved to array and stored in browser
        var scoreObj = {
            pInitials: initJoin,
            timeLeft: time,
            endScore: score,
        };

        //pushes the object into a globally defined array, sorts the saved scoreObj by score value, and saves the array to local storage as a string. The high score board is also limited to 10 scores.
        savedScores.push(scoreObj);

        savedScores.splice(10);

        localStorage.setItem("scores", JSON.stringify(savedScores));

        //if the user tries to restart the quiz, score, question, and interval will reset and force the player to take the quiz from scratch
        score = 0;
        index = 0;
        time = 0;

        location.reload();  
    };
};

//this function displays high scores, by creating table rows and data cells, then adding the text from saved/parsed score object in the savedScores array.
function showHighScore() {
    for (i = 0; i < savedScores.length; i++) {
        //creates tr and td tags
        function tCells() {
            if (JSON.parse(localStorage.getItem("scores")) !== null) {

                savedScores = []
                savedScores = (JSON.parse(localStorage.getItem("scores")));
                savedScores.sort((a, b) => b.endScore - a.endScore);

                var row = document.createElement("tr");
                table.append(row);

                var initCell = document.createElement("td");
                initCell.textContent = savedScores[i].pInitials;
                row.append(initCell);

                var timeCell = document.createElement("td")
                timeCell.textContent = savedScores[i].timeLeft;
                row.append(timeCell);

                var scoreCell = document.createElement("td")
                scoreCell.textContent = savedScores[i].endScore;
                row.append(scoreCell);
            }
        }
        tCells();
    };
};

showHighScore();
reset.addEventListener("click", function restart(){
    event.stopPropagation();
    if(reset.textContent === "Begin Quiz"){
        quiz();
    }else{location.reload();}
})