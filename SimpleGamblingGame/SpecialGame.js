//Name: Yurim Son
//Date: 2024/04/08
//Assignment: SimpleGamblingGame

// https://velog.io/@sypear/JavaScript-%EB%AF%B8%EB%8B%88%EA%B2%8C%EC%9E%84-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B0%80%EC%9C%84%EB%B0%94%EC%9C%84%EB%B3%B4

let speed = 300;
let playerScore = 0;
let pcScore = 0;

let timer = 0;
let lastPcSelection = "";
let pcSelection = "";

// 기본 값 세팅 및 가위바위보 게임 자동 시작
const playerLifeItem = document.getElementById("player-life");
const pcImage = document.getElementById("pc-image");

window.onload = function() {
	alert("This game is rock-paper-scissors. If you win by matching the randomly displayed pictures on the screen, you can get 10 points. No points are awarded for a draw. The game restarts every 2 seconds.");
	
    timer = setInterval(changePcSelection, speed);

    playerScoreItem.innerText = playerScore;
    pcScoreItem.innerText = pcScore;
}

function changePcSelection() {
    // 생성된 난수를 PC의 선택 값으로 설정
    // 이전 값과 동일하지 않은 경우에만 PC가 선택하도록 구현
    while (true) {
        pcSelection = getRandom();

        if (pcSelection !== lastPcSelection) {
            lastPcSelection = pcSelection; // 다음 순서에 비교값으로 사용하기 위하여 저장
            break;
        }
    }

    // 화면 이미지 변경
    switch (pcSelection) {
        case 0:
            pcImage.src = "scissors.png";
            pcImage.alt = "컴퓨터 선택: 가위";
            break;

        case 1:
            pcImage.src = "rock.png";
            pcImage.alt = "컴퓨터 선택: 바위";
            break;

        case 2:
            pcImage.src = "paper.png";
            pcImage.alt = "컴퓨터 선택: 보";
            break;

        default:
    }
}

// 난수 생성 함수
function getRandom() {
    return parseInt(Math.random() * 3); // (max - min) + min : max는 3, min은 0
}

// 사용자가 가위 바위 보 버튼 클릭 시 결과 출력 및 점수 추가
const buttonWrapper = document.getElementsByClassName("game__button-wrapper")[0];
const scissorsButton = document.getElementById("scissors-button");
const rockButton = document.getElementById("rock-button");
const papersButton = document.getElementById("paper-button");

buttonWrapper.addEventListener("click", function(e) {
    let playerSelection = "";

    // 사용자가 선택한 버튼에 따라 사용자 선택 값 설정
    if (e.target === scissorsButton) {
        playerSelection = 0;
    } else if (e.target === rockButton) {
        playerSelection = 1;
    } else if (e.target === papersButton) {
        playerSelection = 2;
    } else {
        return;
    }

    rockPaperSissors(playerSelection);
});

// 가위 바위 보 메인 계산 함수
function rockPaperSissors(playerSelection) {
    // Interval 정지
    clearInterval(timer);

    // 대진 결과 판단 (사용자 패 : 0, 무 : 1, 사용자 승 : 2)
    let result = checkMatchResult(playerSelection, pcSelection);

    // 대진 결과 화면에 출력
    showMatchResult(result, playerSelection, pcSelection);

    // 2초 뒤에 게임 재시작
    restartGameTime();
}

// 대진 결과를 판단하는 함수 (가위 : 0, 바위 : 1, 보 : 2)
function checkMatchResult(player, pc) {
    let result = player - pc;

    if (result === 0) {                              // 무승부인 경우
        return 1;
    } else if (result === -2 || result === 1) {       // 사용자가 승리한 경우
        return 2;
    } else if (result === -1 || result === 2) {       // 사용자가 패배한 경우
        return 0;
    }
}

// 대진 결과를 화면에 출력하는 함수
const modal = document.getElementsByClassName("modal")[0];
const modalTitle = document.getElementsByClassName("modal__content-title")[0];

const playerScoreItem = document.getElementById("score-player");
const pcScoreItem = document.getElementById("score-pc");

function showMatchResult(result, player, pc) {
    // 화면에 점수 갱신
    if (result !== 1 || result !== null) {
        calculateScore(result);
    }
}
// 점수 계산 후 화면에 갱신하는 함수
function calculateScore(result) {
    if (result === 2) {
        playerScore += 10;
        playerScoreItem.innerText = playerScore;
    } else if (result === 0) {
        pcScore += 10;
        pcScoreItem.innerText = pcScore;
    }
}

// 2초 후에 게임을 재시작 하는 함수
function restartGameTime() {
	
    closeTimer = setInterval(() => {
        restartGame();
    }, 2000);
}

// 게임을 재시작 하는 함수
function restartGame() {
    // 정지
    clearInterval(closeTimer);

    // 컴퓨터의 마지막 선택 값 재설정
    changePcSelection();

    // 화면 초기화
    playerScoreItem.innerText = playerScore;
    pcScoreItem.innerText = pcScore;

    // 게임 재시작
    timer = setInterval(changePcSelection, speed);
}

//Clear working space
function ClearWorkingSpace() {
	clearAll()
}
