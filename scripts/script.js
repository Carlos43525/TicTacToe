const cell = document.querySelectorAll('[data-cell]'); 
const board = document.getElementById('board'); 
const restart = document.getElementById('winningMessage'); 
const winningCombinations = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
];

const xClass = 'x';
const oClass = 'circle';
let isXTurn = true;  
let currentTurn = xClass; 

startGame();

function startGame() {
    cell.forEach(element => {
        element.classList.remove('x');
        element.classList.remove('circle');
    });
    setHover();
    cell.forEach(element => {
        element.addEventListener('click', handleClick, { once: true });     
    });
};

function handleClick(e) {
    board.classList.remove(currentTurn);
    let marker = isXTurn ? xClass : oClass;
    e.target.classList.add(marker);
    if (isWinner(currentTurn)) {
        endGame(); 
    }
    changeTurns();
    setHover();
};

function changeTurns() {
    isXTurn = !isXTurn;
}

function setHover() {
    currentTurn = isXTurn ? xClass : oClass;
    board.classList.add(currentTurn);
};

function isWinner(currentTurn) {
    return winningCombinations.some(combinations => {
        return combinations.every(index => { 
            return cell[index].classList.contains(currentTurn)
        });
    });
};

function endGame() {
    restart.classList.add('show'); 
    restart.addEventListener('click', restartGame);
};

function restartGame() {
    restart.classList.remove('show'); 
    cell.forEach(element => {
        element.removeEventListener('click', handleClick);     
    });
    startGame();
}