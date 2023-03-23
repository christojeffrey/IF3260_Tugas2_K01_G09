import { cs } from "../constant/cs.js";

export const m4 = {
  projection(radius, type) {
    let aspect  = (cs.width/2) / (cs.height/2);

    let top     = -(cs.height/2 + -radius);
    let bottom  =  (cs.height/2 + -radius);
    let left    =  (aspect * top)
    let right   = -(aspect * top);
    let near    =    cs.depth * 1.75;
    let far     =   -cs.depth * 1.75;

    let a       = 2 / (right - left);
    let b       = 2 / (top - bottom);
    let c       = 2 / (near - far);
    let tx      = -(right + left) / (right - left);
    let ty      = -(top + bottom) / (top - bottom);
    let tz      = -(far + near) / (far - near);

    switch (type) {
      case "orthographic":
        return [
          a,  0,  0,  0,
          0,  b,  0,  0,
          0,  0,  c,  0,
          tx, ty, tz,  1
        ]
      case "oblique":
        let s       = 1;
        let cs      = c * s;
        let stz     = tz * s;
        return [
            a     ,    0    ,  0 ,  0, 
            0     ,    b    ,  0 ,  0,
            cs    ,    cs   ,  c ,  0,
          tx + stz, ty + stz, stz,  1
        ]
      case "perspective":
        let f       = 4.5; 

        let cf      = c * f;
        let ftz     = f * tz;
        return [
           a,  0,  0,    0   ,
           0,  b,  0,    0   ,
           0,  0,  c,   cf   ,
          tx, ty, tz, ftz + 1
        ]
      default:
        throw new Error("unknown projection type");
    }
  },

  identity: function() {
    return [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
  },

  view(angleInRadians, radius) {
    let f          = m4.yRotation(angleInRadians);
    let translateZ = m4.translation(0, 0, radius);
    let camera     = m4.multiply(f, translateZ);

    return m4.inverse(camera);
  },

  transform(translation, rotation, scale) {
    let x      = translation[0]; let y      = translation[1]; let z      = translation[2];
    let angleX =    rotation[0]; let angleY =    rotation[1]; let angleZ =    rotation[2];
    let scaleX =       scale[0]; let scaleY =       scale[1]; let scaleZ =       scale[2];


    let m = m4.identity();
    m     = m4.translate(m, x, y, z);
    m     = m4.xRotate(m, angleX);
    m     = m4.yRotate(m, angleY);
    m     = m4.zRotate(m, angleZ);
    m     = m4.scale(m, scaleX, scaleY, scaleZ);

    return m;
  },

  multiply: function(a, b) {
    let a00 = a[0 * 4 + 0], a01 = a[0 * 4 + 1], a02 = a[0 * 4 + 2], a03 = a[0 * 4 + 3];
    let a10 = a[1 * 4 + 0], a11 = a[1 * 4 + 1], a12 = a[1 * 4 + 2], a13 = a[1 * 4 + 3];
    let a20 = a[2 * 4 + 0], a21 = a[2 * 4 + 1], a22 = a[2 * 4 + 2], a23 = a[2 * 4 + 3];
    let a30 = a[3 * 4 + 0], a31 = a[3 * 4 + 1], a32 = a[3 * 4 + 2], a33 = a[3 * 4 + 3];

    let b00 = b[0 * 4 + 0], b01 = b[0 * 4 + 1], b02 = b[0 * 4 + 2], b03 = b[0 * 4 + 3];
    let b10 = b[1 * 4 + 0], b11 = b[1 * 4 + 1], b12 = b[1 * 4 + 2], b13 = b[1 * 4 + 3];
    let b20 = b[2 * 4 + 0], b21 = b[2 * 4 + 1], b22 = b[2 * 4 + 2], b23 = b[2 * 4 + 3];
    let b30 = b[3 * 4 + 0], b31 = b[3 * 4 + 1], b32 = b[3 * 4 + 2], b33 = b[3 * 4 + 3];
    

    return [
        b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
        b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
        b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,

        b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
        b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
        b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
        b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,

        b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
        b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
        b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
        b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,

        b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
        b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
        b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
        b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ];
  },

  inverse: function(m) {
    let m00 = m[0 * 4 + 0], m01 = m[0 * 4 + 1], m02 = m[0 * 4 + 2], m03 = m[0 * 4 + 3];
    let m10 = m[1 * 4 + 0], m11 = m[1 * 4 + 1], m12 = m[1 * 4 + 2], m13 = m[1 * 4 + 3];
    let m20 = m[2 * 4 + 0], m21 = m[2 * 4 + 1], m22 = m[2 * 4 + 2], m23 = m[2 * 4 + 3];
    let m30 = m[3 * 4 + 0], m31 = m[3 * 4 + 1], m32 = m[3 * 4 + 2], m33 = m[3 * 4 + 3];

    let tmp_0  = m22 * m33, tmp_1  = m32 * m23, tmp_2  = m12 * m33, tmp_3  = m32 * m13;
    let tmp_4  = m12 * m23, tmp_5  = m22 * m13, tmp_6  = m02 * m33, tmp_7  = m32 * m03;
    let tmp_8  = m02 * m23, tmp_9  = m22 * m03, tmp_10 = m02 * m13, tmp_11 = m12 * m03;
    let tmp_12 = m20 * m31, tmp_13 = m30 * m21, tmp_14 = m10 * m31, tmp_15 = m30 * m11;
    let tmp_16 = m10 * m21, tmp_17 = m20 * m11, tmp_18 = m00 * m31, tmp_19 = m30 * m01;
    let tmp_20 = m00 * m21, tmp_21 = m20 * m01, tmp_22 = m00 * m11, tmp_23 = m10 * m01;

    let t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    let t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    let t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    let t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

    let d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

    return [
        d * t0, 
        d * t1, 
        d * t2, 
        d * t3,

        d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
        d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
        d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
        d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),

        d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
        d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
        d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
        d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),

        d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
        d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
        d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
        d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02)),
    ];
  },

  translation: function (tx, ty, tz) {
    return [ 1,  0,  0,  0, 
             0,  1,  0,  0, 
             0,  0,  1,  0, 
            tx, ty, tz,  1];
  },

  xRotation: function (angleInRadians) {
    let c = Math.cos(angleInRadians);
    let s = Math.sin(angleInRadians);

    return [ 1, 0, 0, 0,
             0, c, s, 0,
             0, -s, c, 0,
             0, 0, 0, 1];
  },

  yRotation: function (angleInRadians) {
    let c = Math.cos(angleInRadians);
    let s = Math.sin(angleInRadians);

    return [ c, 0, -s, 0,
             0, 1, 0, 0,
             s, 0, c, 0,
             0, 0, 0, 1];
  },

  zRotation: function (angleInRadians) {
    let c = Math.cos(angleInRadians);
    let s = Math.sin(angleInRadians);

    return [ c, s, 0, 0,
            -s, c, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1];
  },

  scaling: function (sx, sy, sz) {
    return [sx, 0,  0,  0,
             0, sy, 0,  0,
             0, 0,  sz, 0,
             0, 0,  0,  1];
  },

  translate: function (m, tx, ty, tz) {
    return m4.multiply(m, m4.translation(tx, ty, tz));
  },

  xRotate: function (m, angleInRadians) {
    return m4.multiply(m, m4.xRotation(angleInRadians));
  },

  yRotate: function (m, angleInRadians) {
    return m4.multiply(m, m4.yRotation(angleInRadians));
  },

  zRotate: function (m, angleInRadians) {
    return m4.multiply(m, m4.zRotation(angleInRadians));
  },

  rotate: function (m, angleXInRadians, angleYInRadians, angleZInRadians) {
    return m4.multiply(
              m4.multiply(
                 m4.multiply(m, 
                             m4.xRotation(angleXInRadians)), 
                 m4.yRotation(angleYInRadians)), 
              m4.zRotation(angleZInRadians));
  },

  scale: function (m, sx, sy, sz) {
    return m4.multiply(m, m4.scaling(sx, sy, sz));
  },
};