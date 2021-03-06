// initialize div's for game board
function addDivs() {
    for (var i = 0; i < 200; i++) {
        var div = document.createElement('div');

        div.style.width = '20px';
        div.style.height = '20px';
        div.style.opacity = '0.85';
        div.style.borderRadius = '2.5px';
        div.style.boxShadow = '0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19)'
        
        document.querySelector('.grid').appendChild(div);
    }
}

function addDivsForSpace() {
    for (var i = 0; i < 10; i++) {
        var div = document.createElement('div');

        div.style.width = '20px';
        div.style.height = '20px';
        div.classList.add('taken');

        document.querySelector('.grid').appendChild(div);
    }
}

function miniGrid() {
    for (var i = 0; i < 16; i++) {
        var div = document.createElement('div');

        div.style.width = '20px';
        div.style.height = '20px';
        div.style.boxShadow = '0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19)'

        document.querySelector('.mini-grid').appendChild(div);
    }
}

// -----------------------------------------------------------------------------------------------------------

// this logic takes all of the divs in the model and creates an array with assigned indexes
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    // .from method allows you to make an array from elements
    let squares = Array.from(document.querySelectorAll('.grid div'))
    // width of the grid used for transitions
    const startButton = document.querySelector('.start-button')
    const scoreDisplay = document.querySelector('#score')
    const width = 10
    let timerId
    let score = 0
    const colors = [
        'indianred',
        'crimson',
        'mediumseagreen',
        'mediumpurple',
        'cornflowerblue',
        'goldenrod'
    ]

    const lShape = [
        [1, 2, width + 1, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2, width * 2 + 1],
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
    let nextRandom = 0

    // current board position start **includes the 9 total squares
    let currentPosition = 4
    let currentRotation = 0
    let current = shapes[randomShape][currentRotation]


    // draw the first shape's rotational location
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('shape')
            squares[currentPosition + index].style.backgroundColor = colors[randomShape]
        })
    }


    // removes the shape from the screen
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('shape')
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }


    // function for shape moving down the board
    // timerId = setInterval(moveDown, 1000)

    // function for keyCode shape transitions
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        } 
    }

    document.addEventListener('keydown', control)


    // moves the shape down one interval every event trigger
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freezeShape()
    }


    // moves the shape left one interval every event trigger unless it hits the wall
    function moveLeft() {
        undraw()

        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if(!isAtLeftEdge) currentPosition -= 1
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1
        }
        draw()
    }


    // moves the shape right one interval every event trigger unless it hits the wall
    function moveRight() {
        undraw()

        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        if(!isAtRightEdge) currentPosition += 1
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }
        draw()
    }


    // rotates the shape to the next available configuration
    function rotate() {
        undraw()

        currentRotation ++
        if(currentRotation === current.length) { // if the current rotation gets to 4, go back to 0
            currentRotation = 0
        }
        current = shapes[randomShape][currentRotation]
        draw()
    }


    // Checks to see if the current div's are in a square that has the classname of taken. if so, it changes the classname to taken. if not, it continues to move down.
    function freezeShape() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))

            // make a new shape at the top
            randomShape = nextRandom
            nextRandom = Math.floor(Math.random() * shapes.length);
            current = shapes[randomShape][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }


    // show the next shape to get applied to the grid on a mini grid
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0

    // all first rotations of shapes in one array
    const upNextShapes = [
        [1, 2, displayWidth + 1, displayWidth * 2 + 1], // lShape
        [displayWidth + 1, displayWidth + 2, displayWidth * 2, displayWidth * 2 + 1], // zShape 
        [1, displayWidth, displayWidth + 1, displayWidth + 2], // tShape
        [0, 1, displayWidth, displayWidth + 1], // oShape
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] // iShape
    ]


    // display the shape in the mini square
    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('shape')
            square.style.backgroundColor = ''
        })
        upNextShapes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('shape')
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        })
    }


    // add button functionality for start and stop of the interval
    startButton.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * shapes.length)
            displayShape()
        }
    })


    // add the score and delete the completed row
    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('shape')
                    squares[index].style.backgroundColor = ''
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }


    // function to stop the game
    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'Game Over'
            clearInterval(timerId)
        }
    }
})
