var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trexcollided, trexrunning;
  var ground, groundimage, invisibleground
  var cloudimage, CloudsGroup;
var obstacle1, obstacle2,obstacle3, obstacle4, obstacle5, obstacle6, ObstaclesGroup;
var gameover, gameoverimg, restart, restartimg;
var score = 0;
var jump, die, checkpoint;
function preload(){
  trexrunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexcollided = loadImage("trex_collided.png");
  groundimage = loadImage("ground2.png");  
  cloudimage = loadImage ("cloud.png");
  obstacle1 = loadImage ("obstacle1.png");
  obstacle2 = loadImage ("obstacle2.png");
  obstacle3 = loadImage ("obstacle3.png");
  obstacle4 = loadImage ("obstacle4.png");
  obstacle5 = loadImage ("obstacle5.png");
  obstacle6 = loadImage ("obstacle6.png");
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  checkpoint = loadSound("checkPoint.mp3");
}
function setup() {
  createCanvas(600,200);
  trex = createSprite(50,160,5,5);
  trex.scale=0.60;
  trex.addAnimation("trex", trexrunning);
  trex.addAnimation("collided", trexcollided);
  ground = createSprite(200,180,400,10);
  ground.addImage("ground", groundimage);
  ground.x = ground.width/2;
  invisibleground = createSprite(200,195,400,10);
  invisibleground.visible = false;
  CloudsGroup = createGroup();
  ObstaclesGroup = createGroup();
  gameover = createSprite(300,100,10,10);
  gameover.addImage(gameoverimg);
  restart = createSprite(300,140,10,10);
  restart.addImage(restartimg);
  gameover.visible = false;
  restart.visible = false;
  gameover.scale = 0.5;
  restart.scale = 0.5;
  trex.setCollider("circle", 0,0,40);
}

function draw() {
  background(255);
  text("Score : " + score, 500,50);
  if(gameState === PLAY) {
    score = score + Math.round(getFrameRate()/60);
  if(score>0 && score%100 === 0){
    checkpoint.play();
  }
  if (keyDown ("space") && trex.y>160){
  trex.velocityY = -10;
  jump.play();  
  }
  trex.velocityY = trex.velocityY + 0.8;
  ground.velocityX = -6;
  if(ground.x<0){
    ground.x = ground.width/2
  }
  spawnClouds();
  spawnObstacles();
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
      die.play();
    }
  } else if (gameState === END){
   ground.velocityX = 0;
   trex.velocityY = 0;
   ObstaclesGroup.setVelocityXEach(0);
   CloudsGroup.setVelocityXEach(0);
   ObstaclesGroup.setLifetimeEach(-1); 
   CloudsGroup.setLifetimeEach(-1); 
   trex.changeAnimation("collided", trexcollided); 
   gameover.visible = true;
   restart.visible = true; 
  }
    if(mousePressedOver(restart)){
      reset();
    }
    trex.collide(invisibleground);
  
    drawSprites();
    
  }
function reset(){
  gameState = PLAY;
  trex.changeAnimation("trex", trexrunning)
  gameover.visible = false;
  restart.visible = false;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  score = 0;
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(700,120,40,10);
    cloud.y = random(50,100);
    cloud.addImage (cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
     //assign lifetime to the variable
    cloud.lifetime = 250;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,170,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
switch(rand){
        case 1:obstacle.addImage(obstacle1);
        break;
        case 2:obstacle.addImage(obstacle2);
        break;
        case 3:obstacle.addImage(obstacle3);
        break;
        case 4:obstacle.addImage(obstacle4);
        break;
        case 5:obstacle.addImage(obstacle5);
        break;
        case 6:obstacle.addImage(obstacle6);
        break;
        default : break;
        
        
        
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 250;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}