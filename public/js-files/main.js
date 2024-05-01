//import { initSinglePlayer } from "./singleplayer.js"; //import from singleplayer.js file 
import { initMultiPlayer} from "./multiplayer.js"; //import from multiplayer.js file

function initGame(){
    document.addEventListener('DOMContentLoaded', function(){
        const multiplayerButton = document.getElementById('multiPlayerBtn');
        multiplayerButton.addEventListener('click', initMultiPlayer); //we get the id of mt button and when we click initMultiplayer function occurs

        //const singlePlayerButton = document.getElementById('singlePlayerBtn'); 
        //singlePlayerButton.addEventListener('click', initSinglePlayer); //we do practically the same thing here as above but for singleplayer
    });
}

initGame();
