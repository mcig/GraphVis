let nodes = [];
let counter = 0;
const pink = "#C21E56";
const green = "#00E600";
const white = "#FFFFFF";
const backgroundColor = 80;

function setup() {
  let myCanvas = createCanvas(1050, 800);
  myCanvas.parent(canvasJumbotron);
  createDomElements();
}

function draw() {
  background(backgroundColor);
  stroke(white);
  strokeWeight(3);
  for (let node of nodes)
    node.appear();
}
