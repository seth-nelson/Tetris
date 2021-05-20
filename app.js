// // initialize grid for game board **optional
// function createBoard() {
//     var div = document.createElement('div');
    
//     div.style.display = 'flex';
//     div.style.flexWrap = 'wrap';
//     div.style.flexDirection = 'row';
//     div.style.width = '200px';
//     div.style.height = '400px';
//     div.style.backgroundColor = 'grey';

//     document.getElelentById('grid').appendChild(div);
// }


// initialize div's for game board
function addDivs() {
    for (var i = 0; i < 200; i++) {
        var div = document.createElement('div');

    div.style.width = '18px';
    div.style.height = '18px';
    div.style.backgroundColor = 'teal';
    div.style.opacity = '50%';
    div.style.border = '1px solid black';


    document.getElementById('grid').appendChild(div);
    }
}