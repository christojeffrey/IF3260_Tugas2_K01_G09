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

  export() {
    return [this.x, this.y, this.z];
  }
  import(array) {
    this.x = array[0];
    this.y = array[1];
    this.z = array[2];
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
  export() {
    return [this.firstPoint.export(), this.secondPoint.export(), this.thirdPoint.export(), this.fourthPoint.export()];
  }
  import(array) {
    this.firstPoint.import(array[0]);
    this.secondPoint.import(array[1]);
    this.thirdPoint.import(array[2]);
    this.fourthPoint.import(array[3]);
  }
}

//create class Triangle
class Triangle {
  constructor(firstPoint, secondPoint, thirdPoint) {
    this.firstPoint = firstPoint;
    this.secondPoint = secondPoint;
    this.thirdPoint = thirdPoint;
  }

  // flatten method
  flattenToTriangles() {
    return [...this.firstPoint.flatten(), ...this.secondPoint.flatten(), ...this.thirdPoint.flatten()];
  }
  triangleCount() {
    return 1;
  }
  totalDrawnPoints() {
    return this.triangleCount() * 3;
  }
  export() {
    return [this.firstPoint.export(), this.secondPoint.export(), this.thirdPoint.export()];
  }
  import(array) {
    this.firstPoint.import(array[0]);
    this.secondPoint.import(array[1]);
    this.thirdPoint.import(array[2]);
  }
}


export { Point, Rectangle, Triangle };
