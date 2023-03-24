import { Point } from "./point.js";
import { Rectangle } from "./rectangle.js";
import { v3 } from "../math/v3.js";
import { primaryColors } from "../constant/colors.js";

let tessaract = {
  position: [],
  colors: [],
  normals: [],
};

let rectangles = [];

let cubeLength = 400;
let smallCubeLength = 200;

let data1 = -220;
let data2 = 220;

let data3 = -220;
let data4 = -180;

let data5 = -180;
let data6 = 220;

let innerData1 = -120;
let innerData2 = 120;

let innerData3 = -120;
let innerData4 = -80;

let innerData5 = -80;
let innerData6 = 120;

const pillarPoints = [
  // consist of 8 points
  [data1, data1, data3],
  [data1, data2, data3],
  [data5, data2, data3],
  [data5, data1, data3],
  [data1, data1, data4],
  [data5, data1, data4],
  [data5, data2, data4],
  [data1, data2, data4],
];

const horizontalOutterPillarPoints = [
  // consist of 8 points
  [data1, data1, data3],
  [data1, data5, data3],
  [data2, data5, data3],
  [data2, data1, data3],
  [data1, data1, data4],
  [data2, data1, data4],
  [data2, data5, data4],
  [data1, data5, data4],
];

const depthOutterPillarPoints = [
  // consist of 8 points
  [data1, data1, data3],
  [data1, data5, data3],
  [data5, data5, data3],
  [data5, data1, data3],
  [data1, data1, data6],
  [data5, data1, data6],
  [data5, data5, data6],
  [data1, data5, data6],
];

const outterPillar1 = [
  // front
  new Rectangle(new Point(...pillarPoints[0]), new Point(...pillarPoints[1]), new Point(...pillarPoints[2]), new Point(...pillarPoints[3])),

  // back
  new Rectangle(new Point(...pillarPoints[5]), new Point(...pillarPoints[6]), new Point(...pillarPoints[7]), new Point(...pillarPoints[4])),
  // left
  new Rectangle(
    new Point(...pillarPoints[4]),
    new Point(...pillarPoints[7]),

    new Point(...pillarPoints[1]),
    new Point(...pillarPoints[0])
  ),
  // right
  new Rectangle(new Point(...pillarPoints[3]), new Point(...pillarPoints[2]), new Point(...pillarPoints[6]), new Point(...pillarPoints[5])),
  // top
  new Rectangle(new Point(...pillarPoints[1]), new Point(...pillarPoints[7]), new Point(...pillarPoints[6]), new Point(...pillarPoints[2])),
  // bottom
  new Rectangle(new Point(...pillarPoints[0]), new Point(...pillarPoints[3]), new Point(...pillarPoints[5]), new Point(...pillarPoints[4])),
];
rectangles = rectangles.concat(outterPillar1);

const outterPilar2 = outterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x + cubeLength, rectangle.firstPoint.y, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x + cubeLength, rectangle.secondPoint.y, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x + cubeLength, rectangle.thirdPoint.y, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x + cubeLength, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
  );
});
rectangles = rectangles.concat(outterPilar2);

const outterPilar3 = outterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y, rectangle.firstPoint.z + cubeLength),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z + cubeLength),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y, rectangle.thirdPoint.z + cubeLength),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z + cubeLength)
  );
});
rectangles = rectangles.concat(outterPilar3);

const outterPilar4 = outterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x + cubeLength, rectangle.firstPoint.y, rectangle.firstPoint.z + cubeLength),
    new Point(rectangle.secondPoint.x + cubeLength, rectangle.secondPoint.y, rectangle.secondPoint.z + cubeLength),
    new Point(rectangle.thirdPoint.x + cubeLength, rectangle.thirdPoint.y, rectangle.thirdPoint.z + cubeLength),
    new Point(rectangle.fourthPoint.x + cubeLength, rectangle.fourthPoint.y, rectangle.fourthPoint.z + cubeLength)
  );
});
rectangles = rectangles.concat(outterPilar4);

// create outterPillar1 from pillarPoints

const horizontalOutterPillar1 = [
  // front
  new Rectangle(new Point(...horizontalOutterPillarPoints[0]), new Point(...horizontalOutterPillarPoints[1]), new Point(...horizontalOutterPillarPoints[2]), new Point(...horizontalOutterPillarPoints[3])),

  // back
  new Rectangle(new Point(...horizontalOutterPillarPoints[5]), new Point(...horizontalOutterPillarPoints[6]), new Point(...horizontalOutterPillarPoints[7]), new Point(...horizontalOutterPillarPoints[4])),
  // left
  new Rectangle(
    new Point(...horizontalOutterPillarPoints[4]),
    new Point(...horizontalOutterPillarPoints[7]),

    new Point(...horizontalOutterPillarPoints[1]),
    new Point(...horizontalOutterPillarPoints[0])
  ),
  // right
  new Rectangle(new Point(...horizontalOutterPillarPoints[3]), new Point(...horizontalOutterPillarPoints[2]), new Point(...horizontalOutterPillarPoints[6]), new Point(...horizontalOutterPillarPoints[5])),
  // top
  new Rectangle(new Point(...horizontalOutterPillarPoints[1]), new Point(...horizontalOutterPillarPoints[7]), new Point(...horizontalOutterPillarPoints[6]), new Point(...horizontalOutterPillarPoints[2])),
  // bottom
  new Rectangle(new Point(...horizontalOutterPillarPoints[0]), new Point(...horizontalOutterPillarPoints[3]), new Point(...horizontalOutterPillarPoints[5]), new Point(...horizontalOutterPillarPoints[4])),
];
rectangles = rectangles.concat(horizontalOutterPillar1);

const horizontalOutterPilar2 = horizontalOutterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y + cubeLength, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + cubeLength, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y + cubeLength, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + cubeLength, rectangle.fourthPoint.z)
  );
});
rectangles = rectangles.concat(horizontalOutterPilar2);

const horizontalOutterPilar3 = horizontalOutterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y, rectangle.firstPoint.z + cubeLength),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z + cubeLength),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y, rectangle.thirdPoint.z + cubeLength),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z + cubeLength)
  );
});

rectangles = rectangles.concat(horizontalOutterPilar3);
const horizontalOutterPilar4 = horizontalOutterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y + cubeLength, rectangle.firstPoint.z + cubeLength),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + cubeLength, rectangle.secondPoint.z + cubeLength),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y + cubeLength, rectangle.thirdPoint.z + cubeLength),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + cubeLength, rectangle.fourthPoint.z + cubeLength)
  );
});

rectangles = rectangles.concat(horizontalOutterPilar4);

const depthOutterPillar1 = [
  // front
  new Rectangle(new Point(...depthOutterPillarPoints[0]), new Point(...depthOutterPillarPoints[1]), new Point(...depthOutterPillarPoints[2]), new Point(...depthOutterPillarPoints[3])),

  // back
  new Rectangle(new Point(...depthOutterPillarPoints[5]), new Point(...depthOutterPillarPoints[6]), new Point(...depthOutterPillarPoints[7]), new Point(...depthOutterPillarPoints[4])),
  // left
  new Rectangle(
    new Point(...depthOutterPillarPoints[4]),
    new Point(...depthOutterPillarPoints[7]),

    new Point(...depthOutterPillarPoints[1]),
    new Point(...depthOutterPillarPoints[0])
  ),
  // right
  new Rectangle(new Point(...depthOutterPillarPoints[3]), new Point(...depthOutterPillarPoints[2]), new Point(...depthOutterPillarPoints[6]), new Point(...depthOutterPillarPoints[5])),
  // top
  new Rectangle(new Point(...depthOutterPillarPoints[1]), new Point(...depthOutterPillarPoints[7]), new Point(...depthOutterPillarPoints[6]), new Point(...depthOutterPillarPoints[2])),
  // bottom
  new Rectangle(new Point(...depthOutterPillarPoints[0]), new Point(...depthOutterPillarPoints[3]), new Point(...depthOutterPillarPoints[5]), new Point(...depthOutterPillarPoints[4])),
];

rectangles = rectangles.concat(depthOutterPillar1);

const depthOutterPilar2 = depthOutterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x + cubeLength, rectangle.firstPoint.y, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x + cubeLength, rectangle.secondPoint.y, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x + cubeLength, rectangle.thirdPoint.y, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x + cubeLength, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
  );
});

rectangles = rectangles.concat(depthOutterPilar2);

const depthOutterPilar3 = depthOutterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y + cubeLength, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + cubeLength, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y + cubeLength, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + cubeLength, rectangle.fourthPoint.z)
  );
});

rectangles = rectangles.concat(depthOutterPilar3);

const depthOutterPilar4 = depthOutterPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x + cubeLength, rectangle.firstPoint.y + cubeLength, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x + cubeLength, rectangle.secondPoint.y + cubeLength, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x + cubeLength, rectangle.thirdPoint.y + cubeLength, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x + cubeLength, rectangle.fourthPoint.y + cubeLength, rectangle.fourthPoint.z)
  );
});
rectangles = rectangles.concat(depthOutterPilar4);

// inner
const pillarInnerPoints = [
  // consist of 8 points
  [innerData1, innerData1, innerData3],
  [innerData1, innerData2, innerData3],
  [innerData5, innerData2, innerData3],
  [innerData5, innerData1, innerData3],
  [innerData1, innerData1, innerData4],
  [innerData5, innerData1, innerData4],
  [innerData5, innerData2, innerData4],
  [innerData1, innerData2, innerData4],
];

const innerPillar1 = [
  // front
  new Rectangle(new Point(...pillarInnerPoints[0]), new Point(...pillarInnerPoints[1]), new Point(...pillarInnerPoints[2]), new Point(...pillarInnerPoints[3])),

  // back
  new Rectangle(new Point(...pillarInnerPoints[5]), new Point(...pillarInnerPoints[6]), new Point(...pillarInnerPoints[7]), new Point(...pillarInnerPoints[4])),
  // left
  new Rectangle(
    new Point(...pillarInnerPoints[4]),
    new Point(...pillarInnerPoints[7]),

    new Point(...pillarInnerPoints[1]),
    new Point(...pillarInnerPoints[0])
  ),
  // right
  new Rectangle(new Point(...pillarInnerPoints[3]), new Point(...pillarInnerPoints[2]), new Point(...pillarInnerPoints[6]), new Point(...pillarInnerPoints[5])),
  // top
  new Rectangle(new Point(...pillarInnerPoints[1]), new Point(...pillarInnerPoints[7]), new Point(...pillarInnerPoints[6]), new Point(...pillarInnerPoints[2])),
  // bottom
  new Rectangle(new Point(...pillarInnerPoints[0]), new Point(...pillarInnerPoints[3]), new Point(...pillarInnerPoints[5]), new Point(...pillarInnerPoints[4])),
];

rectangles = rectangles.concat(innerPillar1);

const innerPilar2 = innerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x + smallCubeLength, rectangle.firstPoint.y, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x + smallCubeLength, rectangle.secondPoint.y, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x + smallCubeLength, rectangle.thirdPoint.y, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x + smallCubeLength, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
  );
});
rectangles = rectangles.concat(innerPilar2);

const innerPilar3 = innerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y, rectangle.firstPoint.z + smallCubeLength),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z + smallCubeLength),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y, rectangle.thirdPoint.z + smallCubeLength),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z + smallCubeLength)
  );
});
rectangles = rectangles.concat(innerPilar3);

const innerPilar4 = innerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x + smallCubeLength, rectangle.firstPoint.y, rectangle.firstPoint.z + smallCubeLength),
    new Point(rectangle.secondPoint.x + smallCubeLength, rectangle.secondPoint.y, rectangle.secondPoint.z + smallCubeLength),
    new Point(rectangle.thirdPoint.x + smallCubeLength, rectangle.thirdPoint.y, rectangle.thirdPoint.z + smallCubeLength),
    new Point(rectangle.fourthPoint.x + smallCubeLength, rectangle.fourthPoint.y, rectangle.fourthPoint.z + smallCubeLength)
  );
});
rectangles = rectangles.concat(innerPilar4);
const horizontalInnerPillarPoints = [
  // consist of 8 points
  [innerData1, innerData1, innerData3],
  [innerData1, innerData5, innerData3],
  [innerData2, innerData5, innerData3],
  [innerData2, innerData1, innerData3],
  [innerData1, innerData1, innerData4],
  [innerData2, innerData1, innerData4],
  [innerData2, innerData5, innerData4],
  [innerData1, innerData5, innerData4],
];

const horizontalInnerPillar1 = [
  // front
  new Rectangle(new Point(...horizontalInnerPillarPoints[0]), new Point(...horizontalInnerPillarPoints[1]), new Point(...horizontalInnerPillarPoints[2]), new Point(...horizontalInnerPillarPoints[3])),

  // back
  new Rectangle(new Point(...horizontalInnerPillarPoints[5]), new Point(...horizontalInnerPillarPoints[6]), new Point(...horizontalInnerPillarPoints[7]), new Point(...horizontalInnerPillarPoints[4])),
  // left
  new Rectangle(
    new Point(...horizontalInnerPillarPoints[4]),
    new Point(...horizontalInnerPillarPoints[7]),

    new Point(...horizontalInnerPillarPoints[1]),
    new Point(...horizontalInnerPillarPoints[0])
  ),
  // right
  new Rectangle(new Point(...horizontalInnerPillarPoints[3]), new Point(...horizontalInnerPillarPoints[2]), new Point(...horizontalInnerPillarPoints[6]), new Point(...horizontalInnerPillarPoints[5])),
  // top
  new Rectangle(new Point(...horizontalInnerPillarPoints[1]), new Point(...horizontalInnerPillarPoints[7]), new Point(...horizontalInnerPillarPoints[6]), new Point(...horizontalInnerPillarPoints[2])),
  // bottom
  new Rectangle(new Point(...horizontalInnerPillarPoints[0]), new Point(...horizontalInnerPillarPoints[3]), new Point(...horizontalInnerPillarPoints[5]), new Point(...horizontalInnerPillarPoints[4])),
];
rectangles = rectangles.concat(horizontalInnerPillar1);

const horizontalInnerPilar2 = horizontalInnerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y + smallCubeLength, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + smallCubeLength, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y + smallCubeLength, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + smallCubeLength, rectangle.fourthPoint.z)
  );
});
rectangles = rectangles.concat(horizontalInnerPilar2);

const horizontalInnerPilar3 = horizontalInnerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y, rectangle.firstPoint.z + smallCubeLength),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z + smallCubeLength),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y, rectangle.thirdPoint.z + smallCubeLength),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z + smallCubeLength)
  );
});

rectangles = rectangles.concat(horizontalInnerPilar3);
const horizontalInnerPilar4 = horizontalInnerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y + smallCubeLength, rectangle.firstPoint.z + smallCubeLength),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + smallCubeLength, rectangle.secondPoint.z + smallCubeLength),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y + smallCubeLength, rectangle.thirdPoint.z + smallCubeLength),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + smallCubeLength, rectangle.fourthPoint.z + smallCubeLength)
  );
});

rectangles = rectangles.concat(horizontalInnerPilar4);

const depthInnerPillarPoints = [
  // consist of 8 points
  [innerData1, innerData1, innerData3],
  [innerData1, innerData5, innerData3],
  [innerData5, innerData5, innerData3],
  [innerData5, innerData1, innerData3],
  [innerData1, innerData1, innerData6],
  [innerData5, innerData1, innerData6],
  [innerData5, innerData5, innerData6],
  [innerData1, innerData5, innerData6],
];

const depthInnerPillar1 = [
  // front
  new Rectangle(new Point(...depthInnerPillarPoints[0]), new Point(...depthInnerPillarPoints[1]), new Point(...depthInnerPillarPoints[2]), new Point(...depthInnerPillarPoints[3])),

  // back
  new Rectangle(new Point(...depthInnerPillarPoints[5]), new Point(...depthInnerPillarPoints[6]), new Point(...depthInnerPillarPoints[7]), new Point(...depthInnerPillarPoints[4])),
  // left
  new Rectangle(
    new Point(...depthInnerPillarPoints[4]),
    new Point(...depthInnerPillarPoints[7]),

    new Point(...depthInnerPillarPoints[1]),
    new Point(...depthInnerPillarPoints[0])
  ),
  // right
  new Rectangle(new Point(...depthInnerPillarPoints[3]), new Point(...depthInnerPillarPoints[2]), new Point(...depthInnerPillarPoints[6]), new Point(...depthInnerPillarPoints[5])),
  // top
  new Rectangle(new Point(...depthInnerPillarPoints[1]), new Point(...depthInnerPillarPoints[7]), new Point(...depthInnerPillarPoints[6]), new Point(...depthInnerPillarPoints[2])),
  // bottom
  new Rectangle(new Point(...depthInnerPillarPoints[0]), new Point(...depthInnerPillarPoints[3]), new Point(...depthInnerPillarPoints[5]), new Point(...depthInnerPillarPoints[4])),
];

rectangles = rectangles.concat(depthInnerPillar1);

const depthInnerPilar2 = depthInnerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x + smallCubeLength, rectangle.firstPoint.y, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x + smallCubeLength, rectangle.secondPoint.y, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x + smallCubeLength, rectangle.thirdPoint.y, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x + smallCubeLength, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
  );
});

rectangles = rectangles.concat(depthInnerPilar2);

const depthInnerPilar3 = depthInnerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y + smallCubeLength, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + smallCubeLength, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y + smallCubeLength, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + smallCubeLength, rectangle.fourthPoint.z)
  );
});

rectangles = rectangles.concat(depthInnerPilar3);

const depthInnerPilar4 = depthInnerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x + smallCubeLength, rectangle.firstPoint.y + smallCubeLength, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x + smallCubeLength, rectangle.secondPoint.y + smallCubeLength, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x + smallCubeLength, rectangle.thirdPoint.y + smallCubeLength, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x + smallCubeLength, rectangle.fourthPoint.y + smallCubeLength, rectangle.fourthPoint.z)
  );
});
rectangles = rectangles.concat(depthInnerPilar4);

for (let i = 0; i < rectangles.length; i++) {
  let rectangle = rectangles[i].flattenToTriangles();
  for (let j = 0; j < rectangle.length; j += 3 * 3) {
    let vec1 = v3.create(rectangle[j + 3] - rectangle[j + 0], rectangle[j + 4] - rectangle[j + 1], rectangle[j + 5] - rectangle[j + 2]);
    let vec2 = v3.create(rectangle[j + 6] - rectangle[j + 3], rectangle[j + 7] - rectangle[j + 4], rectangle[j + 8] - rectangle[j + 5]);
    let normal;
    if (i % 2) normal = v3.cross(vec1, vec2);
    else normal = v3.cross(vec2, vec1);
    normal = v3.normalize(normal);
    tessaract.normals = [...tessaract.normals, ...normal, ...normal, ...normal];
  }
  tessaract.position = [...tessaract.position, ...rectangles[i].flattenToTriangles()];
}

for (let i = 0; i < rectangles.length; i++) {
  for (let j = 0; j < 6; j++) {
    tessaract.colors = [...tessaract.colors, ...primaryColors[i % 6]];
  }
}

export default tessaract;
