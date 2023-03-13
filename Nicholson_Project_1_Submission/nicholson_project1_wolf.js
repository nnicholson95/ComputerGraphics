function setup() { "use strict";

document.body.style.background = "gray";

var canvas = document.getElementById('myCanvas');
var slider1 = document.getElementById('slider1');
slider1.value = 345;

var slider2 = document.getElementById('slider2');
slider1.value = 1;

function draw() {
  var context = canvas.getContext('2d');
  canvas.width = canvas.width;

  var vertices = {
    x1: 600, x2: 668, x3: 708, x4: 726, x5: 734, x6: 749,
    x7: 794, x8: 899, x9: 920, x10: 809, x11: 964, x12: 844,
    x13: 874, x14: 774, x15: 844, x16: 734, x17: 744,
    x18: 714, x19: 670, x20: 695, x21: 755, x22: 600, x23: 600,
    x24: 600, x25: 600, x26: 630, x27: 600, x28: 600, x29: 645,
    x30: 628, x31: 635, x32: 657, x33: 655,

    y1: 1200, y2: 1002, y3: 984, y4: 934, y5: 834, y6: 974,
    y7: 1134, y8: 1070, y9: 1010, y10: 870, y11: 810, y12: 830,
    y13: 620, y14: 455, y15: 475, y16: 345, y17: 465,
    y18: 630, y19: 725, y20: 735, y21: 690, y22: 675, y23: 615,
    y24: 510, y25: 450, y26: 855, y27: 855, y28: 972, y29: 957,
    y30: 942, y31: 927, y32: 905, y33: 927, y34: 879,

  }

  var Lvertices = {
    x1: 600, x2: 532, x3: 492, x4: 474, x5: 466, x6: 451,
    x7: 406, x8: 301, x9: 298, x10: 391, x11: 236, x12: 356,
    x13: 326, x14: 426, x15: 356, x16: 466, x17: 456,
    x18: 486, x19: 530, x20: 505, x21: 445, x22: 600, x23: 600,
    x24: 600, x25: 600, x26: 570, x27: 600, x28: 600, x29: 555,
    x30: 572, x31: 565, x32: 543, x33: 545
  }

  var dy = slider1.value;
  var colorMult = slider2.value; 
    
  function DrawRight(color, outlineColor) {
    context.beginPath();
    context.fillStyle = color;
    context.strokeStyle = outlineColor;
    context.lineWidth = 5;
    context.moveTo(vertices.x1,vertices.y1);
    context.lineTo(vertices.x1,vertices.y2);
    context.lineTo(vertices.x2,vertices.y3);
    context.lineTo(vertices.x3,vertices.y4);
    context.lineTo(vertices.x4,vertices.y5);
    context.lineTo(vertices.x5,vertices.y6);
    context.lineTo(vertices.x1,vertices.y1);

    //Start Right "Mane"
    context.moveTo(vertices.x1,vertices.y1);
    context.lineTo(vertices.x5,vertices.y6);
    context.lineTo(vertices.x6,vertices.y7);
    context.lineTo(vertices.x1,vertices.y1);

    context.moveTo(vertices.x6,vertices.y7);
    context.lineTo(vertices.x7,vertices.y8);
    context.lineTo(vertices.x4,vertices.y5);
    context.lineTo(vertices.x5,vertices.y6);
    context.lineTo(vertices.x6,vertices.y7);

    context.moveTo(vertices.x7,vertices.y8);
    context.lineTo(vertices.x8,vertices.y9);
    context.lineTo(vertices.x4,vertices.y5);
    context.lineTo(vertices.x7,vertices.y8);

    context.moveTo(vertices.x8,vertices.y9);
    context.lineTo(vertices.x9,vertices.y10);
    context.lineTo(vertices.x4,vertices.y5);
    context.lineTo(vertices.x8,vertices.y9);

    context.moveTo(vertices.x4,vertices.y5);
    context.lineTo(vertices.x9,vertices.y10);
    context.lineTo(vertices.x10,vertices.y11);
    context.lineTo(vertices.x4,vertices.y5);

    context.moveTo(vertices.x9,vertices.y10);
    context.lineTo(vertices.x11,vertices.y12);
    context.lineTo(vertices.x12,vertices.y13);
    context.lineTo(vertices.x10,vertices.y11);
    context.lineTo(vertices.x9,vertices.y10);

    //Begin Right Ear
    context.moveTo(vertices.x12,vertices.y13);
    context.lineTo(vertices.x13,vertices.y14);
    context.lineTo(vertices.x14,vertices.y15);
    context.lineTo(vertices.x12,vertices.y13);

    context.moveTo(vertices.x14,vertices.y15);
    context.lineTo(vertices.x13,vertices.y14);
    context.lineTo(vertices.x15,dy);
    context.lineTo(vertices.x14,vertices.y15);

    context.moveTo(vertices.x15,dy);
    context.lineTo(vertices.x16,vertices.y17);
    context.lineTo(vertices.x14,vertices.y15);
    context.lineTo(vertices.x15,dy);

    context.moveTo(vertices.x16,vertices.y17);
    context.lineTo(vertices.x14,vertices.y15);
    context.lineTo(vertices.x12,vertices.y13);
    context.lineTo(vertices.x16,vertices.y17);

    //Begin Right Face
    context.moveTo(vertices.x16,vertices.y17);
    context.lineTo(vertices.x17,vertices.y18);
    context.lineTo(vertices.x12,vertices.y13);
    context.lineTo(vertices.x16,vertices.y17);

    context.moveTo(vertices.x10,vertices.y11);
    context.lineTo(vertices.x18,vertices.y19);
    context.lineTo(vertices.x19,vertices.y20);
    context.lineTo(vertices.x4,vertices.y5);
    context.lineTo(vertices.x10,vertices.y11);

    context.moveTo(vertices.x18,vertices.y19);
    context.lineTo(vertices.x10,vertices.y11);
    context.lineTo(vertices.x12,vertices.y13);
    context.lineTo(vertices.x17,vertices.y18);
    context.lineTo(vertices.x20,vertices.y21);
    context.lineTo(vertices.x21,vertices.y22);
    context.lineTo(vertices.x18,vertices.y19);

    context.moveTo(vertices.x19,vertices.y20);
    context.lineTo(vertices.x22,vertices.y23);
    context.lineTo(vertices.x16,vertices.y17);
    context.lineTo(vertices.x17,vertices.y18);
    context.lineTo(vertices.x20,vertices.y21);
    context.lineTo(vertices.x19,vertices.y20);

    context.moveTo(vertices.x16,vertices.y17);
    context.lineTo(vertices.x23,vertices.y24);
    context.lineTo(vertices.x24,vertices.y25);
    context.lineTo(vertices.x16,vertices.y17);
    
    context.moveTo(vertices.x22,vertices.y23);
    context.lineTo(vertices.x25,vertices.y26);
    context.lineTo(vertices.x26,vertices.y27);
    context.lineTo(vertices.x19,vertices.y20);
    context.lineTo(vertices.x22,vertices.y23);

    context.moveTo(vertices.x26,vertices.y27);
    context.lineTo(vertices.x3,vertices.y4);
    context.lineTo(vertices.x4,vertices.y5);
    context.lineTo(vertices.x19,vertices.y20);
    context.lineTo(vertices.x26,vertices.y27);

    context.moveTo(vertices.x2,vertices.y3);
    context.lineTo(vertices.x27,vertices.y28);
    context.lineTo(vertices.x28,vertices.y29);
    context.lineTo(vertices.x29,vertices.y30);
    context.lineTo(vertices.x30,vertices.y31);
    context.lineTo(vertices.x31,vertices.y32);
    context.lineTo(vertices.x32,vertices.y33);
    context.lineTo(vertices.x33,vertices.y34);
    context.lineTo(vertices.x3,vertices.y4);
    context.lineTo(vertices.x2,vertices.y3);

    context.closePath();

    context.fill();
    context.stroke();      
  }

  function DrawLeft(color, outlineColor) {
    context.beginPath();
    context.fillStyle = color;
    context.strokeStyle = outlineColor;
    context.lineWidth = 5;
    context.moveTo(Lvertices.x1,vertices.y1);
    context.lineTo(Lvertices.x1,vertices.y2);
    context.lineTo(Lvertices.x2,vertices.y3);
    context.lineTo(Lvertices.x3,vertices.y4);
    context.lineTo(Lvertices.x4,vertices.y5);
    context.lineTo(Lvertices.x5,vertices.y6);
    context.closePath();
    //Start Right "Mane"
    context.moveTo(Lvertices.x1,vertices.y1);
    context.lineTo(Lvertices.x5,vertices.y6);
    context.lineTo(Lvertices.x6,vertices.y7);
    context.closePath();

    context.moveTo(Lvertices.x6,vertices.y7);
    context.lineTo(Lvertices.x7,vertices.y8);
    context.lineTo(Lvertices.x4,vertices.y5);
    context.lineTo(Lvertices.x5,vertices.y6);
    context.closePath();

    context.moveTo(Lvertices.x7,vertices.y8);
    context.lineTo(Lvertices.x8,vertices.y9);
    context.lineTo(Lvertices.x4,vertices.y5);
    context.closePath();

    context.moveTo(Lvertices.x8,vertices.y9);
    context.lineTo(Lvertices.x9,vertices.y10);
    context.lineTo(Lvertices.x4,vertices.y5);
    context.closePath();

    context.moveTo(Lvertices.x4,vertices.y5);
    context.lineTo(Lvertices.x9,vertices.y10);
    context.lineTo(Lvertices.x10,vertices.y11);
    context.closePath();

    context.moveTo(Lvertices.x9,vertices.y10);
    context.lineTo(Lvertices.x11,vertices.y12);
    context.lineTo(Lvertices.x12,vertices.y13);
    context.lineTo(Lvertices.x10,vertices.y11);
    context.closePath();

    //Begin Right Ear
    context.moveTo(Lvertices.x12,vertices.y13);
    context.lineTo(Lvertices.x13,vertices.y14);
    context.lineTo(Lvertices.x14,vertices.y15);
    context.closePath();

    context.moveTo(Lvertices.x14,vertices.y15);
    context.lineTo(Lvertices.x13,vertices.y14);
    context.lineTo(Lvertices.x15,dy);
    context.closePath();

    context.moveTo(Lvertices.x15,dy);
    context.lineTo(Lvertices.x16,vertices.y17);
    context.lineTo(Lvertices.x14,vertices.y15);
    context.closePath();

    context.moveTo(Lvertices.x16,vertices.y17);
    context.lineTo(Lvertices.x14,vertices.y15);
    context.lineTo(Lvertices.x12,vertices.y13);
    context.closePath();

    //Begin Right Face
    context.moveTo(Lvertices.x16,vertices.y17);
    context.lineTo(Lvertices.x17,vertices.y18);
    context.lineTo(Lvertices.x12,vertices.y13);
    context.closePath();  

    context.moveTo(Lvertices.x10,vertices.y11);
    context.lineTo(Lvertices.x18,vertices.y19);
    context.lineTo(Lvertices.x19,vertices.y20);
    context.lineTo(Lvertices.x4,vertices.y5);
    context.closePath();

    context.moveTo(Lvertices.x18,vertices.y19);
    context.lineTo(Lvertices.x10,vertices.y11);
    context.lineTo(Lvertices.x12,vertices.y13);
    context.lineTo(Lvertices.x17,vertices.y18);
    context.lineTo(Lvertices.x20,vertices.y21);
    context.lineTo(Lvertices.x21,vertices.y22);
    context.closePath();

    context.moveTo(Lvertices.x19,vertices.y20);
    context.lineTo(Lvertices.x22,vertices.y23);
    context.lineTo(Lvertices.x16,vertices.y17);
    context.lineTo(Lvertices.x17,vertices.y18);
    context.lineTo(Lvertices.x20,vertices.y21);
    context.closePath();

    context.moveTo(Lvertices.x16,vertices.y17);
    context.lineTo(Lvertices.x23,vertices.y24);
    context.lineTo(Lvertices.x24,vertices.y25);
    context.closePath();
    
    context.moveTo(Lvertices.x22,vertices.y23);
    context.lineTo(Lvertices.x25,vertices.y26);
    context.lineTo(Lvertices.x26,vertices.y27);
    context.lineTo(Lvertices.x19,vertices.y20);
    context.closePath();

    context.moveTo(Lvertices.x26,vertices.y27);
    context.lineTo(Lvertices.x3,vertices.y4);
    context.lineTo(Lvertices.x4,vertices.y5);
    context.lineTo(Lvertices.x19,vertices.y20);
    context.closePath();

    context.moveTo(Lvertices.x2,vertices.y3);
    context.lineTo(Lvertices.x27,vertices.y28);
    context.lineTo(Lvertices.x28,vertices.y29);
    context.lineTo(Lvertices.x29,vertices.y30);
    context.lineTo(Lvertices.x30,vertices.y31);
    context.lineTo(Lvertices.x31,vertices.y32);
    context.lineTo(Lvertices.x32,vertices.y33);
    context.lineTo(Lvertices.x33,vertices.y34);
    context.lineTo(Lvertices.x3,vertices.y4);
    context.closePath();

    context.fill();
    context.stroke();    
  }

  function drawNose(color, outlineColor) {
    context.beginPath();
    context.fillStyle = color;
    context.strokeStyle = outlineColor;
    context.lineWidth = 5;


    context.moveTo(vertices.x28,vertices.y29);
    context.lineTo(vertices.x29,vertices.y30);
    context.lineTo(vertices.x30,vertices.y31);
    context.lineTo(vertices.x31,vertices.y32);
    context.lineTo(vertices.x32,vertices.y33);
    context.lineTo(vertices.x33,vertices.y34);
    context.lineTo(vertices.x26,vertices.y27);

    context.lineTo(Lvertices.x26,vertices.y27);
    context.lineTo(Lvertices.x33,vertices.y34);
    context.lineTo(Lvertices.x32,vertices.y33);
    context.lineTo(Lvertices.x31,vertices.y32);
    context.lineTo(Lvertices.x30,vertices.y31);
    context.lineTo(Lvertices.x29,vertices.y30);
    context.lineTo(Lvertices.x28,vertices.y29);
    
    context.closePath();

    context.fill();
    context.stroke();
  }

  function drawTriangles(color, outlineColor) {
    context.beginPath();
    context.fillStyle = color;
    context.strokeStyle = outlineColor;
    context.lineWidth = 5;

    context.moveTo(vertices.x16,vertices.y17);
    context.lineTo(vertices.x22,vertices.y23);
    context.lineTo(Lvertices.x16,vertices.y17);
    context.lineTo(vertices.x23,vertices.y24);
    
    context.moveTo(vertices.x2,vertices.y3);
    context.lineTo(vertices.x27,vertices.y28);
    context.lineTo(Lvertices.x2,vertices.y3);
    context.lineTo(vertices.x1,vertices.y2);
    
    context.closePath();

    context.fill();
    context.stroke();
  }

  function drawRightEye(color, outlineColor) {
    context.beginPath();
    context.fillStyle = color;
    context.strokeStyle = outlineColor;
    context.lineWidth = 5;

    context.moveTo(vertices.x19,vertices.y20);
    context.lineTo(vertices.x18,vertices.y19);
    context.lineTo(vertices.x21,vertices.y22);
    context.lineTo(vertices.x20,vertices.y21);
    
    context.closePath();

    context.fill();
    context.stroke();
  }

  function drawLeftEye(color, outlineColor) {
    context.beginPath();
    context.fillStyle = color;
    context.strokeStyle = outlineColor;
    context.lineWidth = 5;

    context.moveTo(Lvertices.x19,vertices.y20);
    context.lineTo(Lvertices.x18,vertices.y19);
    context.lineTo(Lvertices.x21,vertices.y22);
    context.lineTo(Lvertices.x20,vertices.y21);
    
    context.closePath();

    context.fill();
    context.stroke();
  }
     
  // make sure you understand these
if (colorMult == 2) {
    context.save();
    context.translate(-200,-300);
    DrawRight("black", "red");
    DrawLeft("white", "cyan");
    drawNose("black", "red");
    drawTriangles("black", "red");
    drawRightEye("white", "cyan");
    drawLeftEye("black", "red");
    context.restore();
} else {
    context.save();
    context.translate(-200,-300);
    DrawRight("white", "cyan");
    DrawLeft("black", "red");
    drawNose("white", "cyan");
    drawTriangles("white", "cyan");
    drawRightEye("black", "red");
    drawLeftEye("white", "cyan");
    context.restore();
}

  
    
}

slider1.addEventListener("input",draw);
slider2.addEventListener("input",draw);
draw();
}
window.onload = setup;