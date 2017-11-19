// for specifics: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

// configure the canvas
let canvasElement = document.getElementById('canvas');
let canvas = canvasElement.getContext("2d");
const WIDTH = 640;
const HEIGHT = 480;

// create a ref to the audio context
let audioContext = new (window.AudioContext || window.webkitAudioContext)();

// create the audio source from the audio html element
let element = document.querySelector('audio');
let source = audioContext.createMediaElementSource(element);

// connect the source to the output node, so we can hear the songs
source.connect(audioContext.destination);

// create the audio analyser node and connect it to the audio source
let analyser = audioContext.createAnalyser();
analyser.smoothingTimeConstant = 0;
analyser.fftSize = 1024; // should be a power of two and approximate WIDTH * 2
source.connect(analyser);

// create an array to store the audio data points
var bufferLength = analyser.frequencyBinCount;
var audioData = new Uint8Array(bufferLength);

/**
 * Clear function to reset the drawing board
 */
function clearCanvas(canvas, audioData) {
    canvas.fillStyle = 'rgb(0, 0, 0)';
    canvas.fillRect(0, 0, WIDTH, HEIGHT);
}

/**
 * Background colour function
 */
function renderBackground(canvas, audioData, r, g, b) {
    canvas.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    canvas.fillRect(0, 0, WIDTH, HEIGHT);
}

/**
 * Function to draw a simple oscillator line
 */
function renderSuperscope(canvas, audioData) {
    // configure the line we're going to draw and begin a path with it
    canvas.lineWidth = 2;
    canvas.strokeStyle = 'rgb(0, 0, 0)';
    canvas.beginPath();

    let sliceWidth = WIDTH / bufferLength;
    let xs = 0;

    for (let i = 0; i < bufferLength; i++) {
        let v = audioData[i] / 128.0;
        let ys = v * HEIGHT / 2;

        let xi = (xs / WIDTH) * 2 - 1;
        let yi = (ys / HEIGHT) * 2 - 1;

        // transformation (rotate by 90 degrees)
        let degrees = degreesToRadians(element.currentTime * 10);

        xt = (xi * Math.cos(degrees)) - (yi * Math.sin(degrees));
        yt = (xi * Math.sin(degrees)) + (yi * Math.cos(degrees));
        // end of transformation

        x = (xt + 1) / 2 * WIDTH;
        y = (yt + 1) / 2 * HEIGHT;

        if(i === 0) {
            canvas.moveTo(x, y);
        } else {
            canvas.lineTo(x, y);
        }

        xs += sliceWidth;
    }

    canvas.stroke();
}

/**
 * Function to draw simple frequency bars
 */
function renderBars(canvas, audioData) {
    let barWidth = (WIDTH / bufferLength) * 50;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = audioData[i] * 3;

        canvas.fillStyle = 'rgb(0, 0, 0)';
        canvas.fillRect(x, HEIGHT - (barHeight / 3), barWidth, barHeight);

        x += barWidth + 1;
    }
}

function transformFadeOut(canvas, audioData, fadeSpeed) {
    let lastImage = canvas.getImageData(0, 0, WIDTH, HEIGHT);
    let pixelData = lastImage.data;

    for (let i = 0; i < pixelData.length; i += 1) {
        pixelData[i] -= fadeSpeed;
    }

    canvas.putImageData(lastImage, 0, 0);
}

let effects = [];
effects.push({fn: renderSuperscope, args: []});
effects.push({fn: transformFadeOut, args: [8]});

// main rendering function
function draw() {
    // keep looping draw once it has been started using requestAnimationFrame
    requestAnimationFrame(draw);

    // copy audio data from the analyser node into our prepared array
    analyser.getByteTimeDomainData(audioData);

    // render the list of effects
    for (let i = 0; i < effects.length; i++) {
        effects[i].fn(canvas, audioData, ...effects[i].args);
    }
}

draw();

// helper functions
function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function radiansToDegrees(radians) {
    return radians * 180 / Math.PI;
}