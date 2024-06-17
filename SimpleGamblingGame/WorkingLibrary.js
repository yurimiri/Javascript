console.log("Script loaded");

function print(text1, text2)
{
	var element = document.getElementById("workingSpace_id");
	var newDiv = document.createElement("div");
	
	var combinedText = text1;
	if (text2 != undefined) combinedText = text1 + " " + text2;
	
	newDiv.innerHTML = combinedText;
	newDiv.setAttribute("class", "workingText");
	element.appendChild(newDiv);	
}

function getRandom(range)
{
	return Math.floor( Math.random() * range) + 1;
	
}

window.addEventListener('load', function () {
	document.getElementById('pageTitle_id').innerText = document.title;
})

function clearAll(){
	const element = document.getElementById("workingSpace_id");
	element.textContent = " ";	
}
