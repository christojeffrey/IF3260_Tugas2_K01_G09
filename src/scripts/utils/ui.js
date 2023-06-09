import { degToRad, radToDeg } from "../math/math.js";
import { cs } from "../constant/cs.js";
import { v3 } from "../math/v3.js";
import { m4 } from "../math/m4.js";
import { tessaract, rubic, pyramid } from "../models/model.js";

let state;
let defaultState;

function setupUI(gl) {
  let object = {
    name: "rubic",
    position: rubic.position,
    color: rubic.color,
    normal: rubic.normal,
    center: rubic.center,
  };

  let totalVertices = object.position.length / 3;
  let projection = "orthographic";
  let obliqueAngle = 45;
  let perspectiveFoV = 60;
  let rotation = [degToRad(0), degToRad(0), degToRad(0)];
  let translation = [0, 0, 0];
  let scale = [1, 1, 1];
  let camera = { radius: 10, angle: degToRad(0) };
  let shading = true;
  let animate = false;

  defaultState = {
    object,
    totalVertices,
    projection,
    obliqueAngle,
    perspectiveFoV,
    rotation,
    translation,
    scale,
    camera,
    shading,
    animate,
  };

  state = {
    object: {
      name: defaultState.object.name,
      position: defaultState.object.position,
      color: defaultState.object.color,
      normal: defaultState.object.normal,
      center: defaultState.object.center,
    },
    totalVertices: defaultState.totalVertices,
    projection: defaultState.projection,
    obliqueAngle: defaultState.obliqueAngle,
    perspectiveFoV: defaultState.perspectiveFoV,
    rotation: [...defaultState.rotation],
    translation: [...defaultState.translation],
    scale: [...defaultState.scale],
    camera: {
      radius: defaultState.camera.radius,
      angle: defaultState.camera.angle,
    },
    shading: defaultState.shading,
    animate: defaultState.animate,
  };

  // Set canvas size
  resizeCanvasToDisplaySize(gl.canvas);

  // Left bar listeners
  setupModelListener(state);
  setupAnimationListener(state);
  setupFileListener(state, defaultState);
  setupCanvasListener(state, defaultState);
  setupShadingListener(state);
  setupHelpListener();

  // Right bar listeners
  setupProjectionListener(state);
  setupProjectionMenuListener(state);
  setupTranslateListener(state);
  setupRotationListener(state);
  setupScaleListener(state);
  setupCameraListener(state);

  window.addEventListener("resize", resizeCanvasToDisplaySize(gl.canvas));

  return state;
}

function setupModelListener(state) {
  let modelElmt = document.querySelectorAll("input[name=model]");
  modelElmt.forEach((elmt) => {
    elmt.addEventListener("change", (e) => {
      updateModel(e);
    });
  });

  function updateModel(e) {
    let model = e.target.value;
    switch (model) {
      case "tessaract":
        state.object.name = "tessaract";
        state.object.position = tessaract.position;
        state.object.color = tessaract.color;
        state.object.normal = tessaract.normal;
        state.object.center = tessaract.center;
        state.totalVertices = state.object.position.length / 3;
        break;
      case "rubic":
        state.object.name = "rubic";
        state.object.position = rubic.position;
        state.object.color = rubic.color;
        state.object.normal = rubic.normal;
        state.object.center = rubic.center;
        state.totalVertices = state.object.position.length / 3;
        break;
      case "pyramid":
        state.object.name = "pyramid";
        state.object.position = pyramid.position;
        state.object.color = pyramid.color;
        state.object.normal = pyramid.normal;
        state.object.center = pyramid.center;
        state.totalVertices = state.object.position.length / 3;
        break;
    }
  }
}

function setupFileListener(state, defaultState) {
  let importElmt = document.querySelector("#import");
  importElmt.addEventListener("input", importData);

  let exportElmt = document.querySelector("#export");
  exportElmt.addEventListener("click", exportData);

  function importData() {
    // based on spec, seems like we should turn this off. canvas won't be reseted on import
    // resetCanvas();

    let file = this.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      let data = JSON.parse(e.target.result);
      let modelElmt = document.querySelector(`input[value=${data.name}]`);
      modelElmt.checked = true;
      // Pass data to defaultState
      defaultState.object.name = data.name;
      defaultState.object.position = data.position;
      defaultState.object.color = data.color;

      defaultState.object.normal = [];

      for (let i = 0; i < data.position.length; i += 9) {
        let vec1 = v3.create(data.position[i + 3] - data.position[i], data.position[i + 4] - data.position[i + 1], data.position[i + 5] - data.position[i + 2]);
        let vec2 = v3.create(data.position[i + 6] - data.position[i], data.position[i + 7] - data.position[i + 1], data.position[i + 8] - data.position[i + 2]);
        let normal = v3.cross(vec2, vec1);
        v3.normalize(normal, normal);
        defaultState.object.normal = [...defaultState.object.normal, ...normal, ...normal, ...normal];
      }

      let maxX = Math.max(...data.position.filter((_, i) => i % 3 === 0));
      let minX = Math.min(...data.position.filter((_, i) => i % 3 === 0));
      let maxY = Math.max(...data.position.filter((_, i) => i % 3 === 1));
      let minY = Math.min(...data.position.filter((_, i) => i % 3 === 1));
      let maxZ = Math.max(...data.position.filter((_, i) => i % 3 === 2));
      let minZ = Math.min(...data.position.filter((_, i) => i % 3 === 2));
      defaultState.object.center = [(maxX + minX) / 2, data.name === "pyramid" ? (maxY + minY) / 2 : (maxY + minY) / 2, (maxZ + minZ) / 2];

      defaultState.totalVertices = defaultState.object.position.length / 3;

      // Pass defaultState to state
      state.object.name = defaultState.object.name;
      state.object.position = defaultState.object.position;
      state.object.color = defaultState.object.color;
      state.object.normal = defaultState.object.normal;
      state.object.center = defaultState.object.center;
      state.totalVertices = defaultState.totalVertices;
    };
    reader.readAsText(file);

    let customFileUploadElmt = document.querySelector(".custom-file-upload");
    customFileUploadElmt.innerHTML = file.name;
  }

  function exportData() {
    // Transform position
    let transformedPosition = [];
    for (let i = 0; i < state.object.position.length; i += 3) {
      let vec = v3.create(state.object.position[i], state.object.position[i + 1], state.object.position[i + 2]);
      let transformedVec = m4.multiplyWithV3(m4.transform(state.translation, state.rotation, state.scale, state.object.center), vec);
      transformedVec = transformedVec.slice(0, 3);
      transformedPosition = [...transformedPosition, Math.round(transformedVec[0]), Math.round(transformedVec[1]), Math.round(transformedVec[2])];
    }

    let data = {
      name: state.object.name,
      position: transformedPosition,
      color: state.object.color,
    };
    let json = JSON.stringify(data);
    let blob = new Blob([json], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.download = "data.json";

    a.href = url;
    a.click();
  }
}

function setupCanvasListener(state, defaultState) {
  let clearElmt = document.querySelector("#clear");
  clearElmt.addEventListener("click", clearCanvas);

  let resetElmt = document.querySelector("#reset");
  resetElmt.addEventListener("click", resetCanvas);

  let holding = false;
  let mouse = [0, 0];
  let canvasElmt = document.querySelector("#canvas");
  canvasElmt.addEventListener("mousedown", (e) => {
    if (holding) return;

    holding = true;
    mouse = [e.clientX, e.clientY];
  });
  canvasElmt.addEventListener("mousemove", (e) => {
    if (!holding) return;

    let dx = e.clientX - mouse[0];
    let dy = e.clientY - mouse[1];
    mouse = [e.clientX, e.clientY];

    state.rotation[0] += dy * 0.005;
    state.rotation[1] -= dx * 0.005;

    let degreeX = radToDeg(state.rotation[0]);
    let degreeY = radToDeg(state.rotation[1]);

    if (degreeX < 0) degreeX += 360;
    else if (degreeX > 360) degreeX -= 360;

    if (degreeY < 0) degreeY += 360;
    else if (degreeY > 360) degreeY -= 360;

    state.rotation[0] = degToRad(degreeX);
    state.rotation[1] = degToRad(degreeY);

    document.querySelector("#rotateX").value = parseFloat(degreeX);
    document.querySelector("#rotateY").value = parseFloat(degreeY);

    document.querySelector("#rotateXValue").textContent = Math.round(degreeX);
    document.querySelector("#rotateYValue").textContent = Math.round(degreeY);
  });
  canvasElmt.addEventListener("mouseup", (e) => {
    holding = false;
  });

  function clearCanvas() {
    state.object.name = "none";
    state.object.position = [];
    state.object.color = [];
    state.object.normal = [];
    state.object.center = [];
    state.totalVertices = 0;
  }
}
function resetCanvas() {
  state.object = {
    name: defaultState.object.name,
    position: defaultState.object.position,
    color: defaultState.object.color,
    normal: defaultState.object.normal,
    center: defaultState.object.center,
  };
  state.totalVertices = defaultState.totalVertices;
  state.projection = defaultState.projection;
  state.obliqueAngle = defaultState.obliqueAngle;
  state.perspectiveFoV = defaultState.perspectiveFoV;
  state.rotation = [...defaultState.rotation];
  state.translation = [...defaultState.translation];
  state.scale = [...defaultState.scale];
  state.camera = {
    radius: defaultState.camera.radius,
    angle: defaultState.camera.angle,
  };
  state.shading = defaultState.shading;
  state.animate = defaultState.animate;

  let modelElmt = document.querySelectorAll("input[name=model]");
  for (let i = 0; i < modelElmt.length; i++) {
    if (modelElmt[i].value == state.object.name) {
      modelElmt[i].checked = true;
      break;
    }
  }

  let projectionElmt = document.querySelectorAll("input[name='projection']");
  for (let i = 0; i < projectionElmt.length; i++) {
    if (projectionElmt[i].value == state.projection) {
      projectionElmt[i].checked = true;
      break;
    }
  }

  let translateXElmt = document.querySelector("#translateX");
  translateXElmt.value = state.translation[0];
  let translateYElmt = document.querySelector("#translateY");
  translateYElmt.value = state.translation[1];
  let translateZElmt = document.querySelector("#translateZ");
  translateZElmt.value = state.translation[2];

  let translateXValueELmt = document.querySelector("#translateXValue");
  translateXValueELmt.textContent = state.translation[0];
  let translateYValueELmt = document.querySelector("#translateYValue");
  translateYValueELmt.textContent = state.translation[1];
  let translateZValueELmt = document.querySelector("#translateZValue");
  translateZValueELmt.textContent = state.translation[2];

  let rotateXElmt = document.querySelector("#rotateX");
  rotateXElmt.value = state.rotation[0];
  let rotateYElmt = document.querySelector("#rotateY");
  rotateYElmt.value = state.rotation[1];
  let rotateZElmt = document.querySelector("#rotateZ");
  rotateZElmt.value = state.rotation[2];

  let rotateXValueELmt = document.querySelector("#rotateXValue");
  rotateXValueELmt.textContent = state.rotation[0];
  let rotateYValueELmt = document.querySelector("#rotateYValue");
  rotateYValueELmt.textContent = state.rotation[1];
  let rotateZValueELmt = document.querySelector("#rotateZValue");
  rotateZValueELmt.textContent = state.rotation[2];

  let scaleXElmt = document.querySelector("#scaleX");
  scaleXElmt.value = state.scale[0];
  let scaleYElmt = document.querySelector("#scaleY");
  scaleYElmt.value = state.scale[1];
  let scaleZElmt = document.querySelector("#scaleZ");
  scaleZElmt.value = state.scale[2];

  let scaleXValueELmt = document.querySelector("#scaleXValue");
  scaleXValueELmt.textContent = state.scale[0];
  let scaleYValueELmt = document.querySelector("#scaleYValue");
  scaleYValueELmt.textContent = state.scale[1];
  let scaleZValueELmt = document.querySelector("#scaleZValue");
  scaleZValueELmt.textContent = state.scale[2];

  let radiusElmt = document.querySelector("#radius");
  radiusElmt.value = state.camera.radius;

  let radiusValueElmt = document.querySelector("#radiusValue");
  radiusValueElmt.textContent = state.camera.radius;

  let angleElmt = document.querySelector("#angle");
  angleElmt.value = state.camera.angle;

  let angleValueElmt = document.querySelector("#angleValue");
  angleValueElmt.textContent = state.camera.angle;

  let animateElmt = document.querySelector("#animate");
  animateElmt.checked = state.animate;

  let shadingElmt = document.querySelector("#shading");
  shadingElmt.checked = state.shading;
}

function setupAnimationListener(state) {
  let animationELmt = document.querySelector("#animate");
  animationELmt.addEventListener("change", (e) => {
    updateAnimation(e);
  });

  function updateAnimation(e) {
    state.animate = e.target.checked;
  }
}

function setupShadingListener(state) {
  let shadingElmt = document.querySelector("#shading");
  shadingElmt.addEventListener("change", (e) => {
    updateShading(e);
  });

  function updateShading(e) {
    state.shading = e.target.checked;
  }
}

function setupHelpListener() {
  // onclick open help.html on the same window
  let helpButton = document.querySelector("#help");
  helpButton.addEventListener("click", (e) => {
    window.open("help.html", "_self");
  });
}

function resizeCanvasToDisplaySize(canvas, multiplier) {
  multiplier = multiplier || 1;
  const width = (canvas.clientWidth * multiplier) | 0;
  const height = (canvas.clientHeight * multiplier) | 0;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  cs.set(width, height, 2000);
}

function setupProjectionListener(state) {
  let projectionElmt = document.querySelectorAll("input[name=projection]");
  projectionElmt.forEach((elmt) => {
    elmt.addEventListener("change", (e) => {
      updateProjection(e);
    });
  });

  function updateProjection(e) {
    let projection = e.target.value;
    state.projection = projection;

    let projectionMenuElmt = document.querySelector("h3[name='projectionMenu']");
    projectionMenuElmt.innerHTML = projection[0].toUpperCase() + projection.slice(1);

    let spaceElmt = document.querySelector("#space");
    let obliqueElmt = document.querySelector("#obliqueMenu");
    let perspectiveElmt = document.querySelector("#perspectiveMenu");
    switch (projection) {
      case "orthographic":
        spaceElmt.style.display = "block";

        obliqueElmt.style.display = "none";
        perspectiveElmt.style.display = "none";
        break;
      case "oblique":
        spaceElmt.style.display = "none";

        obliqueElmt.style.display = "inline-block";
        perspectiveElmt.style.display = "none";
        break;
      case "perspective":
        spaceElmt.style.display = "none";

        obliqueElmt.style.display = "none";
        perspectiveElmt.style.display = "inline-block";
        break;
    }
  }
}

function setupProjectionMenuListener(state) {
  let obliqueAngleElmt = document.querySelector("#obliqueAngle");
  obliqueAngleElmt.addEventListener("input", (e) => {
    updateObliqueAngle(e);
  });

  let perspectiveFoVElmt = document.querySelector("#perspectiveFoV");
  perspectiveFoVElmt.addEventListener("input", (e) => {
    updatePerspectiveFoV(e);
  });

  function updateObliqueAngle(e) {
    state.obliqueAngle = e.target.value;

    let obliqueAngleValueElmt = document.querySelector("#obliqueAngleValue");
    obliqueAngleValueElmt.textContent = e.target.value;
  }

  function updatePerspectiveFoV(e) {
    state.perspectiveFoV = e.target.value;

    let perspectiveFoVValueElmt = document.querySelector("#perspectiveFoVValue");
    perspectiveFoVValueElmt.textContent = e.target.value;
  }
}

function setupTranslateListener(state) {
  // set listeners for translateX sliders
  let translateXElmt = document.querySelector("#translateX");
  translateXElmt.min = -(Math.round(cs.width / 1000) * 1000) / 4;
  translateXElmt.max = (Math.round(cs.width / 1000) * 1000) / 4;
  translateXElmt.value = 0;
  translateXElmt.addEventListener("input", (e) => {
    updatePosition(0)(e, { value: e.target.value });
  });

  // set listeners for translateY sliders
  let translateYElmt = document.querySelector("#translateY");
  translateYElmt.min = (-Math.round(cs.height / 1000) * 1000) / 4;
  translateYElmt.max = (Math.round(cs.height / 1000) * 1000) / 4;
  translateYElmt.value = 0;
  translateYElmt.addEventListener("input", (e) => {
    updatePosition(1)(e, { value: e.target.value });
  });

  // set listeners for translateZ sliders
  let translateZElmt = document.querySelector("#translateZ");
  translateZElmt.min = -cs.depth / 8;
  translateZElmt.max = cs.depth / 8;
  translateZElmt.value = 0;
  translateZElmt.addEventListener("input", (e) => {
    updatePosition(2)(e, { value: e.target.value });
  });

  function updatePosition(idx) {
    return function (_, ui) {
      state.translation[idx] = ui.value;
      switch (idx) {
        case 0:
          let translateXValueELmt = document.querySelector("#translateXValue");
          translateXValueELmt.textContent = ui.value;
          translateXElmt.value = ui.value;
          break;
        case 1:
          let translateYValueELmt = document.querySelector("#translateYValue");
          translateYValueELmt.textContent = ui.value;
          translateYElmt.value = ui.value;
          break;
        case 2:
          let translateZValueELmt = document.querySelector("#translateZValue");
          translateZValueELmt.textContent = ui.value;
          translateZElmt.value = ui.value;
          break;
      }
    };
  }
}

function setupRotationListener(state) {
  // set listeners for rotateX sliders
  let rotateXELmt = document.querySelector("#rotateX");
  rotateXELmt.addEventListener("input", (e) => {
    updateRotation(0)(e, { value: e.target.value });
  });

  // set listeners for rotateY sliders
  let rotateYElmt = document.querySelector("#rotateY");
  rotateYElmt.addEventListener("input", (e) => {
    updateRotation(1)(e, { value: e.target.value });
  });

  // set listeners for rotateZ sliders
  let rotateZElmt = document.querySelector("#rotateZ");
  rotateZElmt.addEventListener("input", (e) => {
    updateRotation(2)(e, { value: e.target.value });
  });

  function updateRotation(idx) {
    return function (_, ui) {
      state.rotation[idx] = degToRad(ui.value);
      switch (idx) {
        case 0:
          let rotateXValueELmt = document.querySelector("#rotateXValue");
          rotateXValueELmt.textContent = ui.value;
          rotateXELmt.value = ui.value;
          break;
        case 1:
          let rotateYValueELmt = document.querySelector("#rotateYValue");
          rotateYValueELmt.textContent = ui.value;
          rotateYElmt.value = ui.value;
          break;
        case 2:
          let rotateZValueELmt = document.querySelector("#rotateZValue");
          rotateZValueELmt.textContent = ui.value;
          rotateZElmt.value = ui.value;
          break;
      }
    };
  }
}

function setupScaleListener(state) {
  // set listeners for scaleX sliders
  let scaleXElmt = document.querySelector("#scaleX");
  scaleXElmt.addEventListener("input", (e) => {
    updateScale(0)(e, { value: e.target.value });
  });

  // set listeners for scaleY sliders
  let scaleYElmt = document.querySelector("#scaleY");
  scaleYElmt.addEventListener("input", (e) => {
    updateScale(1)(e, { value: e.target.value });
  });

  // set listeners for scaleZ sliders
  let scaleZElmt = document.querySelector("#scaleZ");
  scaleZElmt.addEventListener("input", (e) => {
    updateScale(2)(e, { value: e.target.value });
  });

  function updateScale(idx) {
    return function (_, ui) {
      state.scale[idx] = ui.value;
      switch (idx) {
        case 0:
          let scaleXValueELmt = document.querySelector("#scaleXValue");
          scaleXValueELmt.textContent = ui.value;
          scaleXElmt.value = ui.value;
          break;
        case 1:
          let scaleYValueELmt = document.querySelector("#scaleYValue");
          scaleYValueELmt.textContent = ui.value;
          scaleYElmt.value = ui.value;
          break;
        case 2:
          let scaleZValueELmt = document.querySelector("#scaleZValue");
          scaleZValueELmt.textContent = ui.value;
          scaleZElmt.value = ui.value;
          break;
      }
    };
  }
}

function setupCameraListener(state) {
  let radiusElmt = document.querySelector("#radius");
  radiusElmt.addEventListener("input", (e) => {
    updateRadius(e, { value: e.target.value });
  });

  let angleElmt = document.querySelector("#angle");
  angleElmt.addEventListener("input", (e) => {
    updateAngle(e, { value: e.target.value });
  });

  function updateRadius(_, ui) {
    state.camera.radius = parseInt(ui.value);
    let radiusValueElmt = document.querySelector("#radiusValue");
    radiusValueElmt.textContent = ui.value;
    radiusElmt.value = ui.value;
  }

  function updateAngle(_, ui) {
    state.camera.angle = degToRad(ui.value);
    let angleValueELmt = document.querySelector("#angleValue");
    angleValueELmt.textContent = ui.value;
    angleElmt.value = ui.value;
  }
}

export { setupUI };
