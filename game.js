// felt funny to add the date query on the first line
$("#year").append(new Date().getFullYear())

// array to hold the button ids
const buttonColours = ["red", "blue", "green", "yellow"];

// automated sequence
let gamePattern = [];

// user input sequence
let userClickedPattern = [];

// levels of the game
let level = 0;

// for tracking if the game is going on
let started = false;

// button to start the game
$(".container1").after("<button id = 'startBtn'> Start </button>");
$("#startBtn").addClass("btn btn-info");

// event handler for clicking on start button
$("#startBtn").click((e) => {
  // console.log(e);
  // checking if the game has started or not
  if (!started) {
    $("#startBtn").hide();
    // if started then keep increasing the level
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

// fn to generate random sequence for the game
const nextSequence = () => {
  // emptying the user input array so that the user needs to remember the whole sequence
  userClickedPattern = [];

  //   increasing the level with every sequence generation
  level++;
  $("#level-title").text(`Level ${level}`);

  //   generating a whole random number between 0 - 3
  const randomNumber = Math.floor(Math.random() * 4);
  // console.log(randomNumber);

  //   storing the elements of the array randomly in this variable
  let randomChosenColour = buttonColours[randomNumber];
  // console.log(randomChosenColour);

  //   then pushing it to the game sequence array
  gamePattern.push(randomChosenColour);
  // console.log("This is array logging: ", gamePattern);

  //   adding sound
  sound(randomChosenColour);

  //   adding the flash effect to the buttons
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
};

// setting sounds for each button
$(".btn1").click((e) => {
  // storing the id of the button clicked on screen
  const userChosenColour = e.target.id;
  //   console.log(userChosenColour);
  //   then pushing it to the user input sequence array
  userClickedPattern.push(userChosenColour);
  //   console.log(userClickedPattern);
  //   adding sound
  sound(userChosenColour);
  //   adding flash effect
  animatePress(userChosenColour);
  // calling the fn to check for the answer
  checkAnswer(userClickedPattern.length - 1);
});

// fn to check if the user is giving the correct sequence
const checkAnswer = (currentLevel) => {
  // checking if the same index of the game sequence and the user given sequence has the same value
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("success");
    // checking if the length of the game sequence and the user given sequence has the same length
    if (userClickedPattern.length === gamePattern.length) {
      // if true then ask the for the next sequence of the game
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("wrong");
    // playing the audio for wrong input
    const wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    // adding and removing a class to the body for the red blink effect
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    // Changing the heading of the game
    $("#level-title").text("Game Over! Press the Start button");
    // calling the restart fn
    startOver();
    // revealing start button
    $("#startBtn").show();
  }
  // console.log(gamePattern[currentLevel]);
  // console.log(userClickedPattern[currentLevel]);
};

// restart fn that resets the lvl, automated sequence and the tracker
const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};

// animation for button presses
const animatePress = (currentColour) => {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

// sound setting fn
const sound = (key) => {
  //   console.log("this is sound logging: ", key);
  switch (key) {
    case "blue":
      const blueBtn = new Audio("sounds/blue.mp3");
      blueBtn.play();
      break;

    case "green":
      const greenBtn = new Audio("sounds/green.mp3");
      greenBtn.play();
      break;

    case "red":
      const redBtn = new Audio("sounds/red.mp3");
      redBtn.play();
      break;

    case "yellow":
      const yellowBtn = new Audio("sounds/yellow.mp3");
      yellowBtn.play();
      break;

    default:
      alert(`You pressed ${key} button`);
      break;
  }
};
