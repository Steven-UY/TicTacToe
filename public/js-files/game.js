import { initSinglePlayer } from "./singleplayer.js"; //import from singleplayer.js file 
import { initMultiPlayer} from "./multiplayer.js";
export function initGame(){

function clickBtnX(event){ //an event object is automatically generated to identify trigger of event
    const cell = event.target; //.target identifies which HTML elemnent triggers it  
    const span = cell.querySelector('span'); //targets span element within cell
    if (span.textContent === ''){
        span.textContent = 'X';
        span.classList.add('text-custom-yellow');
    }
}

    document.addEventListener('DOMContentLoaded', function(){
        initSinglePlayer();
        const cells = document.querySelectorAll('#board button');//defines cells as all the possible buttons on the board 
        for (let i = 0; i < cells.length; i++) { //loop through all the possible cells
            cells[i].addEventListener('click', clickBtnX);
        }

        const multiplayerButton = document.getElementById('multiPlayerBtn');
        multiplayerButton.addEventListener('click', initMultiPlayer);

        const singlePlayerButton = document.getElementById('singlePlayerBtn');
        singlePlayerButton.addEventListener('click', initSinglePlayer);
    });
}


