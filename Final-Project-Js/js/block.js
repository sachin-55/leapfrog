function Block(posX,posY,height,width,context){
    this.posX=posX || 100;
    this.posY=posY || 500;
    this.height=height;
    this.width= width;
    this.context = context;
    var that = this;
    this.block=null;

    this.drawBlock = function(){
        this.block = new Image();
        this.block.src="images/cat-egg50.png"
        this.block.onload = function(){
            that.context.drawImage(that.block,that.posX,that.posY,50,50);

        }
        return this;
    }


}