import { initSinglePlayer } from "./singleplayer.js"; //import from singleplayer.js file 
import { initMultiPlayer} from "./multiplayer.js";

let currentPlayer = 'X';

export function initGame(){
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; //ternary operator(shorthand for if-else) ? is true case : false case i.e if X then O else O then X  
};

function clickCell(event){ //an event object is automatically generated to identify trigger of event
    const cell = event.target; //.target identifies which HTML elemnent triggers it  
    const span = cell.querySelector('span'); //targets span element within cell
    if (span.textContent === ''){
        if(currentPlayer === 'X'){
            span.textContent = 'X';
            span.classList.add('text-custom-yellow');
        }
        else{
            span.textContent = 'O';
            span.classList.add('text-custom-yellow');
        }
        togglePlayer();
    }
}

    document.addEventListener('DOMContentLoaded', function(){
        initSinglePlayer();
        const cells = document.querySelectorAll('#board button');//defines cells as all the possible buttons on the board 
        for (let i = 0; i < cells.length; i++) { //loop through all the possible cells
            cells[i].addEventListener('click', clickCell);
        }

        const multiplayerButton = document.getElementById('multiPlayerBtn');
        multiplayerButton.addEventListener('click', initMultiPlayer);

        const singlePlayerButton = document.getElementById('singlePlayerBtn');
        singlePlayerButton.addEventListener('click', initSinglePlayer);
    });
}


