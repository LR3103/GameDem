function startLevel(){    
    $(".start-button").off();
    if (level === 0){
        answerArray = [];
        buttonSequence = [];
        level = 0;
    }
    buttonsOff();
    changeLevelName(level + 1)    
    var randomButtonId = randomizeNumber();
    buttonSequence[level] = randomButtonId;
    showButtonSequenceToUser(buttonSequence);
    answerArray = []
    setButtons()
    //Now the player has to enter the correct sequence
}


function showButtonSequenceToUser(buttonSequence){
    var idArray = ['green', 'red', 'yellow', 'blue']
    for (var i = 0; i < buttonSequence.length; i++)
    {
        (function(i) {
            var buttonIndex = buttonSequence[i];
            setTimeout(function() {
                highlightButton(idArray[buttonIndex]);
            }, i * 1000); // Delays each button by 600ms (adjust time if needed)
        })(i);

    }
}

function randomizeNumber(){//random number between 0-3 3 included
    return Math.floor(Math.random() * 4);
}


function highlightButton(buttonId){
    $("#"+buttonId).addClass("white-border");

    setTimeout(function(){
        $("#"+buttonId).removeClass("white-border");
    }, 500)
}

function highlightButtonInGreen(buttonId){
    $("#"+buttonId).addClass("green-border");

    setTimeout(function(){
        $("#"+buttonId).removeClass("green-border");
    }, 500)
}

function highlightButtonInRed(buttonId){
    $("#"+buttonId).addClass("red-border");

    setTimeout(function(){
        $("#"+buttonId).removeClass("red-border");
    }, 500)
}

function changeLevelName(level){
    $("h1").text("Level " + level)
}

function main(){
    //press any key to begin
    buttonsOff()
    answerArray = [];
    level = 0;
    buttonSequence = [];
    $("h1").text("Press the start button")
    $(".start-button").click(startLevel);
   
}


function setButtons(){
    $(".btn-container").on("click", function() {
        var idArray = ['green', 'red', 'yellow', 'blue'];
        var buttonId = $(this).attr("id");
    
        highlightButton(buttonId);
        
        var buttonIndex = idArray.indexOf(buttonId);
    
    
        answerArray[answerArray.length] = buttonIndex;
        
        if (answerArray.length > buttonSequence.length){
            answerArray = answerArray.slice(0, buttonSequence.length)
        }

        if (answerArray[answerArray.length - 1] !== buttonSequence[answerArray.length - 1]){
            highlightButtonInRed(buttonId);
            answerArray = [];
            buttonSequence = [];    
            level = 0;
            setTimeout(function(){
                main();
            }, 1000);
        }
        if (answerArray[answerArray.length - 1] === buttonSequence[answerArray.length - 1]){
            highlightButtonInGreen(buttonId);
        }
        
        if (answerArray.length === buttonSequence.length && answerArray.length !== 0){
            level++;
            buttonsOff()
            setTimeout(function() {
                startLevel();
            }, 1000); // 1 second delay before calling startLevel
        }
    
    });
}

function buttonsOff(){
    $(".btn-container").off()
}

var answerArray = [];
var buttonSequence = [];
var level = 0;
setButtons();
main();









