function Cat(height, width, context) {
    this.height = height;
    this.width = width;
    this.context = context;
    var that = this;
    this.cat = null;
    this.positionY = 200;
    var catHeight = 50;
    this.catLimit = 450;
this.speed=5;
    this.drawCat = function () {
        this.cat = new Image();
        this.cat.src = "images/Cat50.png";
        this.cat.onload = function () {
            that.context.drawImage(that.cat, 100, that.positionY, 50, 50);
        }

    }
    this.moveUp = function () {

        this.positionY -= 50;
      
    }
    this.moveDown = function () {

                   

            this.positionY += this.speed;
         

    }
    this.getPositionY = function () {
        return this.positionY;
    }
    this.setPositionY = function (y) {
        this.positionY = y;
    }
    this.setCatLimit = function (l) {
        this.catLimit = l;
    }
    this.getCatLimit = function () {
        return this.catLimit;
    }



}