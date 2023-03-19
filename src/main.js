import { degToRad, radToDeg } from "./utils.js";
import { setupSlider } from "./ui.js";
import { drawScene } from "./draw-scene.js";
import { initBuffers, unbindBuffers } from "./init-buffers.js";
import { createProgram } from "./program.js";

import tessaract from "./tessaract.js";

// defining
// POINTS ORDER MATTERS

let positions = [];
for (let i = 0; i < tessaract.length; i++) {
  // turn tessaract into triangles
  positions = [...positions, ...tessaract[i].flattenToTriangles()];
}

console.log(positions);

const primaryColor = [
  [100, 0, 0],
  [0, 100, 0],
  [0, 0, 100],
  [0, 0, 0],
  [100, 0, 100],
  [100, 100, 0],
];

let colors = [];

for (let i = 0; i < tessaract.length; i++) {
  for (let j = 0; j < tessaract[i].totalDrawnPoints(); j++) {
    colors.push(...primaryColor[i % 6]);
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
  let buffers = initBuffers(gl, positions, colors);

  let rotation = [degToRad(0), degToRad(200), degToRad(50)];
  let translation = [750, 150, 10];
  let scale = [1, 1, 1];

  let objectsConditions = {
    totalVertices: positions.length / 3,
    rotation,
    translation,
    scale,
  };

  // Setup a ui.

  // setup export import
  document.querySelector("#export").addEventListener("click", () => {
    const data = {
      positions,
      colors,
    };
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = "data.json";

    a.href = url;
    a.click();
    drawScene(gl, program, buffers, objectsConditions);
  });

  // on import Button click, read file on input #importFile
  document.querySelector("#import").addEventListener("click", () => {
    const file = document.querySelector("#importFile").files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      positions = data.positions;
      colors = data.colors;
      buffers = initBuffers(gl, positions, colors);
      const objectsConditions = {
        totalVertices: positions.length / 3,
        rotation,
        translation,
        scale,
      };
      drawScene(gl, program, buffers, objectsConditions);
    };
    reader.readAsText(file);
  });

  // clear canvas
  document.querySelector("#clear").addEventListener("click", () => {
    positions = [];
    colors = [];
    buffers = initBuffers(gl, positions, colors);
    const objectsConditions = {
      totalVertices: 0,
      rotation,
      translation,
      scale,
    };
    drawScene(gl, program, buffers, objectsConditions);
  });
  // setup slider
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
        totalVertices: positions.length / 3,
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
        totalVertices: positions.length / 3,
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

  drawScene(gl, program, buffers, objectsConditions);
}

main();
