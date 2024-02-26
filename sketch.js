const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var cookie, cookieImg;
var score = 0;
let clickPower = 1;
var cookieupgrade = 0;
var cookieupImg;
var gamestate = 0;
var startBtn;

function preload() {
  cookieImg = loadImage("goodcookie.png");
  cookieupImg = loadImage("Upgrade.PNG");
}

function setup() {
  createCanvas(400, 400);
  background(255, 255, 255);
  background("Gray");

  cookie = createSprite(200, 200, 100, 100);
  cookie.addImage(cookieImg);
  cookie.scale = 0.2;

  cookieupgrade = createSprite(90, 350, 100, 100);
  cookieupgrade.addImage(cookieupImg);
  cookieupgrade.scale = 0.3;

  engine = Engine.create();
  world = engine.world;

  startBtn = createSprite(width / 2, height / 2, 100, 50);
  startBtn.shapeColor = color(255);
}

function draw() {
  if (gamestate === 0) {
    // Draw the start button
    background("Gray");
    fill(255);
    textSize(20);
    textAlign(CENTER);
    text("Click to Play. Click on the box to gain score/cookie. Click on P/Space to Increase Click power", width / 2, height / 2);

    if (mousePressedOver(startBtn)) {
      gamestate = 1; // Change game state to 1 when start button is clicked
    }
  } else if (gamestate === 1) {
    // Draw the actual game
    background(200);
    textSize(20);
    textAlign(CENTER);
    text(`Score/Cookie: ${score}`, width / 2, 30);
    text("press P, To Increase Click Power", 255, 80);
    text(`Click Power: ${clickPower}`, width / 2, 60);
    text(`Score Goes up based on the Click Power`, width / 2, 120);
    text(`Click on the cookie`, width / 2, 100);
    text(`If click power is 2, `, width / 2, 280);
    text('pressing P will make Cookie increase numbure by 2', width / 2, 300);

    drawSprites();
  }

  Engine.update(engine);
}

function keyPressed() {
  // Pressing 'P' key increases click power
  if (key === 'p' || key === 'P') {
    clickPower++;
  }

  // Pressing SPACE key upgrades cookie
  if (keyCode === 32) { //space
    if (score >= 3) { // Check if there are enough cookies to upgrade
      score += 3;
      cookieupgrade++; // Increment cookie upgrade level
      if (cookieupgrade <= 5) { // Apply multiplier for the first 5 upgrades
        clickPower = cookieupgrade + 1; // Set click power based on upgrade level
      }
    }
  }
}

function mouseClicked() {
  if (gamestate === 1 && cookie.overlapPoint(mouseX, mouseY)) {
    score += clickPower; // Increment score based on click power
  }
}
