class Welcome {
    constructor(height, width, parentElement) {
        this.height = height;
        this.width = width;
        this.parentElement = parentElement;
        this.element = null;
        this.gamePlay = null;
    }

    draw = () => {
        var welcome = document.createElement('div');
        welcome.style.height = this.height + 'px';
        welcome.style.width = this.width + 'px';
        welcome.classList.add('welcome');
        welcome.style.position = 'absolute';
        welcome.style.backgroundRepeat = 'no-repeat';
        welcome.style.backgroundPosition = 'center center';
        welcome.style.backgroundImage = 'url("images/message.png")';
        this.parentElement.appendChild(welcome);
        this.element=welcome;
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
