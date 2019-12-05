var numbers = ['0.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png']

class Game {

    constructor(height, width, parentElement) {
        this.height = height;
        this.width = width;
        this.parentElement = parentElement;
        this.element = null;
        this.position = null;
        this.clock = 0;
        this.pipes = [];
        this.state = null;
        this.score = 0;
        this.scoreElement = null;
        this.highscore = 0;
        this.start = false;
        this.welcome = null;
    }

    draw = () => {
        var wrapper = document.createElement('div');
        wrapper.style.height = this.height + 'px';
        wrapper.style.width = this.width + 'px';
        wrapper.style.position = 'relative';
        wrapper.setAttribute('id', 'wrapper');
        wrapper.style.overflow = 'hidden';


        wrapper.style.background = 'url("images/base.png") repeat-x bottom';
        this.parentElement.appendChild(wrapper);
        this.element = wrapper;
        this.parentElement.style.background = 'url("images/background-day.png")'

        var score = document.createElement('div');
        score.classList.add('score');
        this.element.appendChild(score);
        this.scoreElement = score;
    }

    backgroundMotion = () => {
        this.element.style.backgroundPositionX = this.position + 'px';
        this.position -= 4;
        if (this.element.style.backgroundPositionX === '-288px') {
            this.element.style.width = this.width + 'px';
            this.position = 0;
        }
    }
    randomPipeHeight = () => {
        return Math.floor(Math.random() * (230) + 50);
    }
    generatePipe = () => {
        var pipe = new Pipe(450, 52, this.element, 100, this.randomPipeHeight());
        pipe.drawPipe();
        return pipe;
    }
    getNumberImage = (number) => {
        var output = '';
        var subString = number.split('');

        for (var i = 0; i < subString.length; i++) {
            output += '<img src="images/' + numbers[parseInt(subString[i])] + '" />'
        }

        return output;
    }

    pipeCollisionDetection = (bird, pipes) => {
        var birdTop = 560 - parseInt(bird.element.style.bottom.replace('px', '').trim()) - 34;
        var birdHeight = parseInt(bird.element.style.height.replace('px', '').trim());
        var birdLeft = parseInt(bird.element.style.left.replace('px', '').trim());
        var birdWidth = parseInt(bird.element.style.width.replace('px', '').trim());

        var topPipeHeight = parseInt(pipes.topElement.style.height.replace('px', '').trim());
        var bottomPipeTop = parseInt(pipes.bottomElement.style.top.replace('px', '').trim());

        var pipeLeft = parseInt(pipes.element.style.left.replace('px', '').trim());

        if (((birdLeft + birdWidth) >= pipeLeft && birdLeft <= pipeLeft + 52) && (birdTop <= topPipeHeight || birdTop + birdHeight >= bottomPipeTop) || birdTop + birdHeight >= this.height - 120) {
            clearInterval(this.state);
            new Reset(this.height, this.width, this.parentElement, this.score, this.welcome).draw();

        }
        if (pipeLeft == 50) {
            this.score += 1;
            var str = this.score.toString();
            var output = this.getNumberImage(str);
            this.scoreElement.style.background = 'transparent';
            this.scoreElement.innerHTML = output;

            if (localStorage.getItem('flappyHighscore') !== null) {
                if (localStorage.getItem('flappyHighscore') < this.score) {
                    localStorage.setItem('flappyHighscore', this.score);
                }
            } else {
                localStorage.setItem('flappyHighscore', this.score);
            }

        }


    }

    createWelcomeScreen = () => {
        return new Welcome(560, 580, this.parentElement);
    }

    init = () => {

        this.welcome = this.createWelcomeScreen();

        this.draw();
        var bird = new Bird(24, 34, this.element);
        bird.draw();
        if (this.welcome.state == false) {
            this.welcome.draw();
            this.welcome.startGame();
            console.log(this.welcome.state);

        }



        this.state = setInterval(() => {
            this.backgroundMotion();

            if (this.welcome.state == true) {

                bird.updateBird();
                bird.flyBird();
                this.clock += 30;
                if (this.clock % 3000 === 0) {
                    this.pipes.push(this.generatePipe());
                }

                for (var i = 0; i < this.pipes.length; i++) {
                    this.pipes[i].movePipe();

                    if (parseInt(this.pipes[i].element.style.left.replace('px', '').trim()) < -40) {

                        this.element.removeChild(this.pipes[i].element);

                        this.pipes.splice(i, 1);
                    }
                    this.pipeCollisionDetection(bird, this.pipes[i]);

                }
            }

        }, 30);



    }
}

var parentElement = document.getElementsByClassName('flappy-bird')[0];
var game = new Game(560, 680, parentElement);
game.init();
// var parentElement1 = document.getElementsByClassName('flappy-bird1')[0];
// var game1 = new Game(560, 680, parentElement1);
// game1.init();
