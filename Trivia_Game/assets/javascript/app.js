

var questions = [{
    question: "Name the largest freshwater lake in the world?",
    choices: ["Lake Malawi", "Great Slave Lake", "Lake Superior", "Great Bear Lake"],
    correctAnswer: 2
}, {
    question: "Where would you find the Sea of Tranquility?",
    choices: ["India", "The Moon", "Mars", "New Jersey"],
    correctAnswer: 1
}, {
    question: "What kind of weapon is a falchion?",
    choices: ["Sword", "Dagger", "Whip", "Knife"],
    correctAnswer: 0
}, {
    question: "What is the seventh planet from the sun?",
    choices: ["Mars", "Moon", "Plueto", "Uranus"],
    correctAnswer: 3
    }, {
    question: "What does the term 'piano' mean??",
    choices: ["Gentle On Keys", "To Play Softly", "Music Of The Fingers", "Touch Of Class"],
    correctAnswer: 1
}, {
    question: "What is the diameter of Earth?",
    choices: ["10,123mi", "8,000mi", "9,250mi", "12,500mi"],
    correctAnswer: 1
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayQues();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayQues();
                } else {
                    displayScore();
                   
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayQues();
            hideScore();
        }
    });
});


// This displays the current question AND the choices
function displayQues() {

    

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}


