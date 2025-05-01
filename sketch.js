var bomb_img,cross_img,mud_img;
var bomb,cross,mud;
var obstacle;
var coin,coin_img;
var energy_drink,energy_drink_img;
var path,road;
var power;
var man,john;
var coin_group,obstacle_group;
var score_coin = 0;

function preload(){
  //pre-load images
  path = loadImage("path.png");
  man = loadAnimation("Runner-1.png","Runner-2.png");
  bomb_img = loadImage('bomb.png');
  cross_img = loadImage('cross.png');
  mud_img = loadImage('mud.png');
  coin_img = loadImage('coin.png');
  energy_drink_img = loadImage('energyDrink.png');
  coin_group = createGroup();
  obstacle_group = createGroup();




}

function setup(){
  createCanvas(400,400);

  road = createSprite(200,200);
  road.addImage(path)
  road.scale = 1.2;
  john = createSprite(200,300);
  john.addAnimation("John_Runner",man);
  john.scale = 0.08;



  road.velocityY = 2;


  //create sprites here
}

function draw() {
  background(0);
  if(road.y > 400){
    road.y = 200;
  }

  john.x = World.mouseX;

  if(john.x < 100){
    john.x = 100;
  }
  if(john.x > 320){
    john.x = 320;
  }

  spawn_obstacles();
  spawn_coin();

  if(coin_group.isTouching(obstacle_group)){ //to prevent overlapping use isTouching
    coin.remove();
  }

  if(john.isTouching(coin_group)){
    coin.destroy();
    score_coin += 1;
    console.log(score_coin);
    
  }

  drawSprites();

  

}
var obstacle_x;
function spawn_obstacles(){

  if(frameCount % 200 == 0){
    obstacle_x = Math.round(random(1,3));
    switch(obstacle_x){
      case 1 :
        obstacle_x = 100;
        break;
      case 2 :
        obstacle_x = 200;
        break;
      case 3 :
        obstacle_x = 315;
        break;
      default :
        break;
    }

    obstacle = createSprite(obstacle_x,0);
    obstacle_group.add(obstacle);

    obstacle.velocityY = 2;
    var ran_num = Math.round(random(1,3));
    switch(ran_num){
      case 1 :
        obstacle.addImage(bomb_img);
        obstacle.scale = 0.1;
        break;
      case 2 :
        obstacle.addImage(mud_img);
        obstacle.scale = 0.33;
        break;
      case 3 :
        obstacle.addImage(cross_img);
        //obstacle.debug =  true;
        obstacle.scale = 0.3;
        break;
      default :
        break; 
    }
  }
}
var coin_x;
function spawn_coin(){
  if(frameCount % 80 == 0){
    coin_x = Math.round(random(1,3));
    switch(coin_x){
      case 1 :
        coin_x = 90;
        break;
      case 2 :
        coin_x = 200;
        break;
      case 3 :
        coin_x = 310;
        break;
      default :
        break;
    }

  
  coin = createSprite(coin_x,0);
  coin_group.add(coin);
  coin.addImage(coin_img);
  coin.velocityY = 2;
  coin.scale = 0.45;
  }
  
}