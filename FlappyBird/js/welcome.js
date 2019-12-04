class Welcome {
    constructor(height, width, parentElement) {
        this.height = height;
        this.width = width;
        this.parentElement = parentElement;
        this.element = null;
        this.gamePlay = null;
        this.welcomeBtn = null;
    }

    draw = () => {

        var welcome = document.createElement('div');
        welcome.style.height = this.height + 'px';
        welcome.style.width = this.width + 'px';
        welcome.classList.add('welcome');
        welcome.style.position = 'absolute';
        welcome.style.backgroundRepeat = 'no-repeat';
        welcome.setAttribute('id', 'welcome');
        welcome.style.backgroundPosition = 'center center';
        welcome.style.backgroundImage = 'url("images/message.png")';
        this.parentElement.appendChild(welcome);
        this.element = welcome;


        var welcomebtn = document.createElement('div');
        welcomebtn.style.height = 20 + 'px';
        welcomebtn.style.width = 100 + 'px';
        welcomebtn.style.padding = '10px 20px';

        welcomebtn.style.position = 'absolute';
        welcomebtn.style.backgroundColor = 'green';
        welcomebtn.style.borderRadius = '25px';

        welcomebtn.style.border = '2px solid black';
        welcomebtn.style.backgroundRepeat = 'no-repeat';
        welcomebtn.style.top = '300px';
        welcomebtn.style.left = '300px';
        welcomebtn.style.cursor = 'pointer';

        welcomebtn.classList.add('reset-score');
        welcomebtn.innerHTML = 'Start';

        this.element.appendChild(welcomebtn);
        this.welcomeBtn = welcomebtn;

        this.welcomeBtn.addEventListener('click', () => {
            this.parentElement.removeChild(document.getElementById('welcome'));
            

        });


    }


    // init = () => {
    //     this.draw();
    //     this.gamePlay = this.createGame();
    //     this.gamePlay.draw();
    //     this.gamePlay.backgroundMotion();
    //     var bird = this.createBird();
    //     bird.draw();
    //    this.parentElement.addEventListener('click',()=>{

    //        this.gamePlay.init();
    //    });


    // }

}
