// NAME: Yurim Son	
// DATE: 2024-05-29
// Assignment Title: Arrays and Blocks

blockArray = [];
saveArray = [];
let currentColor = 'black';

function initialize() {
   	
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

function grid(){
	initialize();
}

window.onload = function() {
    initialize();
};

function colorChange(color){
	currentColor = color;
}

function getBrushSize() {
    return parseInt(document.getElementById('brushsize').value, 10);
}

function blockClickedEvent(y,x){
	console.log(y,x);
	const size = getBrushSize(); 
    const gridSize = 20;

    for (let i = y; i < Math.min(y + size, gridSize); i++) {
        for (let j = x; j < Math.min(x + size, gridSize); j++) {
			if (blockArray[i][j] == "white") 
			{
                blockArray[i][j] = currentColor;
            }
			//erase
			else if(currentColor == "white"){
				blockArray[i][j] = "white";
			}
        }
    }	
    drawBlockArray(); 
}

function drawBlockArray() {
	drawArray(blockArray);
}

function save(){
	saveArray = []; 
    
    for (let i = 0; i < blockArray.length; i++) {
        let copy = [];
        for (let j = 0; j < blockArray[i].length; j++) {
            copy.push(blockArray[i][j]);
        }
        saveArray.push(copy);
    }
    
    alert('save it!'); 
	
	initialize();
}

function load(){
	let isAllWhite = true;
    
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 20; x++) {
            if (saveArray[y][x] !== "white") {
                isAllWhite = false;
                break;
            }
        }
        if (!isAllWhite) {
            break; 
        }
    }
    
    if (isAllWhite) {
        alert('No data!');
    } 
	else {
        drawArray(saveArray);
        alert('Loaded!');
    }
}