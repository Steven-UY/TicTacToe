import { updateBoardState, checkWin, checkTie, gameState, togglePlayer, cells, buttons} from './common.js';

//define the players, not sure if I should keep this could change still 
var aiPlayer = "O";
var huPlayer = "X";

//returns the index of all empty cells
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

    if (gameState.board[index] === '' && !gameState.gameOver && gameState.currentPlayer === 'X') {
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
            if (gameState.currentPlayer === 'O' && !gameState.gameOver) {
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
    if (checkWin(newBoard,huPlayer) !== null){
        return {score:-10};
    } else if (checkWin(newBoard, aiPlayer) !== null){
        return {score:10};
    }
    else if (availSpots.length === 0){
        return {score:0};
    }

    //array to collect all objects  
    var moves = [];

    //loop through available spots
    for (var i = 0; i < availSpots.length; i++){
        //create object for each and store the index of that spot
        var move = {};
        move.index = availSpots[i];

        // set the empty spot to the current player
        newBoard[availSpots[i]] = player;

        /*collect the score resulted from calling minimax
        on the opponent of the current player*/
        var result;
        if (player == aiPlayer){
            var result = minimax(newBoard, huPlayer);
            move.score = result.score;
        }
        else{
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        // reset the spot to empty
        newBoard[availSpots[i]] = '';

        // push the object to the array
        moves.push(move);
    }

    //if it's the computer's turn loop over the moves and choose the move with the highest score 
    var bestMove; 
    if(player === aiPlayer){
        var bestScore = -10000;
        for(var i = 0; i < moves.length; i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    //else loop over the moves and choose the move with the lowest score  
    } else{
        var bestScore = 10000;
        for(var i = 0; i < moves.length; i++){
            if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    // return the chosen move (object) from the moves array 
    return moves[bestMove];
}
/*
Get the index value from the object returned from minimax
 > we place the O at the gameState.board[index of object returned]
And then get the AI to place the O at the index
 */
function computerMove(){
    let move = minimax(gameState.board, gameState.currentPlayer);
    console.log(move);
    let index = move.index;
    console.log(index);
    gameState.board[index] = 'O';
    updateBoardState();
    const win = checkWin(gameState.board, gameState.currentPlayer);
    const tie = checkTie(gameState.board);
    if(win){
        gameState.gameOver = true;
    } else if(tie) {
        gameState.gameOver = true;
    } else{
        togglePlayer();
    }
}

function initSinglePlayer(){
    setupBoardSingle();
}

export {initSinglePlayer, minimax};