import { Point } from './point.js';
import { Rectangle } from './rectangle.js';
import { v3 } from "../math/v3.js";
import { primaryColors } from '../constant/colors.js';

let pyramid = {
    position: [],
    colors: [],
    normals: [],
};
let rectangles = [];
let rectanglesnormals = [];
const pillarPoints = [
    // consist of 8 points
    [-220, -220, -220],
    [-20, 220, -20],
    [0, 220, -20],
    [-180, -220, -220],
    [-220, -220,-180],
    [-180, -220,-180],
    [0, 200,    0],
    [-20, 200,    0],
  ];
  
const pillarPoints2 = [
    // plliatpoints.x +400
    [180, -220, -220],
    [-20, 220, -20],
    [0, 220, -20],
    [220, -220, -220],
    [180, -220,-180],
    [220, -220,-180],
    [0, 200,    0],
    [-20, 200,    0],
  ];

  const pillarPoints3 = [
    // plliatpoints.x +400
    [-220, -220, 180],
    [-20, 220, -20],
    [0, 220, -20],
    [-180, -220, 180],
    [-220, -220, 220],
    [-180, -220, 220],
    [0, 200,    0],
    [-20, 200,    0],
  ];
  
  const pillarPoints4 = [
    // plliatpoints.x +400
    [180, -220, 180],
    [-20, 220, -20],
    [  0, 220, -20],
    [220, -220, 180],
    [180, -220, 220],
    [220, -220, 220],
    [  0, 200,    0],
    [-20, 200,    0],
  ];
  const depthOutterPillarPoints = [
    // consist of 8 points
    [-220, -220, -220],
    [-220, -180, -220],
    [-180, -180, -220],
    [-180, -220, -220],
    [-220, -220, 220],
    [-180, -220, 220],
    [-180, -180, 220],
    [-220, -180, 220],
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
    //back
    new Rectangle(new Point(...normalPoints[2]), new Point(...normalPoints[2]), new Point(...normalPoints[2]), new Point(...normalPoints[2])),

    //left
    new Rectangle(new Point(...normalPoints[3]), new Point(...normalPoints[3]), new Point(...normalPoints[3]), new Point(...normalPoints[3])),
    //right
    new Rectangle(new Point(...normalPoints[1]), new Point(...normalPoints[1]), new Point(...normalPoints[1]), new Point(...normalPoints[1])),

    //top
    new Rectangle(new Point(...normalPoints[4]), new Point(...normalPoints[4]), new Point(...normalPoints[4]), new Point(...normalPoints[4])),

    //bottom
    new Rectangle(new Point(...normalPoints[5]), new Point(...normalPoints[5]), new Point(...normalPoints[5]), new Point(...normalPoints[5])),
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
    new Rectangle(new Point(...pillarPoints2[1]), new Point(...pillarPoints2[7]), new Point(...pillarPoints2[6]), new Point(...pillarPoints2[2])),
    // bottom
    new Rectangle(new Point(...pillarPoints2[0]), new Point(...pillarPoints2[3]), new Point(...pillarPoints2[5]), new Point(...pillarPoints2[4])),
  ];

  rectangles = rectangles.concat(outterPillar1);
  rectanglesnormals = rectanglesnormals.concat(pillarnormals);
  const outterPillar2 = [
    // front
    new Rectangle(new Point(...pillarPoints2[0]), new Point(...pillarPoints2[1]), new Point(...pillarPoints2[2]), new Point(...pillarPoints2[3])),
    // back
    new Rectangle(new Point(...pillarPoints2[5]), new Point(...pillarPoints2[6]), new Point(...pillarPoints2[7]), new Point(...pillarPoints2[4])),
    // left
    new Rectangle(
      new Point(...pillarPoints2[4]),
      new Point(...pillarPoints2[7]),
  
      new Point(...pillarPoints2[1]),
      new Point(...pillarPoints2[0])
    ),
    // right
    new Rectangle(new Point(...pillarPoints2[3]), new Point(...pillarPoints2[2]), new Point(...pillarPoints2[6]), new Point(...pillarPoints2[5])),
    // top
    new Rectangle(new Point(...pillarPoints2[1]), new Point(...pillarPoints2[7]), new Point(...pillarPoints2[6]), new Point(...pillarPoints2[2])),
    // bottom
    new Rectangle(new Point(...pillarPoints2[0]), new Point(...pillarPoints2[3]), new Point(...pillarPoints2[5]), new Point(...pillarPoints2[4])),
  ];
 rectangles = rectangles.concat(outterPillar2);
 rectanglesnormals = rectanglesnormals.concat(pillarnormals);
  
 const outterPillar3 = [
  // front
  new Rectangle(new Point(...pillarPoints3[0]), new Point(...pillarPoints3[1]), new Point(...pillarPoints3[2]), new Point(...pillarPoints3[3])),
  // back
  new Rectangle(new Point(...pillarPoints3[5]), new Point(...pillarPoints3[6]), new Point(...pillarPoints3[7]), new Point(...pillarPoints3[4])),
  // left
  new Rectangle(
    new Point(...pillarPoints3[4]),
    new Point(...pillarPoints3[7]),

    new Point(...pillarPoints3[1]),
    new Point(...pillarPoints3[0])
  ),
   // right
   new Rectangle(new Point(...pillarPoints3[3]), new Point(...pillarPoints3[2]), new Point(...pillarPoints3[6]), new Point(...pillarPoints3[5])),
  // top
  new Rectangle(new Point(...pillarPoints3[1]), new Point(...pillarPoints3[7]), new Point(...pillarPoints3[6]), new Point(...pillarPoints3[2])),
  // bottom
  new Rectangle(new Point(...pillarPoints3[0]), new Point(...pillarPoints3[3]), new Point(...pillarPoints3[5]), new Point(...pillarPoints3[4])),
];
rectangles = rectangles.concat(outterPillar3);
rectanglesnormals = rectanglesnormals.concat(pillarnormals);

const outterPillar4 = [
  // front
  new Rectangle(new Point(...pillarPoints4[0]), new Point(...pillarPoints4[1]), new Point(...pillarPoints4[2]), new Point(...pillarPoints4[3])),

  // back
  new Rectangle(new Point(...pillarPoints4[5]), new Point(...pillarPoints4[6]), new Point(...pillarPoints4[7]), new Point(...pillarPoints4[4])),
  // left
  new Rectangle(
    new Point(...pillarPoints4[4]),
    new Point(...pillarPoints4[7]),

    new Point(...pillarPoints4[1]),
    new Point(...pillarPoints4[0])
  ),
    // right
    new Rectangle(new Point(...pillarPoints4[3]), new Point(...pillarPoints4[2]), new Point(...pillarPoints4[6]), new Point(...pillarPoints4[5])),
  // top
  new Rectangle(new Point(...pillarPoints4[1]), new Point(...pillarPoints4[7]), new Point(...pillarPoints4[6]), new Point(...pillarPoints4[2])),
  // bottom
  new Rectangle(new Point(...pillarPoints4[0]), new Point(...pillarPoints4[3]), new Point(...pillarPoints4[5]), new Point(...pillarPoints4[4])),
];
rectangles = rectangles.concat(outterPillar4);
rectanglesnormals = rectanglesnormals.concat(pillarnormals);
  
  
  const depthOutterPillar1 = [
    // front
    new Rectangle(new Point(...depthOutterPillarPoints[0]), new Point(...depthOutterPillarPoints[1]), new Point(...depthOutterPillarPoints[2]), new Point(...depthOutterPillarPoints[3])),
    
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
    // back
    // top
    new Rectangle(new Point(...depthOutterPillarPoints[1]), new Point(...depthOutterPillarPoints[7]), new Point(...depthOutterPillarPoints[6]), new Point(...depthOutterPillarPoints[2])),
    // bottom
    new Rectangle(new Point(...depthOutterPillarPoints[0]), new Point(...depthOutterPillarPoints[3]), new Point(...depthOutterPillarPoints[5]), new Point(...depthOutterPillarPoints[4])),
  ];
  rectangles = rectangles.concat(depthOutterPillar1);
  rectanglesnormals = rectanglesnormals.concat(pillarnormals);

  const depthOutterPilar2 = depthOutterPillar1.map((rectangle) => {
    return new Rectangle(
      new Point(rectangle.firstPoint.x+400, rectangle.firstPoint.y, rectangle.firstPoint.z),
      new Point(rectangle.secondPoint.x+400, rectangle.secondPoint.y, rectangle.secondPoint.z),
      new Point(rectangle.thirdPoint.x+400, rectangle.thirdPoint.y, rectangle.thirdPoint.z),
      new Point(rectangle.fourthPoint.x+400, rectangle.fourthPoint.y, rectangle.fourthPoint.z)
    );
  });

  rectangles = rectangles.concat(depthOutterPilar2);
  rectanglesnormals = rectanglesnormals.concat(pillarnormals);

    const horizontalOutterPillarPoints = [
      // consist of 8 points
      [-220, -220, -220],
      [-220, -180, -220],
      [220, -180, -220],
      [220, -220, -220],
      [-220, -220,-180],
      [220, -220,-180],
      [220, -180,-180],
      [-220, -180,-180],
    ];
 
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
  rectanglesnormals = rectanglesnormals.concat(pillarnormals);

  const horizontalOutterPilar3 = horizontalOutterPillar1.map((rectangle) => {
    return new Rectangle(
      new Point(rectangle.firstPoint.x, rectangle.firstPoint.y, rectangle.firstPoint.z + 400),
      new Point(rectangle.secondPoint.x, rectangle.secondPoint.y, rectangle.secondPoint.z + 400),
      new Point(rectangle.thirdPoint.x, rectangle.thirdPoint.y, rectangle.thirdPoint.z + 400),
      new Point(rectangle.fourthPoint.x, rectangle.fourthPoint.y, rectangle.fourthPoint.z + 400)
    );
  });

  rectangles = rectangles.concat(horizontalOutterPilar3);
  rectanglesnormals = rectanglesnormals.concat(pillarnormals);

for (let i = 0; i < rectangles.length; i++) {
  let rectangle = rectangles[i].flattenToTriangles();
  pyramid.position = [...pyramid.position, ...rectangle];
  for (let j = 0; j < rectangle.length; j += 3 * 3) {
    let vec1 = v3.create(
        rectangle[j + 3] - rectangle[j + 0], 
        rectangle[j + 4] - rectangle[j + 1], 
        rectangle[j + 5] - rectangle[j + 2]
    ); 
    let vec2 = v3.create(
        rectangle[j + 6] - rectangle[j + 3], 
        rectangle[j + 7] - rectangle[j + 4], 
        rectangle[j + 8] - rectangle[j + 5]
    );
    let normal;
    if (i % 2)
        normal      = v3.cross(vec1, vec2);
    else
        normal      = v3.cross(vec2, vec1);
    normal          = v3.normalize(normal);
    pyramid.normals = [...pyramid.normals, ...normal, ...normal, ...normal];
  }
  for (let j = 0; j < rectangles[i].totalDrawnPoints(); j++) {
    pyramid.colors = [...pyramid.colors, ...primaryColors[i % 6]];
  }
}

export default pyramid;