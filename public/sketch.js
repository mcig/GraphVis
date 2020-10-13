let nodes = [];
let nodeIndexIter = 0;
let txtSize = 15;

const pink = "#C21E56";
const green = "#00E600";
const white = "#FFFFFF";
const backgroundColor = 80;

function setup() {
  createCanvas(1200, 800);
  textSize(txtSize);
  createDomElements();
  let info = createDiv(`ENTER: Create Node<br>DELETE: Delete Hovered Node<br>DOUBLE CLICK: Change The Hovered Node's Data<br>SHIFT: Create and Edge Between Nodes(First press shift on first, then on second)<br><br>`);
  info.position(0,height + 110)
}

function draw() {
  background(backgroundColor);
  stroke(white);
  strokeWeight(3);
  for (let node of nodes)
    node.appear();
}
