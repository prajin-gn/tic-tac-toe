const boardEl = document.querySelector("#board");
const startEl = document.querySelector("#start");
const resetEl = document.querySelector("#reset");
const turnIndicator = document.querySelector("#turnIndicator");

let turn = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let p1, p2;
let winner = null;
let filled = 0;
let gameActive = false;

boardEl.addEventListener("click", startGame);

/* ---------------- Event listeners ---------------- */

startEl.addEventListener("click", () => {
    p1 = document.querySelector("#p1").value.trim();
    p2 = document.querySelector("#p2").value.trim();

    if (!p1 || !p2){
        alert("Name field can't be empty!");
        return;
    }

    gameActive = true;
    startEl.setAttribute("disabled", true);
    turnIndicator.textContent = `${p1}'s turn`;
});

resetEl.addEventListener("click", resetGame);

/* ---------------- Game logic ---------------- */

function startGame(e){
    if (!gameActive) return;

    const cell = e.target.closest(".cell");
    if (!cell) return;
    if (cell.textContent !== "") return;

    play(cell);
}

function play(cell){
    cell.textContent = turn;
    fade(cell);

    board[cell.dataset.i] = turn;
    filled++;

    winner = getWinner();
    if (winner){
        endGame();
        return;
    }

    if (turn === "X"){
        turn = "O";
        turnIndicator.textContent = `${p2}'s turn`;
    } else {
        turn = "X";
        turnIndicator.textContent = `${p1}'s turn`;
    }
}

function getWinner(){

    // rows
    for (let i = 0; i < 9; i += 3){
        if (board[i] && board[i] === board[i+1] && board[i] === board[i+2]){
            animateWinner(i, i+1, i+2);
            return board[i];
        }
    }

    // cols
    for (let i = 0; i < 3; i++){
        if (board[i] && board[i] === board[i+3] && board[i] === board[i+6]){
            animateWinner(i, i+3, i+6);
            return board[i];
        }
    }

    // diagonals
    if (board[0] && board[0] === board[4] && board[0] === board[8]){
        animateWinner(0,4,8);
        return board[0];
    }

    if (board[2] && board[2] === board[4] && board[2] === board[6]){
        animateWinner(2,4,6);
        return board[2];
    }

    // tie
    if (filled === 9){
        animateWinner(0,1,2,3,4,5,6,7,8);
        return "tie";
    }
}

function endGame(){
    gameActive = false;

    let msg;
    if (winner === "tie"){
        msg = "Its a tie!";
    } else {
        msg = `The winner is ${(winner === "X") ? p1 : p2}!`;
    }

    turnIndicator.textContent = msg;
}

/* ---------------- Reset ---------------- */

function resetGame(){
    board = ["", "", "", "", "", "", "", "", ""];
    turn = "X";
    filled = 0;
    winner = null;
    gameActive = false;

    const cells = document.querySelectorAll(".cell");
    for (let cell of cells){
        cell.textContent = "";
        cell.classList.remove("fade","blink3");
    }

    turnIndicator.textContent = "All The Best!";
    startEl.removeAttribute("disabled");
}

/* ---------------- Animations ---------------- */

function fade(cell){
    cell.classList.add("fade");
}

function blink3(cell){
    cell.classList.add("blink3");
}

function animateWinner(...indices){
    for (let i of indices){
        blink3(document.querySelector(`.cell[data-i="${i}"]`));
    }
}
