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
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

function newGame() {
  diceEl.classList.add('hidden');
  currentScore = 0;
  scores = [0, 0];
  playing = true;
  activePlayer = 0;
}

newGame();

// Helper functions
function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
}

// Main Functionality
function diceRoll() {
  if (playing) {
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

function holdScore() {}

// Event Handling
btnRoll.addEventListener('click', diceRoll);

btnHold.addEventListener('click', holdScore);

btnNewGame.addEventListener('click', newGame);
