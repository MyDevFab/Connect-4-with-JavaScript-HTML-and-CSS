window.requestAnimationFrame = window.requestAnimationFrame

var playerRed = "R"; //black on the screen
var playerYellow = "Y"; // white on the screen
var playerGreen = "G";
var playerBlue = "B";
var currPlayer = playerRed;

var counter = 0;
var counterWhite =0;
var counterGreen =0;
var counterYellow =0;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; //keeps track of which row each column is at.

window.onload = function() {
    setGame();

    let counterb = localStorage.getItem("counterb");
    document.querySelector(".counter-bvalue").innerText = counterb;

    let counterw = localStorage.getItem("counterw");
    document.querySelector(".counter-wvalue").innerText = counterw;

    let counterg = localStorage.getItem("counterg");
    document.querySelector(".counter-gvalue").innerText = counterg;

    let countera = localStorage.getItem("countera");
    document.querySelector(".counter-avalue").innerText = countera;
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' ');
            // HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    //get coords of that tile clicked
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // figure out which row the current column should be on
    r = currColumns[c];

    if (r < 0) { // board[r][c] != ' '
        return;
    }

    board[r][c] = currPlayer; //update JS board
    let tile = document.getElementById(r.toString() + "-" + c.toString());

        if (currPlayer == playerYellow) {
            tile.classList.add("yellow-piece");
            currPlayer = playerRed;
            setPlayer(r, c);
        }
        else if (currPlayer == playerGreen) {
            tile.classList.add("green-piece");
            currPlayer = playerBlue;
            setPlayer(r, c);
        }
        else if (currPlayer == playerBlue) {
            tile.classList.add("blue-piece");
            currPlayer = playerGreen;
            setPlayer(r, c);
        }
        else if (currPlayer == playerRed) {
            tile.classList.add("red-piece");
            currPlayer = playerYellow;
            setPlayer(r, c);

     }


    r -= 1; //update the row height for that column
    currColumns[c] = r; //update the array

    checkWinner();
    // checkFullBoard();
}

function checkWinner() {
     // horizontal
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setPlayer(r, c) {
    let player = document.getElementById("player");
    if (board[r][c] == playerRed) {
        player.innerText = "Whites turn";
    } 
    
    else if (board[r][c] == playerYellow) {
        player.innerText = "Blacks turn";
    } 

    else if (board[r][c] == playerGreen) {
        player.innerText = "Blues turn";
    } 

    else if (board[r][c] == playerBlue) {
        player.innerText = "Greens turn";
    } 
}
function setWinner(r, c) {
    let winner = document.getElementById("winner");
    let counterb = localStorage.getItem("counterb");
    let counterw = localStorage.getItem("counterw");
    let counterg = localStorage.getItem("counterg");
    let countera = localStorage.getItem("countera");

    if (board[r][c] == playerRed) {
        winner.innerText = "Blacks win!";
        winner.classList.add("winnerAnimation");
        player.innerText = '';

        counterb++;
        localStorage.setItem("counterb", counterb);
        document.querySelector(".counter-bvalue").innerText = counterb;
        console.log(counterb);

    } 
    
    else if (board[r][c] == playerYellow) {
        winner.innerText = "Whites win!";
        winner.classList.add("winnerAnimation");
        player.innerText = '';

        counterw++;
        localStorage.setItem("counterw", counterw);
        document.querySelector(".counter-wvalue").innerText = counterw;
        console.log(counterw);

    } 

    else if (board[r][c] == playerGreen) {
        winner.innerText = "Greens win!";
        winner.classList.add("winnerAnimation");
        player.innerText = '';

        counterg++;
        localStorage.setItem("counterg", counterg);
        document.querySelector(".counter-gvalue").innerText = counterg;
        console.log(counterg);

    } 

    else if (board[r][c] == playerBlue) {
        winner.innerText = "Blues win!";
        winner.classList.add("winnerAnimation");
        player.innerText = '';

        countera++;
        localStorage.setItem("countera", countera);
        document.querySelector(".counter-avalue").innerText = countera;
        console.log(countera);

    } 

    gameOver = true;
}

function chooseColorWhite() {

    currPlayer = playerYellow;
    let color1 = document.querySelector(".red-piece");
        color1.classList.toggle("yellow-piece");
    let color2 = document.querySelector(".yellow-piece");
        color2.classList.toggle("red-piece");
    
    
}


function chooseColorBlue() {

    currPlayer = playerBlue;
    let color1 = document.querySelector(".red-piece");
        color1.classList.toggle("blue-piece");
    let color2 = document.querySelector(".yellow-piece");
        color2.classList.toggle("green-piece");
    
}

function chooseColorGreen() {

    currPlayer = playerGreen;
    let color1 = document.querySelector(".red-piece");
        color1.classList.toggle(".green-piece");
    let color2 = document.querySelector(".yellow-piece");
        color2.classList.toggle(".blue-piece");
    
}
  
function resetGame() {
    sessionStorage.setItem("reloading", "true");
    document.location.reload();
}

function clearCounters () {

    localStorage.removeItem("counterb");
    document.querySelector(".counter-bvalue").innerText = 0;

    localStorage.removeItem("counterw");
    document.querySelector(".counter-wvalue").innerText = 0;

    localStorage.removeItem("counterg");
    document.querySelector(".counter-gvalue").innerText = 0;

    localStorage.removeItem("countera");
    document.querySelector(".counter-avalue").innerText = 0;

}

document.addEventListener('DOMContentLoaded', function() {
    let resetButton = document.querySelector('#reset');
    resetButton.addEventListener("click", resetGame);
});

// function checkFullBoard() {
//         // horizontal
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns; c++){
//                if (board[r][c] != ' ') {
//                    if (board[r][c] != null && board[r][c+1] != null && board[r][c+2] != null && board[r][c+4] != null && board[r][c+5] != null && board[r][c+6] != null && board[r][c+7] != null) {
//                     alert('The grid is full! Nobody won.');  
//                    }
//                }
//             }
//        }

//        // vertical
//     for (let c = 0; c < columns; c++) {
//         for (let r = 0; r < rows; r++) {
//             if (board[r][c] != ' ') {
//                 if (board[r][c] != null && board[r+1][c] != null && board[r+2][c] != null && board[r+3][c] != null && board[r+4][c] != null && board[r+5][c] != null && board[r+6][c] != null) {
//                     alert('The grid is full! Nobody won.');
//                 }
//             }
//         }
//     }
//  }
    


