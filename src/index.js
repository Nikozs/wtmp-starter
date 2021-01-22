const min = 0;
const max = 100;
const maxQuessCount = 20;

let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

const GuessesCountField = document.querySelector(".GuessesCount");
const TimeSpentField = document.querySelector(".TimeSpent");

let GameStarted = new Date();

myTimer = setInterval(() => {
  let nowitis = new Date();
  let ero = Math.round((nowitis.getTime() - GameStarted.getTime()) / 1000);
  TimeSpentField.textContent = "Elapsed time " + ero + " seconds.";
}, 1000);

let guessCount = 1;

let resetButton;
guessField.focus();

checkGuess = () => {
  let userGuess = Number(guessField.value);
  let nowitis = new Date();
  let ero = Math.round((nowitis.getTime() - GameStarted.getTime()) / 1000);
  TimeSpentField.textContent = "Elapsed time " + ero + " seconds.";

  if (guessCount === 1) {
    guesses.textContent = "Previous guesses: ";
  }
  guesses.textContent += userGuess + " ";

  if (userGuess === randomNumber) {
    lastResult.textContent = "Congratulations! You got it right!";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver();
    TimeSpentField.textContent = "Time spent " + ero + " seconds";
  } else if (guessCount === 10) {
    lastResult.textContent = "!!!GAME OVER!!!";
    setGameOver();
    TimeSpentField.textContent = "Time spent " + ero + " seconds";
  } else {
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "Last guess was too low!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Last guess was too high!";
    }
  }

  GuessesCountField.textContent = "Guesses:" + guessCount;

  guessCount++;

  guessField.value = "";
  guessField.focus();
};

guessSubmit.addEventListener("click", checkGuess);

setGameOver = () => {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement("button");
  resetButton.textContent = "Start new game";
  document.body.append(resetButton);
  resetButton.addEventListener("click", resetGame);
  clearTimeout(myTimer);
};

resetGame = () => {
  GameStarted = new Date();
  TimeSpentField.textContent = "Elapsed time " + 1 + " seconds.";
  myTimer = setInterval(() => {
    let nowitis = new Date();
    let ero = Math.round((nowitis.getTime() - GameStarted.getTime()) / 1000);
    TimeSpentField.textContent = "Elapsed time " + ero + " seconds.";
  }, 1000);
  GuessesCountField.textContent = "";
  guessCount = 1;

  const resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  lastResult.style.backgroundColor = "white";
  randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
};
