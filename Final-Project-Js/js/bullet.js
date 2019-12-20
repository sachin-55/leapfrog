
function Bullet(context, x, y, radius,speed) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.draw = function () {
        this.context.beginPath();

        this.context.arc(this.x, this.y+20, this.radius, Math.PI * 2, 0, true);
        
        this.context.fillStyle = "green";
        this.context.fill();
        this.context.closePath();
// console.log(this.y);

        return this;

    }
    this.update = function () {
        var oldX=this.x-5-speed*2;
        var oldY=this.y-5;
        this.x +=30;
        // this.y = newY;
        this.context.clearRect(oldX,oldY+20,10,10);
        this.draw();
    }






}