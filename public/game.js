document.addEventListener('DOMContentLoaded', function(){
    const cells = document.querySelectorAll('#board button');//defines cells as all the possible buttons on the board 

    for (let i = 0; i < cells.length; i++) { //loop through all the possible cells
        cells[i].addEventListener('click', function() { //add an eventListener where we click and a function occurs for every cell
            const span = cells[i].querySelector('span'); //we're selecting every span in each cell
            if (span.textContent === '') { 
                span.textContent = 'X';
                span.classList.add('text-custom-yellow'); //classList method adds a styling to the class 
            }
        });
    }
});


