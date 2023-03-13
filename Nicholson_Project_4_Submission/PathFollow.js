
function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = -25;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
    document.body.style.background = "black";


    function draw() {
        canvas.width = canvas.width;
        // use the sliders to get the angles
        var tParam = slider1.value * 0.01;
        var drawPath = slider2.value;

        function moveToTx(loc, Tx) { var res = vec2.create(); vec2.transformMat3(res, loc, Tx); context.moveTo(res[0], res[1]); }

        function lineToTx(loc, Tx) { var res = vec2.create(); vec2.transformMat3(res, loc, Tx); context.lineTo(res[0], res[1]); }

        function drawObject(color, Tx) {
            context.beginPath();
            context.fillStyle = color;
            moveToTx([-.05, -.05], Tx);
            lineToTx([0, 0], Tx);
            lineToTx([.1, .025], Tx);
            lineToTx([0, .05], Tx);
            lineToTx([-.05, .1], Tx);
            lineToTx([-.1, 0.05], Tx);
            lineToTx([-0.1, 0], Tx);

            context.closePath();
            context.fill();
        }

        function drawAsteroid(x, y, scale, color, outline, Tx) {

            context.beginPath();
            context.fillStyle = color;
            context.strokeStyle = outline;
            context.lineWidth = 3;

            moveToTx([x, y], Tx);
            lineToTx([x + (scale * 0.05), y + (scale * 0.05)], Tx);//2
            lineToTx([x + (scale * .1), y + (scale * 0.05)], Tx);//3
            lineToTx([x + (scale * 0.15), y], Tx);//4
            lineToTx([x + (scale * .1), y - (scale * .05)], Tx);//5
            lineToTx([x + (scale * 0.05), y - (scale * 0.05)], Tx);//6

            context.closePath();
            context.stroke();
            context.fill();
        }

        function drawAxes100unit(color, Tx) {
            context.strokeStyle = color;
            context.beginPath();
            // Axes
            moveToTx([120, 0], Tx); lineToTx([0, 0], Tx); lineToTx([0, 120], Tx);
            // Arrowheads
            moveToTx([110, 5], Tx); lineToTx([120, 0], Tx); lineToTx([110, -5], Tx);
            moveToTx([5, 110], Tx); lineToTx([0, 120], Tx); lineToTx([-5, 110], Tx);
            // X-label
            moveToTx([130, 0], Tx); lineToTx([140, 10], Tx);
            moveToTx([130, 10], Tx); lineToTx([140, 0], Tx);
            context.stroke();
        }

        function drawAxes1unit(color, Tx) {
            context.strokeStyle = color;
            context.beginPath();
            // Axes
            moveToTx([1.20, 0], Tx); lineToTx([0, 0], Tx); lineToTx([0, 1.20], Tx);
            // Arrowheads
            moveToTx([1.10, .05], Tx); lineToTx([1.20, 0], Tx); lineToTx([1.10, -.05], Tx);
            moveToTx([.05, 1.10], Tx); lineToTx([0, 1.20], Tx); lineToTx([-.05, 1.10], Tx);
            // X-label
            moveToTx([1.30, 0], Tx); lineToTx([1.40, .10], Tx);
            moveToTx([1.30, .10], Tx); lineToTx([1.40, 0], Tx);
            context.stroke();
        }


        var Hermite = function (t) {
            return [
                2 * t * t * t - 3 * t * t + 1,
                t * t * t - 2 * t * t + t,
                -2 * t * t * t + 3 * t * t,
                t * t * t - t * t
            ];
        }

        var HermiteDerivative = function (t) {
            return [
                6 * t * t - 6 * t,
                3 * t * t - 4 * t + 1,
                -6 * t * t + 6 * t,
                3 * t * t - 2 * t
            ];
        }

        function Cubic(basis, P, t) {
            var b = basis(t);
            var result = vec2.create();
            vec2.scale(result, P[0], b[0]);
            vec2.scaleAndAdd(result, result, P[1], b[1]);
            vec2.scaleAndAdd(result, result, P[2], b[2]);
            vec2.scaleAndAdd(result, result, P[3], b[3]);
            return result;
        }

        var p0 = [0, 1];
        var d0 = [1, 3];
        var p1 = [1, 0.6];
        var d1 = [-1, 4];
        var p2 = [1.85, 2];
        var d2 = [0, 1];
        var p6 = [0, 1];
        var d6 = [1, 3];

        var P0 = [p0, d0, p1, d1]; // First two points and tangents
        var P1 = [p1, d1, p2, d2]; // Last two points and tangents
        var P5 = [p2, d2, p6, d6];

        var C0 = function (t_) { return Cubic(Hermite, P0, t_); };
        var C1 = function (t_) { return Cubic(Hermite, P1, t_); };
        var C4 = function (t_) { return Cubic(Hermite, P5, t_); };

        var C0prime = function (t_) { return Cubic(HermiteDerivative, P0, t_); };
        var C1prime = function (t_) { return Cubic(HermiteDerivative, P1, t_); };
        var C4prime = function (t_) { return Cubic(HermiteDerivative, P5, t_); };

        var p3 = [0, 0];
        var d3 = [0, 7];
        var p4 = [1, 0.3];
        var d4 = [1, 3];
        var p5 = [2, 2];
        var d5 = [0, 3];
        var p7 = [0, 0]
        var d7 = [3, 1]

        var P3 = [p3, d3, p4, d4]; // First two points and tangents
        var P4 = [p4, d4, p5, d5]; // Last two points and tangents
        var P6 = [p5, d5, p7, d7];

        var C2 = function (t_) { return Cubic(Hermite, P3, t_); };
        var C3 = function (t_) { return Cubic(Hermite, P4, t_); };
        var C5 = function (t_) { return Cubic(Hermite, P6, t_); };


        var C2prime = function (t_) { return Cubic(HermiteDerivative, P3, t_); };
        var C3prime = function (t_) { return Cubic(HermiteDerivative, P4, t_); };
        var C5prime = function (t_) { return Cubic(HermiteDerivative, P6, t_); };

        var Ccomp = function (t) {
            if (t < 1) {
                var u = t;
                return C0(u);
            } else if (t < 2) {
                var u = t - 1.0;
                return C1(u);
            } else {
                var u = t - 2.0;
                return C4(u);
            }
        }

        var Ccomp_tangent = function (t) {
            if (t < 1) {
                var u = t;
                return C0prime(u);
            } else if (t < 2) {
                var u = t - 1.0;
                return C1prime(u);
            } else {
                var u = t - 2.0;
                return C4prime(u);
            }
        }

        var Ccomp2 = function (t) {
            if (t < 1) {
                var u = t;
                return C2(u);
            } else if (t < 2) {
                var u = t - 1.0;
                return C3(u);
            } else {
                var u = t - 2.0;
                return C5(u);
            }

        }

        var Ccomp_tangent2 = function (t) {
            if (t < 1) {
                var u = t;
                return C2prime(u);
            } else if (t < 2.0) {
                var u = t - 1.0;
                return C3prime(u);
            } else {
                var u = t - 2.0;
                return C5prime(u);
            }
        }

        function drawTrajectory(t_begin, t_end, intervals, C, Tx, color) {
            context.strokeStyle = color;
            context.beginPath();
            moveToTx(C(t_begin), Tx);
            for (var i = 1; i <= intervals; i++) {
                var t = ((intervals - i) / intervals) * t_begin + (i / intervals) * t_end;
                lineToTx(C(t), Tx);
            }
            context.stroke();
        }

        // make sure you understand these    

        //drawAxes100unit("black", mat3.create());

        var Tblue_to_canvas = mat3.create();
        mat3.fromTranslation(Tblue_to_canvas, [50, 350]);
        mat3.scale(Tblue_to_canvas, Tblue_to_canvas, [150, -150]); // Flip the Y-axis
        //drawAxes1unit("grey", Tblue_to_canvas);

        drawAsteroid(1, 1, 2, "gray", "white", Tblue_to_canvas);
        drawAsteroid(1, 2.1, 2.5, "gray", "white", Tblue_to_canvas);
        drawAsteroid(-0.3, 2, 6, "gray", "white", Tblue_to_canvas);
        drawAsteroid(0.38, 1.3, 1.2, "gray", "white", Tblue_to_canvas);
        drawAsteroid(1.4, 1.6, 1.7, "gray", "white", Tblue_to_canvas);
        drawAsteroid(0.1, 0.2, 2.6, "gray", "white", Tblue_to_canvas);
        drawAsteroid(1.06, 0.1, 1.6, "gray", "white", Tblue_to_canvas);
        drawAsteroid(0.469, 0.7, 1.05, "gray", "white", Tblue_to_canvas);
        drawAsteroid(0.169, 1.05, 0.7, "gray", "white", Tblue_to_canvas);
        drawAsteroid(1.3, 0.5, 4.7, "gray", "white", Tblue_to_canvas);
        drawAsteroid(-.35, 1.4, 3.1, "gray", "white", Tblue_to_canvas);


        if (drawPath == 1) {
            drawTrajectory(0.0, 1.0, 100, C0, Tblue_to_canvas, "red");
            drawTrajectory(0.0, 1.0, 100, C1, Tblue_to_canvas, "blue");
            drawTrajectory(0.0, 1.0, 100, C4, Tblue_to_canvas, "orange");
        }
        var Tgreen_to_blue = mat3.create();
        mat3.fromTranslation(Tgreen_to_blue, Ccomp(tParam));
        var Tgreen_to_canvas = mat3.create();
        var tangent = Ccomp_tangent(tParam);
        var angle = Math.atan2(tangent[1], tangent[0]);
        mat3.rotate(Tgreen_to_blue, Tgreen_to_blue, angle);
        mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
        drawObject("green", Tgreen_to_canvas);

        var TBrown_to_canvas = mat3.create();
        mat3.fromTranslation(TBrown_to_canvas, [50, 350]);
        mat3.scale(TBrown_to_canvas, TBrown_to_canvas, [150, -150]); // Flip the Y-axis
        //drawAxes1unit("grey", TBrown_to_canvas);

        console.log(drawPath);
        if (drawPath == 1) {
            drawTrajectory(0.0, 1.0, 100, C2, TBrown_to_canvas, "brown");
            drawTrajectory(0.0, 1.0, 100, C3, TBrown_to_canvas, "green");
            drawTrajectory(0.0, 1.0, 100, C5, TBrown_to_canvas, "white");
        }
        var Tgreen_to_brown = mat3.create();
        mat3.fromTranslation(Tgreen_to_brown, Ccomp2(tParam));
        var Tgreen_to_canvas2 = mat3.create();
        var tangent2 = Ccomp_tangent2(tParam);
        var angle2 = Math.atan2(tangent2[1], tangent2[0]);
        mat3.rotate(Tgreen_to_brown, Tgreen_to_brown, angle2);
        mat3.multiply(Tgreen_to_canvas2, TBrown_to_canvas, Tgreen_to_brown);
        drawObject("orange", Tgreen_to_canvas2);
    }

    slider1.addEventListener("input", draw);
    slider2.addEventListener("input", draw);
    draw();
}
window.onload = setup;