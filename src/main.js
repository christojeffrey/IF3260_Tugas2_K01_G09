import { degToRad, radToDeg } from "./utils.js";
import { setupSlider } from "./ui.js";
import { drawScene } from "./draw-scene.js";
import { initBuffers } from "./init-buffers.js";
import { createProgram } from "./program.js";
import { Point, Rectangle } from "./class.js";

// defining
// POINTS ORDER MATTERS
let tessaract = [];
const pillarPoints = [
  // consist of 8 points
  [-20, -20, -20],
  [-20, 420, -20],
  [20, 420, -20],
  [20, -20, -20],
  [-20, -20, 20],
  [20, -20, 20],
  [20, 420, 20],
  [-20, 420, 20],
];

const horizontalOutterPillarPoints = [
  // consist of 8 points
  [-20, -20, -20],
  [-20, 20, -20],
  [420, 20, -20],
  [420, -20, -20],
  [-20, -20, 20],
  [420, -20, 20],
  [420, 20, 20],
  [-20, 20, 20],
];

const depthOutterPillarPoints = [
  // consist of 8 points
  [-20, -20, -20],
  [-20, 20, -20],
  [20, 20, -20],
  [20, -20, -20],
  [-20, -20, 420],
  [20, -20, 420],
  [20, 20, 420],
  [-20, 20, 420],
];

const outterPillar1 = [
  // front
  new Rectangle(new Point(...pillarPoints[0]), new Point(...pillarPoints[1]), new Point(...pillarPoints[2]), new Point(...pillarPoints[3])),
  // right
  new Rectangle(new Point(...pillarPoints[3]), new Point(...pillarPoints[2]), new Point(...pillarPoints[6]), new Point(...pillarPoints[5])),
  // back
  new Rectangle(new Point(...pillarPoints[5]), new Point(...pillarPoints[6]), new Point(...pillarPoints[7]), new Point(...pillarPoints[4])),
  // left
  new Rectangle(
    new Point(...pillarPoints[4]),
    new Point(...pillarPoints[7]),

    new Point(...pillarPoints[1]),
    new Point(...pillarPoints[0])
  ),
  // top
  new Rectangle(new Point(...pillarPoints[1]), new Point(...pillarPoints[7]), new Point(...pillarPoints[6]), new Point(...pillarPoints[2])),
  // bottom
  new Rectangle(new Point(...pillarPoints[0]), new Point(...pillarPoints[3]), new Point(...pillarPoints[5]), new Point(...pillarPoints[4])),
];

tessaract = tessaract.concat(outterPillar1);
const outterPilar2 = outterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x + 400, rectangle.firstPoint.y, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x + 400, rectangle.secondPoint.y, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x + 400, rectangle.thirdPoint.y, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x + 400, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
  );
});
tessaract = tessaract.concat(outterPilar2);
const outterPilar3 = outterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y, rectangle.firstPoint.z + 400),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z + 400),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y, rectangle.thirdPoint.z + 400),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z + 400)
  );
});

tessaract = tessaract.concat(outterPilar3);
const outterPilar4 = outterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x + 400, rectangle.firstPoint.y, rectangle.firstPoint.z + 400),
    new Point(rectangle.secondPoint.x + 400, rectangle.secondPoint.y, rectangle.secondPoint.z + 400),
    new Point(rectangle.thirdPoint.x + 400, rectangle.thirdPoint.y, rectangle.thirdPoint.z + 400),
    new Point(rectangle.fourthPoint.x + 400, rectangle.fourthPoint.y, rectangle.fourthPoint.z + 400)
  );
});

tessaract = tessaract.concat(outterPilar4);

// create outterPillar1 from pillarPoints

const horizontalOutterPillar1 = [
  // front
  new Rectangle(new Point(...horizontalOutterPillarPoints[0]), new Point(...horizontalOutterPillarPoints[1]), new Point(...horizontalOutterPillarPoints[2]), new Point(...horizontalOutterPillarPoints[3])),
  // right
  new Rectangle(new Point(...horizontalOutterPillarPoints[3]), new Point(...horizontalOutterPillarPoints[2]), new Point(...horizontalOutterPillarPoints[6]), new Point(...horizontalOutterPillarPoints[5])),
  // back
  new Rectangle(new Point(...horizontalOutterPillarPoints[5]), new Point(...horizontalOutterPillarPoints[6]), new Point(...horizontalOutterPillarPoints[7]), new Point(...horizontalOutterPillarPoints[4])),
  // left
  new Rectangle(
    new Point(...horizontalOutterPillarPoints[4]),
    new Point(...horizontalOutterPillarPoints[7]),

    new Point(...horizontalOutterPillarPoints[1]),
    new Point(...horizontalOutterPillarPoints[0])
  ),
  // top
  new Rectangle(new Point(...horizontalOutterPillarPoints[1]), new Point(...horizontalOutterPillarPoints[7]), new Point(...horizontalOutterPillarPoints[6]), new Point(...horizontalOutterPillarPoints[2])),
  // bottom
  new Rectangle(new Point(...horizontalOutterPillarPoints[0]), new Point(...horizontalOutterPillarPoints[3]), new Point(...horizontalOutterPillarPoints[5]), new Point(...horizontalOutterPillarPoints[4])),
];
tessaract = tessaract.concat(horizontalOutterPillar1);

const horizontalOutterPilar2 = horizontalOutterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y + 400, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + 400, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y + 400, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + 400, rectangle.fourthPoint.z)
  );
});
tessaract = tessaract.concat(horizontalOutterPilar2);

const horizontalOutterPilar3 = horizontalOutterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y, rectangle.firstPoint.z + 400),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z + 400),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y, rectangle.thirdPoint.z + 400),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z + 400)
  );
});

tessaract = tessaract.concat(horizontalOutterPilar3);
const horizontalOutterPilar4 = horizontalOutterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y + 400, rectangle.firstPoint.z + 400),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + 400, rectangle.secondPoint.z + 400),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y + 400, rectangle.thirdPoint.z + 400),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + 400, rectangle.fourthPoint.z + 400)
  );
});

tessaract = tessaract.concat(horizontalOutterPilar4);

const depthOutterPillar1 = [
  // front
  new Rectangle(new Point(...depthOutterPillarPoints[0]), new Point(...depthOutterPillarPoints[1]), new Point(...depthOutterPillarPoints[2]), new Point(...depthOutterPillarPoints[3])),
  // right
  new Rectangle(new Point(...depthOutterPillarPoints[3]), new Point(...depthOutterPillarPoints[2]), new Point(...depthOutterPillarPoints[6]), new Point(...depthOutterPillarPoints[5])),
  // back
  new Rectangle(new Point(...depthOutterPillarPoints[5]), new Point(...depthOutterPillarPoints[6]), new Point(...depthOutterPillarPoints[7]), new Point(...depthOutterPillarPoints[4])),
  // left
  new Rectangle(
    new Point(...depthOutterPillarPoints[4]),
    new Point(...depthOutterPillarPoints[7]),

    new Point(...depthOutterPillarPoints[1]),
    new Point(...depthOutterPillarPoints[0])
  ),
  // top
  new Rectangle(new Point(...depthOutterPillarPoints[1]), new Point(...depthOutterPillarPoints[7]), new Point(...depthOutterPillarPoints[6]), new Point(...depthOutterPillarPoints[2])),
  // bottom
  new Rectangle(new Point(...depthOutterPillarPoints[0]), new Point(...depthOutterPillarPoints[3]), new Point(...depthOutterPillarPoints[5]), new Point(...depthOutterPillarPoints[4])),
];

tessaract = tessaract.concat(depthOutterPillar1);

const depthOutterPilar2 = depthOutterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x + 400, rectangle.firstPoint.y, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x + 400, rectangle.secondPoint.y, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x + 400, rectangle.thirdPoint.y, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x + 400, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
  );
});

tessaract = tessaract.concat(depthOutterPilar2);

const depthOutterPilar3 = depthOutterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y + 400, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + 400, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y + 400, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + 400, rectangle.fourthPoint.z)
  );
});

tessaract = tessaract.concat(depthOutterPilar3);

const depthOutterPilar4 = depthOutterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x + 400, rectangle.firstPoint.y + 400, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x + 400, rectangle.secondPoint.y + 400, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x + 400, rectangle.thirdPoint.y + 400, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x + 400, rectangle.fourthPoint.y + 400, rectangle.fourthPoint.z)
  );
});
tessaract = tessaract.concat(depthOutterPilar4);

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

const colors = [];
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
  const buffers = initBuffers(gl, positions, colors);

  let rotation = [degToRad(0), degToRad(200), degToRad(50)];
  let translation = [750, 150, 10];
  let scale = [1, 1, 1];

  let objectsConditions = {
    totalVertices: positions.length / 3,
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
}

main();
