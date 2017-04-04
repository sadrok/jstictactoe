/* Setup tic-tac-toe board */
var naughts = 0;
var crosses = 0;
var PlayerEnum = Object.freeze({ NAUGHTS: "Naughts", CROSSES: "Crosses" });
var currentPlayer = PlayerEnum.CROSSES;

var cells = document.querySelectorAll('.tictactoe-cell');
var currentPlayerSpan = document.querySelector('#currentPlayer');
currentPlayerSpan.textContent = currentPlayer;

for (i = 0; i < cells.length; i++) {
    var cell = cells[i];
    cell.addEventListener('click', function(e) {
        if (this.textContent === '') {
            var cellValue = parseInt(this.getAttribute('data-cell'));
            if (currentPlayer == PlayerEnum.CROSSES) {
                this.textContent = 'X';
                crosses += cellValue;
                if (checkWinner(crosses)) {
                    alert("Crosses WIN!");
                    reset();
                } else {
                    currentPlayer = PlayerEnum.NAUGHTS;
                }
            } else if (currentPlayer == PlayerEnum.NAUGHTS) {
                this.textContent = 'O';
                naughts += cellValue;
                if (checkWinner(naughts)) {
                    alert("Naughts WIN!");
                    reset();
                } else {
                    currentPlayer = PlayerEnum.CROSSES;
                }
            }

            currentPlayerSpan.textContent = currentPlayer;
        };
    });
}

function reset() {
    for (i = 0; i < cells.length; i++) {
        var cell = cells[i];
        cell.textContent = '';
    }
    currentPlayer = PlayerEnum.CROSSES;
    naughts = 0;
    crosses = 0;
    currentPlayerSpan.textContent = currentPlayer;

};

var resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', reset);

function checkWinner(array) {
    winningPattern = 1 + 2 + 4;
    if (checkPattern(array, winningPattern)) return true;
    winningPattern = 8 + 16 + 32;
    if (checkPattern(array, winningPattern)) return true;
    winningPattern = 64 + 128 + 256;
    if (checkPattern(array, winningPattern)) return true;
    winningPattern = 1 + 8 + 64;
    if (checkPattern(array, winningPattern)) return true;
    winningPattern = 2 + 16 + 128;
    if (checkPattern(array, winningPattern)) return true;
    winningPattern = 4 + 32 + 256;
    if (checkPattern(array, winningPattern)) return true;
    winningPattern = 1 + 16 + 256;
    if (checkPattern(array, winningPattern)) return true;
    winningPattern = 4 + 16 + 64;
    if (checkPattern(array, winningPattern)) return true;

    return false;
}

function checkPattern(array, pattern) {
    return ((array & pattern) === pattern);
}