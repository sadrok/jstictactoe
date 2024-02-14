# Tic-Tac-Toe Game

This is a simple, browser-based Tic-Tac-Toe game. It's implemented using HTML, CSS, and JavaScript. The game logic is written in JavaScript and the layout is designed using HTML and CSS.

## Implementation

### Game Setup

The game board is a 3x3 grid, represented by nine HTML table cells with the class `.tictactoe-cell`. Each cell is assigned a unique `data-cell` attribute, which is a power of 2 (from 1 to 256).

Two players, "Naughts" and "Crosses", take turns to play. The `currentPlayer` variable keeps track of who's turn it is. The `naughts` and `crosses` variables keep track of the cells each player has claimed.

### Event Listeners

Each cell has a click event listener. When a cell is clicked, the event listener checks if the cell is empty. If it is, it updates the cell with the current player's symbol ('X' or 'O') and updates the `naughts` or `crosses` variable with the `data-cell` value of the clicked cell.

After each turn, the `checkWinner` function is called to check if the current player has won.

### Winning Conditions

The `checkWinner` function checks if the current player's cells match any of the eight winning patterns. These patterns represent the three rows, three columns, and two diagonals of the Tic-Tac-Toe grid.

The `checkPattern` function is used to check if a player's cells match a winning pattern. It uses a bitwise AND operation to compare the player's cells with the winning pattern.

### Resetting the Game

The game can be reset by clicking the button with the id `#reset`. This triggers the `reset` function, which clears all cells and resets the game variables.

### Displaying the Current Player

The current player is displayed in the HTML element with the id `#currentPlayer`. This is updated after each turn.

2024-02-14 18:31:18

---
