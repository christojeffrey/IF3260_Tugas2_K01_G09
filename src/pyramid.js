import { Point, Rectangle } from "./class.js";

let pyramid = [];
let pyramidnormals = [];
const pillarPoints = [
    // consist of 8 points
    [-20, -20, -20],
    [180, 420, 180],
    [200, 420, 180],
    [20, -20, -20],
    [-20, -20, 20],
    [20, -20, 20],
    [200, 400, 200],
    [180, 400, 200],
  ];
  
const pillarPoints2 = [
    // plliatpoints.x +400
    [380, -20, -20],
    [180, 420, 180],
    [200, 420, 180],
    [420, -20, -20],
    [380, -20, 20],
    [420, -20, 20],
    [200, 400, 200],
    [180, 400, 200],
  ];

  const pillarPoints3 = [
    // plliatpoints.x +400
    [-20, -20, 380],
    [180, 420, 180],
    [200, 420, 180],
    [20, -20, 380],
    [-20, -20, 420],
    [20, -20, 420],
    [200, 400, 200],
    [180, 400, 200],
  ];
  
  const pillarPoints4 = [
    // plliatpoints.x +400
    [380, -20, 380],
    [180, 420, 180],
    [200, 420, 180],
    [420, -20, 380],
    [380, -20, 420],
    [420, -20, 420],
    [200, 400, 200],
    [180, 400, 200],
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
  const normalPoints = [
    // consist of 6 points
    [0, 0, 1],
    [1, 0, 0],
    [0, 0, -1],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
  ]
  var pillarnormals = [
    // front
    new Rectangle(new Point(...normalPoints[0]), new Point(...normalPoints[0]), new Point(...normalPoints[0]), new Point(...normalPoints[0])),

    //right
    new Rectangle(new Point(...normalPoints[1]), new Point(...normalPoints[1]), new Point(...normalPoints[1]), new Point(...normalPoints[1])),

    //back
    new Rectangle(new Point(...normalPoints[2]), new Point(...normalPoints[2]), new Point(...normalPoints[2]), new Point(...normalPoints[2])),
    
    //left
    new Rectangle(new Point(...normalPoints[3]), new Point(...normalPoints[3]), new Point(...normalPoints[3]), new Point(...normalPoints[3])),

    //top
    new Rectangle(new Point(...normalPoints[4]), new Point(...normalPoints[4]), new Point(...normalPoints[4]), new Point(...normalPoints[4])),

    //bottom
    new Rectangle(new Point(...normalPoints[5]), new Point(...normalPoints[5]), new Point(...normalPoints[5]), new Point(...normalPoints[5])),
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
    new Rectangle(new Point(...pillarPoints2[1]), new Point(...pillarPoints2[7]), new Point(...pillarPoints2[6]), new Point(...pillarPoints2[2])),
    // bottom
    new Rectangle(new Point(...pillarPoints2[0]), new Point(...pillarPoints2[3]), new Point(...pillarPoints2[5]), new Point(...pillarPoints2[4])),
  ];

  pyramid = pyramid.concat(outterPillar1);
  pyramidnormals = pyramidnormals.concat(pillarnormals);
  const outterPillar2 = [
    // front
    new Rectangle(new Point(...pillarPoints2[0]), new Point(...pillarPoints2[1]), new Point(...pillarPoints2[2]), new Point(...pillarPoints2[3])),
    // right
    new Rectangle(new Point(...pillarPoints2[3]), new Point(...pillarPoints2[2]), new Point(...pillarPoints2[6]), new Point(...pillarPoints2[5])),
    // back
    new Rectangle(new Point(...pillarPoints2[5]), new Point(...pillarPoints2[6]), new Point(...pillarPoints2[7]), new Point(...pillarPoints2[4])),
    // left
    new Rectangle(
      new Point(...pillarPoints2[4]),
      new Point(...pillarPoints2[7]),
  
      new Point(...pillarPoints2[1]),
      new Point(...pillarPoints2[0])
    ),
    // top
    new Rectangle(new Point(...pillarPoints2[1]), new Point(...pillarPoints2[7]), new Point(...pillarPoints2[6]), new Point(...pillarPoints2[2])),
    // bottom
    new Rectangle(new Point(...pillarPoints2[0]), new Point(...pillarPoints2[3]), new Point(...pillarPoints2[5]), new Point(...pillarPoints2[4])),
  ];
 pyramid = pyramid.concat(outterPillar2);
 pyramidnormals = pyramidnormals.concat(pillarnormals);
  
 const outterPillar3 = [
  // front
  new Rectangle(new Point(...pillarPoints3[0]), new Point(...pillarPoints3[1]), new Point(...pillarPoints3[2]), new Point(...pillarPoints3[3])),
  // right
  new Rectangle(new Point(...pillarPoints3[3]), new Point(...pillarPoints3[2]), new Point(...pillarPoints3[6]), new Point(...pillarPoints3[5])),
  // back
  new Rectangle(new Point(...pillarPoints3[5]), new Point(...pillarPoints3[6]), new Point(...pillarPoints3[7]), new Point(...pillarPoints3[4])),
  // left
  new Rectangle(
    new Point(...pillarPoints3[4]),
    new Point(...pillarPoints3[7]),

    new Point(...pillarPoints3[1]),
    new Point(...pillarPoints3[0])
  ),
  // top
  new Rectangle(new Point(...pillarPoints3[1]), new Point(...pillarPoints3[7]), new Point(...pillarPoints3[6]), new Point(...pillarPoints3[2])),
  // bottom
  new Rectangle(new Point(...pillarPoints3[0]), new Point(...pillarPoints3[3]), new Point(...pillarPoints3[5]), new Point(...pillarPoints3[4])),
];
pyramid = pyramid.concat(outterPillar3);
pyramidnormals = pyramidnormals.concat(pillarnormals);

const outterPillar4 = [
  // front
  new Rectangle(new Point(...pillarPoints4[0]), new Point(...pillarPoints4[1]), new Point(...pillarPoints4[2]), new Point(...pillarPoints4[3])),
  // right
  new Rectangle(new Point(...pillarPoints4[3]), new Point(...pillarPoints4[2]), new Point(...pillarPoints4[6]), new Point(...pillarPoints4[5])),
  // back
  new Rectangle(new Point(...pillarPoints4[5]), new Point(...pillarPoints4[6]), new Point(...pillarPoints4[7]), new Point(...pillarPoints4[4])),
  // left
  new Rectangle(
    new Point(...pillarPoints4[4]),
    new Point(...pillarPoints4[7]),

    new Point(...pillarPoints4[1]),
    new Point(...pillarPoints4[0])
  ),
  // top
  new Rectangle(new Point(...pillarPoints4[1]), new Point(...pillarPoints4[7]), new Point(...pillarPoints4[6]), new Point(...pillarPoints4[2])),
  // bottom
  new Rectangle(new Point(...pillarPoints4[0]), new Point(...pillarPoints4[3]), new Point(...pillarPoints4[5]), new Point(...pillarPoints4[4])),
];
pyramid = pyramid.concat(outterPillar4);
pyramidnormals = pyramidnormals.concat(pillarnormals);
  
  
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
  pyramid = pyramid.concat(depthOutterPillar1);
  pyramidnormals = pyramidnormals.concat(pillarnormals);

  const depthOutterPilar2 = depthOutterPillar1.map((rectangle) => {
    return new Rectangle(
      new Point(rectangle.firstPoint.x+400, rectangle.firstPoint.y, rectangle.firstPoint.z),
      new Point(rectangle.secondPoint.x+400, rectangle.secondPoint.y, rectangle.secondPoint.z),
      new Point(rectangle.thirdPoint.x+400, rectangle.thirdPoint.y, rectangle.thirdPoint.z),
      new Point(rectangle.fourthPoint.x+400, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
    );
  });

  pyramid = pyramid.concat(depthOutterPilar2);
  pyramidnormals = pyramidnormals.concat(pillarnormals);

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
  pyramidnormals = pyramidnormals.concat(pillarnormals);

  const horizontalOutterPilar3 = horizontalOutterPillar1.map((rectangle) => {
    return new Rectangle(
      new Point(rectangle.firstPoint.x, rectangle.firstPoint.y, rectangle.firstPoint.z + 400),
      new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z + 400),
      new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y, rectangle.thirdPoint.z + 400),
      new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z + 400)
    );
  });

  pyramid = pyramid.concat(horizontalOutterPilar3);
  pyramidnormals = pyramidnormals.concat(pillarnormals);

export { pyramid, pyramidnormals } ;