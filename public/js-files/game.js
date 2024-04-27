import { initSinglePlayer } from "./singleplayer.js"; //import from singleplayer.js file 
import { initMultiPlayer} from "./multiplayer.js";
export { togglePlayer, currentPlayer, initGame };
//
let gameState = {
    board: new Array(9).fill(''),
    currentPlayer: 'X',
    gameOver: false
};

function setupBoard() {
    var cells = document.querySelectorAll('#board button span');

    // Initialize the text in each cell using a for loop
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = ''; // Clear the cell for a new game
    }

    // Setup initial state
    gameState.board.fill('');
    gameState.gameOver = false;
    updateCurrentPlayerDisplay();
}

function updateCurrentPlayerDisplay() {
    var cells = document.querySelectorAll('#board button span');
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = gameState.board[i]; // Synchronize each cell's display with the game state
    }
}

function togglePlayer() {
    if (currentPlayer === 'X'){
        console.log("player change to O")
        currentPlayer = 'O';
    } else{
        console.log("player change to X")
        currentPlayer = 'X';
    }
};

 function initGame(){
    initSinglePlayer();
    document.addEventListener('DOMContentLoaded', function(){
        const multiplayerButton = document.getElementById('multiPlayerBtn');
        multiplayerButton.addEventListener('click', initMultiPlayer); //we get the id of mt button and when we click initMultiplayer function occurs

        const singlePlayerButton = document.getElementById('singlePlayerBtn'); 
        singlePlayerButton.addEventListener('click', initSinglePlayer); //we do practically the same thing here as above but for singleplayer
    });
}


