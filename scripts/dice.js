//dices pictures
const youDice1 = document.getElementById("dice-you-1");
const youDice2 = document.getElementById("dice-you-2");

const opponentDice1 = document.getElementById("dice-opponent-1");
const opponentDice2 = document.getElementById("dice-opponent-2");

//buttons
const roll = document.getElementById("rolldice");
const newGameButton = document.getElementById("newgame");

//score fields
const youScoreField = document.getElementById("youscore");
const opponentScoreField = document.getElementById("opponentscore");

//track scores
let score = 0;
let yourCurrentScore = 0;
let opponentCurrentScore = 0;
let yourTotalScore = 0;
let opponentTotalScore = 0;

let countRolls = 0;

let youFirstDice;
let youSecondDice;

let opponentFirstDice;
let opponentSecondDice;


//show results
const showResultPopup = document.getElementById("show-result");
const close = document.getElementById("btn-close");
const popupHeader = document.getElementById("result-header");
const popupYouScore = document.getElementById("you-final-score");
const popupOpponentScore = document.getElementById("opponent-final-score");

roll.addEventListener("click", function(){

    countRolls++; //track # of rolls

    youFirstDice = randomNumber();
    youSecondDice = randomNumber();

    opponentFirstDice = randomNumber();
    opponentSecondDice = randomNumber();

     //calculate scores
     yourCurrentScore = calculateScore(youFirstDice, youSecondDice);
     yourTotalScore = yourTotalScore + yourCurrentScore;
 
     opponentCurrentScore = calculateScore(opponentFirstDice, opponentSecondDice);
     opponentTotalScore = opponentTotalScore + opponentCurrentScore;
 
    render();
    

    //game over, pop up show results
    if(countRolls == 3){
        showResult(yourTotalScore, opponentTotalScore);
        newGame();
    }


});

function render(){
    //show dice pics
    youDice1.src = `images/dice${youFirstDice}.png`;
    youDice2.src = `images/dice${youSecondDice}.png`;

    opponentDice1.src = `images/dice${opponentFirstDice}.png`;
    opponentDice2.src = `images/dice${opponentSecondDice}.png`;

   
    youScoreField.innerHTML = `Your Current Score: ${yourCurrentScore} Total Score: ${yourTotalScore}`;
    opponentScoreField.innerHTML = `Opponent Current Score: ${opponentCurrentScore} Total Score: ${opponentTotalScore}`;
}

function newGame(){
    score = 0;
    yourCurrentScore = 0;
    opponentCurrentScore = 0;
    yourTotalScore = 0;
    opponentTotalScore = 0;
    
    countRolls = 0;
    
    youFirstDice = 1;
    youSecondDice = 1;
    
    opponentFirstDice = 1;
    opponentSecondDice = 1;

    render();
    
}

function randomNumber(){
    return Math.floor(Math.random()*6)+1;
}

function calculateScore(firstDice, secondDice){
    if(firstDice == 1 || secondDice == 1){
        score = 0;
    }else if( firstDice === secondDice){
        score = (firstDice+secondDice)*2;
    }else{
        score = firstDice + secondDice;
    }
   return score;
    
}

newGameButton.addEventListener("click", function(){
    newGame();
});

function showResult(yourScore, opponentScore){
    showResultPopup.style.opacity = 1;

    if(yourScore > opponentScore){
      popupHeader.innerHTML = `YOU WON! GOOD JOB!` ;
     
    }else{
      popupHeader.innerHTML = `Opponent won! BETTER LUCK NEXT TIME!`;
  
    }
    popupYouScore.innerHTML = `Your Final Score: ${yourScore}`;
    popupOpponentScore.innerHTML = `Opponent's Final Score: ${opponentScore}`;

    //animation
    flashBorderAnimation();
    
}

close.addEventListener("click", function(){
    showResultPopup.style.opacity = '0';
});

function flashBorderAnimation(){
    setTimeout(function(){
        setInterval(function(){
            showResultPopup.style.borderColor = "black";
           
        }, 1000);
    }, 500);
       
    setInterval(function(){
        showResultPopup.style.borderColor = "rgb(151, 6, 6)";
    }, 1000);
}


