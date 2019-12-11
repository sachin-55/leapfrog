

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
    this.block = [];
    this.frameCount = 0;
    // var fps, fpsInterval, startTime, now, then, elapsed;
    this.fpsInterval = null;
    this.now = null;
    this.then = null;
    this.elapsed = null;
    this.startTime = null;
    var that = this;
    
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
        this.block.push(b.drawBlock());
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

    this.startAnimating = function (fps) {
        that.fpsInterval = 1000 / fps;
        that.then = Date.now();
        that.startTime = that.then;

        this.animate();
    }

    this.animate = function () {
        requestAnimationFrame(that.animate);

        that.now = Date.now();
        that.elapsed = that.now - that.then;

        if (that.elapsed > that.fpsInterval) {

            that.then = that.now - (that.elapsed % that.fpsInterval);

            that.frameCount++
            console.log(that.frameCount);

            that.world.moveWorld();

            if (key === 32) {

                that.ctx.clearRect(100, that.cat.positionY, 50, 50);
                that.cat.moveUp();
                that.cat.drawCat();
                that.createBlock(100, that.cat.positionY + 50);
                key = null;
            }
        }
    }
}
var game = new Game(700, 500);
game.init();
game.startAnimating(30);