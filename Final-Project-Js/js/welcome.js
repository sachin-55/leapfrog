function Welcome(ctx){
var that=this;
this.context=ctx;

    this.draw = function(){
        
        var gameTitle = new Image();
        gameTitle.src = 'images/cat-jumping.png';
        gameTitle.onload = function(){
            that.context.drawImage(gameTitle,140,50,300,150);
        }

         var gamePlay = new Image();
        gamePlay.src = 'images/play.png';
        gamePlay.onload = function(){
            that.context.drawImage(gamePlay,140,600,300,30);
        }

     


    }




}