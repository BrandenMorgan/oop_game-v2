/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

/** Class representing the game */
class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [
      new Phrase("I pity the fool"),
      new Phrase("Break a leg"),
      new Phrase("Call it a day"),
      new Phrase("A dime a dozen"),
      new Phrase("Bite the bullet"),
    ];
    this.activePhrase = null;
  }

  startGame() {
    // Reset phrase ul
    document.querySelector("ul").innerHTML = "";

    // Enable onscreen keyboard keys
    const keys = document.getElementsByClassName("key");
    for (let i = 0; i < keys.length; i++) {
      keys[i].disabled = false;
      keys[i].className = "key";
    }

    // Reset lives
    this.missed = 0;

    // Reset hearts
    const lives = document.getElementsByTagName("img");
    for (let i = 0; i < lives.length; i++) {
      lives[i].setAttribute("src", "images/liveHeart.png");
    }

    // Hide start screen to reveal phrase placeholders and onscreen keyboard
    const startScreen = document.getElementById("overlay");
    startScreen.style.display = "none";

    // Get a new active phrase and display it to the screen
    const phrase = this.getRandomPhrase();
    this.activePhrase = phrase;
    this.activePhrase.addPhraseToDisplay();
  }

  /**
   * Gets a random phrase object from phrases array
   * @return {Object} A Phrase object
   */
  getRandomPhrase() {
    const phrase = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[phrase];
  }

  /**
   * Handles a lot of game logic
   * @param {element} target - The target of the user event.
   */
  handleInteraction(target) {
    /*
      If the classList  of the button target has more than one class
      exit the method early
    */
    if (target.classList.length > 1) {
      return;
    } else {
      // Get current phrase
      const phrase = this.activePhrase.phrase;
      // Get onscreen keys
      const onScreenKeys = document.getElementsByClassName("key");

      for (let i = 0; i < onScreenKeys.length; i++) {
        /*
          Check if the target matches the onscreen key. Disable the onscreen
          key. Add styling to an onscreen key and show a letter that is
          included in the current phrase. Then check to see if all letters have
          been guessed.
         */
        if (onScreenKeys[i] === target) {
          onScreenKeys[i].disabled = true;
          onScreenKeys[i].classList.add("chosen");
          this.activePhrase.showMatchedLetter(onScreenKeys[i]);
          this.checkforWin();
          if (this.checkforWin()) {
            this.gameOver();
          }
        }
        /*
          If the current phrase does not include the targets text and
          the onscreen key matches the target add styling to the
          onscreen key indicating it was incorrect. Remove a life and
          check if there are any chances left.
        */
        if (
          !phrase.includes(target.textContent) &&
          onScreenKeys[i] === target
        ) {
          onScreenKeys[i].disabled = true;
          onScreenKeys[i].classList.add("wrong");
          this.removeLife();
          if (this.missed === 5) {
            this.gameOver();
          }
        }
      }
    }
  }

  /*
    If the phrase does not include the guessed letter,
    add the wrong CSS class to the selected letter's
    keyboard button and call the removeLife() method.
  */
  removeLife() {
    const life = document.querySelector("img[src='images/liveHeart.png']");
    life.setAttribute("src", "images/lostHeart.png");
    this.missed++;
    if (this.missed === 5) {
      this.gameOver();
    }
  }

  /**
  * Checks to see if there are any more hidden characters in the phrase
  * @return {boolean} Boolean value indicating whether the game has
  been won (true) or not (false)
  */
  checkforWin() {
    let win;
    const hiddenPhrase = document.querySelectorAll(".hide");
    if (hiddenPhrase.length === 0) {
      win = true;
    } else {
      win = false;
    }
    return win;
  }

  /*
    Shows a new screen when the game is won or lost
    Renders a message depending on the result
  */
  gameOver() {
    const startScreen = document.getElementById("overlay");
    startScreen.style.display = "block";
    const gameOverMessage = document.getElementById("game-over-message");
    gameOverMessage.classList.remove("start");
    if (this.checkforWin()) {
      gameOverMessage.classList.add("win");
      gameOverMessage.textContent = "Congratulations! You Win!";
    } else {
      gameOverMessage.classList.add("lose");
      gameOverMessage.textContent = "Oh No! You Lost!";
    }
  }
}
