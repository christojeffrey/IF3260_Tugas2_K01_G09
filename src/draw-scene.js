import { m4 } from "./m4.js";
import { resizeCanvasToDisplaySize } from "./utils.js";
import { degToRad, radToDeg } from "./utils.js";

// Draw the scene.
function drawScene(gl, program, buffers, objectsConditions) {
  // Clear the canvas.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  const { scale, rotation, translation, cameraAngleRadians, radius } = objectsConditions;

  const { positionBuffer, colorBuffer } = buffers;

  var fieldOfViewRadians = degToRad(75);

  // look up where the vertex data needs to go.
  var positionLocation = gl.getAttribLocation(program, "a_position");
  var colorLocation = gl.getAttribLocation(program, "a_color");
  // lookup uniforms
  var matrixLocation = gl.getUniformLocation(program, "u_matrix");
  var projLocation = gl.getUniformLocation(program, "u_projection");

  resizeCanvasToDisplaySize(gl.canvas);

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Turn on culling. By default backfacing triangles
  // will be culled.
  gl.enable(gl.CULL_FACE);

  // Enable the depth buffer
  gl.enable(gl.DEPTH_TEST);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);
  // Turn on the position attribute
  gl.enableVertexAttribArray(positionLocation);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 3; // 3 components per iteration
  var type = gl.FLOAT; // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

  // Turn on the color attribute
  gl.enableVertexAttribArray(colorLocation);

  // Bind the color buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

  // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
  var size = 3; // 3 components per iteration
  var type = gl.UNSIGNED_BYTE; // the data is 8bit unsigned values
  var normalize = true; // normalize the data (convert from 0-255 to 0-1)
  var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(colorLocation, size, type, normalize, stride, offset);

  // Compute the matrices
  var matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 20000);
  var translate = m4.translation(translation[0], translation[1], translation[2]);
  var rotationX = m4.xRotation(rotation[0]);
  var rotationY = m4.yRotation(rotation[1]);
  var rotationZ = m4.zRotation(rotation[2]);
  var scaling = m4.scaling(scale[0], scale[1], scale[2]);
  var transform = m4.multiplyArrayOfMatrices([translate, rotationZ,rotationY, rotationX, scaling]);
  var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  var zNear = 1;
  var zFar = 150000;
  var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
  

  //camera view
  // const modelMatrix = m4.create();
  // const viewMatrix = m4.create();
  // const projectionMatrix = m4.create();
  // m4.perspective(projectionMatrix, 
  //     75 * Math.PI/180, // vertical field-of-view (angle, radians)
  //     canvas.width/canvas.height, // aspect W/H
  //     1e-4, // near cull distance
  //     1e4 // far cull distance
  // );
  var shapeLocation = [radius, 200, 200];
  var cameraMatrix = m4.yRotation(cameraAngleRadians);
  console.log(cameraAngleRadians)
  cameraMatrix = m4.translate(cameraMatrix, 200, 200, radius * 1.5);
  var cameraPosition = [
    cameraMatrix[12],
    cameraMatrix[13],
    cameraMatrix[14],
  ];
  
  var up = [0, 1, 0];
  var cameraMatrix = m4.lookAt(cameraPosition, shapeLocation, up);

  // Make a view matrix from the camera matrix
  var viewMatrix = m4.invert(cameraMatrix);
  // Compute a view projection matrix
  var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
  var x = Math.cos(0) * radius;
  var y = Math.sin(0) * radius;

  // m4.invert(viewMatrix);
  // // Set the matrix.
  // m4.multiply(mvMatrix, viewMatrix, modelMatrix);
  // m4.multiply(mvpMatrix, projectionMatrix, mvMatrix);
  // gl.uniformMatrix4fv(matrixLocation, false, mvpMatrix);
  var projection = m4.translate(viewProjectionMatrix, x, 10, y);
  
  gl.uniformMatrix4fv(matrixLocation, false, transform);
  gl.uniformMatrix4fv(projLocation, false, projection);
  // Draw the geometry.
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = objectsConditions.totalVertices;
  gl.drawArrays(primitiveType, offset, count);
}

export { drawScene };
