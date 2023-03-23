import { degToRad, radToDeg } from "./math/math.js";
import { setupUI } from "./utils/ui.js";
import { initBuffers } from "./webgl/buffers.js";
import { createProgram } from "./webgl/program.js";
import { renderScene } from "./webgl/render.js";

import tessaract from "./models/tessaract.js";
import rubic from "./models/rubic.js";
import pyramid from "./models/pyramid.js";

const ANIMATION_SPEED = 0.005;

// defining
// POINTS ORDER MATTERS

// console.log(tessaract);
// console.log(rubic);
// let object = rubic;
let object = rubic;
let positions = [];
// for (let i = 0; i < tessaract.length; i++) {
//   // turn tessaract into triangles
//   positions = [...positions, ...tessaract[i].flattenToTriangles()];
// }
positions = object.position;
// for (let i = 0; i < rubic.position.length; i++) {
//   // turn tessaract into triangles
//   // console.log(...rubic[i]);
//   positions = [...positions, ...rubic.position[i].flattenToTriangles()];
// }

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

// for (let i = 0; i < tessaract.length; i++) {
//   for (let j = 0; j < tessaract[i].totalDrawnPoints(); j++) {
//     colors.push(...primaryColor[i % 6]);
//   }
// }

// for (let i = 0; i < rubic.position.length; i++) {
//   for (let j = 0; j < rubic.position[i].totalDrawnPoints(); j++) {
//     colors.push(...primaryColor[3]);
//   }
// }
console.log(rubic.colors);
colors = object.colors;
console.log(colors);
// console.log(positions);

let normals = [];
normals = object.normals;

// at this point, the program now what to draw from the positions and colors arrays. only these two arrays matter for the program to draw the rubic.
let deltaTime = 0;
async function main() {
  let canvas = document.querySelector("#canvas");
  let gl = canvas.getContext("webgl");
  if (!gl) {
    window.alert("No WebGL");
    return;
  }

  // set canvas size

  // setup GLSL program
  let program = await createProgram(gl);
  let buffers = initBuffers(gl, positions, colors, normals);

  // let rotation = [degToRad(263), degToRad(0), degToRad(87)];
  // let rotation = [degToRad(0), degToRad(0), degToRad(0)];
  // let translation = [550, 350, 10];
  // let scale = [1, 1, 1];
//   let config   =   {
//     // rotation:       [degToRad(115), degToRad(180), degToRad(225)],
//     rotation:      [degToRad(0), degToRad(0), degToRad(0)],
//     translation:   [0, 0, 0],
//     // translation:    [-750, 250, 500],
//     // translation:    [250, -250, 0],
//     scale:          [1, 1, 1],
// }
//   console.log(config);
  let object          = {
    name        : "rubic",
    positions   : rubic.position,
    colors      : rubic.colors,
    normals     : rubic.normals,
  }
  let totalVertices   = object.positions.length / 3;
  let projection      = "orthographic";
  let rotation        = [degToRad(0), degToRad(0), degToRad(0)];
  let translation     = [0, 0, 0];
  let scale           = [1, 1, 1];
  let camera          = {radius: 0, angles: degToRad(0)}
  let shading         = true;
  let animate         = false;

  let defaultConditions = {
    object, 
    totalVertices,
    projection,  
    rotation, 
    translation, 
    scale, 
    camera,
    shading, 
    animate 
  }

  // Setup a ui.

  let state = setupUI(gl)



  
  
  // setup export import
  // document.querySelector("#export").addEventListener("click", () => {
  //   const data = {
  //     positions,
  //     colors,
  //   };
  //   const json = JSON.stringify(data);
  //   const blob = new Blob([json], { type: "application/json" });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.download = "data.json";

  //   a.href = url;
  //   a.click();
  //   drawScene(gl, program, buffers, state);
  // });

  // // on import Button click, read file on input #importFile
  // document.querySelector("#import").addEventListener("click", () => {
  //   const file = document.querySelector("#importFile").files[0];
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const data = JSON.parse(e.target.result);
  //     positions = data.positions;
  //     colors = data.colors;
  //     buffers = initBuffers(gl, positions, colors);
  //     state.totalVertices = positions.length / 3;
  //     drawScene(gl, program, buffers, state);
  //   };
  //   reader.readAsText(file);
  // });

  // clear canvas
  // document.querySelector("#clear").addEventListener("click", () => {
  //   positions = [];
  //   colors = [];
  //   buffers = initBuffers(gl, positions, colors);
  //   state.totalVertices = 0;
  //   drawScene(gl, program, buffers, state);
  // });

  // setup slider
  // setupSlider("#x", { value: translation[0], slide: updatePosition(0), max: gl.canvas.width });
  // setupSlider("#y", { value: translation[1], slide: updatePosition(1), max: gl.canvas.height });
  // setupSlider("#z", { value: translation[2], slide: updatePosition(2), max: gl.canvas.height });
  // setupSlider("#angleX", { value: radToDeg(rotation[0]), slide: updateRotation(0), max: 360 });
  // setupSlider("#angleY", { value: radToDeg(rotation[1]), slide: updateRotation(1), max: 360 });
  // setupSlider("#angleZ", { value: radToDeg(rotation[2]), slide: updateRotation(2), max: 360 });
  // setupSlider("#scaleX", { value: scale[0], slide: updateScale(0), min: -5, max: 5, step: 0.01, precision: 2 });
  // setupSlider("#scaleY", { value: scale[1], slide: updateScale(1), min: -5, max: 5, step: 0.01, precision: 2 });
  // setupSlider("#scaleZ", { value: scale[2], slide: updateScale(2), min: -5, max: 5, step: 0.01, precision: 2 });

  let then = 0;
  renderScene(gl, program, state);
  // Draw the scene repeatedly
}

main();
