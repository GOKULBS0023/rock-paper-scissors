const buttons = document.querySelectorAll(".button");
const userScoreEl = document.querySelector(".userScore");
const compScoreEl = document.querySelector(".compScore");
const resultEl = document.querySelector(".result");
const scorecardEl = document.querySelector(".score");
const buttonsBoxEL = document.querySelector("button");

const items = ["rock", "paper", "scissors"];

let userScore = 0;
let compScore = 0;
let numMatches = 3;
let matchPlayed = 0;

const seriesEl = document.querySelector("#series");





function updateScore() {
    userScoreEl.innerText = userScore;
    compScoreEl.innerText = compScore;

    if (userScore > compScore) {
        resultEl.innerHTML = `<h1>You lead comp by ${userScore - compScore}</h1>`;
        resultEl.parentElement.classList.remove("trail");
        resultEl.parentElement.classList.add("lead");
    } else if (compScore > userScore) {
        resultEl.innerHTML = `<h1>Comp lead you by ${compScore - userScore}</h1>`;
        resultEl.parentElement.classList.remove("lead");
        resultEl.parentElement.classList.add("trail");
    } else if (compScore === 0 && userScore === 0) {
        resultEl.innerHTML = `<h1>Start your game to get result</h1>`;
        resultEl.parentElement.classList.remove("lead");
        resultEl.parentElement.classList.remove("trail");
    } else {
        resultEl.innerHTML = `<h1>Scores are level</h1>`;
        resultEl.parentElement.classList.remove("lead");
        resultEl.parentElement.classList.remove("trail");
    }
}

function resetGame() {
    userScore = 0;
    compScore = 0;
    matchPlayed = 0;
    updateScore();
}
seriesEl.addEventListener("change", (e) => {
    numMatches = parseInt(e.target.value);
});

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const userItem = parseInt(btn.getAttribute("data-id"));
        const randomItem = Math.floor(Math.random() * 3);
        if (userItem === randomItem) {
            userScore++;
            compScore++
        } else if ((userItem === 0 && randomItem == 1) || (userItem === 1 && randomItem === 2) || (userItem === 2 && randomItem == 0)) {
            compScore++;
        } else {
            userScore++;
        }
        updateScore();
        matchPlayed++;
        numMatches;
        if (numMatches === matchPlayed) {
            endMatch();
        }
    });
});

function endMatch() {
    if (userScore > compScore) {
        resultEl.innerHTML = `<h1>You won comp by ${userScore - compScore}</h1>`;
        resultEl.parentElement.classList.remove("trail");
        resultEl.parentElement.classList.add("lead");
    } else if (compScore > userScore) {
        resultEl.innerHTML = `<h1>You lost to comp by ${compScore - userScore}</h1>`;
        resultEl.parentElement.classList.remove("lead");
        resultEl.parentElement.classList.add("trail");
    } else {
        resultEl.innerHTML = `<h1>Match draw</h1>`;
        resultEl.parentElement.classList.remove("lead");
        resultEl.parentElement.classList.remove("trail");
    }
    userScore = 0;
    compScore = 0;
    matchPlayed = 0;
}