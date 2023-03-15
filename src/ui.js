function setupSlider(selector, options) {
  let parent = document.querySelector(selector);
  if (!parent) {
    // like jquery don't fail on a bad selector
    return;
  }
  if (!options.name) {
    options.name = selector.substring(1);
  }
  return createSlider(parent, options); // eslint-disable-line
}
function getQueryParams() {
  let params = {};
  if (window.hackedParams) {
    Object.keys(window.hackedParams).forEach(function (key) {
      params[key] = window.hackedParams[key];
    });
  }
  if (window.location.search) {
    window.location.search
      .substring(1)
      .split("&")
      .forEach(function (pair) {
        let keyValue = pair.split("=").map(function (kv) {
          return decodeURIComponent(kv);
        });
        params[keyValue[0]] = keyValue[1];
      });
  }
  return params;
}
function createSlider(parent, options) {
  let gopt = getQueryParams();
  let precision = options.precision || 0;
  let min = options.min || 0;
  let step = options.step || 1;
  let value = options.value || 0;
  let max = options.max || 1;
  let fn = options.slide;
  let name = gopt["ui-" + options.name] || options.name;
  let uiPrecision = options.uiPrecision === undefined ? precision : options.uiPrecision;
  let uiMult = options.uiMult || 1;

  min /= step;
  max /= step;
  value /= step;

  parent.innerHTML = `
        <div class="gman-widget-outer">
          <div class="gman-widget-label">${name}</div>
          <div class="gman-widget-value"></div>
          <input class="gman-widget-slider" type="range" min="${min}" max="${max}" value="${value}" />
        </div>
      `;
  let valueElem = parent.querySelector(".gman-widget-value");
  let sliderElem = parent.querySelector(".gman-widget-slider");

  function updateValue(value) {
    valueElem.textContent = (value * step * uiMult).toFixed(uiPrecision);
  }

  updateValue(value);

  function handleChange(event) {
    let value = parseInt(event.target.value);
    updateValue(value);
    fn(event, { value: value * step });
  }

  sliderElem.addEventListener("input", handleChange);
  sliderElem.addEventListener("change", handleChange);

  return {
    elem: parent,
    updateValue: (v) => {
      v /= step;
      sliderElem.value = v;
      updateValue(v);
    },
  };
}

export { setupSlider, createSlider };