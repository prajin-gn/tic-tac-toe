const boardEl = document.querySelector("#board");
const startEl = document.querySelector("#start");
const turnIndicator = document.querySelector("#turnIndicator");
let turn = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let p1, p2;
let winner = null;
let filled = 0;

// Event listeners 

startEl.addEventListener("click", () => {
    p1 = document.querySelector("#p1").value;
    p2 = document.querySelector("#p2").value;

    if (!p1 || !p2){
        alert("Name field can't be empty!");
        return;
    }

    startEl.setAttribute("disabled", true)
    boardEl.addEventListener("click", startGame);
    turnIndicator.textContent = `${p1}'s turn`;
})

document.querySelector("#reset").addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    const cells = document.querySelectorAll(".cell");
    for( let cell of cells){
        cell.textContent = "";
        cell.classList.remove("fade");
        cell.classList.remove("blink3");
    }
    

    turn = "X";
    turnIndicator.textContent = `${p1}'s turn`;
    filled = 0;
    boardEl.addEventListener("click", startGame);
    startEl.setAttribute("disabled", false)
})


// Game logic

let startGame = (e) => {
    const cell = e.target.closest(".cell");
    if(!cell) return;
    if(cell.textContent != "") return;

    play(cell);
}

function play(cell){
    cell.textContent = turn;
    fade(cell);

    board[cell.dataset.i] = turn;
    filled++;
    if (turn === "X"){
        turn = "0";
        turnIndicator.textContent = `${p2}'s turn`;
    }
    else{
        turn = "X";
        turnIndicator.textContent = `${p1}'s turn`;
    }

    winner = getWinner();
    if (winner){
        endGame();
    }
}

function getWinner(){
    // rows
    for (let i=0; i<9; i+=3){
        if (board[i] === board[i+1] && board[i] === board[i+2] && (board[i] === "X" || board[i] === "0")){
            AnimateWinner(i, i+1, i+2);
            return board[i];
        }
    }

    // cols
    for (let i=0; i<3; i++){
        if (board[i] === board[i+3] && board[i] === board[i+6] && (board[i] === "X" || board[i] === "0")){
            AnimateWinner(i, i+3, i+6);
            return board[i];
        }
    }

    // diagonal
    if (board[0] === board[4] && board[0] === board[8] && (board[0] === "X" || board[0] === "0")){
        AnimateWinner(0, 4, 8);
        return board[0];
    }

    if (board[2] === board[4] && board[2] === board[6] && (board[2] === "X" || board[2] === "0")){
        AnimateWinner(2, 4, 6);
        return board[2];
    }

    // tie

    if (filled === 9){
        AnimateWinner(0, 1, 2, 3, 4, 5, 6, 7, 8);
        return "tie";
    }
}

function endGame(){
    boardEl.removeEventListener("click", startGame);
    let msg;

    if (winner !== "tie"){
        msg = `The winner is ${(winner === "X")?p1:p2}!`;
    }
    else{
        msg = "Its a tie!";
    }

    turnIndicator.textContent = msg;
}

// Animations

function fade(cell){
    cell.classList.add("fade");
}

function blink3(cell){
    cell.classList.add("blink3");
}

function AnimateWinner(...indices){
    for (i of indices){
        blink3(document.querySelector(`.cell[data-i="${i}"]`));
    }
}