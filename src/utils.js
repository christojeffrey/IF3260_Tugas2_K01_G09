function resizeCanvasToDisplaySize(canvas, multiplier) {
  multiplier = multiplier || 1;
  const width = (canvas.clientWidth * multiplier) | 0;
  const height = (canvas.clientHeight * multiplier) | 0;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

function error(msg) {
  if (topWindow.console) {
    if (topWindow.console.error) {
      topWindow.console.error(msg);
    } else if (topWindow.console.log) {
      topWindow.console.log(msg);
    }
  }
}

function loadShader(gl, shaderSource, shaderType, opt_errorCallback) {
  const errFn = opt_errorCallback || error;
  // Create the shader object
  const shader = gl.createShader(shaderType);

  // Load the shader source
  gl.shaderSource(shader, shaderSource);

  // Compile the shader
  gl.compileShader(shader);

  // Check the compile status
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    // Something went wrong during compilation; get the error
    const lastError = gl.getShaderInfoLog(shader);
    errFn(
      "*** Error compiling shader '" +
        shader +
        "':" +
        lastError +
        `\n` +
        shaderSource
          .split("\n")
          .map((l, i) => `${i + 1}: ${l}`)
          .join("\n")
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
import { vSource, fSource } from "./source.js";

function createVertexShader(gl, opt_errorCallback) {
  return loadShader(gl, vSource, gl.VERTEX_SHADER, opt_errorCallback);
}
function createFragmentShader(gl, opt_errorCallback) {
  return loadShader(gl, fSource, gl.FRAGMENT_SHADER, opt_errorCallback);
}

function createProgram(gl, opt_attribs, opt_locations, opt_errorCallback) {
  const vShader = createVertexShader(gl, opt_errorCallback);
  const fShader = createFragmentShader(gl, opt_errorCallback);

  const shaders = [vShader, fShader];
  const errFn = opt_errorCallback || error;
  const program = gl.createProgram();

  shaders.forEach(function (shader) {
    gl.attachShader(program, shader);
  });

  if (opt_attribs) {
    opt_attribs.forEach(function (attrib, ndx) {
      gl.bindAttribLocation(program, opt_locations ? opt_locations[ndx] : ndx, attrib);
    });
  }
  gl.linkProgram(program);

  // Check the link status
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    // something went wrong with the link
    const lastError = gl.getProgramInfoLog(program);
    errFn("Error in program linking:" + lastError);

    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function radToDeg(r) {
  return (r * 180) / Math.PI;
}

function degToRad(d) {
  return (d * Math.PI) / 180;
}
export { resizeCanvasToDisplaySize, createProgram, radToDeg, degToRad };
