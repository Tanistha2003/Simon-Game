var level=0;

var a=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var game=false;

//First page of game("Press key to start")
$(document).keydown(function(){
    if(game==false){

        $("h1").text("Level "+level);
        nextSequence();
        game=true;

    }
});


//For user click sequence on button
$("button").click(function(){
    var userChosenColor=$(this).attr("class");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

//user pattern click
function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        if(currentLevel==gamePattern.length-1)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
            //correct pattern, next Level
        }
    }
    else
    {
        //wrong patter, Game over
        playSound("wrong");

        $("body").addClass("game-over");
        $("h1").text("Game-Over. Press any key to restart");
        setTimeout(function(){
     
            $("body").removeClass("game-over");
        },200);

           startOver();

    }

}


//for computer generated button pattern- one button in every level
function nextSequence(){
    userClickedPattern=[];
    level=level+1;
    $("h1").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=a[randomNumber];
    gamePattern.push(randomChosenColor);

    $("."+randomChosenColor).fadeOut(100).fadeIn(100);
       
    playSound(randomChosenColor);
   // animatePress(randomChosenColor);

}

//button sound link
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3"); 
    audio.play();
}

//indicating button click
function animatePress(currentColor){
    
     $("button."+currentColor).addClass("pressed");

     setTimeout(function(){
             $("button."+currentColor).removeClass("pressed");
         },100);
    
}

//game restart
function startOver(){

    level=0;
    gamePattern=[];
    game=false;
}


