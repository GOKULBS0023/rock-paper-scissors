const buttons = document.querySelectorAll(".button");
const userScoreEl = document.querySelector(".user-score");
const compScoreEl = document.querySelector(".comp-score");
const resultEl = document.querySelector(".result");
const scorecardEl = document.querySelector(".score");
const headerEl = document.querySelector("header");
const scoreBox = document.querySelector(".score-box");
const userIcon = document.querySelector(".user-icon");
const compIcon = document.querySelector(".comp-icon");
const buttonsBox = document.querySelector(".buttons-box");
const start = document.querySelector(".start");

const matchSection = document.querySelector(".match");


const items = ["rock", "paper", "scissors"];

let userScore = 0;
let compScore = 0;
let numMatches = 3;
let matchPlayed = 0;

const seriesEl = document.querySelector("#series");





function updateScore() {
    headerEl.classList.remove("lead");
    headerEl.classList.remove("trail");
    userScoreEl.innerText = userScore;
    compScoreEl.innerText = compScore;

    if (userScore > compScore) {
        resultEl.innerHTML = `<h1>You lead comp by ${userScore - compScore}</h1>`;
        resultEl.parentElement.classList.remove("trail");
        resultEl.parentElement.classList.add("lead");
        userIcon.style.color = "green";
        compIcon.style.color = "red";
    } else if (compScore > userScore) {
        resultEl.innerHTML = `<h1>Comp lead you by ${compScore - userScore}</h1>`;
        resultEl.parentElement.classList.remove("lead");
        resultEl.parentElement.classList.add("trail");
        userIcon.style.color = "red";
        compIcon.style.color = "green";
    } else if (compScore === 0 && userScore === 0) {
        resultEl.innerHTML = `<h1>Start your game to get result</h1>`;
        resultEl.parentElement.classList.remove("lead");
        resultEl.parentElement.classList.remove("trail");
        userIcon.style.color = "black";
        compIcon.style.color = "black";
    } else {
        resultEl.innerHTML = `<h1>Scores are level</h1>`;
        resultEl.parentElement.classList.remove("lead");
        resultEl.parentElement.classList.remove("trail");
        userIcon.style.color = "black";
        compIcon.style.color = "black";
    }
}

function resetGame() {
    start.innerText = "Click to play again";
    userScore = 0;
    compScore = 0;
    matchPlayed = 0;
    updateScore();
}
seriesEl.addEventListener("change", (e) => {
    numMatches = parseInt(e.target.value);
    resetGame();
});

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const userItem = parseInt(btn.getAttribute("data-id"));
        const randomItem = Math.floor(Math.random() * 3);
        const userClickItem = btn;
        const randomSelectedItem = document.querySelector(`[data-id="${randomItem}"]`);

        console.log(userClickItem);
        console.log(randomSelectedItem);
        buttons.forEach(function (button) {
            button.classList.add('animate');
        });

        userClickItem.classList.add('animate');

        randomSelectedItem.classList.add('animate');

        setTimeout(function () {
            if (userItem === randomItem) {
                userScore++;
                compScore++;
                randomSelectedItem.style.fill = "green";
                userClickItem.style.fill = "green";
                start.innerText = "Both got the point";
            } else if ((userItem === 0 && randomItem == 1) || (userItem === 1 && randomItem === 2) || (userItem === 2 && randomItem == 0)) {
                compScore++;
                randomSelectedItem.style.fill = "green";
                userClickItem.style.fill = "red";
                start.innerText = "Comp got a point";
            } else {
                userScore++;
                randomSelectedItem.style.fill = "red";
                userClickItem.style.fill = "green";
                start.innerText = "You got a point";
            }
            buttons.forEach(function (button) {
                button.style.display = 'none';
                button.disabled = true;
            });
            userClickItem.parentNode.insertBefore(userClickItem, randomSelectedItem);
            userClickItem.style.display = 'block';
            randomSelectedItem.style.display = 'block';
            userClickItem.classList.remove('animate');
            randomSelectedItem.classList.remove('animate');
            updateScore();
            matchPlayed++;
            numMatches;
            if (numMatches === matchPlayed) {
                endMatch();
            }
        }, 500);
        setTimeout(function () {
            buttons.forEach(function (button) {
                button.disabled = false;
                start.innerText = "Click to play again";
                buttonsBox.appendChild(button);
                randomSelectedItem.style.fill = "black";
                userClickItem.style.fill = "black";
                button.style.display = 'block';
                button.classList.remove('animate');
            });
        }, 4000);

    });
});

function endMatch() {
    if (userScore > compScore) {
        start.innerText = "You won the match";
        resultEl.innerHTML = `<h1>You beat comp by ${userScore - compScore}. Play again to win more!!</h1>`;
        resultEl.parentElement.classList.remove("trail");
        resultEl.parentElement.classList.add("lead");
        headerEl.classList.add("lead");

    } else if (compScore > userScore) {
        start.innerText = "You lost the match";
        resultEl.innerHTML = `<h1>You lost to comp by ${compScore - userScore}. Better luck next time</h1>`;
        resultEl.parentElement.classList.remove("lead");
        resultEl.parentElement.classList.add("trail");
        headerEl.classList.add("trail");
    } else {
        start.innerText = "Match draw!!";
        resultEl.innerHTML = `<h1>Match draw!! Play again to win!!</h1>`;
        resultEl.parentElement.classList.remove("lead");
        resultEl.parentElement.classList.remove("trail");
    }
    setTimeout(() => {
        userScore = 0;
        compScore = 0;
        matchPlayed = 0;
        resetGame();
    }, 4000);
}