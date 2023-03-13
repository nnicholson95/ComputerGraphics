function setup() { 
    var canvas = document.getElementById('myCanvas');
    // var slider1 = document.getElementById('slider1');
    //slider1.value = 90;

    var direction = 0;
    var speed = 0;

    var trunkAngle = (3 * Math.PI)/2;
    var Lowlim = trunkAngle - 0.07;
    var Uplim = trunkAngle + 0.07;
    

    var trunkAngle1 = (Math.PI/4);
    var Lowlim1 = trunkAngle1 - 0.2;
    var Uplim1 = trunkAngle1 + 0.2;

    var trunkAngle2 = (3* Math.PI)/2;
    var Lowlim2 = trunkAngle2 - 0.1;
    var Uplim2 = trunkAngle2 + 0.1;

    function draw() {
      var context = canvas.getContext('2d');
      canvas.width = canvas.width;
      // use the sliders to get the angles

      function drawTreeTrunk(color) {

        context.beginPath();
        context.fillStyle = color;
        context.moveTo(0,0);
        context.lineTo(0,15);
        context.bezierCurveTo(0,15,3,8,15,5);
        context.lineTo(15,5);
        context.bezierCurveTo(15,5,50,2,90,5);
        context.lineTo(90,5);
        context.lineTo(100,0);
        context.lineTo(90,-5);
        context.bezierCurveTo(90,-5,50,-2,15,-5);
        context.lineTo(15,-5);
        context.bezierCurveTo(15,-5,3,-8,0,-15);
        context.lineTo(0,-15);
        context.closePath();
        context.fill();

        //axes("Blue");
      }

    function updateAngle(Angle, speed, Lowlim, Uplim){
        var temp = Angle;
        if (temp <= Lowlim) { 
            direction = 1
        } else if (temp >= Uplim) {
            direction = 0;
        }

        console.log(direction);
        
        if (direction == 0) {
            temp -= 0.25 * speed;
            //temp --;
            //temp -= 0.15;
            console.log("inside decrement: ", temp);
        } else if (direction == 1) {
            temp = temp + (0.25 * speed);
            //temp ++;
            //temp += 0.15;
            console.log("inside increment: ", temp);
        }

        console.log("inside update", temp);

        return temp;
    }

    function axes(color) {
        context.strokeStyle=color;
        context.beginPath();
        // Axes
        context.moveTo(120,0);context.lineTo(0,0);context.lineTo(0,120);
        // Arrowheads
        context.moveTo(110,5);context.lineTo(120,0);context.lineTo(110,-5);
        context.moveTo(5,110);context.lineTo(0,120);context.lineTo(-5,110);
        // X-label
        context.moveTo(130,-5);context.lineTo(140,5);
        context.moveTo(130,5);context.lineTo(140,-5);
        // Y-label
        context.moveTo(-5,130);context.lineTo(0,135);context.lineTo(5,130);
        context.moveTo(0,135);context.lineTo(0,142);
        
        context.stroke();
    }

        context.translate(200,302);
        context.rotate(trunkAngle);
        context.scale(2,3);

        drawTreeTrunk("brown"); // trunk
        trunkAngle = updateAngle(trunkAngle, 0.003, Lowlim, Uplim);
        context.save(); //Up to branch

        context.translate(87, 0);
        context.rotate(trunkAngle1);
        context.scale(0.5, 0.5);

        drawTreeTrunk("brown"); // Right Branch 1
        trunkAngle1 = updateAngle(trunkAngle1, 0.01, Lowlim1, Uplim1); 
        context.save(); //up to branch 2

        context.translate(87, 0);
        context.rotate(trunkAngle1);
        context.scale(0.5, 0.5);

        drawTreeTrunk("brown"); // Right Branch 2

        context.rotate(trunkAngle2);

        drawTreeTrunk("brown"); // Right Branch 3
        context.restore(); //down to branch 1
        context.save();// make left 1

        context.rotate(trunkAngle2);

        drawTreeTrunk("brown"); // Left Branch 1
        trunkAngle2 = updateAngle(trunkAngle2, 0.01, Lowlim2, Uplim2);
        context.save();

        context.translate(87, 0);
        context.rotate(trunkAngle1);
        context.scale(0.5, 0.5);

        drawTreeTrunk("brown"); // Left Branch 2

        context.rotate(trunkAngle2);

        drawTreeTrunk("brown"); // Left Branch 3
        context.restore(); //down to branch 1
        context.save();// make left 1

        context.rotate(trunkAngle1);
        
        drawTreeTrunk("brown"); // Left Branch 1
        //trunkAngle2 = updateAngle(trunkAngle2, 0.01, Lowlim2, Uplim2);
        context.save();

        context.translate(87, 0);
        context.rotate(trunkAngle1);
        context.scale(0.5, 0.5);

        drawTreeTrunk("brown"); // Left Branch 2

        context.rotate(trunkAngle2);

        drawTreeTrunk("brown"); // Left Branch 3
        context.restore(); //down to branch 1
        context.save();// make left 1



        window.requestAnimationFrame(draw);        
    }
window.requestAnimationFrame(draw);
}

window.onload = setup;