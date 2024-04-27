import { togglePlayer, currentPlayer } from "./game.js";

export function initSinglePlayer(){
    //check in console to confirm that function is running 
    console.log("single player mode started")

    //this evaluates whether we have reached a winning condition or if the game just end in a draw  
    function evaluateBoard(board) {
        const winningConditions = [
            [0, 1, 2], // Top Row
            [3, 4, 5], // Middle Row
            [6, 7, 8], // Bottom Row
            [0, 3, 6], // Left Column
            [1, 4, 7], // Center Column
            [2, 5, 8], // Right Column
            [0, 4, 8], // Diagonal from top-left to bottom-right
            [2, 4, 6]  // Diagonal from top-right to bottom-left
        ];
    
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                if (board[a] === 'X') {
                    return 10; // AI wins
                } else if (board[a] === 'O') {
                    return -10; // Human wins
                }
            }
        }
    
        // Check for a draw - if all cells are filled and no winner
        if (board.every(function(cell) { return cell !== ''; })) {
            console.log("this is a draw")
            return 0; // Draw
        }

        return null; // Game is still in progress
    }

    evaluateBoard();

//minimax figures out what the most efficient next move is 
    function minimax(board, depth, isMaximizing){
        let score = evaluateBoard(board); //checks for terminal states(where AI would either win, lose, or draw)
        if (score !== null) return score; //if we have score is equal to a terminal state(win,lose,draw) then we return and function stops, this is the base case

        if (isMaximizing) { //isMaximizing is true so the AI will aim to maximize its score, considering all empty cells on the board 
            let bestScore = -Infinity; //set this to be an impossibly low value so that it has to be overwritten in Math.max()
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {  // Assuming empty cells are ''
                    board[i] = 'O';  // AI tries out a specific move given board 
                    let score = minimax(board, depth + 1, false); //evaluates what the best move for human is, depth + 1 indicates progression further in game state
                    board[i] = '';  // undo move to backtrack and explore other scenarios 
                    bestScore = Math.max(score, bestScore);//compares the score of this move to the previous move that has the maximum points and picks the larger one to be bestScore
                }
            }
            return bestScore;
            //else block to act as if you were human 
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'X';  // human tries out specific move 
                    let score = minimax(board, depth + 1, true); //plays like what the AI would do(in theory)
                    board[i] = '';  // undo move to backtrack to explore other scenarios
                    bestScore = Math.min(score, bestScore);//compares the score of this move to the previous move that has the minimum points and picks the smaller one to be bestScore
                }
            }
            return bestScore;
        }
    }

    //computer goes through the actions of actually making the move here
    
    function computerMove(){
        const cells = document.querySelectorAll('#board button'); //Selects all the button elements within the board 
        let board = Array.from(cells, function(cell){ //Array.from() method creates a new, shallow-copied array instance from an array-like or iterable object, we perform function(cell) on each cell in array 
            return cell.querySelector('span').textContent || ''; //this gets all nested 'span' element in the button, texContent(returns X or O) or just an empty cell
        });
        let bestScore = -Infinity; //ensures that the first score evaluated will become the best score  
        let bestMove; //define a variable called bestMove 

        //This goes through every possible move we can make 
        for (let index = 0; index < board.length; index++){
            if (board[index] === ''){ //represents a cell where a move can be made
                board[index] = 'O'; //simulate making the move 
                let score = minimax(board, 0, false); //we call the minimax function, it will return what the best move will be, going down from  
                board[index] = ''; //undo the move  

                if(score > bestScore){
                    bestScore = score;
                    bestMove = index;//index refers to the best cell in the grid 
                }
            }
        }
        //This block finishes the action of placing the O on the board 
        if (bestMove !== undefined) { //undefined would be in the case that all cells have been filled up 
            cells[bestMove].querySelector('span').textContent = 'O';
            cells[bestMove].querySelector('span').classList.add('text-custom-yellow');
            togglePlayer();
        }
    }
  
    //the player picks what cell they want to select they are X 
    var cells = document.querySelectorAll('#board button');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', function(event) {
        if (currentPlayer === 'X') {
            var span = event.target.querySelector('span');
            if (span.textContent === '') {
                span.textContent = 'X';
                span.classList.add('text-custom-yellow');
                togglePlayer();
                if (currentPlayer === 'O'){
                    setTimeout(computerMove, 100);
                }
            }
        }
    });
}

    //button functionalities 
    const singlePlayerButton = document.getElementById('singlePlayerBtn');
    singlePlayerButton.disabled = true;  // Disable the button
    singlePlayerButton.style.opacity = '0.6';  // Change background color to gray

    const multiPlayerButton = document.getElementById('multiPlayerBtn');
    multiPlayerButton.disabled = false;
    multiPlayerButton.style.opacity = '1.0';

} 
