export function initSinglePlayer(){
    console.log("single player mode started")

    const singlePlayerButton = document.getElementById('singlePlayerBtn');
    singlePlayerButton.disabled = true;  // Disable the button
    singlePlayerButton.style.opacity = '0.6';  // Change background color to gray

    const multiPlayerButton = document.getElementById('multiPlayerBtn');
    multiPlayerButton.disabled = false;
    multiPlayerButton.style.opacity = '1.0';
}
