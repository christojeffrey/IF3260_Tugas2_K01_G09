function initBuffers(gl, positions, colors) {
  const positionBuffer = initPositionBuffer(gl, positions);
  const colorBuffer = initColorBuffer(gl, colors);

  return {
    positionBuffer: positionBuffer,
    colorBuffer: colorBuffer,
  };
}
function initPositionBuffer(gl, positions) {
  // Create a buffer to put positions in
  const positionBuffer = gl.createBuffer();

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Put geometry data into buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return positionBuffer;
}

function initColorBuffer(gl, colors) {
  // Create a buffer to put colors in
  const colorBuffer = gl.createBuffer();

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = colorBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

  // Put geometry data into buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}

// unbind and clear

function unbindBuffers(gl) {
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

export { initBuffers, unbindBuffers };
