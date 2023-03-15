import { m4 } from "./m4.js";
import { resizeCanvasToDisplaySize, degToRad, radToDeg } from "./utils.js";

// Draw the scene.
function drawScene(gl, program, buffers, objectsConditions) {
  const { scale, rotation, translation } = objectsConditions;

  const { positionBuffer, colorBuffer } = buffers;
  // look up where the vertex data needs to go.
  var positionLocation = gl.getAttribLocation(program, "a_position");
  var colorLocation = gl.getAttribLocation(program, "a_color");
  // lookup uniforms
  var matrixLocation = gl.getUniformLocation(program, "u_matrix");

  resizeCanvasToDisplaySize(gl.canvas);

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

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
  var matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
  matrix = m4.translate(matrix, translation[0], translation[1], translation[2]);
  matrix = m4.xRotate(matrix, rotation[0]);
  matrix = m4.yRotate(matrix, rotation[1]);
  matrix = m4.zRotate(matrix, rotation[2]);
  matrix = m4.scale(matrix, scale[0], scale[1], scale[2]);

  // Set the matrix.
  gl.uniformMatrix4fv(matrixLocation, false, matrix);

  // Draw the geometry.
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 16 * 6;
  gl.drawArrays(primitiveType, offset, count);
}

export { drawScene };
