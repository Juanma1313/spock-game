let totalRounds = 5;
let roundNumber=0;
let computerName="Spock"
let computerScore=0;
let computerChoice=""

let playerName="Player"
let playerScore=0;
let resultMessage=""
let playerChoice=""

const  weaponChoices = {
    rock:     ["Rock"    , "jmh-rock.png"],
    paper:    [ "Paper"  , "jmh-paper.png" ],
    scissors: ["Scissors", "jmh-scissors.png"] ,
    lizard:   ["Lizard"  , "jmh-lizar.png"],
    spock:    ["Spock"   , "jmh-spock.png"]
};

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            let elementId = this.getAttribute("id")
            console.log("event: click,  elementId:" + elementId + " Data="+ playerChoice );
            if (elementId === "btn-start") {
                startGame();
            } else {
                playerChoice = this.getAttribute("data")
                computerChoice = randomChoice();
                playRound()
            }
        });
    }
});

function startGame(){
    // Reset game round counter and scores and invite the player to choose a weapon
    round=0;
    computerScore=0;
    playerScore=0;
    resultMessage="Choose a weapon";
    displayInfo();    
}

function displayInfo(){
    // updates all scores and info for the game
    document.getElementById("round-number").innerHTML=roundNumber;
    document.getElementById("computer-name").innerHTML=computerName;
    document.getElementById("computer-score").innerHTML=computerScore;
    document.getElementById("player-name").innerHTML=playerName;
    document.getElementById("player-score").innerHTML=playerScore;
    document.getElementById("result").innerHTML=resultMessage;
    if (playerChoice.length) {  // Update the player weapon image
        let imageFile="/assets/images/"+weaponChoices[playerChoice][1];
        console.log("The Player Choose(" + playerChoice + ") newfile="+ imageFile);
        document.getElementById("player-weapon-img").src = imageFile; 
    }
    
    if (computerChoice.length) { // Update the computer weapon image
        imageFile="/assets/images/"+weaponChoices[computerChoice][1];
        console.log("The Computer Choose(" + computerChoice + ") newfile="+ imageFile);
        document.getElementById("computer-weapon-img").src = imageFile; 
    }
}  

function randomChoice() {
    choiceNumber = Math.floor(Math.random () * Object.keys(weaponChoices).length);
    return(Object.keys(weaponChoices)[choiceNumber]);

}
function playRound() {
    checkOutcome();
    displayInfo()
}

function checkOutcome() {
    console.log("checkOutcome(" +")");
}
