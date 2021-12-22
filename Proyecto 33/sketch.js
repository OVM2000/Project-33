const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine,world;
var disc;
var paddle1, paddle2;
var SlingShot;
var invisibleGround;
var objective
var gameState = 0
var end,play

function preload(){
  BgImg = loadImage("bg.png");
}
function setup() {
  createCanvas(800,400);
  engine = Engine.create();
  world = engine.world;

  invisibleGround = new Stand(550,290, 500, 20)

  //Disco
  disc = new Ball(405,200,50,50);

  //Raquetas
  paddle1 = new Paddle(100,190,90,90);
  
  //Resortera
  SlingShot = new Slingshot(paddle1.body,{x:100,y:190});
  objective = createSprite(790, 200, 10, 150)
 
}

function draw() {
  console.log(gameState)
  
  Engine.update(engine);
  drawSprites();

  if(gameState === 0){
    background(BgImg);  
    
    if(gameState === 0){
        
        disc.display();
       

        paddle1.display();
        
      
        SlingShot.display();
      
        invisibleGround.visible = false;
        objective.visible = false;
      
        if(disc.body.position.x >= 790){
            disc.body.position.x = 405
            disc.body.position.y = 200
          gameState = "end"
        }
    }
   
  }
  else if(gameState === "end"){
    background(0)
    textSize(30);
    text("Game OVER",400,200);
    text("Espacio para reiniciar",400,250);
    if(keyCode === 32 && gameState === "end"){
      gameState = 0
  }
}
}

function mouseDragged(){
  Matter.Body.setPosition(paddle1.body,{x:mouseX,y:mouseY});
}

function mouseReleased(){
  SlingShot.fly();
}

function keyPressed(){
    if(gameState === 0){
  if(keyCode === 32){
      SlingShot.attach(paddle1.body);
  }
}
}