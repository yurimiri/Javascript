// NAME: Yurim Son	
// DATE: 2024-05-29
// Assignment Title: Arrays and Blocks

//Global variable that stores the grid
//Each element is a string representing a color, like "red" or "blue"
//This can be a nested array
let blockArray = [];

//This sets up our grid
function start(){
	//TODO: change this to setup the grid you want
	
	//Reset block array variable
	blockArray = [];
	
	//Add a red block
	blockArray.push("red");
	
	//Draw the block array
	drawBlockArray(blockArray);

}

//Adds a block to the array
function addBlockToArray(){
	//TODO: add a block to the array and draw the array
	
	blockArray.push("red");
	
	drawBlockArray();
}

//Add a block of random color
function addRandomColorBlocktoArray() {
	//TODO: add a block(s) of a random color to the array
	
	const randomNumber = Math.floor(Math.random() * 3) + 1;
	
	if (randomNumber == 1) {
        blockArray.push("red");
    } 
	else if (randomNumber == 2) {
        blockArray.push("yellow");
    } 
	else if (randomNumber == 3) {
        blockArray.push("blue");
    }
	
	drawBlockArray();
}

function createNestedArray() {
	//TODO: Make the blockArray a 20 by 20 nested array
	blockArray = [];
	
    for (let y = 0; y < 20; y++) {
        let row = [];
        for (let x = 0; x < 20; x++) {
            row.push("white");
        }
        blockArray.push(row);
    }
	
	drawBlockArray(blockArray);
}

//Call this function to draw the blockArray
function drawBlockArray() {
	drawArray(blockArray);
}


//Will trigger when user clicks a block, and returns block position in array
//Will only work with nested, two-dimensional arrays!
function blockClickedEvent(x,y){
	console.log(x,y);
	
	changeBlockColor(x, y, 'red');
}

function changeBlockColor(x, y, color) {
    blockArray[x][y] = color;
	
	drawBlockArray();
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

//Main Loop - This loop will be run every 100 milliseconds (every 0.1 second)
//We can start and stop it by clicking the buttons on the html page
function MainLoop()
{
	console.log('Main loop running');
	
	//TODO: Make the blockArray grid do something interesting here
	let color;
	
	createNestedArray();
	
	const x = parseInt(getRandom(20)); 
    const y = parseInt(getRandom(20)); 

    const randomNumber = getRandom(3) + 1;
    
    if (randomNumber == 1) {
        color = "red";
    } else if (randomNumber == 2) {
        color = "yellow";
    } else if (randomNumber == 3) {
        color = "blue";
    }

    changeBlockColor(x, y, color);
}

//Simple Idea
function checkIfAllFilled() {
    for (let row of blockArray) {
        if (row.includes("white")) {
            return false;
        }
    }
    return true;
}

function create() {
    if (blockArray.length == 0) {
        for (let y = 0; y < 20; y++) {
            let row = [];
            for (let x = 0; x < 20; x++) {
                row.push("white");
            }
            blockArray.push(row);
        }
    }
    drawBlockArray();
}

function Start()
{
	console.log('Main loop running');
	
	let color;
	
	let x = parseInt(getRandom(20)); 
    let y = parseInt(getRandom(20)); 
	
    while(blockArray[x][y] !== "white") 
	{
        x = parseInt(getRandom(20)); 
        y = parseInt(getRandom(20)); 
    } 

    const randomNumber = getRandom(3) + 1;
    
    if (randomNumber == 1) {
        color = "red";
    } else if (randomNumber == 2) {
        color = "yellow";
    } else if (randomNumber == 3) {
        color = "blue";
    }

    changeBlockColor(x, y, color);
	
	if (checkIfAllFilled()) {
        clearInterval(interval);
    }
}

function simpleidea(){
	create();
	interval = setInterval(Start, 100);
}

