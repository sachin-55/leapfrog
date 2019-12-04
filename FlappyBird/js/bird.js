class Bird {
    constructor(height, width, parentElement) {
        this.height = height;
        this.width = width;
        this.parentElement = parentElement;
        this.element = null;
        this.y = 400;
        this.dy =5 ;
        this.gravity =2;
        this.upSpeed=40;
        this.key = null;
    }
    draw = () => {
        var bird = document.createElement('div');
        bird.style.width = this.width + 'px';
        bird.style.height = this.height + 'px';
        bird.style.background = 'url("images/bird.gif")';
        bird.style.position = 'absolute';
        bird.style.backgroundSize='cover';
        bird.style.left = 100 + 'px';
        bird.style.bottom = this.y + 'px';

        
        bird.style.transition='all 0.1s ease'
        this.parentElement.appendChild(bird);
        this.element = bird;
    }
    updateBird = () => {
        this.element.style.bottom = this.y + 'px';
        this.dx +=this.gravity;
        this.y -= this.dy;
        if(this.y<100){
        this.element.style.bottom=400+'px';
        this.y=400;
        this.dy=5;  
        }
        // this.element.style.background = 'url("images/yellowbird-upflap.png")';


    }
    flyBird = () => {
        var keyFunctionHandler;
        document.addEventListener('keyup', keyFunctionHandler = (e) => {
            this.key = e.keyCode;
        });

        if (this.key === 32) {
        
            this.y += this.upSpeed;
            this.element.style.bottom = this.y + 'px';


            document.removeEventListener('keyup',keyFunctionHandler);
            this.key=null;
        // this.element.style.background = 'url("images/yellowbird-downflap.png")';


        }
    }

}