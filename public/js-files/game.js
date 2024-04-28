import { initSinglePlayer } from "./singleplayer.js"; //import from singleplayer.js file 
import { initMultiPlayer} from "./multiplayer.js";
//export { togglePlayer, initGame, setupBoard, gameState, updateBoardState };
export {initGame};
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

function checkWin(board, player){
    let plays = board.reduce((array ,element, index) =>{
        if (element === player){
            array = array.concat(index);
        }
        return array;
    }, []);
    let gameWon = null;
    //Here we check if any of the win combos match player moves
    for (let [index, win] of winCombos.entries()){
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            console.log("game won!");
            break; 
        }
    }
    return gameWon;
}

function checkLoss(){

}

function checkTie(){

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

function handleClickEvent(event){
    //find index of clicked button
    const index = Array.from(buttons).indexOf(event.target);

    if (gameState.board[index] === '' && !gameState.gameOver && gameState.currentPlayer === 'X'){
        gameState.board[index] = 'X';
        updateBoardState();
        console.log("X placed at position", index);
        console.log(gameState.board);
        //togglePlayer();
        checkWin(gameState.board, gameState.currentPlayer);
    } else{
        console.log("choose another cell");
        console.log(gameState.board);
    }
}

//synchronize the game state to the html representation 
function updateBoardState() {
    var cells = document.querySelectorAll('#board button span');
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = gameState.board[i]; // Synchronize each cell's display with the game state
    }
}


 function initGame(){
    setupBoard();
    document.addEventListener('DOMContentLoaded', function(){
        const multiplayerButton = document.getElementById('multiPlayerBtn');
        multiplayerButton.addEventListener('click', initMultiPlayer); //we get the id of mt button and when we click initMultiplayer function occurs

        const singlePlayerButton = document.getElementById('singlePlayerBtn'); 
        singlePlayerButton.addEventListener('click', initSinglePlayer); //we do practically the same thing here as above but for singleplayer
    });
}



