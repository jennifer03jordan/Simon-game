var userClickedPattern=[];
var gamePattern=[];
var buttonColors=["red", "blue", "green", "yellow"];
var started=false;
var level=0;
function nextSequence(){
  level++;
  $("h1").text("level-"+level);
  var randomNumber=Math.round(Math.random()*3);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
 }
$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

$(document).keydown(function(){
if(!started){
  $("#level-title").text("level-"+level);
  nextSequence();
  started=true;
}
});
function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
  console.log("success");
if((userClickedPattern.length)===gamePattern.length){
  setTimeout(function(){
    nextSequence();
  },1000);
  userClickedPattern=[];
  }
}
else{console.log("wrong");
playSound("wrong");
$("h1").text("Game Over, Refresh page to Restart the game");
$("body").addClass("game-over");
setTimeout(function(){$("body").removeClass("game-over");},200);
startOver();
}
function startOver(){
  level=0;
  gamePattern=[0];
  started=false;
}
}
