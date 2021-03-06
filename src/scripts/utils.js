function calcRealFactor(maxReal, minReal, CANVAS_WIDTH) {
  return (maxReal - minReal) / (CANVAS_WIDTH);
}

function calcImaginaryFactor(maxImaginary, minImaginary, CANVAS_HEIGHT) {
  return (maxImaginary - minImaginary) / (CANVAS_HEIGHT);
}

function interpolate(start, end, interpolation) {
  return start + ((end - start) * interpolation);
}

function applyZoom(mouseReal, mouseImaginary, zoomFactor, currentDimens) {
  const newDimens = currentDimens;
  // Create a new zoomed in view rectangle
  const interpolation = 1.0 / zoomFactor;
  newDimens.minReal = interpolate(mouseReal, newDimens.minReal, interpolation);
  newDimens.maxReal = interpolate(mouseReal, newDimens.maxReal, interpolation);
  newDimens.minImaginary = interpolate(mouseImaginary, newDimens.minImaginary, interpolation);
  newDimens.maxImaginary = interpolate(mouseImaginary, newDimens.maxImaginary, interpolation);

  // Center on the mouse click
  const centerReal = (newDimens.minReal + newDimens.maxReal) / 2;
  const centerImaginary = (newDimens.minImaginary + newDimens.maxImaginary) / 2;
  const deltaReal = centerReal - mouseReal;
  const deltaImaginary = centerImaginary - mouseImaginary;

  newDimens.minReal -= deltaReal;
  newDimens.maxReal -= deltaReal;
  newDimens.minImaginary -= deltaImaginary;
  newDimens.maxImaginary -= deltaImaginary;
  return newDimens;
}

function handleZoom(
  event,
  zoomStep, zoomFactor, dimens, CANVAS_WIDTH, CANVAS_HEIGHT, X_OFFSET, Y_OFFSET,
) {
  let newZoomFactor = zoomFactor;
  let currentDimens = dimens;
  event.preventDefault();
  const realFactor = calcRealFactor(
    currentDimens.maxReal,
    currentDimens.minReal,
    CANVAS_WIDTH,
  );
  const imaginaryFactor = calcImaginaryFactor(
    currentDimens.maxImaginary,
    currentDimens.minImaginary,
    CANVAS_HEIGHT,
  );

  const mouseReal = currentDimens.minReal + (event.clientX - X_OFFSET) * realFactor;
  const mouseImaginary = currentDimens.minImaginary + (event.clientY - Y_OFFSET) * imaginaryFactor;
  newZoomFactor *= zoomStep;
  currentDimens = applyZoom(mouseReal, mouseImaginary, newZoomFactor, currentDimens);
  return { currentDimens, zoomFactor };
}

// Handles panning around the image via control buttons
function handlePan(direction, PAN_INCREMENT, dimens) {
  const currentDimens = dimens;
  // Get the min increment to pan by
  const increment = Math.min(
    Math.abs(currentDimens.minImaginary * PAN_INCREMENT),
    Math.abs(currentDimens.maxImaginary * PAN_INCREMENT),
  );
  // Pan object literal for lookup
  const panTypes = {
    0: () => {
      // up
      currentDimens.minImaginary += increment;
      currentDimens.maxImaginary += increment;
    },
    1: () => {
      // right
      currentDimens.minReal -= increment;
      currentDimens.maxReal -= increment;
    },
    2: () => {
      // down
      currentDimens.minImaginary -= increment;
      currentDimens.maxImaginary -= increment;
    },
    3: () => {
      // left
      currentDimens.minReal += increment;
      currentDimens.maxReal += increment;
    },
  };

  const fn = panTypes[direction];
  if (fn) {
    fn();
  } return currentDimens;
}

module.exports = {
  calcRealFactor,
  calcImaginaryFactor,
  handleZoom,
  handlePan,
};

