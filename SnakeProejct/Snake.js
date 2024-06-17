// Name: Yurim Son
// Date: 2024-06-17
// Version:
// Project: Snake Project

let Board;
let Snake;
let Direction;
let Timer;
let Apple;
let Score = 0;

function InitializeGame() {
	Board = [
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

    Snake = [
        [10, 10],
        [11, 10],
        [12, 10]
    ];
	
    Direction = "right";
    Score = 0;
    CreateApple();
    DrawBoard();
    UpdateScore();
}

function CreateApple(){ 

	//Creating a random x and y positions
	let xRandomPos = Math.floor(Math.random() * 20);
	let yRandomPos = Math.floor(Math.random() * 20);
	
	//If that position falls on a non-blank space,
	//then make new random positions
	while (Board[yRandomPos][xRandomPos] != "."){
		xRandomPos = Math.floor(Math.random() * 20);
		yRandomPos = Math.floor(Math.random() * 20);
	}
	
	//Set apple position
	Apple = [xRandomPos, yRandomPos];
}

function DrawBoard()
{
	
	ClearGrid();
	
	//Add Snake to Board
	for (let i in Snake){
		let xPosOfSnake = Snake[i][0];
		let yPosOfSnake = Snake[i][1];
		Board[yPosOfSnake][xPosOfSnake] = "S";
	}
	
	//Add Apple to Board
	let xPosApple = Apple[0];
	let yPosApple = Apple[1];
	Board[yPosApple][xPosApple] = "A";

	//Draw board
	for (let y = 0; y < Board.length; y++){
		for (let x = 0; x < Board[y].length; x++){
			if (Board[y][x] == "W") AddBlock(x,y,"wall");
			else if (Board[y][x] == ".") AddBlock(x,y,"empty");
			else if (Board[y][x] == "S") AddBlock(x,y,"Snake");
			else if (Board[y][x] == "A") AddBlock(x,y,"food");
		}
	}
	
}

function StartGame(){
	clearInterval(Timer);
    InitializeGame();
	Timer = setInterval(Tick, 1000);
	document.addEventListener("keydown", KeyPressed);
}

function PauseGame() {
    if (Timer) {
        clearInterval(Timer);
        Timer = null;
    }
}

function RestartGame() {
	if (!Timer) {
        Timer = setInterval(Tick, 1000);
    }
}

//Keypressed will automatically get a event parameter
function KeyPressed(event){
	
	//event.keyCode is the code of the key that is pressed
	//console.log(event.keyCode);
	
	if (event.keyCode == 38 && Direction != "down") Direction = 'up';
	if (event.keyCode == 40 && Direction != "up") Direction = 'down';
	if (event.keyCode == 37 && Direction != "right") Direction = 'left';
	if (event.keyCode == 39 && Direction != "left") Direction = 'right';
}

function UpdateDirection(direction){
	//Set Direction
	Direction = direction;
	MoveSnake();
}

function MoveSnake(){
	let isGrowing = false;
	
	//Get x and y positions of snake head
	let xPosSnakeHead = Snake[Snake.length - 1][0];
	let yPosSnakeHead = Snake[Snake.length - 1][1];
	
	//Check for deadly collisions
	//Current position of head
	let xPosHeadNext = Snake[Snake.length -1][0];
	let yPosHeadNext = Snake[Snake.length -1][1];
	
	//Update to next position
	if (Direction == "right") xPosHeadNext++;
	if (Direction == "left") xPosHeadNext--;
	if (Direction == "up") yPosHeadNext--;
	if (Direction == "down") yPosHeadNext++;
	
	//Check if we hit a wall
	if(Board[yPosHeadNext][xPosHeadNext] == "W" 
		|| Board[yPosHeadNext][xPosHeadNext] == "S"){
		GameOver();
		alert("Game Over!");
		return null;
	}
	
	//Check if hit apple
	if(Board[yPosHeadNext][xPosHeadNext] == "A"){
		
		//Set growing to true
		isGrowing = true;
		
		//Set the apple tile to a blank space
		let appleXPos = Apple[0];
		let appleYPos = Apple[1];
		Board[appleYPos][appleXPos] = ".";
		CreateApple();
		Score++;
        UpdateScore();
		
	}
	
	//Append (add) another segment to the snake, moving right
	if (Direction == "right"){
	Snake.push([xPosSnakeHead + 1, yPosSnakeHead]);
	}
	if (Direction == "left"){
	Snake.push([xPosSnakeHead - 1, yPosSnakeHead]);
	}
	if (Direction == "up"){
	Snake.push([xPosSnakeHead, yPosSnakeHead - 1]);
	}
	if (Direction == "down"){
	Snake.push([xPosSnakeHead, yPosSnakeHead + 1]);
	}
	
	if (!isGrowing){
		//Fix the board - replace blank space
		//Get x and y positions of snake head
		let xPosSnakeTail = Snake[0][0];
		let yPosSnakeTail = Snake[0][1];
		Board[yPosSnakeTail][xPosSnakeTail] = ".";
		
		//Remove the last segment from the Snake array
		Snake.shift();
	}
	
	//Redraw Board
	DrawBoard();
}

function UpdateScore() {
    document.getElementById('score').innerText = Score;
}

function GameOver(){
	clearInterval(Timer);
}

//The main logic loop of or program
function Tick(){
	MoveSnake();
}
