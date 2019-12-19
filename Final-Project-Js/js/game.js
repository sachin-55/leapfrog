

var key = null;

window.addEventListener('keydown', function (e) {
    key = e.keyCode;
    // console.log(key);

});

function Game(height, width) {
    this.height = height;
    this.width = width;
    this.canvas = null;
    this.ctx = null;
    this.cat = null;
    this.world = null;
    this.blocks = [];
    this.frameCount = 0;
    // var fps, fpsInterval, startTime, now, then, elapsed;
    this.fpsInterval = null;
    this.now = null;
    this.then = null;
    this.elapsed = null;
    this.startTime = null;
    this.catX = 100;
    var catY = null;
    var that = this;
    var rollScreen = false;
    var perfect = 0;
    var bulletSpeed = 10;
    var score = 0;
    var startGame = true;
    var gameover = false;
    var bullets = [];
    var numberOfBullets = 20;
    var bulletNumber = 0;
    var fireBullet = false;
    this.aroundCat = {
        'top': 0,
        'right': 0,
        'bottom': 0,
        'current': 0

    }



    this.createCanvas = function () {
        this.canvas = document.getElementById('cat-canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');


    }


    this.createCat = function () {
        this.cat = new Cat(50, 50, this.ctx);
        this.cat.drawCat();

    }

    this.createBlock = function (posX, posY) {
        var b = new Block(posX, posY, 50, 50, this.ctx);
        this.blocks.push(b.drawBlock());


    }

    this.createWorld = function () {
        this.world = new World();
        this.world.drawGrid();
    }

    this.createBullet = function () {
        catY = that.cat.getPositionY();

        // for (var i = 0; i < numberOfBullets; i++) {
        bullets.push(new Bullet(this.ctx, 100 + 50, catY, 5, bulletSpeed));
        // }
    }

    this.welcome = function () {
        new Welcome(this.ctx, this.canvas).draw();

        var start = setInterval(function () {
            that.cat.moveDown();
            that.cat.drawCat();
            that.ctx.clearRect(100, that.cat.getPositionY() - 5, 50, 50);

            if (that.world.getGridPosition(that.catX, that.cat.getPositionY() + 50).value == 1) {
                clearInterval(start);
                console.log("clickable");


                that.canvas.onclick = function (e) {
                    var mouse = {
                        'x': window.innerWidth - (window.innerWidth),
                        'y': e.y
                    }

                    var img = new Image();
                    img.src = 'images/paws.png';
                    img.onload = function () {
                        that.ctx.drawImage(img, 10, 12, 50, 50);
                    }
                    that.ctx.clearRect(0, 0, that.width, that.height);
                    that.cat.drawCat();
                    rollScreen = true;

                    if (startGame == true && gameover == false) {
                        that.canvas.onclick = null;
                        game.startAnimating(600);

                    }
                }



            }

        }, 20);

    }

    this.init = function () {
        that.createCanvas();
        that.createCat();
        that.createWorld();
        that.welcome();



    }
    this.updateStatusBar = function () {
        new StatusBar(this.ctx).update(this.catX, that.world.getWidth());
    }


    this.updatevalue = function () {
        catY = that.cat.getPositionY();
        that.catX += 5;
        this.aroundCat.top = that.world.getGridPosition(that.catX, catY - 50).value;
        this.aroundCat.right = that.world.getGridPosition(that.catX + 50, catY).value;
        this.aroundCat.bottom = that.world.getGridPosition(that.catX, catY + 50).value;
        this.aroundCat.current = that.world.getGridPosition(that.catX, catY).value;


        that.blocks.forEach(function (block, index) {

            block.aroundBlock.top = that.world.getGridPosition(that.catX, block.posY - 50).value;
            block.aroundBlock.right = that.world.getGridPosition(that.catX + 50, block.posY).value;
            block.aroundBlock.bottom = that.world.getGridPosition(that.catX, block.posY + 50).value;
            block.aroundBlock.current = that.world.getGridPosition(that.catX, block.posY).value;

        });

        if (that.catX > 500) {
            score += 10
            that.ctx.clearRect(60, 0, 100, 50);
            this.ctx.font = "35px Arial";
            this.ctx.fillStyle = "rgba(255, 255, 255,0.7)";
            this.ctx.fillText(score, 60, 50);
        } else if (that.catX % 50 == 0 && that.catX < 500) {
            score = 0
            that.ctx.clearRect(60, 0, 100, 50);
            this.ctx.font = "35px Arial";
            this.ctx.fillStyle = "rgba(255, 255, 255,0.7)";
            this.ctx.fillText(score, 60, 50);
        }

        this.updateStatusBar();

        if (fireBullet == true) {


            if (bullets[bullets.length - 1].offsetX > 500) {
                perfect = 0;
            }

            bullets[bulletNumber].update(100 + 50, catY);
            bullets[bulletNumber].offsetX += bulletSpeed * 2;
            bulletNumber++;


            if (bulletNumber >= bullets.length) {
                bulletNumber = 0;

            }


        }


    }


    this.arrangeStack = function () {

        that.blocks.forEach(function (block, index) {
            if (block.aroundBlock.bottom == 0){
                block.setStackPosition(that.blocks[index] * 50);

                setTimeout(function () {

                    that.ctx.clearRect(100, block.posY, 50, 50);
                    block.moveDown();
                    block.drawBlock();
                }, 0);
            }


        });


    }

















    this.collisionDetection = function () {

        if (that.aroundCat.bottom == 0 && that.blocks.length == 0) {
            setTimeout(function () {
                that.ctx.clearRect(100, that.cat.positionY, 50, 50);
                that.cat.moveDown();
                that.cat.drawCat();
            }, 1);

        }
        else if (that.aroundCat.bottom == 0 && that.blocks.length > 0 && that.blocks[that.blocks.length - 1].posY != that.cat.getPositionY() + 50) {
            setTimeout(function () {
                that.ctx.clearRect(100, that.cat.positionY, 50, 50);
                that.cat.moveDown();
                that.cat.drawCat();
            }, 1);
        }







        // if (that.aroundCat.bottom === 1) {   //bullet
        //     perfect++;
        //     if (bullets.length < numberOfBullets && perfect > 10) {
        //         that.createBullet();
        //         fireBullet = true;
        //     }
        // }



        // if (that.catX % 50 === 0) {




        that.blocks.forEach(function (block, index) {
            // if (block.aroundBlock.current == 0) {          //block stacking
            //     setTimeout(function () {

            //         that.ctx.clearRect(100, block.posY, 50, 50);
            //         block.moveDown();
            //         block.drawBlock();
            //     }, 0);
            // }




            if (block.aroundBlock.current == 1 || block.aroundBlock.current == 2) {           //block collision
                that.ctx.clearRect(100, block.posY, 50, 50);
                that.blocks.splice(index, 1);


            }

        });




        if (this.aroundCat.right != 0) {  //game over condition
            rollScreen = false;
            that.ctx.clearRect(0, 0, 700, 200);

            new GameOver(that.ctx).draw();
            gameover = true;
            startGame = false;

            that.canvas.onclick = function (e) {
                gameover = false;
                startGame = true;

                that.blocks = [];

                that.catX = 100;
                catY = null;
                rollScreen = false;
                perfect = 0;
                bulletSpeed = 10;
                score = 0;
                startGame = true;
                gameover = false;
                bullets = [];
                bulletNumber = 0;
                fireBullet = false;




                that.ctx.clearRect(0, 0, width, height);
                context.clearRect(0, 0, canvas.width, canvas.height);
                that.canvas.onclick = null;
                that.createCat();
                that.createWorld();
                that.welcome();

            }

        }


        // }

    }



























    this.startAnimating = function (fps) {
        that.fpsInterval = 1000 / fps;
        that.then = Date.now();
        that.startTime = that.then;


        this.animate();
    }


    this.animate = function () {
        if (rollScreen === true) {
            requestAnimationFrame(that.animate);
        }



        that.now = Date.now();
        that.elapsed = that.now - that.then;

        if (that.elapsed > that.fpsInterval) {

            that.then = that.now - (that.elapsed % that.fpsInterval);

            that.frameCount++

            that.world.moveWorld();
            that.updatevalue();
            that.collisionDetection();
            that.arrangeStack();

            if (key === 32) {

                that.cat.moveUp();
                that.cat.drawCat();
                that.createBlock(100, that.cat.positionY + 50);

                key = null;
            }
        }
    }
}
var game = new Game(700, 600);
game.init();