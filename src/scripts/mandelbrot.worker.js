function drawLine(data) {
  const points = [];
  for (let y = 0; y < data.CANVAS_HEIGHT; y++) {
    const cReal = data.minReal + data.x * data.realFactor;
    const cImaginary = data.minImaginary + y * data.imaginaryFactor;

    let zReal = 0;
    let zImaginary = 0;
    let iterations = 0;

    while (zReal * zReal + zImaginary * zImaginary <= data.options.escapeRadius && iterations < data.options.iterations) {
      const nextZReal = zReal * zReal - zImaginary * zImaginary + cReal;
      const nextZImaginary = 2 * zReal * zImaginary + cImaginary;
      zReal = nextZReal;
      zImaginary = nextZImaginary;
      iterations++;
    }

    if (iterations === data.options.iterations) {
      points.push({
        y,
        fillStyle: 'black',
      });
    } else {
      const z = Math.sqrt(zReal * zReal + zImaginary * zImaginary);
      // Create smooth color transitions
      const smoothed = Math.log(Math.log(z) * 1 / Math.log(2)) * 1 / Math.log(2);
      const colorI = parseInt((Math.sqrt(iterations + 1 - smoothed) * 256 - 250) % data.colorArray.length, 10);
      const color = data.colorArray[colorI];
      points.push({
        y,
        fillStyle: color,
      });
    }
  }
  postMessage({
    x: data.x,
    points,
  });
}

function receiveMessage(event) {
  drawLine(event.data);
}

onmessage = receiveMessage;

