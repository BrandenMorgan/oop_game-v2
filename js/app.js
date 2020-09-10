/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

// Event listener for start button
const newGame = new Game();
const startButton = document.getElementById("btn__reset");
startButton.addEventListener("click", (e) => {
  newGame.startGame();
});

// Event listener for onscreen keyboard
const keys = document.getElementById("qwerty");
keys.addEventListener("click", (e) => {
  // Only allows buttons to be clicked
  if (e.target.tagName === "BUTTON") {
    newGame.handleInteraction(e);
  }
});
const phrase = document.getElementById("phrase");
document.addEventListener("keyup", (e) => {
  console.log(e.key);
  console.log(e.target);
  newGame.handleKeyUp(e);
});
