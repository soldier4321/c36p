/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var kangaroo, kangaroo_running, kangaroo_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1, obstacle;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  kangaroo = createSprite(150,240,20,20);
  kangaroo.addAnimation("kangaroo_running",kangaroo_running);
  kangaroo.addAnimation("kangaroo_collided", kangaroo_collided)
  kangaroo.scale = 0.19;
  kangaroo.setCollider("circle",0,0,kangaroo.radius);

  invisiblejungle = createSprite(300,400,1000,10);
  invisiblejungle.visible = false;
  

  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  
  kangaroo.x = camera.position.x-270;

  if(gameState === PLAY){
  jungle.velocityX = -3
  if (jungle.x < 0){
    jungle.x = 200;
  }
  if (invisiblejungle.x < 0) {
    invisiblejungle.x = invisiblejungle.width / 2;
  }

  kangaroo.velocityY = kangaroo.velocityY + 0.8
  if(keyDown("space")){
    kangaroo.velocityY = -15;

  }

  if(kangaroo.isTouching(shrubsGroup)){
    shrubsGroup.destroyEach();
  }

  if(kangaroo.isTouching(obstaclesGroup)){
    gameState = END;
  }
}

  if(gameState === END){
    kangaroo.changeAnimation(kangaroo_collided);



    invisiblejungle.x = 0;
    jungle.velocityX =0;

    obstaclesGroup.destroyEach();
    shrubsGroup.destroyEach();
  }


  kangaroo.collide(invisiblejungle);

  spawnShrub();
  spawnObstacles();


  drawSprites();

}

function spawnShrub(){
  if(frameCount % 150 ===0){
    var shrub = createSprite(camera.position.x+500,300,40,10);
    shrub.velocityX = -6;

    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: shrub.addImage(shrub1);
            break;
      case 2: shrub.addImage(shrub2);
            break;
      case 3: shrub.addImage(shrub3);
      default: break;

    }
      shrub.scale = 0.07;
      shrub.lifetime = 300;

      shrubsGroup.add(shrub);

    }
  }

  function spawnObstacles(){
    if(frameCount %100 === 0){
      var obstacle = createSprite(700,300,10,10);
      obstacle.velocityX = -6;
      obstacle.addImage(obstacle1);
      obstacle.scale = 0.1;
      obstacle.lifetime = 200;

      obstaclesGroup.add(obstacle);


  
    }
  }


  
  