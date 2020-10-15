let nodes = [];
let nodeIndexIter = 0;
let txtSize = 15;
let startX ,startY;

const pink = "#f44a84";
const green = "#00E600";
const white = "#FFFFFF";
const backgroundColor = 80;

function setup() {
  createCanvas(1200, 800);
  textSize(txtSize);
  createDomElements();
  let how2 = createDiv("HOW TO USE:");
  how2.style("font-size:22px;font-weight:900");
  how2.position(0,height + 110);
  let info = createDiv(`ENTER: Create Node<br>DELETE: Delete Hovered Node<br>DOUBLE CLICK: Change The Hovered Node's Data<br>SHIFT: Create and Edge Between Nodes(First press shift on first, then on second)<br>LEFT CTRL: Pointer From Mouse Start<br><br>`);
  info.position(0,how2.y + 25);
  info.style("color:"+pink+";font-weight:600;");
}

function draw() {
  background(backgroundColor);
  stroke(white);
  strokeWeight(3);
  for (let node of nodes)
    node.appear();
  if(keyIsDown(17)){
    drawLinkWithTriangle({x:startX,y:startY},{x:mouseX,y:mouseY},pink);
  }
}
