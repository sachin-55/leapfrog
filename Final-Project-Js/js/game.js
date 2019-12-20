var key = null;
window.addEventListener('keydown', function (e) {
    key = e.keyCode;
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

    var score = 0;
    var startGame = true;
    var gameover = false;

    var perfect = 0;
    var bulletSpeed = 10;
    var bullets = [];

    var fireDuration = 2000;
    var fireTimeRemaining = fireDuration;

    var gameLevel = 1;

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

    this.createWorld = function (level) {
        this.world = new World(level);
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
            that.ctx.clearRect(100, that.cat.getPositionY() - that.cat.speed, 50, 50);

            if (that.world.getGridPosition(that.catX, that.cat.getPositionY() + 50).value == 1) {
                clearInterval(start);
                console.log("clickable");
                that.ctx.fillStyle = "black";
                that.ctx.rect(that.width / 2 - 250, that.height / 2 - 60, 100, 50);
                that.ctx.stroke();
                that.ctx.font = "30px Arial";
                that.ctx.fillText('Map 1', that.width / 2 - 245, that.height / 2 - 25);

                that.ctx.rect(that.width / 2 - 250, that.height / 2, 100, 50);
                that.ctx.stroke();
                that.ctx.font = "30px Arial";
                that.ctx.fillText('Map 2', that.width / 2 - 245, that.height / 2 + 35);

                that.canvas.onclick = function (e) {
                    var mouse = {
                        'x': e.x,
                        'y': e.y
                    }


                    if (mouse.x > window.innerWidth / 2 - 250 && mouse.x < window.innerWidth / 2 - 150 && mouse.y > window.innerHeight / 2 - 60 && mouse.y < window.innerHeight / 2 - 10) {
                        console.log('clicked 1');
                        gameLevel = 1;
                        that.createWorld(gameLevel);


                    }
                    if (mouse.x > window.innerWidth / 2 - 250 && mouse.x < window.innerWidth / 2 - 150 && mouse.y > window.innerHeight / 2 && mouse.y < window.innerHeight / 2 + 50) {
                        console.log('clicked 2');
                        gameLevel = 2;
                        that.createWorld(gameLevel);


                    }






                    if (mouse.x > window.innerWidth / 2 - 150 && mouse.x < window.innerWidth / 2 + 150 && mouse.y > window.innerHeight / 2 + 200) {

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



            }

        }, 20);

    }

    this.init = function () {
        that.createCanvas();
        that.createCat();
        that.createWorld(gameLevel);
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

        // if (fireBullet == true) {


        //     if (bullets[bullets.length - 1].offsetX > 500) {
        //         perfect = 0;
        //     }

        //     bullets[bulletNumber].update(100 + 50, catY);
        //     bullets[bulletNumber].offsetX += bulletSpeed * 2;
        //     bulletNumber++;


        //     if (bulletNumber >= bullets.length) {
        //         bulletNumber = 0;

        //     }


        // }
        that.blocks.forEach(function (block, index) {
            block.setStackPosition(that.blocks[index] * 50);
        });


    }


    this.arrangeStack = function () {
        if (that.blocks.length != 0) {
            that.blocks.forEach(function (block, index) {
                var belowblock = 0;
                var aboveBlock = that.blocks[index].getPositionY();
                if (index == 0) {
                    belowblock = that.blocks[index].getPositionY();
                } else {

                    belowblock = that.blocks[index - 1].getPositionY();
                }
                if (that.blocks[0].aroundBlock.bottom == 0) {

                    setTimeout(function () {

                        that.ctx.clearRect(100, that.blocks[0].posY, 50, 50);
                        that.blocks[0].moveDown();
                        that.blocks[0].drawBlock();
                    }, 1);
                }

                if (belowblock - aboveBlock > 50 && block.aroundBlock.bottom == 0) {
                    setTimeout(function () {

                        that.ctx.clearRect(100, block.posY, 50, 50);
                        block.moveDown();
                        block.drawBlock();
                    }, 1);
                }




            });

        }
    }


    this.perfectCount = function () {
        if (that.world.getGridPosition(that.catX + 50, catY + 50).value == 1 && that.aroundCat.bottom == 0 && catY < 500) {
            perfect++;
            if (perfect / 10 == 3) {
                console.log("Perfect = fire");
                that.fireBullet();

            }

        }


    }

    this.fireBullet = function () {

        var bulletFired = setInterval(function () {
            bullets.push(new Bullet(that.ctx, 100 + 50, that.cat.getPositionY(), 5, 30));

            bullets.forEach(function (b) {
                b.update();
            });


            fireTimeRemaining -= 100;
            if (fireTimeRemaining <= 0) {
                clearInterval(bulletFired);
                perfect = 0;
                fireTimeRemaining = fireDuration;
                bullets.forEach(function (b, i) {
                    console.log(bullets.length);
                    bullets.splice(i, 1)
                    that.ctx.clearRect(b.x - 5, b.y - 5 + 20, 10, 10);
                });
            }
        }, 100);
    }

    this.moveBullet = function () {

    }


    this.collisionDetection = function () {
        console.log(catY);

        if (that.aroundCat.bottom == 0 && that.blocks.length == 0) {
            setTimeout(function () {
                that.ctx.clearRect(100, that.cat.positionY, 50, 50);
                that.cat.moveDown();
                that.cat.drawCat();
            }, 1);

        }
        else if (that.blocks.length > 0 && that.blocks[that.blocks.length - 1].posY != that.cat.getPositionY() + 50 && that.aroundCat.bottom == 0) {
            if (that.blocks[that.blocks.length - 1].getPositionY() - 50 >= that.cat.getPositionY()) {
                setTimeout(function () {
                    that.ctx.clearRect(100, that.cat.positionY, 50, 50);
                    that.cat.moveDown();
                    that.cat.drawCat();
                }, 1);
            }


        }









        that.blocks.forEach(function (block, index) {



            if (block.aroundBlock.current == 1 || block.aroundBlock.current == 2) {           //block collision
                that.ctx.clearRect(100, block.posY, 50, 50);
                that.blocks.splice(index, 1);


            }

        });




        if (this.aroundCat.right!= 0  ) {  //game over condition
            rollScreen = false;
            that.ctx.clearRect(0, 0, 700, 200);

            new GameOver(that.ctx).draw();
            this.ctx.clearRect(300, 300, 100, 100);
            that.ctx.font = "40px Arial";
            that.ctx.strokeStyle = "black";
            that.ctx.lineWidth = 2;
            that.ctx.strokeText(score, 300, 360);
            that.ctx.fillStyle = "white";
            that.ctx.fillText(score, 300, 360);
            gameover = true;
            startGame = false;

            that.canvas.onclick = function (e) {
                var mouse = {
                    'x': e.x,
                    'y': e.y
                }
                if (mouse.x > window.innerWidth / 2 - 150 && mouse.x < window.innerWidth / 2 + 150 && mouse.y > window.innerHeight / 2 + 200) {

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
                    that.createWorld(gameLevel);
                    that.welcome();
                }
            }

        }



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
            // that.perfectCount();

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