let moves = document.querySelectorAll(".move")
let reset = document.querySelector(".reset");
let msg = document.querySelector(".winner-msg");
let gameBox = document.querySelector(".box")
let winBox = document.querySelector(".winner")
let scoreBox = document.querySelector(".score")
let newGameBtn = document.querySelector("#newgame")
let lastGameBtn = document.querySelector("#lastgame")
let turn0 = true;
let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

]

//LAST GAME
let btnPress = false;
lastGameBtn.addEventListener("click", () => {
   
    if (btnPress == false) {
        gameBox.classList.remove("hide")
        winBox.classList.add("hide")
        scoreBox.classList.add("hide")
        lastGameBtn.innerText = "Go Back"
        btnPress = true
    }
    else{
        gameBox.classList.add("hide")
        winBox.classList.remove("hide")
        scoreBox.classList.remove("hide")
        lastGameBtn.innerText = "Last Game"
        btnPress = false
    }
})


// RESET FUNCTION
function resetGame() {
    confirm("Reset Game")
    turn0 = true;
    enable();
}
function newGame() {
    confirm("New Game")
    let xScore = document.getElementById("x")
    let oScore = document.getElementById("o")
    xScore.innerText = 0
    oScore.innerText = 0
    turn0 = true;
    enable();
}
// RESET BUTTON
reset.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", newGame);

// SHOW WINNER
let showWinner = (pos1) => {
    winBox.classList.remove("hide");
    scoreBox.classList.remove("hide");
    gameBox.classList.add("hide");
    lastGameBtn.classList.remove("hide");
    msg.innerText = `${"Player" + " " + pos1 + " " + "Wins the match"}`
}

let updateScore = (id) => {
    let currScore = document.getElementById(`${id}`)
    let score = Number(currScore.innerText);
    score++
    currScore.innerText = score
}

let getScore = (pos1) => {
    if (pos1 == "o") {
        updateScore('o')

    } else {
        updateScore('x')
    }
}

// CHECK WINNER
let checkWinner = () => {
    for (let winner of win) {
        let pos1 = moves[winner[0]].innerText;
        let pos2 = moves[winner[1]].innerText;
        let pos3 = moves[winner[2]].innerText;
        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                disable();
                showWinner(pos1);
                getScore(pos1);
            }
        }
    }
}

// MOVES

moves.forEach((move) => {
    move.addEventListener("click", () => {
        if (turn0 == true) {
            move.innerText = "o";
            turn0 = false;
            move.style.color = "red";

        }
        else {
            move.innerText = "x";
            turn0 = true;
            move.style.color = "blue";
        }
        move.disabled = true;
        checkWinner();
    })
})
// DISABLE BUTTONS
let disable = () => {
    for (let move of moves) {
        move.disabled = true;
    }
}
// ENABLE AND RESET FUNCTION
let enable = () => {
    for (let move of moves) {
        move.disabled = false;
        move.innerText = "";
        winBox.classList.add("hide");
        scoreBox.classList.add("hide");
        lastGameBtn.classList.add("hide");
        gameBox.classList.remove("hide")
    }
}
