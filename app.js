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

    // const zShape = [
    //     [1, 2, width + 1, width * 2 + 1],
    //     [],
    //     [],
    //     [],
    // ]

    // const tShape = [
    //     [1, 2, width + 1, width * 2 + 1],
    //     [],
    //     [],
    //     [],
    // ]

    // const oShape = [
    //     [1, 2, width + 1, width * 2 + 1],
    //     [],
    //     [],
    //     [],
    // ]

    // const iShape = [
    //     [1, 2, width + 1, width * 2 + 1],
    //     [],
    //     [],
    //     [],
    // ]


    const shapes = [lShape]

    // current board position start **includes the 9 total squares
    let currentPosition = 3
    let current = shapes[0][0]
    let randomShape = Math.floor(Math.random() * shapes.length)
    console.log(randomShape)

    // draw the first shape's rotational location
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('shape')
        })
    }

    draw()
})
