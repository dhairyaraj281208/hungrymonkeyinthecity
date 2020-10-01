var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var ground, groundImage;
var background, backgroundImage;
var gameOver, gameOverImage;
var restart, restartImagep;
var end;
var start;
var gameState;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  backgroundImage = loadImage("background.jpg");

  gameOverImage = loadImage("gameover.png");

  restartImagep = loadImage("restart.png");
}

function setup() {
  createCanvas(400, 400);

  background = createSprite(200, 200, 400, 400);
  background.addImage(backgroundImage);

  obstacleGroup = createGroup();
  fruitsGroup = createGroup();

  ground = createSprite(0, 320, 600, 10);
  ground.visible = false;
  ground.velocityX = -3;
  ground.collide = monkey;


  monkey = createSprite(50, 285, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
}


function draw() {

if (gameState === start) {
  spawnobstacles();
}


  
  if (ground.x < 0) {
    ground.x = ground.width / 2;

  }
  if (keyDown("space") && monkey.y >= 100) {
    monkey.velocityY = -12;
  }

  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
  if (obstacleGroup.isTouching(monkey)) {
    monkey.visible = false;
    gameover();
    restartImage();   
  }
  if (fruitsGroup.isTouching(monkey)) {
    score = score + 1;
  }

  drawSprites();
  fill("black");
  text("Score :" + score, 350, 50);
}

function gameover() {
  var gameover = createSprite(200, 200, 50, 20);
  gameover.addImage(gameOverImage)
  gameover.scale = 1;
}

function restartImage() {
  var restart = createSprite(200, 300, 20, 20);
  restart.addImage(restartImagep);
  restart.scale = 0.1;
}
function spawnobstacles() {
  if (frameCount % 120 === 0) {
    var obstacle = createSprite(400, 300, 10, 40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
  if (frameCount % 120 === 0) {
    var banana = createSprite(400, 200, 10, 40);
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -3;
    banana.lifetime = 200;
    fruitsGroup.add(banana);
  }
}
