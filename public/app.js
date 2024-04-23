
const cells = document.querySelectorAll('#board button');
//selects all button elements that are children of ID board

cells.forEach(function(cell) { //iterates over each cell in cells, cells is defined above   
    cell.addEventListener('click', function() {//adds an event listener to current button 'cell'
        const span = cell.querySelector('span');
        if (span.textContent === '') {
            span.textContent = 'X';  // Add 'X' to the clicked cell
            span.classList.add('text-custom-yellow'); // Optionally add a class for styling
        }
    });
});


