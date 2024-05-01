

export function initSinglePlayer(){
    console.log("singleplayer mode started")

    const multiPlayerButton = document.getElementById('multiPlayerBtn');
    multiPlayerButton.disabled = true; // Disable the button
    multiPlayerButton.style.opacity = '0.6'; // Change background color to gray

    //This does the same thing practically
    const singlePlayerButton = document.getElementById('singlePlayerBtn');
    singlePlayerButton.disabled = false;
    singlePlayerButton.style.opacity = '1.0';
}
