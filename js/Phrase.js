/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  // Add letter placeholders to display when game starts
  addPhraseToDisplay() {
    const currentPhrase = this.phrase.split("");
    const phraseUl = document.querySelector("ul");

    currentPhrase.forEach((character) => {
      const li = document.createElement("li");
      phraseUl.appendChild(li);
      if (character !== " ") {
        li.className = `hide letter ${character}`;
        li.textContent = `${character}`;
      } else {
        li.className = "space";
        li.textContent = " ";
      }
    });
    return phraseUl;
  }

  // Checks to see if the letter selected by the player matches a letter in the phrase.
  checkLetter(e) {
    return this.phrase.contains(e.target.textContent);
  }

  // Reveals letter on the board that matches players selection
  showMatchedLetter(e) {
    if (this.checkLetter) {
      const letters = document.querySelectorAll("ul li");
      letters.forEach((letter) => {
        if (letter.textContent === e.target.textContent) {
          letter.classList.remove("hide");
          letter.className = "show";
        }
      });
    }
  }
}
