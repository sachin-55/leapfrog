var canvas = document.getElementById('helixCanvas');
var ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
canvas.classList.add('helixCanvas');
canvas.style.margin = '10px 20%';

var phase = 0;
var speed = 0.02;
var maxCircleRadius = 10;
var frameCount = 0;
var numRows = 20;
var numCols = 10;
var numStrands = 2;
var y;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var x = 0
    var colOffset = 0;
    frameCount++;

    phase = frameCount * speed;

    for (var count = 0; count < numStrands; count++) {
        if (count === 0) {
            var strandPhase = phase;
        } else {

            var strandPhase = phase + count * Math.PI;
        }
        x = 0;
        for (var col = 0; col < numCols; col++) {
            x = x + 20;


            colOffset = (col * 2 * Math.PI) / 10;

            for (var row = 0; row < numRows; row += 1) {
                var y = 100 + row * 15 + Math.sin(strandPhase + colOffset) * 50;


                if (y < 270) {
                    color = 'rgb(254, 170, 119)';
                } else if (y < 300) {
                    color = 'rgb(254, 170, 119)';

                } else if (y < 350) {
                    color = 'rgb(232, 169, 130)';

                }
                else if (y < 400) {
                   color='rgb(237, 185, 154)'

                } else {
                     color = 'rgb(240, 132, 174)';

                }

                //sizeOffset changes the radius of the circle
                var sizeOffset = (Math.cos(strandPhase - (row * 0.1) + colOffset) + 1) *0.5;
                var circleRadius = sizeOffset * maxCircleRadius;

                ctx.beginPath();
                ctx.arc(x, y, circleRadius, 0, Math.PI * 2, false);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


function animate() {
    requestAnimationFrame(animate);
    draw();
}

animate();