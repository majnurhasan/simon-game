var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keypress(function (event) {
  if (level == 0) {
    nextSequence();
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
  }
});

$(".btn").click(function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);
  if (level != 0) {
    checkAnswer(userClickedPattern.length - 1);
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);

  level += 1;
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var btnMusic = new Audio("sounds/" + name + ".mp3");
  btnMusic.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  var checkCounter = 0;
  for (i = 0; i <= currentLevel; i++) {
    if (gamePattern[i] == userClickedPattern[i]) {
      checkCounter += 1;
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }
  if (checkCounter == level) {
    console.log("correct!");
    setTimeout(() => {
      nextSequence();
    }, 500);
    userClickedPattern = [];
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
