function createDomElements() {
  createGraphButtons();
  createAlgoButtons();
  //createDataIoButtons();
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

  // kruskalButton = createButton("Kruskal's MST");
  // kruskalButton.position(dijkstraButton.x, dijkstraButton.y+30);
  // kruskalButton.mousePressed(() => kruskal_mst(nodes));
}

function createTableAndPath(posObject, txtPath, txtTable, retObj) {
  txtPath.html("Path: " + '<br>' + retObj.path);
  txtPath.position(posObject.x, posObject.y + 30);
  txtTable.html("Table: " + '<br>' + retObj.table);
  txtTable.position(posObject.x, txtPath.y + 80);
}

function createDataIoButtons() {
  //Much Thanks Daniel Shiffman(aka The Coding Train),
  //for this amazing drag drop json trick and the whole p5 lessons :D
  dropHereBox = select("#dropHereBox");
  dropHereBox.dragOver(() => highlightUnhighlight(1));
  dropHereBox.dragLeave(() => highlightUnhighlight(0));
  dropHereBox.drop((jsonGraph) => {
    loadJSON(jsonGraph.data, (obj) => {
      jsonToObject(obj);
    });
  }, () => highlightUnhighlight(0));

  function highlightUnhighlight(highlight_bool) {
    if (highlight_bool)
      dropHereBox.style("background-color", "#ccc");
    else
      dropHereBox.style("background-color", "transparent");
  }

  dataDownloadButton = createButton("Download Graph");
  dataDownloadButton.position(deleteNodeButton.x + 430, deleteNodeButton.y);
  dataDownloadButton.mousePressed(() => {
    saveJsonWithCircular();
  });
}


//Node Actions


function addNewSelections(node) {
  for (sel of selArr)
    sel.option(node.data.toString());
}



function clearIndirectEdges(keyNode) {
  for (let node of nodes)
    for (let i = 0; i < node.connections.length; i++)
      if (node.connections[i].node == keyNode) {
        node.connections.splice(i, 1);
        i--;
      }
}

function newEdgeOnPress() {
  let fromVal = newEdgeFromSel.value();
  let toVal = newEdgeToSel.value();
  let weightVal = int(newEdgeWeightInp.value());
  if (!weightVal)
    weightVal = 0;
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

function nodeIdxFinder(nodesArr, keyVal) {
  //will become handy when generic data is stored
  for (i = 0; i < nodesArr.length; i++) {
    if (nodesArr[i].data == keyVal)
      return i;
  }
  return -1;
}
