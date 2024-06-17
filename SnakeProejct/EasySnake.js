// Name: Yurim Son
// Date: 2024-06-17
// Version:
// Project: Snake Project

let CurrentLevel = 0;
let Board;
let Snake;
let Direction;
let Timer;
let Apple;
let Speed = 500;

function CreateRandomBoard(size, wallCount) {
    let board = Array(size).fill(null).map(() => Array(size).fill("."));
    
    //set wall border
    for (let i = 0; i < size; i++) {
        board[0][i] = "W";
        board[size - 1][i] = "W";
        board[i][0] = "W";
        board[i][size - 1] = "W";
    }
    
    //random wall placement
    for (let i = 0; i < wallCount; i++) {
        let x = Math.floor(Math.random() * (size - 2)) + 1;
        let y = Math.floor(Math.random() * (size - 2)) + 1;
        if (board[y][x] == ".") {
            board[y][x] = "W";
        } else {
            i--;
        }
    }
    return board;
}

function CreateApple() {
    let xRandomPos = Math.floor(Math.random() * 20);
    let yRandomPos = Math.floor(Math.random() * 20);

    while (Board[yRandomPos][xRandomPos] != ".") {
        xRandomPos = Math.floor(Math.random() * 20);
        yRandomPos = Math.floor(Math.random() * 20);
    }

    Apple = [xRandomPos, yRandomPos];
}

function DrawBoard() {
    ClearGrid();

    for (let i in Snake) {
        let xPosOfSnake = Snake[i][0];
        let yPosOfSnake = Snake[i][1];
        Board[yPosOfSnake][xPosOfSnake] = "S";
    }

    let xPosApple = Apple[0];
    let yPosApple = Apple[1];
    Board[yPosApple][xPosApple] = "A";

    for (let y = 0; y < Board.length; y++) {
        for (let x = 0; x < Board[y].length; x++) {
            if (Board[y][x] == "W") AddBlock(x, y, "wall");
            else if (Board[y][x] == ".") AddBlock(x, y, "empty");
            else if (Board[y][x] == "S") AddBlock(x, y, "snake");
            else if (Board[y][x] == "A") AddBlock(x, y, "food");
        }
    }
}

function StartGame() {
    if (Timer) {
        clearInterval(Timer);
    }
    CurrentLevel = 0;
    Speed = 500;
    document.getElementById('level').innerText = `Level: 1`;
    ResetGame();
    CreateApple();
    DrawBoard();
    Timer = setInterval(Tick, Speed);
    document.addEventListener("keydown", KeyPressed);
}

function KeyPressed(event) {
    if (event.keyCode == 38 && Direction != "down") Direction = 'up';
    if (event.keyCode == 40 && Direction != "up") Direction = 'down';
    if (event.keyCode == 37 && Direction != "right") Direction = 'left';
    if (event.keyCode == 39 && Direction != "left") Direction = 'right';
}

function MoveSnake() {
    let isGrowing = false;

    let xPosSnakeHead = Snake[Snake.length - 1][0];
    let yPosSnakeHead = Snake[Snake.length - 1][1];

    let xPosHeadNext = xPosSnakeHead;
    let yPosHeadNext = yPosSnakeHead;

    if (Direction == "right") xPosHeadNext++;
    if (Direction == "left") xPosHeadNext--;
    if (Direction == "up") yPosHeadNext--;
    if (Direction == "down") yPosHeadNext++;

    if (Board[yPosHeadNext][xPosHeadNext] == "W" || Board[yPosHeadNext][xPosHeadNext] == "S") {
        GameOver();
        return;
    }

    if (Board[yPosHeadNext][xPosHeadNext] == "A") {
        isGrowing = true;
        Board[Apple[1]][Apple[0]] = ".";
        CreateApple();
        NextLevel();
        return;
    }

    Snake.push([xPosHeadNext, yPosHeadNext]);

    if (!isGrowing) {
        let xPosSnakeTail = Snake[0][0];
        let yPosSnakeTail = Snake[0][1];
        Board[yPosSnakeTail][xPosSnakeTail] = ".";
        Snake.shift();
    }

    DrawBoard();
}

function NextLevel() {
    clearInterval(Timer);
    CurrentLevel++;
    if (CurrentLevel >= 10) {
        alert("Congratulations! You completed all levels!");
        window.location.reload(); 
        return;
    }
    Speed -= 50; // Difficulty increases with increased speed
    document.getElementById('level').innerText = `Level: ${CurrentLevel + 1}`;
    ResetGame();
    Timer = setInterval(Tick, Speed);
}

function ResetGame() {
    Snake = [
        [10, 10],
        [11, 10],
        [12, 10]
    ];
    Direction = "right";
    Board = CreateRandomBoard(20, CurrentLevel * 5); // The number of walls increases as the level increases.
}

function GameOver() {
    clearInterval(Timer);
    alert("Game Over! Starting a new game...");
    window.location.reload(); 
}

function Tick() {
    MoveSnake();
}
