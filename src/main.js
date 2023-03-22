import { degToRad, radToDeg } from "./utils.js";
import { setupSlider } from "./ui.js";
import { drawScene } from "./draw-scene.js";
import { initBuffers } from "./init-buffers.js";
import { createProgram } from "./program.js";

import tessaract from "./tessaract.js";
import pyramid from "./pyramid.js";
import { m4 } from "./m4.js";

const ANIMATION_SPEED = 0.5;

// defining
// POINTS ORDER MATTERS
const object = pyramid

let positions = [];
for (let i = 0; i < object.length; i++) {
  // turn object into triangles
  positions = [...positions, ...object[i].flattenToTriangles()];
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

for (let i = 0; i < object.length; i++) {
  for (let j = 0; j < object[i].totalDrawnPoints(); j++) {
    colors.push(...primaryColor[i % 6]);
  }
}

// at this point, the program now what to draw from the positions and colors arrays. only these two arrays matter for the program to draw the cube.
let deltaTime = 0;
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
  let radius = 800;
  let cameraAngleRadians = degToRad(0)
  let objectsConditions = {
    totalVertices: positions.length / 3,
    rotation,
    translation,
    scale,
    cameraAngleRadians,
    radius
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
      objectsConditions.totalVertices = positions.length / 3;
      drawScene(gl, program, buffers, objectsConditions);
    };
    reader.readAsText(file);
  });

  // clear canvas
  document.querySelector("#clear").addEventListener("click", () => {
    positions = [];
    colors = [];
    buffers = initBuffers(gl, positions, colors);
    objectsConditions.totalVertices = 0;
    drawScene(gl, program, buffers, objectsConditions);
  });

  // setup slider
  setupSlider("#x", { value: translation[0], slide: updatePosition(0), max: gl.canvas.width*3 });
  setupSlider("#y", { value: translation[1], slide: updatePosition(1), max: gl.canvas.height });
  setupSlider("#z", { value: translation[2], slide: updatePosition(2), max: gl.canvas.height });
  setupSlider("#angleX", { value: radToDeg(rotation[0]), slide: updateRotation(0), max: 360 });
  setupSlider("#angleY", { value: radToDeg(rotation[1]), slide: updateRotation(1), max: 360 });
  setupSlider("#angleZ", { value: radToDeg(rotation[2]), slide: updateRotation(2), max: 360 });
  setupSlider("#scaleX", { value: scale[0], slide: updateScale(0), min: -5, max: 5, step: 0.01, precision: 2 });
  setupSlider("#scaleY", { value: scale[1], slide: updateScale(1), min: -5, max: 5, step: 0.01, precision: 2 });
  setupSlider("#scaleZ", { value: scale[2], slide: updateScale(2), min: -5, max: 5, step: 0.01, precision: 2 });
  setupSlider("#cameraAngle", {value: radToDeg(cameraAngleRadians), slide: updateCameraAngle, min: -360, max: 360});
  setupSlider("#radius", {value: radius, slide: updateRadius, min: 0, max: 3000});

  function updateCameraAngle(event, ui) {
    cameraAngleRadians = degToRad(ui.value);
    objectsConditions = {
      totalVertices: positions.length / 3,
      rotation,
      translation,
      scale,
      cameraAngleRadians,
      radius,
    };
    drawScene(gl, program, buffers, objectsConditions);
  }
  function updateRadius(event, ui) {
    radius = ui.value;
    objectsConditions = {
      totalVertices: positions.length / 3,
      rotation,
      translation,
      scale,
      cameraAngleRadians,
      radius,
    };
    drawScene(gl, program, buffers, objectsConditions);
  }
  function updatePosition(index) {
    return function (event, ui) {
      translation[index] = ui.value;
      objectsConditions = {
        totalVertices: positions.length / 3,
        rotation,
        translation,
        scale,
        cameraAngleRadians,
        radius,
      };
      drawScene(gl, program, buffers, objectsConditions);
    };
  }

  function updateRotation(index) {
    return function (event, ui) {
      var angleInDegrees = ui.value;
      var angleInRadians = degToRad(angleInDegrees);
      rotation[index] = angleInRadians;
      objectsConditions = {
        totalVertices: positions.length / 3,
        rotation,
        translation,
        scale,
        cameraAngleRadians,
        radius,
      };
      drawScene(gl, program, buffers, objectsConditions);
    };
  }

  function updateScale(index) {
    return function (event, ui) {
      scale[index] = ui.value;
      objectsConditions = {
        totalVertices: positions.length / 3,
        rotation,
        translation,
        scale,
        cameraAngleRadians,
        radius,
      };
      drawScene(gl, program, buffers, objectsConditions);
    };
  }

  let then = 0;
  
  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001; // convert to seconds
    deltaTime = now - then;
    then = now;

    objectsConditions.rotation[0] += deltaTime * ANIMATION_SPEED;
    objectsConditions.rotation[1] += deltaTime * ANIMATION_SPEED;
    objectsConditions.rotation[2] += deltaTime * ANIMATION_SPEED;
    
    drawScene(gl, program, buffers, objectsConditions);

    if (document.querySelector("#animate").checked) requestAnimationFrame(render);
  }

  // animate checkbox
  document.querySelector("#animate").addEventListener("change", (e) => {
    if (e.target.checked) {
      requestAnimationFrame(render);
    }
  });

  requestAnimationFrame(render);
}

main();
