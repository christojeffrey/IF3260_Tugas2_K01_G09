class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  // flatten method
  flatten() {
    return [this.x, this.y, this.z];
  }
}

class Rectangle {
  constructor(firstPoint, secondPoint, thirdPoint, fourthPoint) {
    this.firstPoint = firstPoint;
    this.secondPoint = secondPoint;
    this.thirdPoint = thirdPoint;
    this.fourthPoint = fourthPoint;
  }

  // flatten method
  flattenToTriangles() {
    return [...this.firstPoint.flatten(), ...this.secondPoint.flatten(), ...this.fourthPoint.flatten(), ...this.secondPoint.flatten(), ...this.thirdPoint.flatten(), ...this.fourthPoint.flatten()];
  }
  triangleCount() {
    return 2;
  }
  totalDrawnPoints() {
    return this.triangleCount() * 3;
  }
}

export { Point, Rectangle };
