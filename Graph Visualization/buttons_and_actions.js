let selArr = []; //array of Selection Elements

function createDomElements() {
  createGraphButtons();
  createAlgoButtons();
}

function createGraphButtons() {
  const strNewNode = "New Draggable Node";
  const strDeleteNode = "Delete Node!!!";
  const strNewEdge = "Submit New Edge!";
  const strDeleteEdge = "Delete Edge!!!";

  let txtUnWeightWeight = createDiv("Unweighted/Weighted: ");
  txtUnWeightWeight.position(0, height + 80);

  weightSlider = createSlider(0, 1, 1, 1);
  weightSlider.position(txtUnWeightWeight.x +
    textWidth("Unweighted/Weighted: "), height + 80);

  //For Nodes
  newNodeButton = createButton(strNewNode);
  newNodeButton.position(0, height + 10);
  newNodeButton.mousePressed(() => newNodeOnPress(width / 2, height / 2));

  let txtNode = createDiv("Node to delete: ");
  txtNode.position(newNodeButton.x +
    textWidth(strNewNode) + 40, height + 10);

  deleteNodeSel = createSelect();
  deleteNodeSel.position(txtNode.x + textWidth("Node 2 delete: "), height + 11);

  selArr.push(deleteNodeSel);

  deleteNodeButton = createButton(strDeleteNode);
  deleteNodeButton.position(deleteNodeSel.x + 50, height + 10);
  deleteNodeButton.mousePressed(() => {
    let value = deleteNodeSel.value();
    let deleteNodeIdx = nodeIdxFinder(nodes,value);
    deleteNodeOnPress(deleteNodeIdx,value);
  });


  //For Edges
  let txtFrom = createDiv("From Node: ");
  txtFrom.position(0, height + 50);

  newEdgeFromSel = createSelect();
  newEdgeFromSel.position(txtFrom.x + textWidth("From Node: "), height + 50);

  selArr.push(newEdgeFromSel);


  let txtTo = createDiv("To Node: ");
  txtTo.position(newEdgeFromSel.x + 35, height + 50);

  newEdgeToSel = createSelect();
  newEdgeToSel.position(txtTo.x + textWidth("To Node: "), height + 50);

  selArr.push(newEdgeToSel);

  let txtWeight = createDiv("With weight: ");
  txtWeight.position(newEdgeToSel.x + 35, height + 50);

  newEdgeWeightInp = createInput();
  newEdgeWeightInp.size(50);
  newEdgeWeightInp.position(txtWeight.x + textWidth("With weight: "), height + 50);

  newEdgeButton = createButton(strNewEdge);
  newEdgeButton.position(newEdgeWeightInp.x + 65, height + 49);
  newEdgeButton.mousePressed(newEdgeOnPress);

  deleteEdgeButton = createButton(strDeleteEdge);
  deleteEdgeButton.position(newEdgeButton.x +
    textWidth(strNewEdge) + 5, height + 49);
  deleteEdgeButton.mousePressed(deleteEdgeOnPress);
}

function createAlgoButtons() {
  let retObj = new ReturnObj();
  let txtPath = createDiv(),
    txtTable = createDiv();
  dijkstraButton = createButton("Dijkstra From Node: ");
  dijkstraButton.position(width + 10, 10);
  dijkstraButton.mousePressed(() => {
    retObj.path = "";
    retObj.table = "";
    dijkstraForAllNodes(nodes, dijkstraSel.value(), retObj);
    createTableAndPath(dijkstraButton, txtPath, txtTable, retObj);
  });

  dijkstraSel = createSelect();
  dijkstraSel.position(dijkstraButton.x + textWidth("Dijkstra From Node: "), 10);
  selArr.push(dijkstraSel);
}

function createTableAndPath(posObject, txtPath, txtTable, retObj) {
  txtPath.html("Path: " + '<br>' + retObj.path);
  txtPath.position(posObject.x, posObject.y + 30);
  txtTable.html("Table: " + '<br>' + retObj.table);
  txtTable.position(posObject.x, posObject.y + 70);
}

//Node Actions
function newNodeOnPress(coordX,coordY) {
  let newNode = new Node(coordX, coordY, nodeIndexIter);
  nodeIndexIter++;
  nodes.push(newNode);
  addNewSelections(newNode);
}

function addNewSelections(node) {
  for (sel of selArr)
    sel.option(node.data.toString());
}

function deleteNodeOnPress(idx,value) {
  if (idx != -1) {
    clearIndirectEdges(nodes[i]);
    nodes.splice(idx, 1);
    for (sel of selArr)
      sel.disable(value);
  }
}

function clearIndirectEdges(keyNode) {
  for (let node of nodes) {
    for (let i = 0; i < node.connections.length; i++) {
      if (node.connections[i].node == keyNode) {
        node.connections.splice(i, 1);
        i--;
      }
    }
  }
}

function newEdgeOnPress() {
  let fromVal = newEdgeFromSel.value();
  let toVal = newEdgeToSel.value();
  let weightVal = int(newEdgeWeightInp.value());
  let fromIdx = nodeIdxFinder(nodes, fromVal);
  let toIdx = nodeIdxFinder(nodes, toVal);
  nodes[fromIdx].connect(nodes[toIdx], weightVal);
}

function deleteEdgeOnPress() {
  let fromVal = newEdgeFromSel.value();
  let fromIdx = nodeIdxFinder(nodes, fromVal);
  let toVal = newEdgeToSel.value();
  let toIdx = nodeIdxFinder(nodes, toVal);
  if (fromIdx != -1 && toIdx != -1) { //if indexes are valid
    for (let i = 0; i < nodes[fromIdx].connections.length; i++) {
      if (nodes[fromIdx].connections[i].node == nodes[toIdx]) {
        nodes[fromIdx].connections.splice(i, 1);
        break;
      }
    }
  }
}

function nodeIdxFinder(nodesArr, key) {
  //will become handy when generic data is stored
  for (i = 0; i < nodesArr.length; i++) {
    if (nodesArr[i].data == key)
      return i;
  }
  return -1;
}