import { Point, Rectangle, Triangle } from "./class.js";

let pyramid = [];

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
  
  const outterPilar2 = outterPillar1.map((rectangle) => {
    return new Rectangle(
      new Point(rectangle.firstPoint.x + 400, rectangle.firstPoint.y, rectangle.firstPoint.z),
      new Point(rectangle.secondPoint.x + 400, rectangle.secondPoint.y, rectangle.secondPoint.z),
      new Point(rectangle.thirdPoint.x + 400, rectangle.thirdPoint.y, rectangle.thirdPoint.z),
      new Point(rectangle.fourthPoint.x + 400, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
    );
  });
 pyramid = pyramid.concat(outterPilar2);
  
  const outterPilar4 = outterPillar1.map((rectangle) => {
    return new Rectangle(
      new Point(rectangle.firstPoint.x + 400, rectangle.firstPoint.y, rectangle.firstPoint.z + 400),
      new Point(rectangle.secondPoint.x + 400, rectangle.secondPoint.y, rectangle.secondPoint.z + 400),
      new Point(rectangle.thirdPoint.x + 400, rectangle.thirdPoint.y, rectangle.thirdPoint.z + 400),
      new Point(rectangle.fourthPoint.x + 400, rectangle.fourthPoint.y, rectangle.fourthPoint.z + 400)
    );
  });
  pyramid = pyramid.concat(outterPilar4);
  
  
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
  
  const depthOutterPilar2 = depthOutterPillar1.map((rectangle) => {
    return new Rectangle(
      new Point(rectangle.firstPoint.x+400, rectangle.firstPoint.y, rectangle.firstPoint.z),
      new Point(rectangle.secondPoint.x+400, rectangle.secondPoint.y, rectangle.secondPoint.z),
      new Point(rectangle.thirdPoint.x+400, rectangle.thirdPoint.y, rectangle.thirdPoint.z),
      new Point(rectangle.fourthPoint.x+400, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
    );
  });

  pyramid = pyramid.concat(depthOutterPilar2);
  const depthOutterPilar3 = depthOutterPillar1.map((rectangle) => {
    return new Rectangle(
      new Point(rectangle.firstPoint.x+400, rectangle.firstPoint.y + 400, rectangle.firstPoint.z),
      new Point(rectangle.secondPoint.x+400, rectangle.secondPoint.y + 400, rectangle.secondPoint.z),
      new Point(rectangle.thirdPoint.x+400, rectangle.thirdPoint.y + 400, rectangle.thirdPoint.z),
      new Point(rectangle.fourthPoint.x+400, rectangle.fourthPoint.y + 400, rectangle.fourthPoint.z)
    );
  });

  pyramid = pyramid.concat(depthOutterPilar3);

  
  const horizontalOutterPillarPoints = [
    // consist of 8 points
    [0, 180, 200],
    [0, 200, 200],
    [420, 20, -20],
    [420, -20, -20],
    [20, 180, 200],
    [420, -20, 20],
    [420, 20, 20],
    [20, 200, 200],
  ];

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
  pyramid = pyramid.concat(horizontalOutterPillar1);
  const horizontalOutterPillarPoints2 = [
    // consist of 8 points
    [0, 180, 200],
    [0, 200, 200],
    [420, 420, -20],
    [420, 380, -20],
    [20, 180, 200],
    [420, 380, 20],
    [420, 420, 20],
    [20, 200, 200],
  ];
  
  const horizontalOutterPillar2 = [
    // front
    new Rectangle(new Point(...horizontalOutterPillarPoints2[0]), new Point(...horizontalOutterPillarPoints2[1]), new Point(...horizontalOutterPillarPoints2[2]), new Point(...horizontalOutterPillarPoints2[3])),
    // right
    new Rectangle(new Point(...horizontalOutterPillarPoints2[3]), new Point(...horizontalOutterPillarPoints2[2]), new Point(...horizontalOutterPillarPoints2[6]), new Point(...horizontalOutterPillarPoints2[5])),
    // back
    new Rectangle(new Point(...horizontalOutterPillarPoints2[5]), new Point(...horizontalOutterPillarPoints2[6]), new Point(...horizontalOutterPillarPoints2[7]), new Point(...horizontalOutterPillarPoints2[4])),
    // left
    new Rectangle(
      new Point(...horizontalOutterPillarPoints2[4]),
      new Point(...horizontalOutterPillarPoints2[7]),
      new Point(...horizontalOutterPillarPoints2[1]),
      new Point(...horizontalOutterPillarPoints2[0])
    ),
    // top
    new Rectangle(new Point(...horizontalOutterPillarPoints2[1]), new Point(...horizontalOutterPillarPoints2[7]), new Point(...horizontalOutterPillarPoints2[6]), new Point(...horizontalOutterPillarPoints2[2])),
    // bottom
    new Rectangle(new Point(...horizontalOutterPillarPoints2[0]), new Point(...horizontalOutterPillarPoints2[3]), new Point(...horizontalOutterPillarPoints2[5]), new Point(...horizontalOutterPillarPoints2[4])),
  ];
  pyramid = pyramid.concat(horizontalOutterPillar2);
  
  const horizontalOutterPillarPoints3 = [
    // consist of 8 points
    [20, 180, 200],
    [20, 200, 200],
    [420, 20, 380],
    [420, -20, 380],
    [0, 180, 200],
    [420, -20, 420],
    [420, 20, 420],
    [0, 200, 200],
  ];
  const horizontalOutterPillar3 = [
    // front
    new Rectangle(new Point(...horizontalOutterPillarPoints3[0]), new Point(...horizontalOutterPillarPoints3[1]), new Point(...horizontalOutterPillarPoints3[2]), new Point(...horizontalOutterPillarPoints3[3])),
    // right
    new Rectangle(new Point(...horizontalOutterPillarPoints3[3]), new Point(...horizontalOutterPillarPoints3[2]), new Point(...horizontalOutterPillarPoints3[6]), new Point(...horizontalOutterPillarPoints3[5])),
    // back
    new Rectangle(new Point(...horizontalOutterPillarPoints3[5]), new Point(...horizontalOutterPillarPoints3[6]), new Point(...horizontalOutterPillarPoints3[7]), new Point(...horizontalOutterPillarPoints3[4])),
    // left
    new Rectangle(
      new Point(...horizontalOutterPillarPoints3[4]),
      new Point(...horizontalOutterPillarPoints3[7]),
      new Point(...horizontalOutterPillarPoints3[1]),
      new Point(...horizontalOutterPillarPoints3[0])
    ),
    // top
    new Rectangle(new Point(...horizontalOutterPillarPoints3[1]), new Point(...horizontalOutterPillarPoints3[7]), new Point(...horizontalOutterPillarPoints3[6]), new Point(...horizontalOutterPillarPoints3[2])),
    // bottom
    new Rectangle(new Point(...horizontalOutterPillarPoints3[0]), new Point(...horizontalOutterPillarPoints3[3]), new Point(...horizontalOutterPillarPoints3[5]), new Point(...horizontalOutterPillarPoints3[4])),
  ];
  
  pyramid = pyramid.concat(horizontalOutterPillar3);
// const horizontalOutterPilar3 = horizontalOutterPillar1.map((rectangle) => {
//     return new Rectangle(
//       new Point(rectangle.firstPoint.x, rectangle.firstPoint.y, rectangle.firstPoint.z + 400),
//       new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z + 400),
//       new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y, rectangle.thirdPoint.z + 400),
//       new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z + 400)
//     );
//   });
  

const horizontalOutterPillarPoints4 = [
    // consist of 8 points
    [20, 180, 200],
    [20, 200, 200],
    [420, 420, 380],
    [420, 380, 380],
    [0, 180, 200],
    [420, 380, 420],
    [420, 420, 420],
    [0, 200, 200],
  ];
  const horizontalOutterPillar4 = [
    // front
    new Rectangle(new Point(...horizontalOutterPillarPoints4[0]), new Point(...horizontalOutterPillarPoints4[1]), new Point(...horizontalOutterPillarPoints4[2]), new Point(...horizontalOutterPillarPoints4[3])),
    // right
    new Rectangle(new Point(...horizontalOutterPillarPoints4[3]), new Point(...horizontalOutterPillarPoints4[2]), new Point(...horizontalOutterPillarPoints4[6]), new Point(...horizontalOutterPillarPoints4[5])),
    // back
    new Rectangle(new Point(...horizontalOutterPillarPoints4[5]), new Point(...horizontalOutterPillarPoints4[6]), new Point(...horizontalOutterPillarPoints4[7]), new Point(...horizontalOutterPillarPoints4[4])),
    // left
    new Rectangle(
      new Point(...horizontalOutterPillarPoints4[4]),
      new Point(...horizontalOutterPillarPoints4[7]),
      new Point(...horizontalOutterPillarPoints4[1]),
      new Point(...horizontalOutterPillarPoints4[0])
    ),
    // top
    new Rectangle(new Point(...horizontalOutterPillarPoints4[1]), new Point(...horizontalOutterPillarPoints4[7]), new Point(...horizontalOutterPillarPoints4[6]), new Point(...horizontalOutterPillarPoints4[2])),
    // bottom
    new Rectangle(new Point(...horizontalOutterPillarPoints4[0]), new Point(...horizontalOutterPillarPoints4[3]), new Point(...horizontalOutterPillarPoints4[5]), new Point(...horizontalOutterPillarPoints4[4])),
  ];
  
  pyramid = pyramid.concat(horizontalOutterPillar4);
export default pyramid;
