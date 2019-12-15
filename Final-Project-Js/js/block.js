function Block(posX, posY, height, width, context) {
    this.posX = posX;
    this.posY = posY;
    this.height = height;
    this.width = width;
    this.context = context;
    var that = this;
    this.block = null;
    this.blockLimit = 450;
    this.aroundBlock = {
        'top': 0,
        'right': 0,
        'bottom': 0

    }

    this.drawBlock = function () {
        this.block = new Image();
        this.block.src = "images/cat-egg50.png"
        this.block.onload = function () {
            that.context.drawImage(that.block, that.posX, that.posY, 50, 50);

        }
        return this;
    }
    this.moveDown = function () {

            this.posY += height;
           


    }


    this.getPositionY = function () {
        return this.posY;
    }



}