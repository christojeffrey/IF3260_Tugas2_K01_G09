import { createProgram, degToRad, radToDeg } from "./utils.js";
import { setupSlider } from "./ui.js";
import { drawScene } from "./draw-scene.js";
function main() {
  let canvas = document.querySelector("#canvas");
  let gl = canvas.getContext("webgl");
  if (!gl) {
    window.alert("No WebGL");
    return;
  }

  // setup GLSL program
  let program = createProgram(gl);

  // Create a buffer to put positions in
  let positionBuffer = gl.createBuffer();
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // Put geometry data into buffer
  setGeometry(gl);

  // Create a buffer to put colors in
  let colorBuffer = gl.createBuffer();
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = colorBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  // Put geometry data into buffer
  setColors(gl);

  const buffers = {
    positionBuffer,
    colorBuffer,
  };

  let translation = [45, 150, 0];
  let rotation = [degToRad(40), degToRad(25), degToRad(325)];
  let scale = [1, 1, 1];
  let objectsConditions = {
    rotation,
    translation,
    scale,
  };
  drawScene(gl, program, buffers, objectsConditions);

  // Setup a ui.
  setupSlider("#x", { value: translation[0], slide: updatePosition(0), max: gl.canvas.width });
  setupSlider("#y", { value: translation[1], slide: updatePosition(1), max: gl.canvas.height });
  setupSlider("#z", { value: translation[2], slide: updatePosition(2), max: gl.canvas.height });
  setupSlider("#angleX", { value: radToDeg(rotation[0]), slide: updateRotation(0), max: 360 });
  setupSlider("#angleY", { value: radToDeg(rotation[1]), slide: updateRotation(1), max: 360 });
  setupSlider("#angleZ", { value: radToDeg(rotation[2]), slide: updateRotation(2), max: 360 });
  setupSlider("#scaleX", { value: scale[0], slide: updateScale(0), min: -5, max: 5, step: 0.01, precision: 2 });
  setupSlider("#scaleY", { value: scale[1], slide: updateScale(1), min: -5, max: 5, step: 0.01, precision: 2 });
  setupSlider("#scaleZ", { value: scale[2], slide: updateScale(2), min: -5, max: 5, step: 0.01, precision: 2 });

  function updatePosition(index) {
    return function (event, ui) {
      translation[index] = ui.value;
      const objectsConditions = {
        rotation,
        translation,
        scale,
      };
      drawScene(gl, program, buffers, objectsConditions);
    };
  }

  function updateRotation(index) {
    return function (event, ui) {
      var angleInDegrees = ui.value;
      var angleInRadians = (angleInDegrees * Math.PI) / 180;
      rotation[index] = angleInRadians;
      const objectsConditions = {
        rotation,
        translation,
        scale,
      };
      drawScene(gl, program, buffers, objectsConditions);
    };
  }

  function updateScale(index) {
    return function (event, ui) {
      scale[index] = ui.value;
      drawScene(gl, program, buffers, objectsConditions);
    };
  }
}

const cube = [
  // left column front
  0, 0, 0, 30, 0, 0, 0, 150, 0, 0, 150, 0, 30, 0, 0, 30, 150, 0,
];
function setGeometry(gl) {
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube), gl.STATIC_DRAW);
}
function setColors(gl) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Uint8Array([
      // left column front
      200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120,
    ]),
    gl.STATIC_DRAW
  );
}

main();