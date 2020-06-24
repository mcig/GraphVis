let nodes = [];

const pink = "#C21E56";
const green = "#00E600";
const white = "#FFFFFF";
const backgroundColor = 80;

function setup() {
  let myCanvas = createCanvas(900,400);
  myCanvas.parent(canvasJumbotron);
  myCanvas.width = $('#canvasJumbotron')[0].clientWidth;
  createDomElements();
}

function draw() {
  background(backgroundColor);
  stroke(white);
  strokeWeight(3);
  for (let node of nodes)
    node.appear();
}
