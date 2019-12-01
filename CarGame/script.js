(function () {

    var SPEED = 20;
    var refreshRate = 60;
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
            car.style.left = '270px';
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

                    if (key === 37 && position === 270 && that.possibleDirection === 2) {
                        that.element.style.left = '70px';
                        position = parseInt(that.element.style.left.replace("px", "").trim());
                        that.possibleDirection = 1;

                    }
                    else if (key === 37 && position === 470 && that.possibleDirection === 1) {
                        that.element.style.left = '270px';
                        position = parseInt(that.element.style.left.replace("px", "").trim());
                        that.possibleDirection = 2;

                    }

                    else if (key === 39 && position === 270 && that.possibleDirection === 2) {
                        that.element.style.left = '470px';
                        position = parseInt(that.element.style.left.replace("px", "").trim());
                        that.possibleDirection = 1;

                    }
                    else if (key === 39 && position === 70 && that.possibleDirection === 1) {
                        that.element.style.left = '270px';
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
            'first': 70,
            'second': 270,
            'third': 470
        }
        var play;
        var score = 0;
        var highScore = 0;
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
            }

        }

        this.collisionDetection = function (player) {


            for (var i = 0; i < obstacles.length; i++) {
                if (parseInt(player.element.style.bottom.replace("px", "").trim()) < parseInt(obstacles[i].element.style.top.replace("px", "").trim()) - 300
                    && ((obstacles[i].element.style.left === '270px' && player.element.style.left === '270px')
                        || (obstacles[i].element.style.left === '70px' && player.element.style.left === '70px')
                        || (obstacles[i].element.style.left === '470px' && player.element.style.left === '470px'))) {
                    clearInterval(play);

                    setTimeout(this.gameOver(), 30);
                }
            }
        }

        this.welcomeScreen = function () {
            var container = document.getElementsByClassName('game-container')[0];


            var welcome = document.createElement('div');
            welcome.style.height = 600 + 'px';
            welcome.style.backgroundColor = 'rgba(255,255,255,0.5)';
            container.appendChild(welcome);


            var welcomeToGame = document.createElement('div');
            welcomeToGame.style.textAlign = 'center';
            welcomeToGame.innerHTML = 'Welcome <br> To <br> Car Game';
            welcomeToGame.style.color = 'rgba(200,50,50,0.8)';
            welcomeToGame.style.padding = '90px 0px';
            welcomeToGame.style.fontSize = '50px';
            welcomeToGame.style.fontWeight = '800';
            welcomeToGame.style.lineHeight = '50px';


            var start = document.createElement('span');
            start.style.display = 'block';
            start.style.width = '200px';
            start.style.textAlign = 'center';
            start.style.marginLeft = '37%';
            start.style.marginTop = '42px';
            start.style.cursor = 'pointer';

            start.style.fontSize = '25px';
            start.style.fontWeight = '400';
            start.style.lineHeight = '40px';
            start.innerHTML = 'Play';
            start.style.backgroundColor = 'rgba(255,100,40,0.9)';
            start.style.color = 'rgba(50,100,100,0.6)'
            start.style.border = '1px solid gray';
            start.style.borderRadius = '50px';

            welcome.appendChild(welcomeToGame);
            welcome.appendChild(start);

            start.addEventListener('click', function () {
                container.removeChild(welcome);
                container.innerHTML = `
                    <div class="game-wrapper">
                        <div class="road">
                            
                        </div>
                        </div>
                        <div class="score-board">
                            <span>High Score:<span id="high-score">0</span></span>
                            <span>Your Score:<span id="your-score">0</span></span>
                        </div>
                    `;

       
 var parentElement = document.getElementsByClassName('road')[0];
                var playGame = new Game(200, 100, 190, 100, parentElement);
                playGame.newGame();


            });


        }


        this.newGame = function () {
            var player = new PlayerCar(this.heightPlayer, this.widthPlayer, this.parentElement).drawCar();


            play = setInterval(function () {
                document.getElementById("your-score").innerHTML = score;
                highScore = localStorage.getItem('highscore');
                document.getElementById('high-score').innerHTML = highScore;
                if (localStorage.getItem('highscore') !== null) {
                    if (localStorage.getItem('highscore') < score) {
                        localStorage.setItem('highscore', score);
                    }
                } else {
                    localStorage.setItem('highscore', score);
                }

                if (totalDistance === 880 && obstacles.length <= 6) {
                    that.generateObstacles();
                    score += 1;

                    if (score % 10 === 0) {
                        SPEED+= 5;
                        if (SPEED>= 50) {
                            SPEED = 50;
                        }
                    }
                    totalDistance = 0;

                }

                that.playGame(player);
                totalDistance += 40;



            }, refreshRate);
        }

        this.playGame = function (player) {
            player.moveCar();
            this.parentElement.style.backgroundPositionY = pos + 'px';
            pos += SPEED;
            for (var i = 0; i < obstacles.length; i++) {


                obstacles[i].updateObstacle();
                this.collisionDetection(player);
                if (parseInt(obstacles[i].element.style.top.replace('px', '').trim()) >= 550) {

                    obstacles[i].destroyObstacle();
                    obstacles.splice(i, 1);
                    obstacleCount--;

                }



            }


        }
        this.gameOver = function (player) {
            var road = document.getElementsByClassName('game-wrapper')[0];
            var scoreBoard = document.getElementsByClassName('score-board')[0];
            var container = document.getElementsByClassName('game-container')[0];

            container.removeChild(road);
            container.removeChild(scoreBoard);

            var game = document.createElement('div');
            game.style.height = 600 + 'px';
            game.style.backgroundColor = 'rgba(255,255,255,0.5)';
            container.appendChild(game);


            var gameover = document.createElement('div');
            gameover.style.textAlign = 'center';
            gameover.innerHTML = 'GAME OVER';
            gameover.style.color = 'rgba(0,0,0,0.5)';
            gameover.style.padding = '90px 0px';
            gameover.style.fontSize = '50px';
            gameover.style.fontWeight = '800';
            gameover.style.lineHeight = '50px';

            var scoreText = document.createElement('div');
            scoreText.innerHTML = '<br>High Score =' + highScore;
            scoreText.innerHTML += '<br>Score =' + score;
            scoreText.style.color = 'rgba(0,0,0,0.9)';
            scoreText.style.textAlign = 'center';
            scoreText.style.fontSize = '25px';
            scoreText.style.fontWeight = '400';
            scoreText.style.lineHeight = '40px';

            var reset = document.createElement('span');
            reset.style.display = 'block';
            reset.style.width = '200px';
            reset.style.textAlign = 'center';
            reset.style.marginLeft = '37%';
            reset.style.marginTop = '42px';
            reset.style.cursor = 'pointer';

            reset.style.fontSize = '25px';
            reset.style.fontWeight = '400';
            reset.style.lineHeight = '40px';
            reset.innerHTML = 'Play Again';
            reset.style.backgroundColor = 'rgba(255,40,0,0.9)';
            reset.style.border = '1px solid black';
            reset.style.borderRadius = '50px';


            game.appendChild(gameover);
            game.appendChild(scoreText);
            game.appendChild(reset);

            reset.addEventListener('click', function () {
                container.removeChild(game);

                container.innerHTML = `
    <div class="game-wrapper">
        <div class="road">
            
        </div>
        </div>
        <div class="score-board">
            <span>High Score:<span id="high-score">0</span></span>
            <span>Your Score:<span id="your-score">0</span></span>
        </div>
    `;

                SPEED=20;

                var parentElement = document.getElementsByClassName('road')[0];
                var playGame = new Game(200, 100, 190, 100, parentElement);
                playGame.newGame();


            });












        }

    }


    var parentElement = document.getElementsByClassName('road')[0];
    var playGame = new Game(200, 100, 190, 100, parentElement);
    playGame.welcomeScreen(playGame);


})();