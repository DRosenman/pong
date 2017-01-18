// Based largely off of http://p5play.molleindustria.org/examples/index.html?fileName=pong.js#
//(much of my code is copied straight from that program. I just changed the control of the right paddle... added all the text)...
// added a reset function....

var paddleA, paddleB, ball, wallTop, wallBottom;
var MAX_SPEED = 12; // ball speed ... I changed this around so many times I'm not sure if it is the same as the example.
var speed1 = 1; // controls speed of paddle...horrible name... will change it for final submission.
// (original game had no scores)
var userScore = 0; 
var compScore = 0;
var winningScore = 10; // when the user or computer gets to 10 scores,the game ends. I just set it really low 
// so that if you're busy and don't have the t
var timeInBetweenGames = 600; // (real time in between games is timeInBetweenGames/framerate)
var resetCountdown = 0; // works in conjunction with timeInBetweenGames 
function setup() {
  
  createCanvas(800,600); //doubled the canvas size
  //frameRate(6);
  
  paddleA = createSprite(30, height/2, 10, 100); // creation of paddles. Unchanged from example
  paddleA.immovable = true; // unchanged from example; paddless behaves like they have infinite mass.
  
  paddleB = createSprite(width-28, height/2, 10, 100);
  paddleB.immovable = true;
  
  wallTop = createSprite(width/2, -30/2, width, 30); // creation of walls.. unchanged from examples. Walls behave as if they have infinite mass.
  wallTop.immovable = true;
  
  wallBottom = createSprite(width/2, height+30/2, width, 30);
  wallBottom.immovable = true;
  
  ball = createSprite(width/2, height/2, 10, 10);
  ball.maxSpeed = MAX_SPEED;
  
  paddleA.shapeColor = paddleB.shapeColor =ball.shapeColor = color(255,255,255);
   
  ball.setSpeed(MAX_SPEED, 0); // ball originally moves towards computer paddle.. In original example it moves towards the left paddle. 
                                // since the mouse controls the paddle location, it is easy to end up with paddle out of place and give the computer an eays point after each reset...
                                // since the right paddle just stays at height/2 when the ball is at height/2 (which is where it is on restarts), the ball will just hit off 
                                // the computer paddle and then head back to the user paddle... buying the user a little bit of time. Could've made the reset transition smoother another way, 
                                // but it took me so long to figure out how create a workable and playable version of my program that I probably won't have the time.

}

function draw() {
  background(0);
  push();
  stroke(100);

  pop();



  paddleA.position.y = constrain(mouseY, paddleA.height/2, height-paddleA.height/2);

    // strategy behind control of right paddle: have paddle hover around y = height/2. Have paddle be 'smart enough' not to be tricked by bounces
    // off top wall and bottom wall. For this to be so, as long as the ball is less than two-thirds of the way to the right end,
    // make the paddle pretty much hover close to the middle. Only have it commit to move up or down from the middle height 
    // after the ball is two thirds plus of the way to the right end.
    // so that the computer isn't impossible to beat, change lower the speed of the right paddle when the x position of the ball is close to the right end of the canvas and the ball's
    // height is pretty far above or below the height of the paddle.

   // RIGHT PADDLE MOTION WHEN BALL IS  MOVING TO THE LEFT. 
    // (right paddle moves to center height)
   //-----------------------------------------------------------------------------
  if(ball.position.x > ball.previousPosition.x && ball.position.x > (2/3)*width && sqrt(pow(ball.position.y-paddleB.position.y,2)) > 200 ){
    speed1 = 0.1;
  }

  else {
    speed = 1;
  }

  if (ball.position.x < ball.previousPosition.x) {                         
    if(paddleB.position.y < height/2) {
      paddleB.position.y += ((height/2)-paddleB.position.y)*speed1;         
    }
    if(paddleB.position.y >= height/2) {
      paddleB.position.y -= (paddleB.position.y-(height/2))*speed1;        
    }
  }
//---------------------------------------------------------------------------------
  // RIGHT PADDLE MOTION WHEN BALL IS MOVING TO THE RIGHT AND IN THE UPPER HALF OF THE CANVAS AND IS CHANGING HEIGHT
  // 
   if (ball.position.x >= ball.previousPosition.x && ball.position.y < height/2 && ball.position.y-ball.previousPosition.y != 0) {
  //--------------------------------------------------------------------------------------------------------
      if(ball.position.x <width*(2/3)) {             // WHEN THE BALL IS GREATER THAN 1/3's OF THE LENGTH OF THE CANVASAWAY FROM RIGHT END...
      // ----------------------------------------------------------------
          if(ball.position.y < ball.previousPosition.y ) {  // ... and is moving towards the top bumper.
              if(paddleB.position.y >= height/2){
              paddleB.position.y -= (paddleB.position.y-(height/2))*speed1;
                 }
              if(paddleB.position.y < height/2) {
                paddleB.position.y +=0;
              }
            }
         //----------------------------------------
          if(ball.position.y > ball.previousPosition.y) { //... and is moving towards the bottom
              if(paddleB.position.y < height/2){
              paddleB.position.y += (paddleB.position.y-(height/2))*speed1;
                 }
              if(paddleB.position.y >= height/2) {
                paddleB.position.y +=0;
              }
          
            }
          // ---------------------------------------
        } 
      //---------------------------------------------------------------
      if(ball.position.x >= width*(2/3)){            // WHEN THE BALL IS WITHIN 1/3 OF THE LENGTH OF THE CANVAS AWAY FROM RIGHT END
        // ----------------------------------------------------------------
          if(ball.position.y < ball.previousPosition.y ) {  // ... and is moving towards the top bumper.
              if(ball.position.y < paddleB.position.y) {
                paddleB.position.y -= (paddleB.position.y - ball.position.y)*speed1;
              }
              if (ball.position.y >= paddleB.position.y) {
                paddleB.position.y += (ball.position.y - paddleB.position.y)*(speed1/2);
              }
              
            }
         //----------------------------------------
          if(ball.position.y > ball.previousPosition.y) { //... and is moving towards the bottom
              if(ball.position.y < paddleB.position.y){
              paddleB.position.y -= (paddleB.position.y-ball.position.y)*speed1/2;
                 }
              if(ball.position.y>= paddleB.position.y) {
                paddleB.position.y += (ball.position.y-paddleB.position.y)*speed1;
              }
          
            }
          // ---------------------------------------
        } 
      //---------------------------------------------------------------
    }

  

  // RIGHT PADDLE MOTION WHEN BALL IS  MOVING TO THE LEFT. 
    // (right paddle moves to center height)
   //-----------------------------------------------------------------------------
  if (ball.position.x < ball.previousPosition.x) {                         
    if(paddleB.position.y < height/2) {
      paddleB.position.y += ((height/2)-paddleB.position.y)*speed1;         
    }
    if(paddleB.position.y >= height/2) {
      paddleB.position.y -= (paddleB.position.y-(height/2))*speed1;        
    }
  }
//---------------------------------------------------------------------------------

  // RIGHT PADDLE MOTION WHEN BALL IS MOVING TO THE RIGHT AND IN THE LOWER HALF OF THE CANVAS AND IS CHANGING HEIGHT
  // 
   if (ball.position.x > ball.previousPosition.x && ball.position.y >= height/2 && ball.position.y-ball.previousPosition.y != 0) {
  //--------------------------------------------------------------------------------------------------------
      if(ball.position.x < width*(2/3)) {             // WHEN THE BALL IS GREATER THAN 1/3's OF THE LENGTH OF THE CANVASAWAY FROM RIGHT END...
      // ----------------------------------------------------------------
          if(ball.position.y < ball.previousPosition.y ) {  // ... and is moving towards the top bumper.
              if(paddleB.position.y >= height/2) {
              paddleB.position.y -= (paddleB.position.y-(height/2))*speed1;
                 }
              if(paddleB.position.y < height/2) {
                paddleB.position.y +=0;
              }
            }
         //----------------------------------------
          if(ball.position.y > ball.previousPosition.y) { //... and is moving towards the bottom
              if(paddleB.position.y < height/2){
              paddleB.position.y += (paddleB.position.y-(height/2))*speed1;
                 }
              if(paddleB.position.y >= height/2) {
                paddleB.position.y +=0;
              }
          
            }
          // ---------------------------------------
        } 
      //---------------------------------------------------------------
      if(ball.position.x >= width*(2/3)){            // WHEN THE BALL IS WITHIN 1/3 OF THE LENGTH OF THE CANVAS AWAY FROM RIGHT END
        // ----------------------------------------------------------------
          if(ball.position.y < ball.previousPosition.y ) {  // ... and is moving towards the top bumper.
              if(ball.position.y < paddleB.position.y) {
                paddleB.position.y -= (paddleB.position.y - ball.position.y)*speed1;
              }
              if (ball.position.y >= paddleB.position.y) {
                paddleB.position.y += (ball.position.y - paddleB.position.y)*(speed1/2);
              }
              
            }
         //----------------------------------------
          if(ball.position.y > ball.previousPosition.y) { //... and is moving towards the bottom
              if(ball.position.y < paddleB.position.y){
              paddleB.position.y -= (paddleB.position.y-ball.position.y)*speed1/2;
                 }
              if(ball.position.y>= paddleB.position.y) {
                paddleB.position.y += (ball.position.y-paddleB.position.y)*speed1;
              }
          
            }
          // ---------------------------------------
        } 
      //---------------------------------------------------------------
    }
      
 if(ball.position.x > ball.previousPosition.x && ball.position.y - ball.previousPosition.y == 0){
    
    if(paddleB.position.y >= ball.position.y){
      paddleB.position.y -= (paddleB.position.y-ball.position.y)*speed1;;
    }
    if(paddleB.position.y < ball.position.y) {
      paddleB.position.y += (ball.position.y-paddleB.position.y)*speed1;
    }
    if(paddleB.position.y - ball.position.y == 0) {
      paddleB.position.y +=0;
    }
  
 }


      


  ball.bounce(wallTop);     // make balls bounce off the top and bottom walls. Same as code from original example.
  ball.bounce(wallBottom);
  

  if(ball.bounce(paddleA)) { //controls user paddle/ball collision and rebound.Unchanged from example. same thing with code for 'compter paddle'.
    var swing = (ball.position.y-paddleA.position.y)/3; 
    ball.setSpeed(MAX_SPEED, ball.getDirection()+swing);

  }
  
  if(ball.bounce(paddleB)) {
    var swing = (ball.position.y-paddleB.position.y)/3;
    ball.setSpeed(MAX_SPEED, ball.getDirection()-swing);
  }
  

  if(ball.position.x<0) { // controlls what happens when computer gets a point (when the ball gets past the user paddle). first three lines same as from example.
  ball.position.x = width/2; // ball restart position 
  ball.position.y = height/2;
  ball.setSpeed(MAX_SPEED, 0);  // ball heads back towards computer paddle (changed by me. original angle was 180)
  if(compScore < 21){ // adds one to the computer's score as long as it is under 21.  (added by me)
  compScore +=1; }
  }
  
  if(ball.position.x>width) { // controlls what happens when user gets a point (same as what happens when computer gets one)
  ball.position.x = width/2;
  ball.position.y = height/2;
  ball.setSpeed(MAX_SPEED, 0); // original example angle was 180.
  if (userScore <10) { // // added by me
    userScore +=1;
  }
  
  }
  push(); // score display... plus end of game
  stroke(40,40,245);
textFont("Calibre");
textSize(25);
  if(userScore < winningScore && compScore < winningScore ){
  text("Score: " + "Player: " + userScore + ", Computer: "  + compScore, width/3 -40, 40);

}
if(userScore == winningScore){

if(resetCountdown < timeInBetweenGames){
  resetCountdown +=1;
  reset("WIN", "NICE JOB!!",resetCountdown);
}
}

if(compScore == winningScore){
  
  if(resetCountdown < timeInBetweenGames){
  resetCountdown +=1;
  reset("Lose", "Oh Well!",resetCountdown);
  }
} 



drawSprites();
  
}

function reset(winner,comment,counter) {
  
  ball.setSpeed(0,0);
  background(0);
    
    stroke(240,12,12);
    
    text("You " + winner + ". " + comment,width/3 +12 ,height/2 - 50);

    text("NEW GAME STARTING STARTING IN...  " + (timeInBetweenGames - counter)/frameRate(),width/3 -178 ,height/2 + 150); // 
    if(counter == timeInBetweenGames - 1){
    ball.setSpeed(MAX_SPEED,0);
    userScore = 0;
    compScore = 0;
    resetCountdown = 0;

  }
  }

  

