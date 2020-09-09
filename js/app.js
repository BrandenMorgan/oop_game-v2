/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
// const game = new Game();
// console.log(game.getRandomPhrase());

// add event listener for start button
const newGame = new Game();
const startButton = document.getElementById("btn__reset");
startButton.addEventListener("click", (e) => {
  newGame.startGame();
});

const keys = document.getElementById("qwerty");
keys.addEventListener("click", (e) => {
  if (e.target.className !== "keyrow") {
    newGame.handleInteraction(e);
  }
});
