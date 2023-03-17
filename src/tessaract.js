import { Point, Rectangle } from "./class.js";

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

// inner
const pillarInnerPoints = [
  // consist of 8 points
  [80, 80, 80],
  [80, 320, 80],
  [120, 320, 80],
  [120, 80, 80],
  [80, 80, 120],
  [120, 80, 120],
  [120, 320, 120],
  [80, 320, 120],
];

const innerPillar1 = [
  // front
  new Rectangle(new Point(...pillarInnerPoints[0]), new Point(...pillarInnerPoints[1]), new Point(...pillarInnerPoints[2]), new Point(...pillarInnerPoints[3])),
  // right
  new Rectangle(new Point(...pillarInnerPoints[3]), new Point(...pillarInnerPoints[2]), new Point(...pillarInnerPoints[6]), new Point(...pillarInnerPoints[5])),
  // back
  new Rectangle(new Point(...pillarInnerPoints[5]), new Point(...pillarInnerPoints[6]), new Point(...pillarInnerPoints[7]), new Point(...pillarInnerPoints[4])),
  // left
  new Rectangle(
    new Point(...pillarInnerPoints[4]),
    new Point(...pillarInnerPoints[7]),

    new Point(...pillarInnerPoints[1]),
    new Point(...pillarInnerPoints[0])
  ),
  // top
  new Rectangle(new Point(...pillarInnerPoints[1]), new Point(...pillarInnerPoints[7]), new Point(...pillarInnerPoints[6]), new Point(...pillarInnerPoints[2])),
  // bottom
  new Rectangle(new Point(...pillarInnerPoints[0]), new Point(...pillarInnerPoints[3]), new Point(...pillarInnerPoints[5]), new Point(...pillarInnerPoints[4])),
];

tessaract = tessaract.concat(innerPillar1);

const innerPilar2 = innerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x + 200, rectangle.firstPoint.y, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x + 200, rectangle.secondPoint.y, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x + 200, rectangle.thirdPoint.y, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x + 200, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
  );
});
tessaract = tessaract.concat(innerPilar2);

const innerPilar3 = innerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y, rectangle.firstPoint.z + 200),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z + 200),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y, rectangle.thirdPoint.z + 200),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z + 200)
  );
});
tessaract = tessaract.concat(innerPilar3);

const innerPilar4 = innerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x + 200, rectangle.firstPoint.y, rectangle.firstPoint.z + 200),
    new Point(rectangle.secondPoint.x + 200, rectangle.secondPoint.y, rectangle.secondPoint.z + 200),
    new Point(rectangle.thirdPoint.x + 200, rectangle.thirdPoint.y, rectangle.thirdPoint.z + 200),
    new Point(rectangle.fourthPoint.x + 200, rectangle.fourthPoint.y, rectangle.fourthPoint.z + 200)
  );
});
tessaract = tessaract.concat(innerPilar4);
const horizontalInnerPillarPoints = [
  // consist of 8 points
  [80, 80, 80],
  [80, 120, 80],
  [320, 120, 80],
  [320, 80, 80],
  [80, 80, 120],
  [320, 80, 120],
  [320, 120, 120],
  [80, 120, 120],
];

const horizontalInnerPillar1 = [
  // front
  new Rectangle(new Point(...horizontalInnerPillarPoints[0]), new Point(...horizontalInnerPillarPoints[1]), new Point(...horizontalInnerPillarPoints[2]), new Point(...horizontalInnerPillarPoints[3])),
  // right
  new Rectangle(new Point(...horizontalInnerPillarPoints[3]), new Point(...horizontalInnerPillarPoints[2]), new Point(...horizontalInnerPillarPoints[6]), new Point(...horizontalInnerPillarPoints[5])),
  // back
  new Rectangle(new Point(...horizontalInnerPillarPoints[5]), new Point(...horizontalInnerPillarPoints[6]), new Point(...horizontalInnerPillarPoints[7]), new Point(...horizontalInnerPillarPoints[4])),
  // left
  new Rectangle(
    new Point(...horizontalInnerPillarPoints[4]),
    new Point(...horizontalInnerPillarPoints[7]),

    new Point(...horizontalInnerPillarPoints[1]),
    new Point(...horizontalInnerPillarPoints[0])
  ),
  // top
  new Rectangle(new Point(...horizontalInnerPillarPoints[1]), new Point(...horizontalInnerPillarPoints[7]), new Point(...horizontalInnerPillarPoints[6]), new Point(...horizontalInnerPillarPoints[2])),
  // bottom
  new Rectangle(new Point(...horizontalInnerPillarPoints[0]), new Point(...horizontalInnerPillarPoints[3]), new Point(...horizontalInnerPillarPoints[5]), new Point(...horizontalInnerPillarPoints[4])),
];
tessaract = tessaract.concat(horizontalInnerPillar1);

const horizontalInnerPilar2 = horizontalInnerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y + 200, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + 200, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y + 200, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + 200, rectangle.fourthPoint.z)
  );
});
tessaract = tessaract.concat(horizontalInnerPilar2);

const horizontalInnerPilar3 = horizontalInnerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y, rectangle.firstPoint.z + 200),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z + 200),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y, rectangle.thirdPoint.z + 200),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z + 200)
  );
});

tessaract = tessaract.concat(horizontalInnerPilar3);
const horizontalInnerPilar4 = horizontalInnerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y + 200, rectangle.firstPoint.z + 200),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + 200, rectangle.secondPoint.z + 200),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y + 200, rectangle.thirdPoint.z + 200),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + 200, rectangle.fourthPoint.z + 200)
  );
});

tessaract = tessaract.concat(horizontalInnerPilar4);

const depthInnerPillarPoints = [
  // consist of 8 points
  [80, 80, 80],
  [80, 120, 80],
  [120, 120, 80],
  [120, 80, 80],
  [80, 80, 320],
  [120, 80, 320],
  [120, 120, 320],
  [80, 120, 320],
];

const depthInnerPillar1 = [
  // front
  new Rectangle(new Point(...depthInnerPillarPoints[0]), new Point(...depthInnerPillarPoints[1]), new Point(...depthInnerPillarPoints[2]), new Point(...depthInnerPillarPoints[3])),
  // right
  new Rectangle(new Point(...depthInnerPillarPoints[3]), new Point(...depthInnerPillarPoints[2]), new Point(...depthInnerPillarPoints[6]), new Point(...depthInnerPillarPoints[5])),
  // back
  new Rectangle(new Point(...depthInnerPillarPoints[5]), new Point(...depthInnerPillarPoints[6]), new Point(...depthInnerPillarPoints[7]), new Point(...depthInnerPillarPoints[4])),
  // left
  new Rectangle(
    new Point(...depthInnerPillarPoints[4]),
    new Point(...depthInnerPillarPoints[7]),

    new Point(...depthInnerPillarPoints[1]),
    new Point(...depthInnerPillarPoints[0])
  ),
  // top
  new Rectangle(new Point(...depthInnerPillarPoints[1]), new Point(...depthInnerPillarPoints[7]), new Point(...depthInnerPillarPoints[6]), new Point(...depthInnerPillarPoints[2])),
  // bottom
  new Rectangle(new Point(...depthInnerPillarPoints[0]), new Point(...depthInnerPillarPoints[3]), new Point(...depthInnerPillarPoints[5]), new Point(...depthInnerPillarPoints[4])),
];

tessaract = tessaract.concat(depthInnerPillar1);

const depthInnerPilar2 = depthInnerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x + 200, rectangle.firstPoint.y, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x + 200, rectangle.secondPoint.y, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x + 200, rectangle.thirdPoint.y, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x + 200, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
  );
});

tessaract = tessaract.concat(depthInnerPilar2);

const depthInnerPilar3 = depthInnerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x, rectangle.firstPoint.y + 200, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x, rectangle.secondPoint.y + 200, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y + 200, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y + 200, rectangle.fourthPoint.z)
  );
});

tessaract = tessaract.concat(depthInnerPilar3);

const depthInnerPilar4 = depthInnerPillar1.map((rectangle) => {
  return new Rectangle(
    new Point(rectangle.firstPoint.x + 200, rectangle.firstPoint.y + 200, rectangle.firstPoint.z),
    new Point(rectangle.secondPoint.x + 200, rectangle.secondPoint.y + 200, rectangle.secondPoint.z),
    new Point(rectangle.thirdPoint.x + 200, rectangle.thirdPoint.y + 200, rectangle.thirdPoint.z),
    new Point(rectangle.fourthPoint.x + 200, rectangle.fourthPoint.y + 200, rectangle.fourthPoint.z)
  );
});
tessaract = tessaract.concat(depthInnerPilar4);

export default tessaract;
