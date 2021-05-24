// initialize div's for game board
function addDivs() {
    for (var i = 0; i < 200; i++) {
        var div = document.createElement('div');

    div.style.width = '18px';
    div.style.height = '18px';
    div.style.opacity = '0.75';
    div.style.border = '1px solid black';

    document.querySelector('.grid').appendChild(div);
    }
}

function addDivsForSpace() {
    for (var i = 0; i < 10; i++) {
        var div = document.createElement('div');

    div.style.width = '18px';
    div.style.height = '18px';
    // div.style.opacity = '0.75';
    // div.style.border = '1px solid black';
    div.classList.add('taken');

    document.querySelector('.grid').appendChild(div);
    }
}


// this logic takes all of the divs in the model and creates an array with assigned indexes
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('grid')
    // .from method allows you to make an array from elements
    let squares = Array.from(document.querySelectorAll('.grid div'))
    // width of the grid used for transitions
    const width = 10
    console.log(squares)

    const lShape = [
        [1, 2, width + 1, width * 2 + 1],
        [width, width + 1, width + 2],
        [1, width + 1, width * 2 + 1],
        [0, width, width + 1, width + 2],
    ]

    const zShape = [
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [1, 2, width, width + 1],
        [1, width + 1, width + 2, width * 2 + 2],
    ]

    const tShape = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1],
    ]

    const oShape = [
        [0, 1, width, width + 1],
        [1, 2, width + 1, width + 2],
        [width + 1, width + 2, width * 2 + 1, width * 2 + 2],
        [width, width + 1, width * 2, width * 2 + 1],
    ]

    const iShape = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [2, width + 2, width * 2 + 2, width * 3 + 2],
        [width * 2, width * 2 + 1, width * 2 + 2, width * 2 + 3],
    ]


    const shapes = [lShape, zShape, tShape, oShape, iShape]

    // creates a random instance between the shapes that exist in the array
    let randomShape = Math.floor(Math.random() * shapes.length)
    // console.log(randomShape)

    let currentRotation = 0
    // current board position start **includes the 9 total squares
    let currentPosition = 3
    let current = shapes[randomShape][0]

    // draw the first shape's rotational location
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('shape')
        })
    }

    // removes the shape from the screen
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('shape')
        })
    }

    timerId = setInterval(moveDown, 1000)

    // moves the shape down every specified interval
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freezeShape()
    }

    // Checks to see if the current div's are in a square that has the classname of taken. if so, it changes the classname to taken. if not, it continues to move down.
    function freezeShape() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))

            // make a new shape at the top
            random = Math.floor(Math.random() * shapes.length);
            current = shapes[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }


})
