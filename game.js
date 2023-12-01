var buttonColors=["red", "blue", "green", "yellow"];   
var gamePattern=[]; 
var userClickedPattern = [];
var level=0;
var started=false;

$(document).keypress(function() {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      started=true;
      nextSequence();
    }
  });
function nextSequence(){
    
    console.log(level);
    $("#level-title").html("Level " + level);

    var randomNumber=Math.floor(Math.random() * 4);
    var randomColorChooser= buttonColors[randomNumber];
    gamePattern.push(randomColorChooser);

    $("#"+randomColorChooser).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColorChooser);
    
    level++;
}
//$("button").text("hello");
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
    playSound(userChosenColor);
    Animation(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();

}

function Animation(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        // If the user has completed the sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        // Handle the wrong answer case
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        var audio1= new Audio("sounds/wrong.mp3");
        audio1.play();
        startOver();
    }
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];

    
}




       
