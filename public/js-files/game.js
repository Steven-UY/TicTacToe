export { togglePlayer, setupBoard, gameState, updateBoardState,  };
var cells = document.querySelectorAll('#board button span');
var buttons = document.querySelectorAll('#board button');
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
//This is a JavaScript object  
let gameState = {
    board: new Array(9).fill(''),
    currentPlayer: 'X',
    gameOver: false
};


function setupBoard() {
    // Initialize the text in each cell using a for loop
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = ''; // Clear the cell for a new game
        buttons[i].removeEventListener('click', handleClickEvent); //remove any duplicates
        buttons[i].addEventListener('click', handleClickEvent); //add event listener 
    }
    // Setup initial state
    gameState.board.fill('');
    gameState.gameOver = false;
    updateBoardState();
    console.log("board setup");
}

function checkWin(board, player) {
    let plays = board.reduce((array, element, index) => {
        if (element === player) {
            array.push(index);  // Use push instead of concat for single elements
        }
        return array;
    }, []);
    let gameWon = null;

    // Check if any of the win combos match player moves
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.includes(elem))) {  // Using includes for readability
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function checkTie(board){
    let gameTie = null;
    if (board.every(cell => cell !== '')){
        gameTie = true;
    }
    return gameTie; 
}

function togglePlayer() {
    if (gameState.currentPlayer === 'X'){
        console.log("player change to O")
        gameState.currentPlayer = 'O';
    } else{
        console.log("player change to X")
        gameState.currentPlayer = 'X';
    }
};

//synchronize the game state to the html representation 
function updateBoardState() {
    var cells = document.querySelectorAll('#board button span');
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = gameState.board[i]; // Synchronize each cell's display with the game state 
    }
}



