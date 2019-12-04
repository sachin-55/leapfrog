class Pipe{
    constructor(height,width,parentElement,gap,topPipeHeight){
        this.height=height;
        this.width=width;
        this.parentElement=parentElement;
        this.gap=gap;
        this.topPipeHeight=topPipeHeight;

        this.dx = 4;
        this.x=670;
        this.element=null;
        this.topElement = null;
        this.bottomElement = null;

    }

    drawPipe=()=>{
        var pipe = document.createElement('div');
        pipe.style.width=this.width+'px';
        pipe.style.height=this.height+'px';
        pipe.style.position='absolute';
        pipe.style.left=this.x+'px';

        pipe.style.overflow='hidden';


        this.parentElement.appendChild(pipe);
        this.element = pipe;

         var pipeTop = document.createElement('div');
        pipeTop.style.width=this.width+'px';
        pipeTop.style.height=this.topPipeHeight+'px';
        pipeTop.style.backgroundImage='url("images/pipe-green.png")'
        pipeTop.style.transform='scaleY(-1)';
        
        pipeTop.style.position='absolute';
        pipeTop.style.left=0+'px';
        pipeTop.style.top=0+'px';

        this.element.appendChild(pipeTop);
        this.topElement = pipeTop;


           var pipeBottom = document.createElement('div');
        pipeBottom.style.width=this.width+'px';
        pipeBottom.style.height=this.height+'px';
        pipeBottom.style.backgroundImage='url("images/pipe-green.png")'

        pipeBottom.style.position='absolute';
        pipeBottom.style.left=0+'px';
        pipeBottom.style.top=this.gap+parseInt(pipeTop.style.height.replace('px','').trim())+'px';

        this.element.appendChild(pipeBottom);
        this.bottomElement = pipeBottom;

     }
   

     movePipe=()=>{
        this.element.style.left=this.x+'px';
        this.x-=this.dx;
     }






}