class Game {
  constructor(){}

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
     plane1 = createSprite(100,200);
     plane2 = createSprite(100,400);
     plane3 = createSprite(100,600);
     planes = [plane1,plane2,plane3];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    text("Press right arrow",width/2,50);
    if(allPlayers !== undefined){
      var index = 0;
      var y = 0,x;
      for(var plr in allPlayers){
        index += 1;
        y += 200;
        x = displayWidth - allPlayers[plr].distance;
        planes[index-1].x=x;
        planes[index-1].y=y;
        if(index === player.index){
          planes[index-1].shapeColor="red";
         
          camera.position.x = planes[index-1].x;
          camera.position.y = displayHeight/2;
        }
      }
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance -=10;
      player.update();
    }
  drawSprites();
  }
 }

