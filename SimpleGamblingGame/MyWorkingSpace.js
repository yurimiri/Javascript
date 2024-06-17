//Name: Yurim Son
//Date: 2024/04/08
//Assignment: SimpleGamblingGame

//Any variables you use in your game, should be declared here:
//$100 starting money
let currentMoney = 100;
let betMoney = 0;
let getMoney = 0;
let chooeseNumber = 0;
let randomNumber = 0;

function PlayGame() {
	//Your game logic here 
	clearAll()
	
	currentMoney = 100;
	
	alert("This mode is a simple gambling game written on the assignment document.");
	
	for(x=0;x<3;x++){
		
		betMoney = 0;
		getMoney = 0;
		
		randomNumber = getRandom(6);
		
		betMoney = prompt("choose an amount of money to bet");
		chooeseNumber = prompt("choose a number between 1 and 6");
		
		if(chooeseNumber == randomNumber){
			getMoney += betMoney * 3
			alert("You are correct! You win triple bet.");
			print("Money earned : $" + getMoney);
		}
		else{
			alert("You are not correct! Choose best Number.");
		}	
	
		currentMoney += getMoney;
	}
	print("Money finally earned : $" + currentMoney);
}
 

function PlayGame2() {
	clearAll()
	
	currentMoney = 100;
	
	alert("This is a hard mode in which some of the rules of the simple gambling game written have been changed.");
	alert("You can choose the number of times you want to play the game, and the numbers range from 1 to 10. If you guess the number, you win money mutiple three, and if you don't guess the number, you lose the money you bet. If the money you have is 0, the game automatically ends.");

	number = prompt("How many times will you play the game?");
	
	if(currentMoney == 0){
		print("You can't proceed because you don't have money.");
	}
	else{	
		for(x=0;x<number;x++){
			
			betMoney = 0;
			getMoney = 0;
			
			randomNumber = getRandom(10);
		
			betMoney = prompt("choose an amount of money to bet");
			chooeseNumber = prompt("choose a number between 1 and 10");
		
			if(chooeseNumber == randomNumber){
				getMoney += betMoney * 3
				alert("You are correct! You win triple bet.");
				print("Money earned : $" + getMoney);
				currentMoney += getMoney;
			}
			else{
				currentMoney -= betMoney;
				alert("You are not correct! Choose best Number.");
				print("lost money : $" + betMoney);
			}
		}
	}
	
	print("Money finally earned : $" + currentMoney);
	
}


//Clear working space
function ClearWorkingSpace() {
	clearAll()
}
