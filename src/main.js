import { degToRad, radToDeg } from "./utils.js";
import { setupSlider } from "./ui.js";
import { drawScene } from "./draw-scene.js";
import { initBuffers } from "./init-buffers.js";
import { createProgram } from "./program.js";
import { Point, Rectangle } from "./class.js";

// defining
// POINTS ORDER MATTERS
const cube = [
  // front
  new Rectangle(new Point(0, 0, 0), new Point(0, 150, 0), new Point(30, 150, 0), new Point(30, 0, 0)),
  // first side
  new Rectangle(new Point(0, 0, 0), new Point(0, 0, 30), new Point(0, 150, 30), new Point(0, 150, 0)),
  // second side
  new Rectangle(new Point(30, 0, 0), new Point(30, 150, 0), new Point(30, 150, 30), new Point(30, 0, 30)),
  // third side
  new Rectangle(new Point(0, 0, 30), new Point(30, 0, 30), new Point(30, 150, 30), new Point(0, 150, 30)),
  // top
  new Rectangle(new Point(0, 150, 0), new Point(0, 150, 30), new Point(30, 150, 30), new Point(30, 150, 0)),
  // bottom
  new Rectangle(new Point(0, 0, 0), new Point(30, 0, 0), new Point(30, 0, 30), new Point(0, 0, 30)),
];
const cubeLength = cube.length;
let positions = [];
for (let i = 0; i < cubeLength; i++) {
  // turn cube into triangles
  positions = [...positions, ...cube[i].flattenToTriangles()];
}

console.log(positions);

const primaryColor = [
  [200, 70, 120],
  [0, 0, 0],
  [0, 100, 0],
  [0, 100, 100],
  [100, 0, 100],
  [100, 100, 0],
];

const colors = [];
for (let i = 0; i < cubeLength; i++) {
  for (let j = 0; j < cube[i].totalDrawnPoints(); j++) {
    colors.push(...primaryColor[i]);
  }
}

// at this point, the program now what to draw from the positions and colors arrays. only these two arrays matter for the program to draw the cube.

function main() {
  let canvas = document.querySelector("#canvas");
  let gl = canvas.getContext("webgl");
  if (!gl) {
    window.alert("No WebGL");
    return;
  }

  // set canvas size

  // setup GLSL program
  let program = createProgram(gl);
  const buffers = initBuffers(gl, positions, colors);

  let rotation = [degToRad(0), degToRad(200), degToRad(50)];
  let translation = [45, 150, 0];
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
      var angleInRadians = degToRad(angleInDegrees);
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

main();
