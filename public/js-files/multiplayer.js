export{initMultiPlayer, handleClickEvent};
import { togglePlayer, checkTie, checkWin, updateBoardState} from "./game.js";


function initMultiPlayer(){
    console.log("multiplayer mode started")

    function handleClickEvent(event){ //multiplayer feature 
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
            const tie = checkTie(gameState.board)
            if (win) {
                console.log(`${gameState.currentPlayer} wins!`);
                gameState.gameOver = true;  // Mark the game as over
                // Additional code to handle the end of the game can be added here
            } else if(tie) {
                console.log("game tie!");  // Only toggle the player if no win is found 
                gameState.gameOver = true;
            }
            else{
                togglePlayer();
            }
        } else{
            console.log("Cell already occupied or game over. Choose another cell.");
            console.log(gameState.board);
        }
    }

    const multiPlayerButton = document.getElementById('multiPlayerBtn');
    multiPlayerButton.disabled = true; // Disable the button
    multiPlayerButton.style.opacity = '0.6'; // Change background color to gray

    const singlePlayerButton = document.getElementById('singlePlayerBtn');
    singlePlayerButton.disabled = false;
    singlePlayerButton.style.opacity = '1.0';
}
