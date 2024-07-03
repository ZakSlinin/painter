let canvas = document.getElementById("widgetDrawer");
let ctx = canvas.getContext("2d");
let x = 250;
let y = 250;
let radius = 20;

// import all
const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const white = document.getElementById("white");
const checkRadius = document.getElementById("checkRadius");
const download = document.getElementById("download");
const inputColor = document.getElementById("inputColor");

let color
let paintControl = false;

function drawBG () {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.closePath();
}

function draw () {
    if (paintControl === false) {return}
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

let allColors = [blue, red, green, white]

blue.onclick = function () {color = 'blue';}
red.onclick = function () {color = 'red';}
green.onclick = function () {color = 'green'}
white.onclick = function () {color = 'white'}
inputColor.onchange = function () {color = inputColor.value}

document.addEventListener('keydown', (event) => {
    if(event.keyCode === 32) {ctx.clearRect(0, 0, canvas.width, canvas.height); drawBG()}
})

document.addEventListener('wheel', (event) => {
    console.log(event.deltaY);
        if (event.deltaY < 0) {
            radius = Math.min(radius+1, 50);
            console.log(radius);
        } else {
            radius = Math.max(radius-1, 1);
        }
    console.log(radius);
})

window.addEventListener('wheel', (event) => {
    event.preventDefault();
}, {passive: false})
canvas.addEventListener('mousedown', () => {paintControl = true;})
canvas.addEventListener('mouseup', () => {paintControl = false;})
canvas.addEventListener("mousemove", (event)  => {
    x = event.clientX;
    y = event.clientY;
    const rect = canvas.getBoundingClientRect();
    x -= rect.x;
    y -= rect.y;
})

function checkRadiusFunc () {
    checkRadius.innerText = radius;
}

download.addEventListener('click', (event) => {
    const a = document.createElement("a");
    a.download = 'test.png';
    a.href = canvas.toDataURL('image/png');
    a.click()
})

drawBG();
setInterval(draw, 10);
setInterval(checkRadiusFunc, 30);

