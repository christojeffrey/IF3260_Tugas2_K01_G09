import { radToDeg, degToRad } from "../math/math.js";

const ANIMATION_SPEED   =  0.3; // degrees per second
let mulX                =  1;
let mulY                =  1;
let mulZ                =  1;

function animate(objectsConditions) {
    let angleX  = radToDeg(objectsConditions.rotation[0]);
    let angleY  = radToDeg(objectsConditions.rotation[1]);
    let angleZ  = radToDeg(objectsConditions.rotation[2]);

    if (angleX <= 1) 
        mulX = 1
    else if (angleX >= 359) 
        mulX = -1

    if (angleY <= 1) 
        mulY = 1
    else if (angleY >= 359) 
        mulY = -1

    if (angleZ <= 1) 
        mulZ = 1
    else if (angleZ >= 359) 
        mulZ = -1

    angleX = (angleX + ANIMATION_SPEED * mulX) % 360;
    angleY = (angleY + ANIMATION_SPEED * mulY) % 360;
    angleZ = (angleZ + ANIMATION_SPEED * mulZ) % 360;

    let rotateXElmt = document.querySelector("#rotateX");
    let rotateYElmt = document.querySelector("#rotateY");
    let rotateZElmt = document.querySelector("#rotateZ");

    rotateXElmt.value = angleX;
    rotateYElmt.value = angleY;
    rotateZElmt.value = angleZ;

    let rotateXValueELmt = document.querySelector("#rotateXValue");
    let rotateYValueELmt = document.querySelector("#rotateYValue");
    let rotateZValueELmt = document.querySelector("#rotateZValue");

    rotateXValueELmt.textContent = Math.round(angleX);
    rotateYValueELmt.textContent = Math.round(angleY);
    rotateZValueELmt.textContent = Math.round(angleZ);

    objectsConditions.rotation[0] = degToRad(angleX);
    objectsConditions.rotation[1] = degToRad(angleY);
    objectsConditions.rotation[2] = degToRad(angleZ);
}

export { animate };