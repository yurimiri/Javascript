// Name: Yurim Son
// Date: 2024-06-17
// Version: 
// Project: Snake Project

let Board = [
    ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "W"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"]
];

let Snake = [];
let CompSnake = [];
let Direction;
let CompDirection;
let Timer;
let CompTimer;
let Apple;
let PlayerScore;
let CompScore;
let CompSpeed;

function InitializeGame() {
    Snake = [
        [10, 10],
        [11, 10],
        [12, 10]
    ];
    
    CompSnake = [
        [10, 5],
        [11, 5],
        [12, 5]
    ];
    
    Direction = "right";
    CompDirection = "right";
    PlayerScore = 0;
    CompScore = 0;
    CompSpeed = 600; 
    
    CreateApple();
    DrawBoard();
    
    clearInterval(Timer);
    clearInterval(CompTimer);
    Timer = setInterval(Tick, 600);
    CompTimer = setInterval(MoveCompSnake, CompSpeed);
    
    document.addEventListener("keydown", KeyPressed);
}

function CreateApple(){ 
    let xRandomPos = Math.floor(Math.random() * 18) + 1;
    let yRandomPos = Math.floor(Math.random() * 18) + 1;
    
    while (Board[yRandomPos][xRandomPos] != "."){
        xRandomPos = Math.floor(Math.random() * 18) + 1;
        yRandomPos = Math.floor(Math.random() * 18) + 1;
    }
    
    Apple = [xRandomPos, yRandomPos];
}

function DrawBoard() {
    ClearGrid();
    
    for (let y = 1; y < Board.length - 1; y++){
        for (let x = 1; x < Board[y].length - 1; x++){
            Board[y][x] = ".";
        }
    }

    for (let i in Snake){
        let xPosOfSnake = Snake[i][0];
        let yPosOfSnake = Snake[i][1];
        Board[yPosOfSnake][xPosOfSnake] = "S";
    }

    for (let i in CompSnake){
        let xPosOfCompSnake = CompSnake[i][0];
        let yPosOfCompSnake = CompSnake[i][1];
        Board[yPosOfCompSnake][xPosOfCompSnake] = "C";
    }
    
    let xPosApple = Apple[0];
    let yPosApple = Apple[1];
    Board[yPosApple][xPosApple] = "A";

    for (let y = 0; y < Board.length; y++){
        for (let x = 0; x < Board[y].length; x++){
            if (Board[y][x] == "W") AddBlock(x,y,"wall");
            else if (Board[y][x] == ".") AddBlock(x,y,"empty");
            else if (Board[y][x] == "S") AddBlock(x,y,"snake");
            else if (Board[y][x] == "C") AddBlock(x,y,"compSnake");
            else if (Board[y][x] == "A") AddBlock(x,y,"food");
        }
    }
    
    document.getElementById("playerScore").innerText = "Player Score: " + PlayerScore;
    document.getElementById("compScore").innerText = "Computer Score: " + CompScore;
}

function StartGame(){
    InitializeGame();
}

function KeyPressed(event){
    if (event.keyCode == 38 && Direction != "down") Direction = 'up';
    if (event.keyCode == 40 && Direction != "up") Direction = 'down';
    if (event.keyCode == 37 && Direction != "right") Direction = 'left';
    if (event.keyCode == 39 && Direction != "left") Direction = 'right';
}

function MoveSnake(){
    let isGrowing = false;
    let xPosSnakeHead = Snake[Snake.length - 1][0];
    let yPosSnakeHead = Snake[Snake.length - 1][1];
    let xPosHeadNext = xPosSnakeHead;
    let yPosHeadNext = yPosSnakeHead;

    if (Direction == "right") xPosHeadNext++;
    if (Direction == "left") xPosHeadNext--;
    if (Direction == "up") yPosHeadNext--;
    if (Direction == "down") yPosHeadNext++;
    
    if(Board[yPosHeadNext][xPosHeadNext] == "W" || Board[yPosHeadNext][xPosHeadNext] == "S" || Board[yPosHeadNext][xPosHeadNext] == "C"){
        alert("Game Over!");
        GameOver();
        return null;
    }
    
    if(Board[yPosHeadNext][xPosHeadNext] == "A"){
        isGrowing = true;
        PlayerScore += 1;
        let appleXPos = Apple[0];
        let appleYPos = Apple[1];
        Board[appleYPos][appleXPos] = ".";
        CreateApple();
        if (PlayerScore >= 10) {
            alert("Player Wins!");
            GameOver();
            return;
        }
    }
    
    Snake.push([xPosHeadNext, yPosHeadNext]);
    
    if (!isGrowing){
        let xPosSnakeTail = Snake[0][0];
        let yPosSnakeTail = Snake[0][1];
        Board[yPosSnakeTail][xPosSnakeTail] = ".";
        Snake.shift();
    }
    
    DrawBoard();
}

function MoveCompSnake(){
    let isGrowing = false;
    let xPosCompSnakeHead = CompSnake[CompSnake.length - 1][0];
    let yPosCompSnakeHead = CompSnake[CompSnake.length - 1][1];
    let xPosCompHeadNext = xPosCompSnakeHead;
    let yPosCompHeadNext = yPosCompSnakeHead;

    if (Apple[0] > xPosCompSnakeHead && Board[yPosCompSnakeHead][xPosCompSnakeHead + 1] != "W" && Board[yPosCompSnakeHead][xPosCompSnakeHead + 1] != "S" && Board[yPosCompSnakeHead][xPosCompSnakeHead + 1] != "C") CompDirection = "right";
    else if (Apple[0] < xPosCompSnakeHead && Board[yPosCompSnakeHead][xPosCompSnakeHead - 1] != "W" && Board[yPosCompSnakeHead][xPosCompSnakeHead - 1] != "S" && Board[yPosCompSnakeHead][xPosCompSnakeHead - 1] != "C") CompDirection = "left";
    else if (Apple[1] > yPosCompSnakeHead && Board[yPosCompSnakeHead + 1][xPosCompSnakeHead] != "W" && Board[yPosCompSnakeHead + 1][xPosCompSnakeHead] != "S" && Board[yPosCompSnakeHead + 1][xPosCompSnakeHead] != "C") CompDirection = "down";
    else if (Apple[1] < yPosCompSnakeHead && Board[yPosCompSnakeHead - 1][xPosCompSnakeHead] != "W" && Board[yPosCompSnakeHead - 1][xPosCompSnakeHead] != "S" && Board[yPosCompSnakeHead - 1][xPosCompSnakeHead] != "C") CompDirection = "up";

    if (CompDirection == "right") xPosCompHeadNext++;
    if (CompDirection == "left") xPosCompHeadNext--;
    if (CompDirection == "up") yPosCompHeadNext--;
    if (CompDirection == "down") yPosCompHeadNext++;
    
    if(Board[yPosCompHeadNext][xPosCompHeadNext] == "W" || Board[yPosCompHeadNext][xPosCompHeadNext] == "S" || Board[yPosCompHeadNext][xPosCompHeadNext] == "C"){
        alert("Game Over!");
        GameOver();
        return null;
    }
    
    if(Board[yPosCompHeadNext][xPosCompHeadNext] == "A"){
        isGrowing = true;
        CompScore += 1;
        let appleXPos = Apple[0];
        let appleYPos = Apple[1];
        Board[appleYPos][appleXPos] = ".";
        CreateApple();
        CompSpeed = Math.max(100, CompSpeed - 20); 
        clearInterval(CompTimer);
        CompTimer = setInterval(MoveCompSnake, CompSpeed);
        if (CompScore >= 10) {
            alert("Computer Wins!");
            GameOver();
            return;
        }
    }
    
    CompSnake.push([xPosCompHeadNext, yPosCompHeadNext]);
    
    if (!isGrowing){
        let xPosCompSnakeTail = CompSnake[0][0];
        let yPosCompSnakeTail = CompSnake[0][1];
        Board[yPosCompSnakeTail][xPosCompSnakeTail] = ".";
        CompSnake.shift();
    }
    
    DrawBoard();
}

function GameOver(){
    clearInterval(Timer);
    clearInterval(CompTimer);
    alert("Game Over!");
    document.removeEventListener("keydown", KeyPressed);
}

function Tick(){
    MoveSnake();
}

InitializeGame();
