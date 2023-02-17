let totalRounds = 5;
let roundNumber=0;
let computerName="Spock"
let computerScore=0;
let computerChoice=""

let playerName="Player"
let playerScore=0;
let resultMessage=""
let playerChoice=""

// Dictionary with the mapping for the buttons "data" attribute , 
// each key corresponds  to a button and the value is an array where:
//      index=0 --> Weapon name,
//      index=1 --> Weapon graphic file
//      index=2 --> Weapon value to be used as index in the outcome table
const  weaponChoices = {
// Weapon Key:    [ weapon Name , Graphic file ,  Weapon number ]
        rock:     ["Rock"       , "jmh-rock.png",     0 ],
        paper:    ["Paper"      , "jmh-paper.png",    1 ],
        scissors: ["Scissors"   , "jmh-scissors.png", 2 ] ,
        lizard:   ["Lizard"     , "jmh-lizard.png",   4 ],
        spock:    ["Spock"      , "jmh-spock.png",    3 ]
};

// The outcomeTable stores the information for the outcome of each draw.
// The table is a 3 dimensions array  where:
//    1st dimension index = player's choice (obtained from WeaponsChoice dictionary)
//    2nd dimension index = computer's choice     ""
//    3rd dimension provides the outcome and explanation values
//      index=0  
//          value=-1 --> Player loses, 
//          value= 0 --> Draw, 
//          value= 1 --> Player wins
//          value+1 can be used as index of "outcomeMessages" to get result string.
//      index=1
//          value that can be used as index of "outcomeReasons" to  get the
//          explanation text for the outcome.
const outcomeTable = [
    // Rock        Paper    Scissors     Spock     Lizard     // Player column 
    [[ 0, null], [-1,   1], [+1,   9], [-1,   8], [+1,   2]], // Rock
    [[+1,    1], [ 0,null], [-1,   0], [+1,   7], [-1,   6]], // Paper
    [[-1,    9], [+1,   0], [ 0,null], [-1,   4], [+1,   5]], // Scissors
    [[+1,    8], [-1,   7], [+1,   4], [ 0,null], [+1,   3]], // Spock
    [[-1,    2], [+1,   6], [-1,   5], [+1,   3], [ 0,null]], // Lizard
];
const outcomeMessages = ["You lose","Draw", "You win "]
const outcomeReasons = [
    "Scissors cuts Paper",          //0
    "Paper covers Rock",            //1
    "Rock crushes Lizard",          //2
    "Lizard poisons Spock",         //3
    "Spock smashes Scissors",       //4
    "Scissors decapitates Lizard",  //5
    "Lizard eats Paper",            //6
    "Paper disproves Spock",        //7
    "Spock vaporizes Rock",         //8
    "Rock crushes Scissor"          //9
];     
// Messages to be displayed at the end of the game.
const finalMessages = ["Sorry!, You Lost","Wow!, You Tied", "Congratulations!, You Have Won!"]

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
    roundNumber=1;
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
    let outcome=checkOutcome();
    roundNumber++;
    displayInfo()
    if (roundNumber > totalRounds){ // All rounds played
        let finalOutcome=1; // Default to tie
        if (playerScore < computerScore){         // Player lost
            finalOutcome = 0;
            console.log("Player lost")
        }else if (playerScore > computerScore) {  // Player won
            finalOutcome = 2;
            console.log("Player won")
        }
        alert(finalMessages[finalOutcome]);
    }
}

function checkOutcome() {
    console.log("checkOutcome(" +")");
    let index1=weaponChoices[playerChoice][2];
    let index2=weaponChoices[computerChoice][2];
    let outcome = outcomeTable[index1][index2][0];
    let outcomeMessage=outcomeMessages[outcome+1];
    if (outcome === 0) {  // Player and computer have the same weapon, Draw
        let weaponName=  weaponChoices[playerChoice][0];
        resultMessage = outcomeMessage+", Both have choosen " + weaponName
        }
    else
       {                // Player and computer have diferent weapons
        let reason  = outcomeTable[index1][index2][1];
        let outcomeExplain = outcomeReasons[reason];
        resultMessage = outcomeMessage + ", " + outcomeExplain;
        if (outcome<0) { // Player loose
            computerScore++;
        } else {    // player won
            playerScore++;
        }
       }
    return (outcome)
}
