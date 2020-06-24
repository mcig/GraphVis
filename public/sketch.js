let nodes = [];
let txtSize = 15;

const pink = "#C21E56";
const green = "#00E600";
const white = "#FFFFFF";
const backgroundColor = 80;

function setup() {
  let canvas = createCanvas(1200, 800);
  canvas.parent("canvasContainer")
  textSize(txtSize);
  createDomElements();
}

function draw() {
  background(backgroundColor);
  stroke(white);
  strokeWeight(3);
  for (let node of nodes)
    node.appear();
}
