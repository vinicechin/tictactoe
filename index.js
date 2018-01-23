var turn = true;
var board = [[0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]];
var player1Symbol;
var player2Symbol;
var isTwoPlayers;
var p1Starts = true;
            
$(".table__tile").on("click", handleTileClick);
$(".game-type button").on("click", handleGameTypeChoice);
$(".symbol-type button").on("click", handleSymbolTypeChoice);
$("#reset-btn").on("click", handleReset);

function handleTileClick(event) {
    var pos = event.target.id;
    if (board[pos[0]][pos[1]] == 0) {
        var hasEnded = false;
        if (turn) {
            updateBoard(1, "orange", player1Symbol, pos[0], pos[1]);
            if (verifyVictory("Player1")) {
                posGameEvents("Player1");
            } else if (verifyDraw()) {
                posGameEvents(null);
            } else {
                turn = false;
                if (!isTwoPlayers) {
                    handleComputerPlay();
                }
            }
        } else if (isTwoPlayers) {
            updateBoard(4, "green", player2Symbol, pos[0], pos[1]);
            if (verifyVictory("Player2")) {
                posGameEvents("Player2");
            } else if (verifyDraw()) {
                posGameEvents(null);
            } else {
                turn = true;
            }
        }
    }

    // printBoard();
}

function handleGameTypeChoice(event) {
    var id = event.target.id;
    if (id == "two-players") {
        isTwoPlayers = true;
    } else {
        isTwoPlayers = false;
    }
    $(".game-type").fadeOut(500,function() {
        $(".symbol-type").fadeIn(500);
    });
}

function handleSymbolTypeChoice(event) {
    var id = event.target.id;
    if (id == "cross") {
        player1Symbol = "X";
        player2Symbol = "O";
        p1Starts = false;
    } else {
        player1Symbol = "O";
        player2Symbol = "X";
        p1Starts = true;
    }
    turn = p1Starts;
    $(".symbol-type").fadeOut(500,function() {
        $("#board").fadeIn(500);
    });
    handleComputerPlay();
}

function handleComputerPlay() {
    if (!turn) {
        setTimeout(function() {
            computerPlay();
            if (verifyVictory("Computer")) {
                posGameEvents("Computer");
            } else if (verifyDraw()) {
                posGameEvents(null);
            } else {
                turn = true;
            }
        }, 1000);
    }
}

function computerPlay() {
    var played = false;
    while (!played) {
        var i = Math.floor(Math.random() * 3);
        var j = Math.floor(Math.random() * 3);
        if (board[i][j] == 0) {
            updateBoard(4, "yellow", player2Symbol, i, j);
            played = true;
        }
    }
}

function updateBoard(value, color, symbol, i, j) {
    board[i][j] = value;
    $("#"+i+""+j).css("background-color",color);  
    $("#"+i+""+j).html(symbol);
}

function verifyVictory(playerName) {
    var victoryPoints;
    if (playerName == "Player1") {
        victoryPoints = 3; //1 + 1 + 1
    } else {
        victoryPoints = 12; //4 + 4 + 4
    }

    for (i=0; i<3;i++) {
        if (board[i][0] + board[i][1] + board[i][2] == victoryPoints) {
            return true;
        }
        if (board[0][i] + board[1][i] + board[2][i] == victoryPoints) {
            return true;
        }
    }
    if (board[0][0] + board[1][1] + board[2][2] == victoryPoints) {
        return true;
    }
    if (board[2][0] + board[1][1] + board[0][2] == victoryPoints) {
        return true;
    }
    
    return false;
}

function verifyDraw() {
    if (getTotal() > 20) {
        return true;
    }
    return false;
}

function getTotal() {
    var total = 0;
    for (i = 0; i<3; i++) {
        total += board[0][i] + board[1][i] + board[2][i];
    }
    return total;
}

function posGameEvents(playerName) {
    if (playerName) {
        setTimeout(function() {
            alert(playerName + " victory!");
            clearBoard();
        }, 100);
    } else {
        setTimeout(function() {
            alert("It's a draw!");
            clearBoard();
        }, 100);
    }
    p1Starts = !p1Starts;
    turn = p1Starts;
    if (!turn && !isTwoPlayers) {
        handleComputerPlay();
    }
}

function handleReset() {
    clearBoard();
    $(".symbol-type").fadeOut(500);
    $(".game-type").fadeIn(500);
}

function printBoard() {
    console.log(board[0][0] + " " + board[0][1] + " " + board[0][2] + "\n" +
                board[1][0] + " " + board[1][1] + " " + board[1][2] + "\n" +
                board[2][0] + " " + board[2][1] + " " + board[2][2]);
}

function clearBoard() {
    board = [[0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]];

    for (i=0; i<3;i++) {
        for (j=0; j<3;j++) {
            var id = "#" + i + j;
            $(id).html("");
            $(id).css("background-color", "white");
        }
    }
}