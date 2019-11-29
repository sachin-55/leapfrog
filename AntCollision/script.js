(function () {

    function Box(parentElement, x, y, height, width, dx, dy) {
        this.x = x || 10;
        this.y = y || 10;
        this.height = height || 20;
        this.width = width || 20;
        this.dx = dx || 1;
        this.dy = dy || 1;
        this.parentElement = parentElement;
        this.element = null;
        var that = this;



        this.draw = function () {
            var box = document.createElement('div');
            box.style.width = this.width + 'px';
            box.style.height = this.height + 'px';
            box.classList.add('box');

            this.parentElement.appendChild(box);
            this.element = box;
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
            this.state = 'alive'
            this.element.onclick = function () {
                that.state = 'dead';
                that.element.style.backgroundImage = "url('https://www.animatedimages.org/data/media/183/animated-ant-image-0054.gif')";

                setTimeout(function(){
                    that.parentElement.removeChild(that.element);
                    
                },1000);

            }

            return this;

        }



        this.move = function () {
            this.x += this.dx;
            this.y += this.dy;
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
            if ((this.x + this.width) >= 1000 || this.x <= 0 || (this.y + this.height) >= 1000 || this.y <= 0) {
                this.dx = -this.dx;
                this.dy = -this.dy;
            }

        }

        this.checkCollision = function (boxes) {
            for (var i = 0; i < boxes.length; i++) {
                if (!(this == boxes[i])) {

                    if ((this.x < boxes[i].x + boxes[i].width)
                        && (this.x + this.width > boxes[i].x) &&
                        (this.y < boxes[i].y + boxes[i].height) &&
                        (this.y + this.height > boxes[i].y)) {

                        this.dx = -this.dx;
                        this.dy = -this.dy;

                    }

                }
            }
        }


    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function randomColor() {
        var color = 'rgba(' + Math.random() * 256 + ',' + Math.random() * 256 + ',' + Math.random() * 256 + ',' + 0.95 + ')';
        return color;
    }

    function Game(parentElement, boxCount, boxHeight, boxWidth, HEIGHT, WIDTH) {
        var boxes = [];
        var MAX_WIDTH = WIDTH;
        var MAX_HEIGHT = HEIGHT;
        this.parentElement = parentElement;
        this.boxCount = boxCount;
        this.boxHeight = boxHeight;
        this.boxWidth = boxWidth;
        var that = this;
        var positionX = [];
        var positionY = [];

        this.getPosition = function () {
            for (var i = 0; i < this.boxCount; i++) {

                var x = getRandom(0, MAX_WIDTH - this.boxWidth);
                var y = getRandom(0, MAX_HEIGHT - this.boxHeight);


                if (i != 0) {
                    for (var j = 0; j < positionX.length; j++) {
                        if (Math.abs(x - positionX[j]) < (this.boxWidth + 1) && Math.abs(y - positionY[j]) < (this.boxHeight + 1)) {
                            x = getRandom(0, MAX_WIDTH - this.boxWidth);
                            y = getRandom(0, MAX_HEIGHT - this.boxHeight);

                            j = -1;
                        }
                    }
                }

                positionX.push(x);
                positionY.push(y);
            }


        }

        this.startGame = function () {
            this.getPosition();

            console.log("start");

            for (var i = 0; i < boxCount; i++) {

                var dx = getRandom(-5, 5);
                var dy = getRandom(-5, 5);

                console.log(dx, '===', dy);


                var box = new Box(this.parentElement, positionX[i], positionY[i], this.boxHeight, this.boxWidth, dx, dy).draw();
                boxes.push(box);
            }
            setInterval(this.moveBoxes.bind(this), 100)
        }


        this.moveBoxes = function () {
            for (var i = 0; i < this.boxCount; i++) {
                if (boxes[i].state=='alive') {
                    boxes[i].move();

                    boxes[i].checkCollision(boxes);
                }else{
                    boxes.splice(i,1);
                }

            }
        }

    }

    var parentElement = document.getElementById('boxContainer');
    var boxCount = 30;
    var boxHeight = 93;
    var boxWidth = 68;
    var containerHeight = 1000;
    var containerWidth = 1000;

    var game = new Game(parentElement, boxCount, boxHeight, boxWidth, containerHeight, containerWidth);
    game.startGame();

})();
