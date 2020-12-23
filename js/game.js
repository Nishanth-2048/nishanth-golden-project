class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      stick1 = createSprite(100,200);
      stick1.addImage("stick1",stick1_img);
      stick2 = createSprite(300,200);
      stick2.addImage("stick2",stick2_img);
      stick3 = createSprite(500,200);
      stick3.addImage("stick3",stick3_img);
      stick4 = createSprite(700,200);
      stick4.addImage("stick4",stick4_img);
      sticks = [stick1, stick2, stick3, stick4];
    }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();
      player.getSticksAtEnd();
  
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
        
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 175 ;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = x + 200;
          //use data form the database to display the cars in y direction
          y = displayHeight - allPlayers[plr].distance;
          sticks[index-1].x = x;
          sticks[index-1].y = y;
         // console.log(index, player.index)
  
         
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            sticks[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = sticks[index-1].y;
          }
         
        }  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=30
        player.update();
      }
  
      if(player.distance > 3860){
        gameState = 2;
        player.rank+=1;
        Player.updateSticksAtEnd(player.rank);
      }
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
    }
  }
  