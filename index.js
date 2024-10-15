function main(){
    answerArray = [];
    buttonSequence = [];
    level = 0;

    setOffButoons();
    
    $("h1").text("Click the start button to play the game!");
    $(".start-button").on("click", startLevel);
}

function startLevel(){
    //start level sound
   
    playButtonSound("sucsses");
    
    setTimeout(function(){
        //sutting off start button
        $(".start-button").off();
        //display level
        displayLevelNumber(level + 1);
        //adding to sequence
        buttonSequence[buttonSequence.length] = randomButton();
        //show sequence to the user
        presentSequenceToUser(buttonSequence);
        //setting the buttons
        answerArray = [];
        SetButtons();
        //wait for user respond
    }, 1000)    
}

function displayLevelNumber(level){
    $("h1").text("Level " + level);
}

function randomButton(){
    //returns the id attribute of a random button in the buttons containers
    return $(".btn-container").eq(Math.floor(Math.random() * 4)).attr('id');
}

function presentSequenceToUser(sequence){ 
    setOffButoons();
    for (var i = 0; i < sequence.length; i++) {
        (function(i) {
            setTimeout(function() {
                highLightButton(sequence[i], 'white'); // Highlight the button with the current element
                playButtonSound(sequence[i])
            }, 500 * i);
        })(i); // IIFE to capture the current value of 'i'
    }
}

function highLightButton(buttonId, color){
    $("#" + buttonId).addClass(color + '-border');
    
    setTimeout(function(){
        $("#" + buttonId).removeClass(color + '-border');
    }, 250)
}

function SetButtons(){
    $(".btn-container").on("click", function(){
        //add the button id to the answer array
        answerArray[answerArray.length] = $(this).attr('id');
        //we figure out if the button pressed is correct
        //the user may spam to many buttons
        if (answerArray.length > buttonSequence.length){
            answerArray.slice(0, buttonSequence.length);
        }
        //check if correct button
        var correctButton = isCorrectButton(answerArray, buttonSequence)
        if (correctButton && answerArray.length === buttonSequence.length){
            highLightButton(answerArray[answerArray.length - 1], 'green');
            playButtonSound(answerArray[answerArray.length - 1]);

            setOffButoons();
            answerArray = [];
            level++;
            setTimeout(function(){
                startLevel();
            }, 1000);

        } else if (correctButton){
            highLightButton(answerArray[answerArray.length - 1], 'green');
            playButtonSound(answerArray[answerArray.length - 1]);
        
        } else{
            
            highLightButton(answerArray[answerArray.length - 1], 'red');
            playButtonSound('wrong');
            main();
        }

    });
}

function isCorrectButton(answerArray, buttonSequence){
    if (answerArray[answerArray.length - 1] !== buttonSequence[answerArray.length - 1]){
        return false;
    }
    return true;

}

function setOffButoons(){
    $(".btn-container").off();
}

function playButtonSound(buttonId){
    var soundsId = ["blue", "green", "red", "sucsses", "wrong", "yellow"]
    audios[soundsId.indexOf(buttonId)].play()
}

var answerArray;
var buttonSequence;
var level;
var audios = [new Audio("./sounds/blue.mp3"), new Audio("./sounds/green.mp3"), new Audio("./sounds/red.mp3"), new Audio("./sounds/sucsses.mp3"),new Audio("./sounds/wrong.mp3"), new Audio("./sounds/yellow.mp3")]
main();









