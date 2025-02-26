let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "purple", "green", "blue"];
let level = 0;
let highScore = 0;
let h2 = document.querySelector("h2");
let gameStarted = false;

// Start game on keypress or touch
function startGame() {
    if (!gameStarted) {
        console.log("Game started");
        gameStarted = true;
        levelUp();
    }
}

document.addEventListener("keypress", startGame);
document.addEventListener("touchstart", startGame); // For mobile

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function btnUserFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => btn.classList.remove("userFlash"), 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level: ${level} | High Score: ${highScore}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColour = btns[randIdx];
    let randBtn = document.querySelector(`.${randColour}`);

    gameSeq.push(randColour);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (gameSeq.length === userSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level > highScore) {
            highScore = level - 1;
        }

        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>High Score: <b>${highScore}</b><br>Press any key or touch to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => document.querySelector("body").style.backgroundColor = "white", 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    btnUserFlash(btn);

    let userColour = btn.getAttribute("id");
    userSeq.push(userColour);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    gameStarted = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
