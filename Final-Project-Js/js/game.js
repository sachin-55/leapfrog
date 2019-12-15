

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
    var that = this;
    var rollScreen = true;
    var prevBlocks = 450;
    var currentBlocks = 0;

    this.aroundCat = {
        'top': 0,
        'right': 0,
        'bottom': 0

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



    this.init = function () {
        that.createCanvas();
        that.createCat();
        that.createWorld();

    }
    this.updatevalue = function () {
        var catY = that.cat.getPositionY();
        that.catX += 5;

        this.aroundCat.top = that.world.getGridPosition(that.catX, catY - 50).value;
        this.aroundCat.right = that.world.getGridPosition(that.catX + 50, catY).value;
        this.aroundCat.bottom = that.world.getGridPosition(that.catX, catY + 50).value;


        that.blocks.forEach(function (block, index) {

            block.aroundBlock.top = that.world.getGridPosition(that.catX, block.posY - 50).value;
            block.aroundBlock.right = that.world.getGridPosition(that.catX + 50, block.posY).value;
            block.aroundBlock.bottom = that.world.getGridPosition(that.catX, block.posY + 50).value;

        });

    }

    this.collisionDetection = function () {

        if (that.catX % 50 === 0) {
            if (this.aroundCat.right != 0) {
                rollScreen = false;
            }

            if (that.aroundCat.bottom === 0 && that.blocks.length == 0) {
                that.ctx.clearRect(100, that.cat.positionY, 50, 50);
                that.cat.moveDown();
                that.cat.drawCat();
            } else if (that.aroundCat.bottom === 0 && that.blocks.length != 0 && (that.blocks[0].aroundBlock.bottom != 1 || that.blocks[that.blocks.length - 1].posY != that.cat.positionY + 50)) {
                that.ctx.clearRect(100, that.cat.positionY, 50, 50);
                that.cat.moveDown();
                that.cat.drawCat();
            }
            
            if (that.aroundCat.bottom === 1 && that.cat.positionY<500) {
               console.log("perfect");
               
            }



            that.blocks.forEach(function (block, index) {
                if (that.blocks[0].aroundBlock.bottom == 0) {          //block stacking
                    that.ctx.clearRect(100, block.posY, 50, 50);
                    block.moveDown();
                    block.drawBlock();
                }
                // else if (index * 50 == 450 - block.posY && that.blocks.length - 1 == that.blocks.indexOf(block)) {
                //     that.ctx.clearRect(100, block.posY, 50, 50);
                //     block.moveDown();
                //     block.drawBlock();
                // }

                if (block.aroundBlock.right == 1 || block.aroundBlock.right == 2)  {           //block collision
                  
                    that.ctx.clearRect(100, block.posY, 50, 50);
                    that.blocks.splice(index, 1);

                    console.log(that.blocks.length);
                    

                

                }



            });







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
game.startAnimating(60);