const snakeBox = document.querySelector('.snake-box');
let score = document.getElementById('score');
let win = document.querySelector("h2");
let reset = document.getElementById('reset');
console.log(reset);
let squares = [];
let snakie = [3, 2, 1];
let direction = 1;
let appleIndex;
let snakeSpeed = 500;
const width = 20;

function createSnakeBox() {

    for (let i = 0; i < 400; i++) {
        const snakeFood = document.createElement("div");
        snakeFood.classList.add("square");
        snakeBox.appendChild(snakeFood);
        squares.push(snakeFood);
    }
}

createSnakeBox();



snakie.forEach(index => squares[index].classList.add('snake'));



function move() {

    if (snakie[0] + width > width * width && direction == width ||
        snakie[0] - 10 < 0 && direction == -width ||
        snakie[0] % width == 0 && direction == -1 ||
        (snakie[0] + 1) % width == 0 && direction == 1 ||
        (squares[snakie[0] + direction].classList.contains('snake'))) {
        win.textContent = "HAHA!YOU LOST!"
        reset.style.display = "inline";
        return clearInterval(timerId);
    }

    const tail = snakie.pop();
    squares[tail].classList.remove('snake');
    snakie.unshift(snakie[0] + direction);

    if (squares[snakie[0]].classList.contains('apple')) {
        snakie.push(tail);
        squares[tail].classList.add("snake");
        squares[snakie[0]].classList.remove('apple');
        score.textContent = score.textContent - 1;
        if (score.textContent == 0) {
            score.textContent = "DAMN! YOU WON!"
        }
        generateApple();
        clearInterval(timerId);
        snakeSpeed = snakeSpeed * 0.8;
        timerId = setInterval(move, snakeSpeed);
    }

    squares[snakie[0]].classList.add('snake');
}



let timerId = setInterval(move, snakeSpeed);



window.addEventListener('keydown', function(e) {
    if (e.key == 'ArrowRight') {
        if (!(direction == -1))
            direction = 1;
    } else if (e.key == 'ArrowLeft') {
        if (!(direction == 1))
            direction = -1;
    } else if (e.key == 'ArrowUp') {
        if (!(direction == width))
            direction = -width;
    } else if (e.key == 'ArrowDown') {
        if (!(direction == -width))
            direction = width;

    }
});


function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * 400);
    } while (squares[appleIndex].classList.contains('snake'));

    squares[appleIndex].classList.add('apple');
}

generateApple();

reset.addEventListener("click", () => {
    window.location.reload();
});