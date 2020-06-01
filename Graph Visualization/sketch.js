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
  // alert("You can use 'Enter' and 'Delete' to create or delete a node at mouse position!" +
  // " Additionally, use the 'Shift' key to create an edge between nodes!"+ " For that first hover over on a node and press 'Shift'."
  //     +" Then, hover over the want-to-connect node then press it again." + " This will take the entered data from the input box 'Weight'" +
  //      " and create and edge for you." + " Cha cha real smooth!");
  createDomElements();
}

function draw() {
  background(backgroundColor);
  stroke(white);
  strokeWeight(3);
  for (let node of nodes)
    node.appear();
}
