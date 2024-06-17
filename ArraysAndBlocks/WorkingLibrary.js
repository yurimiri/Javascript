console.log("Script loaded");

let mainLoopInterval;

function print(text1, text2, text3, text4, text5)
{
	document.getElementById('codeSpace_id').innerText = '' + print.caller;

	var element = document.getElementById("workingSpace_id");

	const functionName = print.caller.toString().split('(')[0];
	var functionDiv = document.createElement("div");
	functionDiv.innerHTML = `<em>> ${functionName} ()\n\n</em>`
	element.appendChild(functionDiv);	


	var newDiv = document.createElement("div");
	
	var combinedText = `${text1 ? text1 + ' ' : ''} ${text2 ? text2 + ' ' : ''} ${text3 ? text3 + ' ' : ''} ${text4 ? text4 + ' ' : ''} ${text5 ? text5 + ' ' : ''}`;

	// if (text2 != undefined) combinedText = text1 + " " + text2;
	
	newDiv.innerHTML = combinedText;
	newDiv.setAttribute("class", "workingText");
	element.appendChild(newDiv);	
}

function getRandom(range)
{
	// return a number between 1 and range (inclusive)
	return Math.floor( Math.random() * range) + 1;
}

function clearAll(){
	const element = document.getElementById("workingSpace_id");
	element.textContent = " ";	
	const codingSpaceDivElement = document.getElementById('codeSpace_id');
	codingSpaceDivElement.innerText = ' ';

	let errorSpace = document.getElementById("errorSpace_id");
	errorSpace.innerText = "";
	errorSpace.style['border'] = '4px rgb(144, 211, 255) dotted'
}

// Page ready event
window.addEventListener('load', function () {
	document.getElementById('pageTitle_id').innerText = document.title;
})


window.addEventListener("error", function (e) {
	let errorSpace = document.getElementById("errorSpace_id");
	errorSpace.innerText = "Your code has an error! Open the console with ctrl+f12 to view the error.";
	errorSpace.style['border'] = '6px rgb(255, 0, 0) solid'
	return false;
 })
 
 // BLOCK FUNCTIONS ===================================================================

function drawArray(inputArray){	
	
	if (inputArray === undefined) {
		inputArray = blockArray;
	}
	
	const DOMGrid = document.getElementById("workingSpace_id");
	
	//Check if argument is array
	if (!Array.isArray(inputArray)) {
		console.log("From function drawArray: error! argument is not an array!");
		return;
	}
	
	//Check that it is not empty
	if (inputArray.length == 0) {
		console.log("From function drawArray: error! array is empty!");
		return;
	}
	
	//clear
	clearAll();
	
	//if array is one-dimensional
	if (!Array.isArray(inputArray[0])){
		
		
		//Create row div
		let newRow = document.createElement("div");
		newRow.setAttribute("class", "blockRow");
		
		//Add child divs
		for (let x = 0; x < inputArray.length; x++){
			let newDiv = document.createElement("div");
			newDiv.setAttribute("class", "block");
			newDiv.setAttribute("style", "background-color: " + inputArray[x]);
			newRow.appendChild(newDiv);
		}
		DOMGrid.appendChild(newRow);
	}
		
	//if Array is two-dimensional
	if (Array.isArray(inputArray[0])){
				
		for (let y = 0; y < inputArray.length; y++){
			
			//Create row div
			let newRow = document.createElement("div");
			newRow.setAttribute("class", "blockRow");
			
			//Add child divs
			for (let x = 0; x < inputArray[y].length; x++){
				let newDiv = document.createElement("div");
				newDiv.setAttribute("class", "block");
				newDiv.setAttribute("onclick", "blockClickedEvent(" + y + "," + x + ")");
				newDiv.setAttribute("style", "background-color: " + inputArray[y][x]);
				newRow.appendChild(newDiv);
			}
			DOMGrid.appendChild(newRow);
		}
	}
	
}

//MAIN LOOP FUNCTION ===================================================================

function startMain(mainFunction, milliseconds){
	if (mainLoopInterval == undefined) mainLoopInterval = setInterval(mainFunction, milliseconds);
}

function stopMain(){
	clearInterval(mainLoopInterval);
	mainLoopInterval = undefined;
}