let board;
let context;
let boardWidth = 360;
let boardHeight = 640;

document.addEventListener("DOMContentLoaded", function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");
    context.fillStyle = "skyblue";
    context.fillRect(0, 0, boardWidth, boardHeight);
});