
var cells = document.querySelectorAll('#board button span');
var buttons = document.querySelectorAll('#board button');

const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [6, 4, 2]
];

let gameState = {
    board: new Array(9).fill(''),
    currentPlayer: 'X',
    gameOver: false
};

function togglePlayer(){
    if (gameState.currentPlayer === 'X'){
        console.log("player change to O")
        gameState.currentPlayer = 'O';
    } else{
        console.log("player change to X")
        gameState.currentPlayer = 'X';
    }
}

function updateBoardState() {
    var cells = document.querySelectorAll('#board button span');
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = gameState.board[i];
    }
}

//detects wins for both players since player parameter changes 
function checkWin(board, player){
    let plays = board.reduce((array, element, index) => {
        if (element === player){
            array.push(index);
        }
        return array;
    }, []);
    let gameWon = null;

    for (let [index, win] of winCombos.entries()) {
        if(win.every(elem => plays.includes(elem))) {
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function checkTie(board) {
    let gameTie = null;
    if (board.every(cell => cell !== '')) {
        gameTie = true;
    }
    return gameTie;
}

export {winCombos, updateBoardState, checkTie, checkWin, togglePlayer, gameState, cells, buttons};



