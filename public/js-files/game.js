import { initSinglePlayer } from "./singleplayer.js"; //import from singleplayer.js file 
import { initMultiPlayer} from "./multiplayer.js";
export { togglePlayer, currentPlayer, initGame };
//
let currentPlayer = 'X';

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


