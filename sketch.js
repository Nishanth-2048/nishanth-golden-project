var sticks, stick1, stick2, stick3, stick4;
var coins , barrier, car1, car2, cone;

var canvas, backgroundImage;
var coin;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var track, stick1_img, stick2_img, stick3_img, stick4_img;


function preload(){
    track = loadImage("images/track.jpg");
    stick1_img = loadImage("images/stick.png");
    stick2_img = loadImage("images/stick2.png");
    stick3_img = loadImage("images/stick3.png");
    stick4_img = loadImage("images/stick4.png");
    coin = loadImage("images/coin.jpg");
  }
function setup(){
  canvas = createCanvas(100,100);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}
function draw(){
  background(20);

  drawSprites();
}
 
  