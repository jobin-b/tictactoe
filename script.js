const gameBoard = (() => {
    let board = ["--", "--","--", "--","--", "--","--", "--","--"];
    let curr="X";
    let nameX = "Player X";
    let nameO = "Player O";

    function startGame(name1, name2){
        board = ["--", "--","--", "--","--", "--","--", "--","--"];
        curr="X";
        nameX = name1;
        nameO = name2;
        markBox();
    }

    function fillBoard(){
        let boxes = document.querySelectorAll(".box");
        boxes.forEach(box => {
            box.innerText = board[box.getAttribute("num")];
            box.setAttribute("active", "false");
        });
    };

    function markBox(){
        let boxes = document.querySelectorAll(".box");
        boxes.forEach(box => {
            box.addEventListener("click", function(event){
                if(box.getAttribute("active") == "false"){
                    box.innerText = curr;
                    curr = curr=="X" ? "O" : "X";
                    box.setAttribute("active", "true");
                    box.style.backgroundColor = "#b6b6b6";
                    checkEnd();
                }
            });
        });
    }

    function checkEnd(){
        let wonGame = false;
        let winner = "none";
        let wins = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        wins.forEach(win => {
            if(board[win[0]] == board[win[1]] && board[win[1]] == board[win[2]]){
                wonGame = true;
                if(board[win[0]] === "X"){
                    winner = nameX;
                } else {
                    winner = nameO;
                }
                
            }
        });
        let boxesLeft = 0;
        if(wonGame){
            endGame(1, winner);
        } else{
            let boxes = document.querySelectorAll(".box");
            boxes.forEach(box => {
                box.addEventListener("click", function(event){
                    if(box.getAttribute("active") == "false"){
                        boxesLeft++;
                    }
                });
            });
        }
        if(boxesLeft === 0) endGame(0, winner);

    }

    function endGame(win, winner){
        endCard = document.createElement("div");
        endCard.id = "result";
        if(win === 1){
            endCard.innerText = `${winner} won!!!`;
        } else {
            endCard.innerText = "Its a tie! Play Again!";
        }
    }

    return {startGame, fillBoard};
}) ();

gameBoard.fillBoard();
gameBoard.startGame("Player X", "Player O");
let start = document.getElementById("submit");
start.addEventListener("click", function(event){
    let name1 = document.getElementById("PlayerX").value;
    let name2 = document.getElementById("PlayerO").value;
    gameBoard.startGame(name1, name2);
});