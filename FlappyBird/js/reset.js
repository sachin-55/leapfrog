class Reset {
    constructor(height, width, parentElement, score) {
        this.height = height;
        this.width = width;
        this.parentElement = parentElement;
        this.element = null;
        this.gamePlay = null;
        this.score = score || 0;
        this.resetElement = null;
    }

    draw = () => {
        var reset = document.createElement('div');
        reset.style.height = this.height + 'px';
        reset.style.width = this.width + 'px';
        reset.style.position = 'absolute';
        reset.style.backgroundImage = 'url("images/gameover.png")';
        reset.style.backgroundRepeat = 'no-repeat';
        reset.style.backgroundPosition = '300px 100px';
        reset.style.top = '0px';
        reset.setAttribute('id','reset');
        this.parentElement.appendChild(reset);
        this.element = reset;

        var score = document.createElement('div');
        score.style.height = 100 + 'px';
        score.style.width = 200 + 'px';
        score.style.position = 'absolute';
        score.style.backgroundColor = 'transparent';
        score.style.backgroundRepeat = 'no-repeat';
        score.style.top = '200px';
        score.style.left = '300px';
        score.classList.add('reset-score');
        score.innerHTML = 'Score :' + this.score + '<br>High Score :' + localStorage.getItem('flappyHighscore') + '';

        this.element.appendChild(score);

        var resetbtn = document.createElement('div');
        resetbtn.style.height = 20 + 'px';
        resetbtn.style.width = 100 + 'px';
        resetbtn.style.padding = '10px 20px';

        resetbtn.style.position = 'absolute';
        resetbtn.style.backgroundColor = 'green';
        resetbtn.style.borderRadius = '25px';

        resetbtn.style.border = '2px solid black';
        resetbtn.style.backgroundRepeat = 'no-repeat';
        resetbtn.style.top = '300px';
        resetbtn.style.left = '300px';
        resetbtn.style.cursor = 'pointer';

        resetbtn.classList.add('reset-score');
        resetbtn.innerHTML = 'Reset';

        this.element.appendChild(resetbtn);
        this.resetElement = resetbtn;

        this.resetElement.addEventListener('click', () => {
            this.parentElement.removeChild(document.getElementById('wrapper'));
            this.parentElement.removeChild(document.getElementById('reset'));

            var parentElement = document.getElementsByClassName('flappy-bird')[0];
            var game = new Game(560, 680, parentElement);
            game.init();


        });



    }
}