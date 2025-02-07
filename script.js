document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
    const resetBtn = document.getElementById("reset-btn");
    const newGame = document.getElementById("new-game");
    const msgContainer = document.querySelector(".msg-container");
    const turnSound = new Audio('mouse.mp3');
    const msg = document.getElementById("msg");

    let turnO = true;
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const disableBtns = () => {
        boxes.forEach(box => box.disabled = true);
    };

    const enableBtns = () => {
        boxes.forEach(box => {
            box.disabled = false;
            box.innerText = "";
            box.classList.remove("highlight");
        });
    };

    const showWinner = (winner, pattern) => {
        msg.innerText = `Congratulations, The Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        pattern.forEach(index => boxes[index].classList.add("highlight"));
    };

    const resetGame = () => {
        enableBtns();
        turnO = true;
        gameActive = true;
        msgContainer.classList.add("hide");
    };

    const checkWinner = () => {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            const pos1 = boxes[a].innerText;
            const pos2 = boxes[b].innerText;
            const pos3 = boxes[c].innerText;

            if (pos1 && pos1 === pos2 && pos2 === pos3) {
                disableBtns();
                showWinner(pos1, pattern);
                gameActive = false;
                return;
            }
        }
        checkDraw();
    };

    const checkDraw = () => {
        if ([...boxes].every(box => box.innerText !== "")) {
            msg.innerText = "Game Draw!";
            msgContainer.classList.remove("hide");
            disableBtns();
            gameActive = false;
        }
    };

    boxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            if (!gameActive) return;

            box.innerText = turnO ? "O" : "X";
            turnSound.play();
            box.disabled = true;
            turnO = !turnO;

            checkWinner();
        });
    });

    resetBtn.addEventListener('click', resetGame);
    newGame.addEventListener('click', resetGame);
});
