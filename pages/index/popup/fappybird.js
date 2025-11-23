let board;
let context;
let boardWidth = 600;
let boardHeight = 500;

//bird
let birHeight = 60;
let birWidth = 45;
let birdX = boardWidth/8;
let birdY = boardHeight/2;

let bird = {
    x : birdX,
    y : birdY,
    width : birWidth,
    height : birHeight
}

// toiletpaper
let toiletArray = [];
let toiletWidth = 90;
let toiletHeight = 130;
let toiletX = boardWidth;

let topImg;
let botImg;
let birdImg;

// physics
let velocityX = -2;
let velocityY = 0;
let playerVelocityX = 0;
const speed = 5;
const fallSpeed = 5;

let gameOver = false;
let lastSpawnTime = 0;
let spawnInterval = 1500;

window.onload = function() {
    board = document.getElementById("board");    
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    // load bird
    birdImg = new Image();
    birdImg.src = "resources/player.png";
    
    topImg = new Image();
    topImg.src = "resources/toilet top.png";
    
    botImg = new Image();
    botImg.src = "resources/bottom lotion.png";

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);
    lastSpawnTime = Date.now();
};

function update(){
    if (gameOver) {
        context.fillStyle = "red";
        context.font = "30px Arial";
        context.fillText("GAME OVER", boardWidth/2 - 80, boardHeight/2);
        return;
    }
    
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    //bird physics - ALL PLAYER MOVEMENTS PRESERVED
    bird.y += velocityY;
    bird.x += playerVelocityX;
    
    // BOUNDARY CHECKING
    if (bird.y < 0) {
        bird.y = 0;
        velocityY = 0;
    }
    if (bird.x < 0){
        bird.x = 0;
        playerVelocityX = 0;
    }
    if (bird.y + bird.height > board.height) {
        bird.y = board.height - bird.height;
        velocityY = 0;
    }
    if (bird.x + bird.width > boardWidth){
        bird.x = board.width - bird.width;
        playerVelocityX = 0;
    }
    
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    // DRAW BIRD HITBOX
    context.strokeStyle = "green";
    context.lineWidth = 2;
    context.strokeRect(bird.x, bird.y, bird.width, bird.height);

    // SPAWN OBJECTS SEPARATELY
    let currentTime = Date.now();
    if (currentTime - lastSpawnTime > spawnInterval) {
        placeSingleImage();
        lastSpawnTime = currentTime;
    }

    //objs
    for (let i = 0; i < toiletArray.length; i++){
        let obj = toiletArray[i];
        obj.x += velocityX;
        
        // MAKE SOME OBJECTS FALL
        if (obj.falling) {
            obj.y += fallSpeed;
            // Remove if fallen off screen stop
            if (obj.y > boardHeight) {
                obj.y = 0
            }
        }
        
        context.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
        
        // DRAW OBJECT HITBOX
        context.strokeStyle = "green";
        context.lineWidth = 2;
        context.strokeRect(obj.x, obj.y, obj.width, obj.height);
        
        // COLLISION DETECTION
        if (detectCollision(bird, obj)) {
            gameOver = true;
        }
        
        if (obj.x + obj.width < 0) {
            toiletArray.splice(i, 1);
            i--;
        }
    }
}

function placeSingleImage(){
    // Randomly choose which type of object to spawn
    let spawnTop = Math.random() > 0.5;
    let spawnFalling = Math.random() > 0.7; // 30% chance to be falling
    
    if (spawnTop) {
        // Spawn top object (toilet paper)
        let randomY = Math.random() * (boardHeight/2 - toiletHeight);
        
        let topToilet = {
            img: topImg,
            x : toiletX,
            y : randomY,
            width : toiletWidth,
            height : toiletHeight,
            passed : false,
            falling: spawnFalling
        }
        toiletArray.push(topToilet);
    } else {
        // Spawn bottom object (lotion)
        let randomY = boardHeight/2 + Math.random() * (boardHeight/2 - toiletHeight);
        
        let bottomToilet = {
            img: botImg,
            x : toiletX,
            y : randomY,
            width : toiletWidth,
            height : toiletHeight,
            passed : false,
            falling: spawnFalling
        }
        toiletArray.push(bottomToilet);
    }
}

function movePlayer(e){
    if (gameOver) return;

    // ALL ORIGINAL PLAYER CONTROLS PRESERVED
    if (e.code == "ArrowUp" || e.code == "KeyW"){
        velocityY -= speed; 
    }
    if (e.code == "ArrowDown" || e.code == "KeyS"){
        velocityY += speed; 
    }
    if (e.code == "ArrowLeft" || e.code == "KeyA"){
        playerVelocityX -= speed; 
    }
    if (e.code == "ArrowRight" || e.code == "KeyD"){
        playerVelocityX += speed; 
    }
    if (e.code == "Space"){
        velocityY = 0;
        playerVelocityX = 0;
    }
}

// COLLISION DETECTION FUNCTION
function detectCollision(bird, obj) {
    return bird.x < obj.x + obj.width &&
           bird.x + bird.width > obj.x &&
           bird.y < obj.y + obj.height &&
           bird.y + bird.height > obj.y;
}