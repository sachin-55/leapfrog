function Block(posX, posY, height, width, context) {
    this.posX = posX;
    this.posY = posY;
    this.height = height;
    this.width = width;
    this.context = context;
    var that = this;
    this.block = null;
    this.stackPosition = 0;
    this.aroundBlock = {
        'top': 0,
        'right': 0,
        'bottom': 0,
        'current': 0

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
        // if (that.posy <= that.stackPosition) {
            this.posY += 5;
        // }

    }

    this.setStackPosition = function (sPos) {
        that.stackPosition = sPos;
    }

    this.getPositionY = function () {
        return that.posY;
    }



}