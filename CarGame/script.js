(function () {

    var SPEED = 20;
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

                var position = parseInt(that.element.style.left.replace("px", "").trim());

                setTimeout(function () {

                    if (key === 37 && position === 410 && that.possibleDirection === 2) {
                        that.element.style.left = '110px';
                        position = parseInt(that.element.style.left.replace("px", "").trim());
                        that.possibleDirection = 1;

                    }
                    else if (key === 37 && position === 710 && that.possibleDirection === 1) {
                        that.element.style.left = '410px';
                        position = parseInt(that.element.style.left.replace("px", "").trim());
                        that.possibleDirection = 2;

                    }

                    else if (key === 39 && position === 410 && that.possibleDirection === 2) {
                        that.element.style.left = '710px';
                        position = parseInt(that.element.style.left.replace("px", "").trim());
                        that.possibleDirection = 1;

                    }
                    else if (key === 39 && position === 110 && that.possibleDirection === 1) {
                        that.element.style.left = '410px';
                        position = parseInt(that.element.style.left.replace("px", "").trim());
                        that.possibleDirection = 2;

                    }

                }, 0);

            });
        }

    }



    function Obstacle(height, width, parentElement, position) {
        this.height = height;
        this.width = width;
        this.position = position;
        this.element = null;
        this.parentElement = parentElement;
        this.distance = 0;
        var that = this;

        function randomObstacle() {
            var randomNumber = Math.floor(Math.random() * (3) + 1);

            if (randomNumber === 1) {
                return 'url("images/car2.png")';
            }
            else if (randomNumber === 2) {
                return 'url("images/car3.png")';


            } else {
                return 'url("images/car4.png")';
            }
        }

        this.drawObstacle = function () {
            var obstacle = document.createElement('div');
            obstacle.style.width = this.width + 'px';
            obstacle.style.height = this.height + 'px';
            obstacle.style.top = -300 + 'px';
            obstacle.style.left = this.position + 'px';
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
            that.distance += SPEED;
        }

    }
    function Game(heightPlayer, widthPlayer, heightObs, widthObs, parentElement) {
        var obstacles = [];
        this.heightPlayer = heightPlayer;
        this.widthPlayer = widthPlayer;
        this.parentElement = parentElement;
        this.heightObs = heightObs;
        this.widthObs = widthObs;
        var totalDistance = 0;
        var pos = 0;
        var obstacleCount = 0;
        var that = this;
        var lane = {
            'first': 110,
            'second': 410,
            'third': 710
        }
        var play;
        var score = 0;
        this.randomLane = function () {
            return Math.floor(Math.random() * 59 + 1);
        }

        this.generateObstacles = function () {

            if (this.randomLane() >= 0 && this.randomLane() < 15) {
                obstacles[obstacleCount++] = new Obstacle(heightObs, widthObs, parentElement, lane.first).drawObstacle();
                obstacles[obstacleCount++] = new Obstacle(heightObs, widthObs, parentElement, lane.third).drawObstacle();
            } else if (this.randomLane() >= 15 && this.randomLane() < 30) {
                obstacles[obstacleCount++] = new Obstacle(heightObs, widthObs, parentElement, lane.second).drawObstacle();
            } else if (this.randomLane() >= 30 && this.randomLane() < 45) {
                obstacles[obstacleCount++] = new Obstacle(heightObs, widthObs, parentElement, lane.first).drawObstacle();
                obstacles[obstacleCount++] = new Obstacle(heightObs, widthObs, parentElement, lane.second).drawObstacle();
            } else {

                obstacles[obstacleCount++] = new Obstacle(heightObs, widthObs, parentElement, lane.second).drawObstacle();
                obstacles[obstacleCount++] = new Obstacle(heightObs, widthObs, parentElement, lane.third).drawObstacle();
                obstacles[obstacleCount++] = new Obstacle(heightObs, widthObs, parentElement, lane.second).drawObstacle();

            }

        }

        this.collisionDetection = function (player) {


            for (var i = 0; i < obstacles.length; i++) {
                if (parseInt(player.element.style.bottom.replace("px", "").trim()) < parseInt(obstacles[i].element.style.top.replace("px", "").trim()) - 580
                    && ((obstacles[i].element.style.left === '410px' && player.element.style.left === '410px')
                        || (obstacles[i].element.style.left === '110px' && player.element.style.left === '110px')
                        || (obstacles[i].element.style.left === '710px' && player.element.style.left === '710px'))) {
                    clearInterval(play);

                }
            }
        }


        this.newGame = function () {
            var player = new PlayerCar(this.heightPlayer, this.widthPlayer, this.parentElement).drawCar();


            play = setInterval(function () {

                if ((totalDistance % 1000) === 0 && obstacles.length <= 6) {
                    that.generateObstacles();
                    document.getElementById("your-score").innerHTML = score;
                    score += 10;

                }

                that.playGame(player);
                totalDistance += 40;



            }, 60);
        }

        this.playGame = function (player) {
            player.moveCar();
            this.parentElement.style.backgroundPositionY = pos + 'px';
            pos += SPEED;
            for (var i = 0; i < obstacles.length; i++) {


                obstacles[i].updateObstacle();
                this.collisionDetection(player);
                if (parseInt(obstacles[i].element.style.top.replace('px', '').trim()) >= 920) {
                    obstacles[i].destroyObstacle();
                    obstacles.splice(i, 1);
                    obstacleCount--;
                  
                }



            }


        }

    }
    var parentElement = document.getElementsByClassName('road')[0];
    var game = new Game(200, 100, 200, 100, parentElement);
    game.newGame()


})();