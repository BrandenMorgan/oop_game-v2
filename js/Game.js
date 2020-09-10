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
   * @param {Object} e - The event object
   */
  handleInteraction(e) {
    // Disable the selected letter’s onscreen keyboard button.
    e.target.disabled = true;

    // Get current phrase
    const phrase = this.activePhrase.phrase;

    // Check if the users selection matches any character of current phrase
    if (!phrase.includes(e.target.textContent)) {
      // If not change the class styles and remove a life
      e.target.classList.add("wrong");
      this.removeLife();
      // If user guesses wrong 5 times game is over
      if (this.missed === 5) {
        this.gameOver();
      }
      /*
        If guess is correct reveal matched letter, change class
        styles and check for a win to end the game
      */
    } else {
      e.target.classList.add("chosen");
      this.activePhrase.showMatchedLetter(e);
      this.checkforWin();
      if (this.checkforWin()) {
        this.gameOver();
      }
    }
  }

  handleKeyUp(e) {
    const onScreenKeys = document.getElementsByClassName("key");
    // Get current phrase
    const phrase = this.activePhrase.phrase;
    if (!phrase.includes(e.key)) {
      // If not change the class styles and remove a life
      // e.target.classList.add("wrong");
      this.removeLife();
      for (let i = 0; i < onScreenKeys.length; i++) {
        if (!phrase.includes(onScreenKeys[i].textContent)) {
          onScreenKeys[i].classList.add("wrong");
          console.log(onScreenKeys[i]);
        }
      }

      // If user guesses wrong 5 times game is over
      if (this.missed === 5) {
        this.gameOver();
      }
    } else {
      this.activePhrase.showMatchedLetter(e);
      if (this.checkforWin()) {
        this.gameOver();
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
