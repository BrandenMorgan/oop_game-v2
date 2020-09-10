/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

/** Class representing a phrase */
class Phrase {
  /**
   * Create a phrase
   * @param {string} phrase - The phrase itself
   */
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Adds letter placeholders to display when game starts
   * @return {element} Unordered list - The current phrase ul
   */
  addPhraseToDisplay() {
    // Select ul to append the current phrase to
    const phraseUl = document.querySelector("ul");

    // Convert the current phrase into an array
    const currentPhrase = this.phrase.split("");

    // Append an li to the phrase ul for each character of the phrase
    currentPhrase.forEach((character) => {
      const li = document.createElement("li");
      phraseUl.appendChild(li);

      /*
       If the character is not an empty string add 'hide letter' class
       and its text content
      */
      if (character !== " ") {
        li.className = `hide letter ${character}`;
        li.textContent = `${character}`;
        /*
        If it is an empty string add 'space' class and an empty string for text content
      */
      } else {
        li.className = "space";
        li.textContent = " ";
      }
    });
    return phraseUl;
  }

  /**
  * Checks to see if the letter selected by the player matches a letter in the phrase.
  * @param {Object} e - Event targets text content
  * @return {boolean} Boolean value indicating whether the text of the clicked
  target is included in the current phrase
  */
  checkLetter(e) {
    return this.phrase.contains(e.target.textContent);
  }

  /**
  * Reveals letter on the board that matches players selection
  * @param {Object} e - Compares the text content of the users selection
  against the characters in the current phrase
  */
  showMatchedLetter(e) {
    if (this.checkLetter) {
      const letters = document.querySelectorAll("ul li");
      letters.forEach((letter) => {
        if (
          letter.textContent === e.target.textContent ||
          letter.textContent === e.key
        ) {
          letter.classList.remove("hide");
          letter.className = "show";
        }
      });
    }
  }
}
