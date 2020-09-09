/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
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
    const startScreen = document.getElementById("overlay");
    startScreen.style.display = "none";
    const phrase = this.getRandomPhrase();
    this.activePhrase = phrase;
    this.activePhrase.addPhraseToDisplay();
  }
  getRandomPhrase() {
    const phrase = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[phrase];
  }
  handleInteraction(e) {
    // Disable the selected letter’s onscreen keyboard button.
    e.target.disabled = true;
    const phrase = this.activePhrase.phrase;
    if (!phrase.includes(e.target.textContent)) {
      e.target.classList.add("wrong");
      this.removeLife();
      if (this.missed >= 5) {
        this.gameOver();
      }
    } else {
      e.target.classList.add("chosen");
      this.activePhrase.showMatchedLetter(e);
      this.checkforWin();
      if (this.checkforWin()) {
        this.gameOver();
      }
    }

    /*
      If the phrase does not include the guessed letter,
      add the wrong CSS class to the selected letter's keyboard button and call the removeLife() method.
    */
  }
  removeLife() {
    const life = document.querySelector("img[src='images/liveHeart.png']");
    life.setAttribute("src", "images/lostHeart.png");
    this.missed++;
    if (this.missed === 5) {
      this.gameOver();
    }
  }
  checkforWin() {
    let win = false;
    const phrase = document.querySelectorAll("ul li");
    phrase.forEach((character) => {
      if (!character.className.startsWith("hide")) {
        win = true;
      } else {
        win = false;
      }
    });
    return win;
  }
  gameOver() {
    const startScreen = document.getElementById("overlay");
    startScreen.style.display = "block";
    const gameOverMessage = document.getElementById("game-over-message");
    gameOverMessage.classList.remove("start");
    if (this.checkforWin()) {
      gameOverMessage.classList.add("win");
      gameOverMessage.textContent = "You Win!";
    } else {
      gameOverMessage.classList.add("lose");
      gameOverMessage.textContent = "You Lose!";
    }
  }
}
