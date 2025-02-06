const boxes = document.querySelectorAll(".box")

const resetBtn = document.getElementById("reset-btn")

const newGame = document.getElementById("new-game")

const msgContainer = document.querySelector(".msg-container")

const turn = new Audio('mouse.mp3')

const msg = document.getElementById("msg")

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

const disableBtns = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBtns = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => {
    msg.innerText = "Congratulations, The Winner is " + winner;
    msgContainer.classList.remove("hide")
}

const resetGame = () => {
    enableBtns()
    turnO = true;
    msgContainer.classList.add("hide")
}


boxes.forEach((box) => {
    box.addEventListener('click', (e) => {
        if (turnO === true) {
            box.innerHTML = "O"
            turn.play()
            turnO = false;
        } else {
            box.innerHTML = "X"
            turn.play()
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    })
})


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                disableBtns()
                showWinner(pos1);
            }
        }
    }

    let isDraw = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            isDraw = false;
            break;
        }
    }
    if (isDraw) {
        msg.innerText = "Game ended in a draw!";
        msgContainer.classList.remove("hide");
        disableBtns();
    }
}