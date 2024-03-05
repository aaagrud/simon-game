var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];

var level = 0;
var started = false;

$(document).keydown(function () {
    if (!started) {
        nextSequence();
        $("h1").text("Level " + level);
        started = true;
    }
});

$(".btn").on('click', function () {
    var userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userPattern.length - 1);
});

function nextSequence() {
    userPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColours[randomNumber];
    gamePattern.push(randomColor);
    animatePress(randomColor);
    playSound(randomColor);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (gamePattern.length === userPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
