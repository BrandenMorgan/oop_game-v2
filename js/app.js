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
    newGame.handleInteraction(e.target);
  }
});
// find button element that contains the letter of the key that was pressed
document.addEventListener("keyup", (e) => {
  let matchedButton;
  // Get onscreen button elements
  const buttons = document.getElementsByClassName("key");

  for (let i = 0; i < buttons.length; i++) {
    /*
      If the current button elements text matches the key that was
      pressed by the user, store it to matchedButton and exit the loop
    */
    if (buttons[i].textContent === e.key) {
      matchedButton = buttons[i];
      break;
    }
  }
  if (matchedButton) {
    newGame.handleInteraction(matchedButton);
  }
});
