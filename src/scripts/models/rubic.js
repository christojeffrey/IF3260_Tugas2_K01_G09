import { Point } from "./point.js";
import { Rectangle } from "./rectangle.js";
import { rubicColors } from "../constant/colors.js";
import { v3 } from "../math/v3.js";

// Rubic size
const RUBIC_SIZE        = 3;

// Rubic Model
let rubic = {
    position    : [],
    colors      : [],
    normals     : [],
};

// Vertical pillar
const verticalPillar    = [
    // Front
    new Rectangle(
        new Point(-152, -152, -152), new Point(-152, -140, -152),
        new Point( -40, -140, -152), new Point( -40, -152, -152)
    ),
    // Back
    new Rectangle(
        new Point( -40, -152, -140), new Point( -40, -140, -140),
        new Point(-152, -140, -140), new Point(-152, -152, -140)
    ),
    // Left
    new Rectangle(
        new Point(-152, -152, -140), new Point(-152, -140, -140),
        new Point(-152, -140, -152), new Point(-152, -152, -152)
    ),
    // Right
    new Rectangle(
        new Point( -40, -152, -152), new Point( -40, -140, -152),
        new Point( -40, -140, -140), new Point( -40, -152,  -140)
    ),
    // Top
    new Rectangle(
        new Point(-152, -152, -152), new Point( -40, -152, -152),
        new Point( -40, -152, -140), new Point(-152, -152, -140)
    ),
    // Bottom
    new Rectangle(
        new Point(-152, -140, -152), new Point(-152, -140, -140),
        new Point( -40, -140, -140), new Point( -40, -140, -152)
    ),
];
// Horizontal pillar
const horizontalPillar  = [
    // Front
    new Rectangle(
        new Point(-152, -152, -152), new Point(-152,  -40, -152),
        new Point(-140,  -40, -152), new Point(-140, -152, -152)
    ),
    // Back
    new Rectangle(
        new Point(-152, -152, -140), new Point(-140, -152, -140),
        new Point(-140,  -40, -140), new Point(-152,  -40, -140)
    ),
    // Left
    new Rectangle(
        new Point(-152, -152, -152), new Point(-152, -152, -140),
        new Point(-152,  -40, -140), new Point(-152,  -40, -152)
    ),
    // Right
    new Rectangle(  
        new Point(-140, -152, -152), new Point(-140,  -40, -152),
        new Point(-140,  -40, -140), new Point(-140, -152, -140)
    ),
    // Top
    new Rectangle(
        new Point(-152, -152, -152), new Point(-140, -152, -152),
        new Point(-140, -152, -140), new Point(-152, -152, -140)
    ),
    // Bottom
    new Rectangle(
        new Point(-152,  -40, -152), new Point(-152,  -40, -140),
        new Point(-140,  -40, -140), new Point(-140,  -40, -152)
    ),
];
// Depth pillar
const depthPillar       = [
    // Front
    new Rectangle(
        new Point(-152, -152, -152), new Point(-152, -140, -152),
        new Point(-140, -140, -152), new Point(-140, -152, -152)
    ),
    // Back
    new Rectangle(
        new Point(-152, -152,  -40), new Point(-140, -152,  -40),
        new Point(-140, -140,  -40), new Point(-152, -140,  -40)
    ),
    // Left
    new Rectangle(
        new Point(-152, -152, -152), new Point(-152, -152,  -40),
        new Point(-152, -140,  -40), new Point(-152, -140, -152)
    ),
    // Right
    new Rectangle(  
        new Point(-140, -152, -152), new Point(-140, -140, -152),
        new Point(-140, -140,  -40), new Point(-140, -152,  -40)
    ),
    // Top
    new Rectangle(
        new Point(-152, -152, -152), new Point(-140, -152, -152),
        new Point(-140, -152,  -40), new Point(-152, -152,  -40)
    ),
    // Bottom
    new Rectangle(
        new Point(-152, -140, -152), new Point(-152, -140,  -40),
        new Point(-140, -140,  -40), new Point(-140, -140, -152)
    ),
];

// Store rubic's rectangles
let rectangles = []

// Make the rubic
for (let i = 0; i < RUBIC_SIZE; i++) {
    for (let j = 0; j <= RUBIC_SIZE; j++) {
        for (let k = 0; k <= RUBIC_SIZE; k++) {
            // Vertical Pillar
            /* ============================================================================================================================== */           
            rectangles = rectangles.concat(verticalPillar.map(rectangle => {
                    return new Rectangle(
                            new Point(rectangle.firstPoint.x  + 100 * i, rectangle.firstPoint.y  + 100 * j, rectangle.firstPoint.z  + 100 * k),
                            new Point(rectangle.secondPoint.x + 100 * i, rectangle.secondPoint.y + 100 * j, rectangle.secondPoint.z + 100 * k),
                            new Point(rectangle.thirdPoint.x  + 100 * i, rectangle.thirdPoint.y  + 100 * j, rectangle.thirdPoint.z  + 100 * k),
                            new Point(rectangle.fourthPoint.x + 100 * i, rectangle.fourthPoint.y + 100 * j, rectangle.fourthPoint.z + 100 * k)
                    );
                })
            );
            /* ============================================================================================================================== */

            // Vertical Pillar Color
            /* ============================================================================================================================== */
            for (let n = 0; n < 6; n++)  
                rubic.colors = k == 0               ? rubic.colors.concat(rubicColors.red)    : rubic.colors.concat(rubicColors.black);  // Red for front
            for (let n = 0; n < 6; n++)  
                rubic.colors = k == RUBIC_SIZE      ? rubic.colors.concat(rubicColors.orange) : rubic.colors.concat(rubicColors.black); // Orange for back
            for (let n = 0; n < 6; n++)  
                rubic.colors = i == 0               ? rubic.colors.concat(rubicColors.blue)   : rubic.colors.concat(rubicColors.black);  // Blue for left
            for (let n = 0; n < 6; n++)  
                rubic.colors = i == RUBIC_SIZE - 1  ? rubic.colors.concat(rubicColors.green)  : rubic.colors.concat(rubicColors.black);  // Green for right
            for (let n = 0; n < 6; n++)  
                rubic.colors = j == 0               ? rubic.colors.concat(rubicColors.yellow) : rubic.colors.concat(rubicColors.black);  // Yellow for top
            for (let n = 0; n < 6; n++)  
                rubic.colors = j == RUBIC_SIZE      ? rubic.colors.concat(rubicColors.white)  : rubic.colors.concat(rubicColors.black);  // White for bottom
            /* ============================================================================================================================== */
            



            // Horizontal Pillar
            /* ============================================================================================================================== */
            rectangles = rectangles.concat(horizontalPillar.map(rectangle => {
                    return new Rectangle(
                            new Point(rectangle.firstPoint.x  + 100 * k, rectangle.firstPoint.y  + 100 * i, rectangle.firstPoint.z  + 100 * j),
                            new Point(rectangle.secondPoint.x + 100 * k, rectangle.secondPoint.y + 100 * i, rectangle.secondPoint.z + 100 * j),
                            new Point(rectangle.thirdPoint.x  + 100 * k, rectangle.thirdPoint.y  + 100 * i, rectangle.thirdPoint.z  + 100 * j),
                            new Point(rectangle.fourthPoint.x + 100 * k, rectangle.fourthPoint.y + 100 * i, rectangle.fourthPoint.z + 100 * j)
                    );
                })
            );
            /* ============================================================================================================================== */

            // Horizontal Pillar Color
            /* ============================================================================================================================== */
            for (let n = 0; n < 6; n++)  
                rubic.colors = j == 0               ? rubic.colors.concat(rubicColors.red)    : rubic.colors.concat(rubicColors.black);  // Red for front
            for (let n = 0; n < 6; n++)  
                rubic.colors = j == RUBIC_SIZE      ? rubic.colors.concat(rubicColors.orange) : rubic.colors.concat(rubicColors.black); // Orange for back
            for (let n = 0; n < 6; n++)  
                rubic.colors = k == 0               ? rubic.colors.concat(rubicColors.blue)   : rubic.colors.concat(rubicColors.black);  // Blue for left
            for (let n = 0; n < 6; n++)  
                rubic.colors = k == RUBIC_SIZE      ? rubic.colors.concat(rubicColors.green)  : rubic.colors.concat(rubicColors.black);  // Green for right
            for (let n = 0; n < 6; n++)  
                rubic.colors = i == 0               ? rubic.colors.concat(rubicColors.yellow) : rubic.colors.concat(rubicColors.black);  // Yellow for top
            for (let n = 0; n < 6; n++)  
                rubic.colors = i == RUBIC_SIZE - 1  ? rubic.colors.concat(rubicColors.white)  : rubic.colors.concat(rubicColors.black);  // White for bottom
            /* ============================================================================================================================== */




            // Depth Pillar
            /* ============================================================================================================================== */
            rectangles = rectangles.concat(depthPillar.map(rectangle => {
                    return new Rectangle(
                        new Point(rectangle.firstPoint.x  + 100 * j , rectangle.firstPoint.y  + 100 * k , rectangle.firstPoint.z  + 100 * i),
                        new Point(rectangle.secondPoint.x + 100 * j , rectangle.secondPoint.y + 100 * k , rectangle.secondPoint.z + 100 * i),
                        new Point(rectangle.thirdPoint.x  + 100 * j , rectangle.thirdPoint.y  + 100 * k , rectangle.thirdPoint.z  + 100 * i),
                        new Point(rectangle.fourthPoint.x + 100 * j , rectangle.fourthPoint.y + 100 * k , rectangle.fourthPoint.z + 100 * i)
                    );
                })
            );

            // Depth Pillar Color
            /* ============================================================================================================================== */
            for (let n = 0; n < 6; n++)  
                rubic.colors = i == 0               ? rubic.colors.concat(rubicColors.red)    : rubic.colors.concat(rubicColors.black);  // Red for front
            for (let n = 0; n < 6; n++)  
                rubic.colors = i == RUBIC_SIZE - 1  ? rubic.colors.concat(rubicColors.orange) : rubic.colors.concat(rubicColors.black);  // Orange for back
            for (let n = 0; n < 6; n++)  
                rubic.colors = j == 0               ? rubic.colors.concat(rubicColors.blue)   : rubic.colors.concat(rubicColors.black);  // Blue for left
            for (let n = 0; n < 6; n++)  
                rubic.colors = j == RUBIC_SIZE      ? rubic.colors.concat(rubicColors.green)  : rubic.colors.concat(rubicColors.black);  // Green for right
            for (let n = 0; n < 6; n++)  
                rubic.colors = k == 0               ? rubic.colors.concat(rubicColors.yellow) : rubic.colors.concat(rubicColors.black);  // Yellow for top
            for (let n = 0; n < 6; n++)  
                rubic.colors = k == RUBIC_SIZE      ? rubic.colors.concat(rubicColors.white)  : rubic.colors.concat(rubicColors.black);  // White for bottom
            /* ============================================================================================================================== */
        }
    }
}

// Flatten the rectangles to triangles
for (let i = 0; i < rectangles.length; i++) {
    let rectangle = rectangles[i].flattenToTriangles();
    for (let j = 0; j < rectangle.length; j += 3*3) {
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
        rubic.normals   = [...rubic.normals, ...normal, ...normal, ...normal];
    }
    rubic.position = [...rubic.position, ...rectangle];
}

export default rubic;