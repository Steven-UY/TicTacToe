export function initSinglePlayer(){
    //check in console to confirm that function is running 
    console.log("single player mode started")

    //this evaluates whether we have reached a winning condition or if the game just end in a draw  
    function evaluateBoard(board){
        const winningConditions = [
            [0, 1, 2], // Top Row
            [3, 4, 5], // Middle Row
            [6, 7, 8], // Bottom Row
            [0, 3, 6], // Left Column
            [1, 4, 7], // Center Column
            [2, 5, 8], // Right Column
            [0, 4, 8], // Diagonal from top-left to bottom-right
            [2, 4, 6], // Diagonal from top-right to bottom-left
        ];

        //This determines whether we have three in a row of x or o and if so which type?
        for (let i = 0; i < winningConditions.length; i++){ //looping through each possible winning outcome
            const[a, b, c] = winningConditions[i]; //destructuring assignment, used to unpack array into individual variables a, b, c 
            if (board[a] && board[a] === board[b] && board[a] === board[c]){ //each cell has all x or all o
                if (board[a] === 'AI'){
                    return 10; //AI wins 
                } else if (board[a] === 'Human'){
                    return -10; //Human wins
                }
            }
        }
        //this determines draw i.e if all cells are filled in by something we return 0
        if (board.every(function(cell){
            return cell !== '';
        })) {
            return 0; //Draw
        }
        return null; //Game is still in progress
    }

    function minimax(board, depth, isMaximizing){
        let score = evaluateBoard(board); //checks for terminal states(where AI would either win, lose, or draw)
        if (score !== null) return score; //if we have score is equal to a terminal state(win,lose,draw) then we return and function stops, this is the base case

        if (isMaximizing) { //isMaximizing is true so the AI will aim to maximize its score, considering all empty cells on the board 
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {  // Assuming empty cells are ''
                    board[i] = 'AI';  // AI makes a move
                    let score = minimax(board, depth + 1, false);
                    board[i] = '';  // Undo move 
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'Human';  // Human's move
                    let score = minimax(board, depth + 1, true);
                    board[i] = '';  // Undo move
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function computerMove(){
        const cells = document.querySelectorAll('#board button');
        let board = Array.from(cells, function(cell){
            return cell.querySelector('span').textContent || '';
        });
        let bestScore = -Infinity;
        let bestMove;

        board.forEach(function(cell, index){
            if (cell === ''){
                board[index] = '0';
                let score = minimax(board, 0, false);
                board[index] = '';

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = index;
                }
            }
        });
        if (bestMove !== undefined) {
            cells[bestMove].querySelector('span').textContent = '0';
            cells[bestMove].querySelector('span').classList.add('text-custom-yellow');
            togglePlayer();
        }
    }

    var cells = document.querySelectorAll('#board button');
    for (var i = 0; i < cells.length; i++){
        cells[i].addEventListener('click', function(event){
            var span = event.target.querySelector('span');
            if(span.textContent === ''){
                span.textContent = 'X';
                span.classList.add('text-custom-yellow');
                togglePlayer();
            }
        })
    }

    const singlePlayerButton = document.getElementById('singlePlayerBtn');
    singlePlayerButton.disabled = true;  // Disable the button
    singlePlayerButton.style.opacity = '0.6';  // Change background color to gray

    const multiPlayerButton = document.getElementById('multiPlayerBtn');
    multiPlayerButton.disabled = false;
    multiPlayerButton.style.opacity = '1.0';
    
    function computerMove(cells){

    }
}
