let userScore = 0;
let compScore = 0;

let choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
let userCount = document. querySelector("#user-score");
let compCount = document. querySelector("#comp-score");

choices.forEach((choice) => {
    choice.addEventListener("click" , () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

const playGame = (userChoice) => {
    const serverChoice = compChoice();
    if(userChoice === serverChoice){
        drawGame();
    }else {
        let userWin =true;
        if(userChoice === "rock") {
            userWin = serverChoice === "paper" ?  false : true;
        } else if(userChoice === "paper") {
            userWin = serverChoice === "scissor" ?  false : true;
        } else{
            userWin = serverChoice === "rock" ?  false : true;
        }

        showWinner(userWin,userChoice,serverChoice);
    }
};

const compChoice = () => {
    const options = ["rock" ,"paper","scissor"];
    const rand = Math.floor(Math.random() *3);
    return options[rand];
};

const drawGame = () => {
    msg.innerText = "It is a Draw";
    msg.style.backgroundColor = "yellow";
};

const showWinner =(userWin,userChoice,serverChoice) => {
    if(userWin) {
        userScore++;
        userCount.innerText =userScore;
        msg.innerText = `Winner is User as ${userChoice} beats ${serverChoice} !!`;
        msg.style.backgroundColor = "green";
        

    } else {
        compScore++;
        compCount.innerText = compScore;
        msg.innerText = `Lost to  Server as ${serverChoice} beats ${userChoice} !!`;
        msg.style.backgroundColor = "red";
        
    }
};