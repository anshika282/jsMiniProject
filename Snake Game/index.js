let direction ={x: 0,y:0};
let foodSound = new Audio('/music/food.mp3');
let gameOverSound = new Audio('/music/gameOver.mp3');
let moveSound = new Audio('/music/move.mp3');
let musicSound = new Audio('/music/music.mp3');

let scoreIndex = document.getElementById("score");
let highScoreBox = document.getElementById("high-score");
let board = document.querySelector(".board");

//current time : ctime
let speed = 5;
let lastTime=0;
let food = {x:0,y:9};
let snakeArr = [ {x:13,y:7}];
let inputDir = {x:0,y:0};

//highscore funtionality

let highScore=localStorage.getItem("highScore");
if(highScore === null){
    highScoreVal = 0;
    localStorage.setItem("highScore",JSON.stringify(highScoreVal));
}else{
    highScoreVal = JSON.parse(highScore);
    highScoreBox.innerHTML = "high Score " + 0;
}

//for animation fram :
function main(ctime){

    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastTime)/1000 < 1/speed){
        return;
    }
    lastTime = ctime;
    gameEngine();
}

//game characs 

function gameEngine(){

    console.log("in game eneoijf");
    //first: update the body of snake once food eaten:
    
    if(isCollapsed(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert("game Over !");
        snakeArr = [{x:13,y:5}];
        musicSound.play();
        score =0;

    }

    //if food eaten then increment the score and regenerate food : 
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score++;
        if(highScoreVal<score){
            highScoreVal++;
            localStorage.setItem("highScore",JSON.stringify(highScoreVal));
            highScoreBox.innerHTML = "High Score" + highScoreVal;
        }
        scoreIndex.innerHTML= "Score" +score;
        snakeBody.unshift({x: snakeArr[0].x + inputDir.x ,y:snakeArr[0].y + inputDir.y});
        food = {x: Math.rount(a+ (b-a) *Math.random())}
    }

    //move the snake :

    for(let m = snakeArr.length-2;  m>=0;m--){
        const ele = snakeArr[m];
        snakeArr[m+1] = {...snakeArr[m-1]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.x;
    //second : display food and snake:

    board.innerHTML = "";
    snakeArr.forEach((e,index) => {

        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart =e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snakeBody');
        }
        board.appendChild(snakeElement);
    })

        foodElement = document.createElement("div");
        foodElement.style.gridRowStart =food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add("food");
        board.appendChild(foodElement);

}


window.requestAnimationFrame(main);
window.addEventListener("keydown",e =>{
    inputDir = {x:0,y:0};
    moveSound.play();

    switch(e.key) {
        case "ArrowUp" :
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowDown" :
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowLeft" :
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight" :
            inputDir.x = 1;
            inputDir.y = 1;
            break;
       default : break;

    }  

})

function isCollapsed(snakeArr) {
   //if snake bumps itself
   for(let k = 1; k<snakeArr.length;k++){
    if(snakeArr[i].x === snakeArr[0].x   && snakeArr[i].y === snakeArr[0].y){
        return true;
    }
    
   }

   if((snakeArr[0].x>=18 || snakeArr.x <=18 || snakeArr[0].y>=18 ||snakeArr.y <=18) ){
    return true;
   }
   //if snake bumps the wall:
   return false;

}
