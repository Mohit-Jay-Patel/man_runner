var bomb_img,cross_img,mud_img;
var bomb,cross,mud;
var obstacle;
var coin,coin_img;
var energy_drink,energy_drink_img;
var path,road;
var power;
var man,john;
var coin_group,obstacle_group,energy_group;
var score_coin = 0;
var coin_arr = [];
var energy_arr=[];



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
  energy_group = createGroup();




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
  fill("white");
  textSize(20);
  


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
  spawn_energy_drink();

  if(coin_group.isTouching(obstacle_group)){ //to prevent overlapping with obstacle and coin
    coin.remove();
  }

  if(energy_group.isTouching(obstacle_group)){ //to prevent overlapping with obstacle and energy drink
    energy_drink.remove();
  }

  if(energy_group.isTouching(coin_group)){ //to prevent overlapping with coin and energy drink
    energy_drink.remove();
  }

  if(john.isTouching(coin_group)){
    collect_coin();
    score_coin += 1;
    console.log(score_coin);
  }

  if(john.isTouching(energy_group)){
    collect_energy();    
    
  }




  
  drawSprites();

  text("Score : "+score_coin, 270,45);

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

    obstacle = createSprite(obstacle_x,-10);
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

  
  coin = createSprite(coin_x,-10);
  coin_group.add(coin);
  coin_arr.push(coin);
  coin.addImage(coin_img);
  coin.velocityY = 2;
  coin.scale = 0.45;
  }
  
}
var energy_x;
function spawn_energy_drink(){
  if(frameCount % 300 == 0){
    energy_x = Math.round(random(1,3));
    switch(energy_x){
      case 1 :
        energy_x = 90;
        break;
      case 2 :
        energy_x = 200;
        break;
      case 3 :
        energy_x = 310;
        break;
      default :
        break;
    }

    energy_drink = createSprite(energy_x,-10);
    energy_group.add(energy_drink);
    energy_arr.push(energy_drink);
    energy_drink.addImage(energy_drink_img);
    energy_drink.velocityY = 2;
    energy_drink.scale = 0.15;
  }
}

function collect_coin(){
  for(var a = 0;a < coin_arr.length;a++){
    coin_arr[a].remove();
    coin_arr.splice(a , 1);
  }
}

function collect_energy(){
  for(var b = 0;b < energy_arr.length;b++){
    energy_arr[b].remove();
    energy_arr.splice(b,1);
  }
}

