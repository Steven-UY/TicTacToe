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
            console.log(`Player ${player} wins!`);
            gameState.gameOver = true;
            break;
        }
    }
    return gameWon;
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
    // Find the index of the clicked button
    const index = Array.from(buttons).indexOf(event.target);

    // Check if the selected cell is empty, the game is not over, and it's the current player's turn
    if (gameState.board[index] === '' && !gameState.gameOver){
        gameState.board[index] = gameState.currentPlayer;  // Place the current player's marker
        updateBoardState();
        console.log(`${gameState.currentPlayer} placed at position`, index);
        console.log(gameState.board);
        
        // Check for a win after placing the marker
        const win = checkWin(gameState.board, gameState.currentPlayer);
        if (win) {
            console.log(`${gameState.currentPlayer} wins!`);
            gameState.gameOver = true;  // Mark the game as over
            // Additional code to handle the end of the game can be added here
        } else {
            togglePlayer();  // Only toggle the player if no win is found
        }
    } else{
        console.log("Cell already occupied or game over. Choose another cell.");
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



