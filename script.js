'use strict';

// SCORE ELEMENTS
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

// PLAYER ELEMENTS
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// CURRENT SCORE ELEMENTS
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// DICE ELEMENT
const diceEl = document.querySelector('.dice');

// BUTTON ELEMENTS
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// ATRIBUTES VARIABLE
let scores, currentScore, playing, activePlayer;

// STARTING CONDITIONS
const init = function() {
    playing = true;
    activePlayer = 0;
    currentScore = 0;
    scores = [0, 0];

    // SET SCORE TO 0
    score0El.textContent = 0;
    score1El.textContent = 0;

    // SET CURRENT SCORE TO 0
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');

    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

// CALL THE FUNCTION FOR PLAY THE GAME
init();

const switchPlayer = function() {
    currentScore = 0;

    document.getElementById(
        `current--${activePlayer}`
    ).textContent = currentScore;

    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function() {
    if (playing) {
        // 1. GENERATING A RANDOM DICE ROLL
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. DISPLAY DICE
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. CHECK FOR ROLLED 1
        if (dice !== 1) {
            // ADD DICE TO CURRENT SCORE
            currentScore += dice;

            document.getElementById(
                `current--${activePlayer}`
            ).textContent = currentScore;
        } else {
            // SWITCH TO NEXT PLAYER
            switchPlayer();
        }
    }
});

// 2. HOLD CURRENTSCORE FUNCTIONALITY
btnHold.addEventListener('click', function() {
    if (playing) {
        // 1. ADD CURRENT SCORE TO ACTIVE PLAYER'S SCORE
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // 2. CHECK IF PLAYER'S SCORE IS >= 20
        if (scores[activePlayer] >= 20) {
            // FINISH THE GAME
            playing = false;

            diceEl.classList.add('hidden');

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            // SWITCH TO THE NEXT PLAYER
            switchPlayer();
        }
    }
});

// 3. NEW GAME FUNCTIONALITY
btnNew.addEventListener('click', init);