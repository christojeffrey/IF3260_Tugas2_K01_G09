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
  let object = {
    name: "rubic",
    positions: rubic.position,
    colors: rubic.colors,
    normals: rubic.normals,
  };
  // let totalVertices = object.positions.length / 3;
  // let projection = "orthographic";
  // let rotation = [degToRad(0), degToRad(0), degToRad(0)];
  // let translation = [0, 0, 0];
  // let scale = [1, 1, 1];
  // let camera = { radius: 0, angles: degToRad(0) };
  // let shading = true;
  // let animate = false;

  // let defaultConditions = {
  //   object,
  //   totalVertices,
  //   projection,
  //   rotation,
  //   translation,
  //   scale,
  //   camera,
  //   shading,
  //   animate,
  // };

  // Setup a ui.

  let state = setupUI(gl);

  // let then = 0;
  renderScene(gl, program, state);
}

main();
