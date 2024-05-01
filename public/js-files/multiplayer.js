import { updateBoardState, checkWin, checkTie, gameState, togglePlayer, cells, buttons} from './common.js';

function setupBoardMulti() {
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
        buttons[i].removeEventListener('click', handleClickEvent);
        buttons[i].addEventListener('click', handleClickEvent);
    }
    gameState.board.fill('');
    gameState.gameOver = false;
    updateBoardState();
    console.log("multi board setup");
}

function handleClickEvent(event) {
    const index = Array.from(buttons).indexOf(event.target);

    if (gameState.board[index] === '' && !gameState.gameOver) {
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
        }
    } else {
        console.log("Cell already occupied or game over. Choose another cell.");
    }
}

export function initMultiPlayer() {
    setupBoardMulti();
}
