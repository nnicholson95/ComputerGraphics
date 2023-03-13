function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    // var slider1 = document.getElementById('slider1');
    //slider1.value = 90;

    var direction = 0;
    var speed = 0;

    var trunkAngle = (3 * Math.PI) / 2;
    var Lowlim = trunkAngle - 0.07;
    var Uplim = trunkAngle + 0.07;


    var trunkAngle1 = (Math.PI / 4);
    var Lowlim1 = trunkAngle1 - 0.2;
    var Uplim1 = trunkAngle1 + 0.2;

    var trunkAngle2 = (3 * Math.PI) / 2;
    var Lowlim2 = trunkAngle2 - 0.1;
    var Uplim2 = trunkAngle2 + 0.1;

    function setCanvasTransform(Tx) {
        context.setTransform(Tx[0], Tx[1], Tx[3], Tx[4], Tx[6], Tx[7], Tx[8], Tx[9], Tx[10], Tx[11], Tx[12]);
    }

    function draw() {
        canvas.width = canvas.width;
        // use the sliders to get the angles

        function drawTreeTrunk(color) {

            context.beginPath();
            context.fillStyle = color;
            context.moveTo(0, 0);
            context.lineTo(0, 15);
            context.bezierCurveTo(0, 15, 3, 8, 15, 5);
            context.lineTo(15, 5);
            context.bezierCurveTo(15, 5, 50, 2, 90, 5);
            context.lineTo(90, 5);
            context.lineTo(100, 0);
            context.lineTo(90, -5);
            context.bezierCurveTo(90, -5, 50, -2, 15, -5);
            context.lineTo(15, -5);
            context.bezierCurveTo(15, -5, 3, -8, 0, -15);
            context.lineTo(0, -15);
            context.closePath();
            context.fill();

            //axes("Blue");
        }

        function updateAngle(Angle, speed, Lowlim, Uplim) {
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
            context.strokeStyle = color;
            context.beginPath();
            // Axes
            context.moveTo(120, 0); context.lineTo(0, 0); context.lineTo(0, 120);
            // Arrowheads
            context.moveTo(110, 5); context.lineTo(120, 0); context.lineTo(110, -5);
            context.moveTo(5, 110); context.lineTo(0, 120); context.lineTo(-5, 110);
            // X-label
            context.moveTo(130, -5); context.lineTo(140, 5);
            context.moveTo(130, 5); context.lineTo(140, -5);
            // Y-label
            context.moveTo(-5, 130); context.lineTo(0, 135); context.lineTo(5, 130);
            context.moveTo(0, 135); context.lineTo(0, 142);

            context.stroke();
        }

        var Trunk_to_canvas = mat3.create();
        mat3.fromTranslation(Trunk_to_canvas, [200, 302]);
        mat3.rotate(Trunk_to_canvas, Trunk_to_canvas, trunkAngle);
        mat3.scale(Trunk_to_canvas, Trunk_to_canvas, [2, 3]);
        setCanvasTransform(Trunk_to_canvas);

        drawTreeTrunk("brown"); //trunk
        trunkAngle = updateAngle(trunkAngle, 0.003, Lowlim, Uplim);

        var Branch_to_Trunk = mat3.create(); //make first branch
        mat3.fromTranslation(Branch_to_Trunk, [87, 0]);
        mat3.rotate(Branch_to_Trunk, Branch_to_Trunk, trunkAngle1);
        mat3.scale(Branch_to_Trunk, Branch_to_Trunk, [0.5, 0.5]);
        var Branch_to_Canvas = mat3.create();
        mat3.multiply(Branch_to_Canvas, Trunk_to_canvas, Branch_to_Trunk);
        setCanvasTransform(Branch_to_Canvas);

        drawTreeTrunk("brown"); //right branch one
        trunkAngle1 = updateAngle(trunkAngle1, 0.01, Lowlim1, Uplim1);

        var RBranch_to_Trunk = mat3.create();
        mat3.fromTranslation(RBranch_to_Trunk, [87, 0]);
        mat3.rotate(RBranch_to_Trunk, RBranch_to_Trunk, trunkAngle1);
        mat3.scale(RBranch_to_Trunk, RBranch_to_Trunk, [0.5, 0.5]);
        var RBranch_to_Canvas = mat3.create();
        mat3.multiply(RBranch_to_Canvas, Branch_to_Canvas, RBranch_to_Trunk);
        setCanvasTransform(RBranch_to_Canvas);

        drawTreeTrunk("brown"); //right branch 2

        var R2Branch_to_Trunk = mat3.create();
        mat3.rotate(R2Branch_to_Trunk, R2Branch_to_Trunk, trunkAngle2);
        var R2Branch_to_Canvas = mat3.create();
        mat3.multiply(R2Branch_to_Canvas, RBranch_to_Canvas, R2Branch_to_Trunk);
        setCanvasTransform(R2Branch_to_Canvas);

        drawTreeTrunk("brown"); //right branch 3

        var LBranch_to_Trunk = mat3.create();
        mat3.rotate(LBranch_to_Trunk, LBranch_to_Trunk, trunkAngle2);
        var LBranch_to_Canvas = mat3.create();
        mat3.multiply(LBranch_to_Canvas, Branch_to_Canvas, LBranch_to_Trunk);
        setCanvasTransform(LBranch_to_Canvas);

        drawTreeTrunk("brown"); //left branch 1
        trunkAngle2 = updateAngle(trunkAngle2, 0.01, Lowlim2, Uplim2);

        var L2Branch_to_Trunk = mat3.create();
        mat3.fromTranslation(L2Branch_to_Trunk, [87, 0]);
        mat3.rotate(L2Branch_to_Trunk, L2Branch_to_Trunk, trunkAngle1);
        mat3.scale(L2Branch_to_Trunk, L2Branch_to_Trunk, [0.5, 0.5]);
        var L2Branch_to_Canvas = mat3.create();
        mat3.multiply(L2Branch_to_Canvas, LBranch_to_Canvas, L2Branch_to_Trunk);
        setCanvasTransform(L2Branch_to_Canvas);

        drawTreeTrunk("brown"); //left branch 2

        var L3Branch_to_Trunk = mat3.create();
        mat3.rotate(L3Branch_to_Trunk, L3Branch_to_Trunk, trunkAngle2);
        var L3Branch_to_Canvas = mat3.create();
        mat3.multiply(L3Branch_to_Canvas, L2Branch_to_Canvas, L3Branch_to_Trunk);
        setCanvasTransform(L3Branch_to_Canvas);

        drawTreeTrunk("brown"); //left branch 3

        var CBranch_to_Trunk = mat3.create();
        mat3.rotate(CBranch_to_Trunk, CBranch_to_Trunk, trunkAngle1);
        mat3.rotate(CBranch_to_Trunk, CBranch_to_Trunk, trunkAngle1);
        mat3.rotate(CBranch_to_Trunk, CBranch_to_Trunk, trunkAngle1);
        mat3.rotate(CBranch_to_Trunk, CBranch_to_Trunk, trunkAngle1);
        mat3.rotate(CBranch_to_Trunk, CBranch_to_Trunk, trunkAngle1);
        mat3.rotate(CBranch_to_Trunk, CBranch_to_Trunk, trunkAngle1);
        mat3.rotate(CBranch_to_Trunk, CBranch_to_Trunk, trunkAngle1);
        var CBranch_to_Canvas = mat3.create();
        mat3.multiply(CBranch_to_Canvas, Branch_to_Canvas, CBranch_to_Trunk);
        setCanvasTransform(CBranch_to_Canvas);

        drawTreeTrunk("brown"); //Middle branch 1
        trunkAngle2 = updateAngle(trunkAngle2, 0.01, Lowlim2, Uplim2);

        var C2Branch_to_Trunk = mat3.create();
        mat3.fromTranslation(C2Branch_to_Trunk, [87, 0]);
        mat3.rotate(C2Branch_to_Trunk, C2Branch_to_Trunk, trunkAngle1);
        mat3.scale(C2Branch_to_Trunk, C2Branch_to_Trunk, [0.5, 0.5]);
        var C2Branch_to_Canvas = mat3.create();
        mat3.multiply(C2Branch_to_Canvas, CBranch_to_Canvas, C2Branch_to_Trunk);
        setCanvasTransform(C2Branch_to_Canvas);

        drawTreeTrunk("brown"); //Middle branch 2

        var C3Branch_to_Trunk = mat3.create();
        mat3.rotate(C3Branch_to_Trunk, C3Branch_to_Trunk, trunkAngle2);
        var C3Branch_to_Canvas = mat3.create();
        mat3.multiply(C3Branch_to_Canvas, C2Branch_to_Canvas, C3Branch_to_Trunk);
        setCanvasTransform(C3Branch_to_Canvas);

        drawTreeTrunk("brown"); //Middle branch 3


        window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
}

window.onload = setup;