const width = 500;
const height = 500;

const gridWidth = 10;
const gridHeight = 10;

const framerate = 10;

const maxColor = 0;

let canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;
document.body.appendChild(canvas);

let ctx = canvas.getContext('2d');
let mouseY, mouseX;

let previousRect = {
    x: 0,
    y: 0
};

ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, width, height);

let stateBank = {};

function drawColors () {
    const red = 255;
    const green = 255;
    const blue = 255;

    const x = Math.floor(mouseX / gridWidth) * gridWidth;
    const y = Math.floor(mouseY / gridHeight) * gridHeight;

    if (x !== previousRect.x || y !== previousRect.y) {
        stateBank[`${previousRect.x}-${previousRect.y}`] = fade(previousRect.x, previousRect.y);
    }

    previousRect.x = x;
    previousRect.y = y;

    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    ctx.fillRect(x, y, gridWidth, gridHeight);
    clearInterval(stateBank[`${x}-${y}`]);
}

function fade (x, y) {
    let steps = 100;
    let currentShade = 255;
    const stepSize = currentShade / steps;

    const interval = setInterval(() => {
        if (!steps) { 
            clearInterval(interval);
            currentShade = 0;
        } else {
            currentShade = Math.round(currentShade - stepSize);
        }
        
        ctx.fillStyle = `rgb(${currentShade}, ${currentShade}, ${currentShade})`;
        ctx.fillRect(x, y, gridWidth, gridHeight);
        steps--;
    }, framerate);

    return interval;
}

canvas.addEventListener('mousemove', (e) => {
    ({mouseX, mouseY} = getMousePos(canvas, e));
    drawColors();
});

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      mouseX: evt.clientX - rect.left,
      mouseY: evt.clientY - rect.top
    };
}
