var smallCat = new Image();
smallCat.src = 'images/small-cat.png'
function StatusBar(context) {
    this.context = context;
    var that = this;

    this.draw = function () {
        this.context.clearRect(100, 60, 400, 10);
        this.context.beginPath();

        this.context.strokeStyle = "rgba(20,40,50,0.9)";

        this.context.rect(100, 60, 400, 10);
        this.context.stroke();
        this.context.closePath();


    }
    this.update = function (width, totalWidth) {
        this.draw();

        var fillLength = Math.floor(((width) / (totalWidth-100)) * 400)-8;
        this.context.beginPath();
        this.context.rect(100, 60, fillLength, 10);
        this.context.fillStyle = "rgba(20,40,50,0.5)";
        this.context.fill();
        this.context.closePath();
        //  smallCat.onload = function(){

        that.context.drawImage(smallCat, 75 + fillLength, 75, 25, 25);
        this.context.clearRect(75 + fillLength -25, 75, 25, 25);


        // }


    }


}