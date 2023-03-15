//Use Webgl to make a sphere and apply a texture using earthmap1k.jpg
//Use a slider to rotate the sphere
//draw the sphere with gl.drawElements() using the indices array

class Sphere {
    constructor(radius, slices, stacks) {
    this.radius = radius;
    this.slices = slices;
    this.stacks = stacks;
    this.vertices = [];
    this.vertexNormals = [];
    this.vertexColors = [];
    this.vertexTextureCoords = [];
    this.indices = [];
    

   
        for (var i = 0; i <= this.stacks; i++) {
            var V = i / this.stacks;
            var phi = V * Math.PI;
            for (var j = 0; j <= this.slices; j++) {
                var U = j / this.slices;
                var theta = U * (Math.PI * 2);
                var x = Math.cos(theta) * Math.sin(phi);
                var y = Math.cos(phi);
                var z = Math.sin(theta) * Math.sin(phi);
                this.vertices.push(this.radius * x);
                this.vertices.push(this.radius * y);
                this.vertices.push(this.radius * z);
            }
        }



        for (var i = 0; i <= this.stacks; i++) {
            var V = i / this.stacks;
            var phi = V * Math.PI;
            for (var j = 0; j <= this.slices; j++) {
                var U = j / this.slices;
                var theta = U * (Math.PI * 2);
                var x = Math.cos(theta) * Math.sin(phi);
                var y = Math.cos(phi);
                var z = Math.sin(theta) * Math.sin(phi);
                this.vertexNormals.push(x);
                this.vertexNormals.push(y);
                this.vertexNormals.push(z);
            }
        }

        for (var i = 0; i <= this.stacks; i++) {
            var V = i / this.stacks;
            var phi = V * Math.PI;
            for (var j = 0; j <= this.slices; j++) {
                var U = j / this.slices;
                var theta = U * (Math.PI * 2);
                this.vertexColors.push(1);
                this.vertexColors.push(1);
                this.vertexColors.push(1);
            }
        }

        for (var i = 0; i <= this.stacks; i++) {
            var V = i / this.stacks;
            var phi = V * Math.PI;
            for (var j = 0; j <= this.slices; j++) {
                var U = j / this.slices;
                var theta = U * (Math.PI * 2);
                this.vertexTextureCoords.push(U);
                this.vertexTextureCoords.push(V);
            }
        }

        for (var i = 0; i < this.stacks; i++) {
            for (var j = 0; j < this.slices; j++) {
                var p1 = i * (this.slices + 1) + j;
                var p2 = p1 + (this.slices + 1);
                this.indices.push(p1);
                this.indices.push(p2);
                this.indices.push(p1 + 1);
                this.indices.push(p1 + 1);
                this.indices.push(p2);
                this.indices.push(p2 + 1);
            }
        }
    }
}

//start function 
function start() {
    //get canvas and webgl context
    var canvas = document.getElementById("mycanvas");
    var gl = canvas.getContext("webgl");

    //sliders at center
    var slider1 = document.getElementById("slider1");
    slider1.value = 0;
    var slider2 = document.getElementById("slider2");
    slider2.value = 0;

    //Read shader source
    var vertexShaderSource = document.getElementById("vertexShader").text;
    var fragmentShaderSource = document.getElementById("fragmentShader").text;

    //Create and compile vertex shader
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(vertexShader)); return null; }

    //Create and compile fragment shader
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(fragmentShader)); return null; }

    //Attach the shaders and link program
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        alert("could not initialize shaders");
    }
    gl.useProgram(program);

    //with the vertex shader, we need to pass in the position of the vertices
    //as and attribute - so set up that communication
    program.PositionAttribute = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(program.PositionAttribute);

    program.NormalAttribute = gl.getAttribLocation(program, "vNormal");
    gl.enableVertexAttribArray(program.NormalAttribute);

    program.ColorAttribute = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(program.ColorAttribute);

    program.TexCoordAttribute = gl.getAttribLocation(program, "vTexCoord");
    gl.enableVertexAttribArray(program.TexCoordAttribute);

    //Access the matrix uniforms
    program.MVmatrix = gl.getUniformLocation(program, "uMV");
    program.MVNormalmatrix = gl.getUniformLocation(program, "uMVn");
    program.MVPmatrix = gl.getUniformLocation(program, "uMVP");

    //Attach samplers to texture units
    program.texSampler1 = gl.getUniformLocation(program, "texSampler1");
    gl.uniform1i(program.texSampler1, 0);
    program.texSampler2 = gl.getUniformLocation(program, "texSampler2");
    gl.uniform1i(program.texSampler2, 1);

    //vertex positions of a sphere
    const sphere = new Sphere(1, 20, 20);
    var vertexPos = new Float32Array(sphere.vertices);
    var vertexNormals = new Float32Array(sphere.vertexNormals);
    var vertexColors = new Float32Array(sphere.vertexColors);
    var vertexTextureCoords = new Float32Array(sphere.vertexTextureCoords);
    var indices = new Uint16Array(sphere.indices);

    //we need to put the vertices into a buffer so we can
    //transfer them to the graphics hardware
    var trianglePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPos, gl.STATIC_DRAW);
    trianglePosBuffer.itemSize = 3;
    trianglePosBuffer.numItems = vertexPos.length / 3;

    //we need to put the normals into a buffer so we can
    //transfer them to the graphics hardware
    var triangleNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexNormals, gl.STATIC_DRAW);
    triangleNormalBuffer.itemSize = 3;
    triangleNormalBuffer.numItems = vertexNormals.length / 3;

    //we need to put the colors into a buffer so we can
    //transfer them to the graphics hardware
    var triangleColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);
    triangleColorBuffer.itemSize = 3;
    triangleColorBuffer.numItems = vertexColors.length / 3;

    //we need to put the texture coordinates into a buffer so we can
    //transfer them to the graphics hardware
    var triangleTexCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexTextureCoords, gl.STATIC_DRAW);
    triangleTexCoordBuffer.itemSize = 2;
    triangleTexCoordBuffer.numItems = vertexTextureCoords.length / 2;

    //we need to put the indices into an ELEMENT_ARRAY_BUFFER so we can
    //transfer them to the graphics hardware
    var triangleIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    triangleIndexBuffer.itemSize = 1;
    triangleIndexBuffer.numItems = indices.length;
    
    // var triangleIndexBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndexBuffer);
    // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

     console.log(sphere.indices);

    //set up textures
    var texture1 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image1 = new Image();

    var texture2 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image2 = new Image();

    function initTextureThenDraw() {
        image1.onload = function () {
            loadTexture(image1, texture1);
        }
        image1.crossOrigin = "anonymous";
        image1.src = "https://farm6.staticflickr.com/3045/2589584659_285c0187d4_b.jpg";

        image2.onload = function () {
            loadTexture(image2, texture2);
        }
        image2.crossOrigin = "anonymous";
        image2.src = "https://farm6.staticflickr.com/5726/30206830053_87e9530b48_b.jpg";

        window.setTimeout(draw, 200);
    }

    function loadTexture(image, texture) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  
        // Option 1 : Use mipmap, select interpolation mode
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    }

    function draw() {

        //Translate slider values to angles in the [-pi,pi] interval
        var angle1 = slider1.value * 0.01 * Math.PI;
        var angle2 = slider2.value * 0.01 * Math.PI;

        //Circle around the Y axis
        var eye = [400 * Math.sin(angle1), 150.0, 400.0 * Math.cos(angle1)];
        var target = [0, 0, 0];
        var up = [0, 1, 0];

        var tModel = mat4.create();
        mat4.fromScaling(tModel, [100, 100, 100]);
        mat4.rotate(tModel, tModel, angle2, [1, 1, 1]);

        var tCamera = mat4.create();
        mat4.lookAt(tCamera, eye, target, up);

        var tProjection = mat4.create();
        mat4.perspective(tProjection, Math.PI / 4, 1, 10, 1000);

        var tMV = mat4.create();
        var tMVn = mat3.create();
        var tMVP = mat4.create();
        mat4.multiply(tMV, tCamera, tModel); // "modelView" matrix
        mat3.normalFromMat4(tMVn, tMV);
        mat4.multiply(tMVP, tProjection, tMV);

        // Clear screen, prepare for rendering
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set up uniforms & attributes
        gl.uniformMatrix4fv(program.MVmatrix, false, tMV);
        gl.uniformMatrix3fv(program.MVNormalmatrix, false, tMVn);
        gl.uniformMatrix4fv(program.MVPmatrix, false, tMVP);

        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
        gl.vertexAttribPointer(program.PositionAttribute, trianglePosBuffer.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
        gl.vertexAttribPointer(program.NormalAttribute, triangleNormalBuffer.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorBuffer);
        gl.vertexAttribPointer(program.ColorAttribute, triangleColorBuffer.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleTexCoordBuffer);
        gl.vertexAttribPointer(program.TexCoordAttribute, triangleTexCoordBuffer.itemSize,
            gl.FLOAT, false, 0, 0);

        //Bind texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture1);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texture2);

        // Draw sphere
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    }

    slider1.addEventListener("input", draw);
    slider2.addEventListener("input", draw);

    initTextureThenDraw();
}
window.onload = start;

