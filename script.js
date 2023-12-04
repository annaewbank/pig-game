'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
// Both of the above are ways to access an element using its ID
// getElementById is supposed to be a little bit faster
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Reusable functions
const init = function () {
  // Reset scores
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true; // Is the game in process

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Hide dice
  diceEl.classList.add('hidden');

  // Remove winner class
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // Reset active player as player 0
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

// Reset conditions
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  // Toggle adds the class if it isn't there, and removes it if it is there
};

// User rolls the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice roll
    diceEl.src = `./images/dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    // 3. Check if it's a 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Hold the current score
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      // Disable the buttons
      playing = false; // Buttons functions above will no longer work

      // Add winning player style
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      // Remove active player style
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // Hide dice
      diceEl.classList.add('hidden');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// User resets the game
btnNew.addEventListener('click', init);
