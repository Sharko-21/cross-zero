let GAME_STATE = newGameState();

function newGameState() {
    return {
        moveOrder: getRandomInt(1, 3),
        matrix: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ],
        isOver: false
    }
}

function resetGame() {
    let cells = document.getElementsByClassName("game_cell");
    Object.keys(cells).forEach(key => cells[key].className = "game_cell");
    GAME_STATE = newGameState();
}

function nextMove(moveOrder) {
    if (moveOrder === 1)
        return 2
    return 1
}

function getClassByMove(moveOrder) {
    if (moveOrder === 1) {
        return "cross"
    }
    return "circle"
}

function getPlayerName(moveOrder) {
    if (moveOrder === 1) {
        return "Крестики"
    }
    return "Нолики"
}

function move(elem) {
    if (GAME_STATE.isOver) {
        return alert("Игра закончена!");
    }

    let line = +elem.getAttribute("index")[0];
    let cell = +elem.getAttribute("index")[1];
    if (GAME_STATE.matrix[line][cell] !== 0) {
        return alert("Ячейка уже занята!");
    }

    GAME_STATE.matrix[line][cell] = GAME_STATE.moveOrder;
    elem.classList.add(getClassByMove(GAME_STATE.moveOrder));

    if (isWin(GAME_STATE.matrix, GAME_STATE.moveOrder)) {
        GAME_STATE.isOver = true;
        return alert(`Игра закончена! Победили ${getPlayerName(GAME_STATE.moveOrder)}`)
    }
    if (isDraw(GAME_STATE.matrix)) {
        GAME_STATE.isOver = true;
        return alert(`Игра закончена! Ничья!`);
    }

    GAME_STATE.moveOrder = nextMove(GAME_STATE.moveOrder);
}

function isDraw(matrix) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
           if (matrix[i][j] === 0) {
               return false;
           }
        }
    }
    return true;
}

function isWin(matrix, player) {
    if (checkHorizontal(matrix, player)) {
        return true
    }
    if (checkVertical(matrix, player)) {
        return true
    }
    if (checkDiagonal(matrix, player)) {
        return true
    }
    return false;
}

function checkHorizontal(matrix, player) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matrix[i][j] !== player) {
                break;
            }
            if (j === 2) {
                return true;
            }
        }
    }
    return false;
}

function checkVertical(matrix, player) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matrix[j][i] !== player) {
                break;
            }
            if (j === 2) {
                return true;
            }
        }
    }
    return false;
}

function checkDiagonal(matrix, player) {
    if (matrix[0][0] === player && matrix[1][1] === player && matrix[2][2] === player) {
        return true;
    }
    if (matrix[0][2] === player && matrix[1][1] === player && matrix[2][0] === player) {
        return true;
    }
    return false;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateField() {
    GAME_STATE = newGameState();
}