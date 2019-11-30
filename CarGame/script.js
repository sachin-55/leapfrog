(function () {
    function PlayerCar(height, width, parentElement) {
        this.height = height;
        this.width = width;
        this.parentElement = parentElement;
        this.element = null;
        this.possibleDirection = 2;
        var that = this;


        this.drawCar = function () {
            var car = document.createElement('div');
            car.style.width = this.width + 'px';
            car.style.height = this.height + 'px';
            car.style.bottom = '0px';
            car.style.left = '410px';
            car.style.transition = 'all 0.2s ease';

            car.classList.add('car');

            this.parentElement.appendChild(car);
            this.element = car;
            return this;

        }

        this.moveCar = function (e) {

            var key = 0;
            document.addEventListener('keydown', function (e) {
                key = e.keyCode;
                console.log(key);

                var position = parseInt(that.element.style.left.replace("px", "").trim());

                setTimeout(function () {

                    if (key === 37 && position === 410 && that.possibleDirection === 2) {
                        console.log("left from middle");
                        that.element.style.left = '110px';
                        position = parseInt(that.element.style.left.replace("px", "").trim());
                        that.possibleDirection = 1;

                    }
                    else if (key === 37 && position === 710 && that.possibleDirection === 1) {
                        console.log("left from right");
                        that.element.style.left = '410px';
                        position = parseInt(that.element.style.left.replace("px", "").trim());
                        that.possibleDirection = 2;

                    }

                    else if (key === 39 && position === 410 && that.possibleDirection === 2) {
                        console.log("right from middle");
                        that.element.style.left = '710px';
                        position = parseInt(that.element.style.left.replace("px", "").trim());
                        that.possibleDirection = 1;

                    }
                    else if (key === 39 && position === 110 && that.possibleDirection === 1) {
                        console.log("right from left");
                        that.element.style.left = '410px';
                        position = parseInt(that.element.style.left.replace("px", "").trim());
                        that.possibleDirection = 2;

                    }

                }, 0);

            });
        }

    }

    function randomObstacle() {
        var randomNumber = Math.floor(Math.random() * (3) + 1);

        if (randomNumber === 1) {
            return 'url("car2.png")';
        }
        else if (randomNumber === 2) {
            return 'url("car3.png")';


        } else {
            return 'url("car4.png")';
        }
    }

    function Obstacle(height, width, parentElement, position) {
        this.height = height;
        this.width = width;
        this.position = position;
        this.element = null;
        this.parentElement = parentElement;
        var speed = 20;
        this.distance = 0;
        var that = this;

        this.drawObstacle = function () {
            var obstacle = document.createElement('div');
            obstacle.style.width = this.width + 'px';
            obstacle.style.height = this.height + 'px';
            obstacle.style.top = this.position.y + 'px';
            obstacle.style.left = this.position.x + 'px';
            obstacle.style.backgroundImage = randomObstacle();
            obstacle.classList.add('obstacle');
            this.parentElement.appendChild(obstacle);
            this.element = obstacle;
            return this;
        }

        this.destroyObstacle = function () {
            this.parentElement.removeChild(this.element);
        }

        this.updateObstacle = function () {

            that.element.style.top = that.distance + 'px';
            that.distance += speed;
        }

    }
    function Game(heightPlayer, widthPlayer, heightObs, widthObs, parentElement) {
        var obstacles = [];
        this.heightPlayer = heightPlayer;
        this.widthPlayer = widthPlayer;
        this.parentElement = parentElement;
        this.heightObs = heightObs;
        this.widthObs = widthObs;
        var speed = 10;
        var pos = 0;

        var that = this;
        var lane = {
            'first': 110,
            'second': 410,
            'third': 710
        }




        this.newGame = function () {
            var player = new PlayerCar(this.heightPlayer, this.widthPlayer, this.parentElement).drawCar();









            setInterval(function () {
                that.playGame(player);
            }, 60);
        }

        this.playGame = function (player) {
            player.moveCar();
            this.parentElement.style.backgroundPositionY = pos + 'px';
            pos += speed;

            console.log(pos);

        }


    }

    var parentElement = document.getElementsByClassName('road')[0];
    var game = new Game(200, 100, 200, 100, parentElement);
    game.newGame()


})();