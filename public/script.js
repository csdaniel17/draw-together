var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var socket = io();
var color = 'black';
var thickness = 8;
var mouseDown = false;
var x2;
var y2;

$('#color1').click(function() {
  color = 'red';
});

$('#color2').click(function() {
  color = 'green';
});

$('#color3').click(function() {
  color = 'blue';
});

$('#color4').click(function() {
  color = 'purple';
});

$('#color5').click(function() {
  color = 'black';
});

$('#eraser').click(function() {
  color = 'white';
});

$('#thickness1').click(function() {
  thickness = 5;
});

$('#thickness2').click(function() {
  thickness = 8;
});

$('#thickness3').click(function() {
  thickness = 11;
});

$('#thickness4').click(function() {
  thickness = 15;
});

$('#reset').click(function() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 700, 700);
});

function drawLine(x1, y1, x2, y2, color, thickness) {
  ctx.strokeStyle = color;
  console.log('line 118: color is: ', color);
  ctx.lineJoin = 'round';
  ctx.lineWidth = thickness;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke();
}

//jquery to detect mousedown event
$('canvas').mousedown(function(event){
  mouseDown = true;
});

//jquery to detect mouseup event
$('canvas').mouseup(function(event){
  mouseDown = false;
  x2 = undefined;
  y2 = undefined;
});

socket.on('draw', function(line) {
  drawLine(line.x1, line.y1, line.x2, line.y2, line.color, line.thickness);
});

$('canvas').mousemove(function(event) {
  if (mouseDown) {
    var x1 = event.clientX -= canvas.offsetLeft;
    var y1 = event.clientY -= canvas.offsetTop;

    socket.emit('draw', {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      color: color,
      thickness: thickness
    });

    x2 = x1;
    y2 = y1;
  }
});
