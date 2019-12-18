function GameOver(ctx) {
    var that = this;
    this.context = ctx;

    this.draw = function () {

        setTimeout(function () {
            var gameOver = new Image();
            gameOver.src = 'images/gameover.png';
            gameOver.onload = function () {
                that.context.drawImage(gameOver, 150, 50, 300, 150);
            }

            var gamePlay = new Image();
            gamePlay.src = 'images/restart.png';
            gamePlay.onload = function () {
                that.context.drawImage(gamePlay, 140, 600, 300, 30);
            }
        }, 200);





    }


}