let boxes = document.querySelectorAll(".box");
let restBtn = document.querySelector(".reset");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#winner");
let newGame = document.querySelector(".new-btn");

//to keep a check on which char to put in boxes
let turnO = false;

//paaterns that make the game win 
const winPatterns = [

    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];

let count = 0;
// iterate over the boxes to add the charater to it 
// added the addeventlistner to boxes list so whenever we click at it a char is drawn and also it
// checks if winning pattern found if found then stop game else continue playing
boxes.forEach((box)=> {
     box.addEventListener("click", () => {
        count++;
        if(!turnO){
            box.innerText = "X";
            box.style.color = 'blue';
            turnO = true;
        }else{
            box.innerText = "O";
            turnO = false;
        }
//disabled function so as to not change the charactere of same box more than once
        box.disabled = true;
//check if draw or not ..here also check if the last turn makes you win or draw game;
        if(!winnerCheck()){
            if(count == 9){
                winnerCheck();
                msg.innerText = "It is a Draw!!";
                msgContainer.classList.remove("hide");
            }
        }
        
     });
});

//to show winner
const showWinner = (winner) => {
    console.log('here');
    msg.innerText = `Congractulations ,Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};



//check wnner 
const winnerCheck = () => {
   for(let pattern of winPatterns) {

    let val1 = boxes[pattern[0]].innerText;
    let val2 = boxes[pattern[1]].innerText;
    let val3 = boxes[pattern[2]].innerText;
    
    if(val1 != "" && val2 != "" && val3 != ""){
        if(val1 === val2 && val2===val3){
            showWinner(val1);
            return true;
        }
    }
   }
};

//to reset the game:

const resetGame = () => {
    turnO = false;
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
  
};

//to disable btns once won the game
const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};

//to enable btns once rest/newgame is pressed
const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText ="";
    }
};

//add an action to the reset and new Game btn 
newGame.addEventListener("click", resetGame);
restBtn.addEventListener("click", resetGame);