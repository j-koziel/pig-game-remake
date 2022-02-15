// importing modules
import 'core-js/stable';
import 'regenerator-runtime/runtime.js';

// variables
let currentScore, scores, playing, activePlayer;

currentScore = 0;
scores = [0, 0];
playing = true;
activePlayer = 0;

// Selecting elements
const diceEl = document.querySelector('.dice');
const player1El = document.querySelector(`.player--0`);
const player2El = document.querySelector(`.player--1`);
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

// Resetting the game
function newGame() {
  // State Variables
  currentScore = 0;
  scores = [0, 0];
  playing = true;
  activePlayer = 0;

  // Resetting all elements
  diceEl.classList.add('hidden');
  score0.textContent = 0;
  score1.textContent = 0;
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
}
newGame();

// Helper functions

// Switches the player once the hold button is pressed or the current player rolls a 1
function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
}

// Gives the player who won some styling for the user to be able to distinguish that they have won
function playerWon() {
  if (scores[activePlayer] >= 100) {
    // Set the state to false as the game has finished
    playing = false;

    // Checking for which player won
    activePlayer === 0
      ? player1El.classList.add('player--winner')
      : player2El.classList.add('player--winner');
    // If the player did not win, it is the next player's turn
  } else {
    switchPlayer();
  }
}

// Main Functionality
function diceRoll() {
  if (playing) {
    // Unhide dice
    diceEl.classList.remove('hidden');
    // Generate the dice roll
    const diceNum = Math.trunc(Math.random() * 6) + 1;

    // Display the dice roll
    diceEl.src = `./dice-${diceNum}.png`;

    // Check for a 1
    if (diceNum === 1) switchPlayer();
    else {
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
}

// Holds the score for the current player
function holdScore() {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if the player had won
    playerWon();
  }
}

// Event Handling
btnRoll.addEventListener('click', diceRoll);

btnHold.addEventListener('click', holdScore);

btnNewGame.addEventListener('click', newGame);
