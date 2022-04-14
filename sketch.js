var ground;
var groundImage;
var trex, trex_animation;
var invisibleground;
var clouds, cloudImage;
var cactus,
  cactusimage1,
  cactusimage2,
  cactusimage3,
  cactusimage4,
  cactusimage5,
  cactusimage6;
var score = 0;

var play = 0;
var end = 1;
var gamestate = play;
var cloudsGroup;
var cactusGroup;
var gameImage, gameover;
var restartImage, restart;

function preload() {
  trex_animation = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  cactusimage1 = loadImage("obstacle1.png");
  cactusimage2 = loadImage("obstacle2.png");
  cactusimage3 = loadImage("obstacle3.png");
  cactusimage4 = loadImage("obstacle4.png");
  cactusimage5 = loadImage("obstacle5.png");
  cactusimage6 = loadImage("obstacle6.png");
  gameImage = loadImage("gameOver.png");
  restartImage = loadImage("restart (1).png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(30, 180, 50, 50);
  trex.addAnimation("trex", trex_animation);
  trex.scale = 0.4;
  //create a trex sprite

  ground = createSprite(300, 185, 600, 10);
  ground.addImage("floor", groundImage);
  invisibleground = createSprite(300, 190, 600, 10);
  invisibleground.visible = false;
  // cloudsGroup=createGroup();
  // cactusGroup=createGroup();
  cloudsGroup = new Group();
  cactusGroup = new Group();
  gameover = createSprite(250, 85);
  gameover.addImage("gameover", gameImage);
  gameover.scale = 0.5;
  restart = createSprite(300, 120);
  restart.addImage("restart", restartImage);
  restart.scale = 0.4;
}

function draw() {
  background("black");
  drawSprites();
  textSize(25);
  if (gamestate === play) {
    score = score + 1;
    if (keyDown("space") && trex.y >= 166) {
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.5;
    ground.velocityX = -10;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    // console.log(trex.y);
    createclouds();
    createobstacles();
    if (cactusGroup.isTouching(trex)) {
      gamestate = end;
    }
    gameover.visible=false
    restart.visible=false
  } else if (gamestate === end) {
    trex.velocityY = 0;
    ground.velocityX = 0;
    cloudsGroup.setVelocityXEach(0);
    cactusGroup.setVelocityXEach(0);
    cactusGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    gameover.visible=true
    restart.visible=true
  }

  text("score:" + score, 400, 50);

  //gravity to the trex

  trex.collide(invisibleground);
}
function createclouds() {
  if (frameCount % 60 === 0) {
    clouds = createSprite(550, 50, 40, 10);
    clouds.addImage("cloud", cloudImage);
    clouds.scale = 0.4;
    clouds.velocityX = -3;
    clouds.y = Math.round(random(50, 100));

    trex.depth = clouds.depth;
    trex.depth += 1;
    // console.log("clouds.depth is",clouds.depth)
    // console.log("trex.depth is",trex.depth)
    clouds.lifetime = 183;
    cloudsGroup.add(clouds);
  }
}
function createobstacles() {
  if (frameCount % 60 === 0) {
    cactus = createSprite(570, 170, 20, 80);
    cactus.scale = 0.5;
    cactus.velocityX = -5;
    cactus.lifetime = 114;
    var Number = Math.round(random(1, 6));
    switch (Number) {
      case 1:
        cactus.addImage(cactusimage1);
        break;
      case 2:
        cactus.addImage(cactusimage2);
        break;
      case 3:
        cactus.addImage(cactusimage3);
        break;
      case 4:
        cactus.addImage(cactusimage4);
        break;
      case 5:
        cactus.addImage(cactusimage5);
        break;
      case 6:
        cactus.addImage(cactusimage6);
        break;
      default:
        break;
    }
    cactusGroup.add(cactus);
  }
}
