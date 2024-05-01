import { updateBoardState, checkWin, checkTie, gameState, togglePlayer, cells, buttons} from './common.js';

//define the players
var aiPlayer = "O";
var huPlayer = "X";

function emptyIndexes(board){
    var emptyIndexes = [];
    for (let i = 0; i < board.length; i++){
        if (board[i] === ''){
            emptyIndexes.push(i);
        }
    }
    return emptyIndexes;
}

function setupBoardSingle() {
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
        buttons[i].removeEventListener('click', handleClickEvent);
        buttons[i].addEventListener('click', handleClickEvent);
    }
    gameState.board.fill('');
    gameState.gameOver = false;
    updateBoardState();
    console.log("single board setup");
}

function handleClickEvent(event) {
    const index = Array.from(buttons).indexOf(event.target);

    if (gameState.board[index] === '' && !gameState.gameOver && gameState.currentPlayer) {
        gameState.board[index] = gameState.currentPlayer;
        updateBoardState(document.querySelectorAll('#board button span'), gameState);
        console.log(`${gameState.currentPlayer} placed at position ${index}`);
        const win = checkWin(gameState.board, gameState.currentPlayer);
        const tie = checkTie(gameState.board);
        if (win) {
            console.log(`${gameState.currentPlayer} wins!`);
            gameState.gameOver = true;
        } else if (tie) {
            console.log("Game tie!");
            gameState.gameOver = true;
        } else {
            togglePlayer();

            if (gameState.currentPlayer === 'O'){
                computerMove();
            }
        }
    } else {
        console.log("Cell already occupied or game over. Choose another cell.");
    }
}

function minimax(newBoard, player){
    //available spots determined
    var availSpots = emptyIndexes(newBoard);

    //check for terminal states i.e win, loss, tie
    //add a returning value according to state
    if (winning(newBoard,huPlayer)){
        return {score:-10};
    } else if (winning(newBoard, aiPLayer)){
        return {score:10};
    }
    else if (availSpots.length === 0){
        return {score:0};
    }

    //array to collect all objects
    var moves = [];

    //loop through available spots
    for (var i = 0; i < availSpots.length; i++){
        //create object for each object and store the index of that spot
        var move = {};
        move.index = newBoard[availSpots[i]];

        // set the empty spot to the current player
        newBoard[availSpots[i]] = player;

        /*collect the score resulted from calling minimax
        on the opponent of the current player*/
        if (player == aiPlayer){
            var result 
        }
    } 
}

function initSinglePlayer(){
    setupBoardSingle();
}

export {initSinglePlayer};