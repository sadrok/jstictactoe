/**
 * Tic Tac Toe Game
 *
 * This JavaScript file implements a simple Tic Tac Toe game. It includes functions for handling
 * game logic such as player turns, checking for a winner, and resetting the game.
 *
 * The game board is represented as a 3x3 grid of cells, each with a 'data-cell' attribute
 * representing its value. The players are represented as 'Naughts' and 'Crosses', and they
 * take turns clicking on the cells to mark them.
 *
 * The game checks for a winner after each turn by checking if the current player's cells match
 * any of the winning patterns. The winning patterns are represented as sums of the values of
 * the cells in the pattern.
 *
 * If a player wins, an alert is displayed and the game is reset. The game can also be reset
 * manually by clicking the reset button.
 *
 * The reason for using a bitwise AND operation to determine the winning states is efficiency and simplicity.
 *
 * In the game, each cell in the 3x3 grid is assigned a unique power of 2. This means that each possible
 * combination of cells (i.e., each possible state of the game) can be represented as a unique sum of powers of 2.
 *
 * The winning patterns are also represented as sums of powers of 2. So, to check if a player's current state
 * matches a winning pattern, we can simply perform a bitwise AND operation between the player's state and the
 * winning pattern.
 *
 * If the result of the bitwise AND operation is equal to the winning pattern, that means the player's state
 * includes all the cells in the winning pattern, and the player has won.
 *
 * This method is very efficient because it allows us to check for a win with a single bitwise AND operation,
 * regardless of the number of cells in the pattern. It's also simple because it doesn't require any loops or
 * complex logic.
 */
var naughts = 0;
var crosses = 0;
var PlayerEnum = Object.freeze({ NAUGHTS: "Naughts", CROSSES: "Crosses" });
var currentPlayer = PlayerEnum.CROSSES;

var cells = document.querySelectorAll(".tictactoe-cell");
var currentPlayerSpan = document.querySelector("#currentPlayer");
currentPlayerSpan.textContent = currentPlayer;

/**
 * Handles the click event on a cell in the game.
 *
 * @param {Event} e - The event object, automatically passed from the event listener.
 */
function onClickCell(e) {
  if (!e.target) {
    return;
  }
  if (e.target.textContent === "") {
    var cellValue = parseInt(e.target.getAttribute("data-cell"));
    if (currentPlayer === PlayerEnum.CROSSES) {
      e.target.textContent = "X";
      crosses += cellValue;
      if (checkWinner(crosses)) {
        alert("Crosses WIN!");
        reset();
      } else {
        currentPlayer = PlayerEnum.NAUGHTS;
      }
    } else if (currentPlayer === PlayerEnum.NAUGHTS) {
      e.target.textContent = "O";
      naughts += cellValue;
      if (checkWinner(naughts)) {
        alert("Naughts WIN!");
        reset();
      } else {
        currentPlayer = PlayerEnum.CROSSES;
      }
    }
    currentPlayerSpan.textContent = currentPlayer;
  }
}

// Add event listener to each cell
cells.forEach((cell) => cell.addEventListener("click", onClickCell));

/**
 * Resets the game board and the current player.
 */
function reset() {
  cells.forEach((cell) => (cell.textContent = ""));
  currentPlayer = PlayerEnum.CROSSES;
  naughts = 0;
  crosses = 0;
  currentPlayerSpan.textContent = currentPlayer;
}

// Add event listener to reset button
var resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", reset);

/**
 * Checks if the current player has a winning pattern.
 *
 * @param {Array} playerBoardState - The array representing the current state of the player's cells.
 *
 * The function checks if any of the winning patterns are present in the player's array.
 * The winning patterns are represented as sums of the values of the cells in the pattern.
 *
 * @returns {boolean} - Returns true if the player has a winning pattern, false otherwise.
 */
function checkWinner(playerBoardState) {
  const winningPatterns = [
    1 + 2 + 4, // Top row
    8 + 16 + 32, // Middle row
    64 + 128 + 256, // Bottom row
    1 + 8 + 64, // Left column
    2 + 16 + 128, // Middle column
    4 + 32 + 256, // Right column
    1 + 16 + 256, // Diagonal
    4 + 16 + 64, // Diagonal
  ];

  return winningPatterns.some((pattern) =>
    checkPattern(playerBoardState, pattern),
  );
}

/**
 * Checks if a specific pattern is present in the player's array.
 *
 * @param {Array} array - The array representing the current state of the player's cells.
 * @param {number} pattern - The pattern to check for, represented as a sum of the values of the cells in the pattern.
 *
 * The function uses bitwise AND to check if the pattern is present in the array.
 *
 * @returns {boolean} - Returns true if the pattern is present in the array, false otherwise.
 */
function checkPattern(array, pattern) {
  return (array & pattern) === pattern;
}

