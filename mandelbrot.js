const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;


// Default values for initialization

const MAX_ITERATIONS = 100;
const MAX_WORKERS = 6;
const DEF_MIN_REAL = -2;
const DEF_MAX_REAL = 1.3;
const DEF_MIN_IMAGINARY = -1.4;
const DEF_MAX_IMAGINARY = 1.5;

const currentMinReal = DEF_MIN_REAL;
const currentMaxReal = DEF_MAX_REAL;
const currentMinImaginary = DEF_MIN_IMAGINARY;
const currentMaxImaginary = DEF_MAX_IMAGINARY;

const zoomFactor = 1;

function calcRealFactor(maxReal, minReal) {
  return (maxReal - minReal) / (CANVAS_WIDTH);
}

function calcImaginaryFactor(maxImaginary, minImaginary) {
  return (maxImaginary - minImaginary) / (CANVAS_HEIGHT);
}

function applyZoom(mouseReal, mouseImaginary) {
  // Create a new zoomed in view rectangle
  const interpolation = 1.0 / zoomFactor;
  currentMinReal = interpolate(mouseReal, currentMinReal, interpolation);
  currentMinImaginary = interpolate(mouseImaginary, currentMinImaginary, interpolation);
  currentMaxReal = interpolate(mouseReal, currentMaxReal, interpolation);
  currentMaxImaginary = interpolate(mouseImaginary, currentMaxImaginary, interpolation);

  // Center on the mouse click
  const centerReal = (currentMinReal + currentMaxReal) / 2;
  const centerImaginary = (currentMinImaginary + currentMaxImaginary) / 2;
  const deltaReal = centerReal - mouseReal;
  const deltaImaginary = centerImaginary - mouseImaginary;

  currentMinReal -= deltaReal;
  currentMaxReal -= deltaReal;
  currentMinImaginary -= deltaImaginary;
  currentMaxImaginary -= deltaImaginary;
}

// Set up canvas
const myCanvas = document.getElementById('canvas');
myCanvas.width = CANVAS_WIDTH;
myCanvas.height = CANVAS_HEIGHT;
const X_OFFSET = myCanvas.offsetLeft;
const Y_OFFSET = myCanvas.offsetTop;
const context = myCanvas.getContext('2d');

function drawMandelbrot(minReal, maxReal, minImaginary, maxImaginary) {
  // Correct for aspect ratio
  const ratio = Math.abs(maxReal - minReal) / Math.abs(maxImaginary - minImaginary);
  const sratio = CANVAS_WIDTH / CANVAS_HEIGHT;
  if (sratio > ratio) {
    const xf = sratio / ratio;
    minReal *= xf;
    maxReal *= xf;
  } else {
    const yf = ratio / sratio;
    minImaginary *= yf;
    maxImaginary *= yf;
  }

  // Calculate factors to convert X and Y to real and imaginary components of a compelx number
  const realFactor = calcRealFactor(maxReal, minReal);
  const imaginaryFactor = calcImaginaryFactor(maxImaginary, minImaginary);

  // Create worker threads and have each thread handle one column of data
  for (let x = 0; x < MAX_WORKERS; x++) {
    const worker = new Worker('worker.js');
    worker.postMessage({
      x,
      CANVAS_HEIGHT,
      realFactor,
      imaginaryFactor,
      minReal,
      maxReal,
      minImaginary,
      maxImaginary,
    });
    worker.onmessage = function (e) {
      console.log(e.data.x);
      let currentX = e.data.x;
      // Start work on the column MAX_WORKERS down the axis
      currentX += MAX_WORKERS;
      // If we haven't reached the end of the canvas
      if (currentX < CANVAS_WIDTH) {
        worker.postMessage({
          x: currentX,
          CANVAS_HEIGHT,
          realFactor,
          imaginaryFactor,
          minReal,
          maxReal,
          minImaginary,
          maxImaginary,
        });
      }
    };
  }
}

drawMandelbrot(currentMinReal, currentMaxReal, currentMinImaginary, currentMaxImaginary);
