var startButton = document.querySelector('#startBtn');
var displayTimer = document.querySelector('#timer');
var viewHighscore = document.querySelector('#highscore');
var startContainer = document.querySelector('.quizStart');
var questionsContainer = document.querySelector('#questionContainer');
var question = document.querySelector('#question');
var choices = document.querySelectorAll('.btn-text');
var gameOverContainer = document.querySelector('#quizEnd');
var formContainer = document.querySelector('#formContainer');
var gameOverHeading = document.querySelector('#quizEndHeading');
var gameOverParagraph = document.querySelector('#quizEndScore');
var gameOverInitial = document.querySelector('#initialName');
var gameOverSubmit = document.querySelector('#subBtn');
var highscoreContainer = document.querySelector('#highscoreSection');
var highscoreHeading = document.querySelector('#highscoresHeading');
var highscoreTable = document.querySelector('.highscoreList');
var highscoreReset = document.querySelector('#highscoreReset');
var highscoreClear = document.querySelector('#highscoreClear');


startButton.addEventListener('click', startQuiz);
gameOverSubmit.addEventListener('click', submitInitial);
highscoreReset.addEventListener('click', restart);
highscoreClear.addEventListener('click', clearHighscore);
viewHighscore.addEventListener('click', showHighScore);


var timer = 40;
var questionCounter = 0;
var highscoreCounter = 0;
var score = 0;
var currQuestion = {};
var highscoreList = {};

//Questions with the choice options and the correct answer identified.
var questions = [
    {
        question: 'How do you create a function in Javascript?',
        choices: ['strings', 'booleans', 'alerts', 'numbers'],
        answer: 'alerts'
    },
    {
        question: 'Which of the following is not a type of loop in Javascript?',
        choices: ['for', 'while', 'if', 'for/of'],
        answer: 'if'
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        answer: 'console.log'
    },
    {
        question: 'What is DOM',
        choices: ['Document Object Model', 'Donut Object Modal', 'shore loops', 'console.log'],
        answer: 'Document Object Model'
    },
    {
        question: 'How do you properly call a function?',
        choices: ['function.()', 'function{}', 'function()', 'function({})'],
        answer: 'function()'
    },
    
];

//This function runs when the start buttons is clicked. Resets the question and score counter. Sets the timer to 40 seconds. Adds and remove the hide class and runs two other functions. Which is the timer function and the generate questions function.
function startQuiz() {
    questionCounter = 0;
    score = 0;
    timer = 40;
    startContainer.classList.add('hide');
    questionsContainer.classList.remove('hide');
    viewHighscore.classList.add('hide');
    timerCountdown();
    generateQuestions();
}

//This function generates the question when its the button is clicked and its called for
function generateQuestions() {
    //If statement to check if the question counter is equal to 5. Then it knows its at the end of the questions and it runs the gamer over function.
    if (questionCounter === 5) {
        timer = 0;
        return gameOver();
    }
    //This is where you display the questions and each time you display a question the question counter goes up by one. The if statment check that if the length of question bank is greater then question counter then it will continute running.
    if (questions.length > questionCounter) {
        currQuestion = questions[questionCounter];
        question.innerHTML = currQuestion.question;
        questionCounter++;
    }

    //Loops through 4 times and sets the innertext of each button to be the different choices in the object array. 
    for (var i = 0; i < 4; i++) {
        var choicesLister = choices[i];
        choicesLister.innerHTML = currQuestion.choices[i];
    }
}

//For loop that runs through the document query selector all of choices and adds an event listerner to each choice button that listens for a click and runs the submit answer function
for (var i = 0; i < choices.length; i++) {
    choices[i].addEventListener('click', submitAnswer);
}

//This function runs when a choice is clicked and check if the answer is correct or wrong
function submitAnswer(e) {
    //When you click the button it grabs the event which is itself then target within the event and then the innerHTML that is within the target and gives you a string back
    var userSubmittedAnswer = e.target.innerHTML;
    //Grabs the currQuestion answer 
    var answer = currQuestion.answer;

    //Conditional logic if the answers equal each other then the score goes up by one and moves on to the next question. If not then take ten seconds off the timer and move on to the next question.
    if (userSubmittedAnswer === answer) {
        console.log('correct answer');
        generateQuestions();
        score++;
    } else {
        console.log('incorrect answer');
        generateQuestions();
        timer -= 10;
    }
}

//This runs the game over function that shows the score screen and has a input field where you can submit your initials to the highscore screen
function gameOver() {
    gameOverContainer.classList.remove('hide');
    formContainer.classList.remove('hide');
    questionsContainer.classList.add('hide');
    gameOverHeading.innerHTML = "Game is over!"
    gameOverParagraph.innerHTML = "Your final score is " + score;
    if(timer === -1){

    }
}

//Function that sets item in the local storage as a string.
function submitInitial(e) {
    e.preventDefault();
    var nickname = [{
        name: gameOverInitial.value,
        score: score
    }];
    localStorage.setItem("nickName", JSON.stringify(nickname));
    highScore();
}

//Runs the show highscore fucntion when you click the button and shows the highscore page
function showHighScore(){
    highscoreContainer.classList.remove('hide');
    gameOverContainer.classList.add('hide');
    formContainer.classList.add('hide');
    startContainer.classList.add('hide');
    viewHighscore.classList.add('hide');
}

//Runs the highscore function where it hides the containers needed to and goes in local storage and gets the item called nickName but also parses it so it comes back as an object. Runs a for loop that creates a p tag which is appended to the highscore title and points and displays the names the user submitted and his score.
function highScore() {
    highscoreContainer.classList.remove('hide');
    gameOverContainer.classList.add('hide');
    formContainer.classList.add('hide');
    startContainer.classList.add('hide');
    viewHighscore.classList.add('hide');

    if (localStorage.getItem('nickName')) {

        var highscoreGetItem = JSON.parse(localStorage.getItem('nickName'));    

        for (var i = 0; i < highscoreGetItem.length; i++) {
            highscoreList = highscoreGetItem[highscoreCounter];
            highscoreGetItem.splice(highscoreCounter, 1);
            var highscoreName = highscoreList.name;
            var highscoreScore = highscoreList.score;
            var highscoreTitle = document.createElement('p');
            var highscorePoints = document.createElement('p');
            highscoreTitle.classList.add('#highscoreName');
            highscorePoints.classList.add('#highscoreScore');
            highscoreTitle.textContent = highscoreName;
            highscorePoints.textContent = highscoreScore;
            highscoreTable.append(highscoreTitle);
            highscoreTable.append(highscorePoints);

        }
    }
}

//Clear the highscore table and clears the local storage 
function clearHighscore(){
    highscoreTable.innerHTML = '';
    localStorage.clear();
}

//restarts the game When you click the go back button on the highscore screen it 
function restart() {
    highscoreContainer.classList.add('hide');
    startContainer.classList.remove('hide');
    viewHighscore.classList.remove('hide');
}

//Timer function to run when you click start game and it conintues to countdown until it hits the zero mark or if you answer through all the questions.
function timerCountdown() {
    var gameOverCheck = gameOverContainer.classList[0];
    var timeInterval = setInterval(function () {
        timer--;
        displayTimer.textContent = 'Time left: ' + timer;
        if (timer <= 0) {
            clearInterval(timeInterval)
            console.log('It went to the countdown');
            displayTimer.textContent = 'Time left: ' + 0;
            if (gameOverCheck === 'hide') {
                gameOver();
            } else {
                console.log('Game over Screen is already active');
            }
        }
    }, 1000)
}