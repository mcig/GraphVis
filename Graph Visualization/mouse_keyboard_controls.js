let detectedDims = [];

function mouseDragged() {
  //reverse search is used to hold the top-most ball first
  let curr = findNodeByCoord(mouseX, mouseY);
  if (curr) {
    curr.x = mouseX;
    curr.y = mouseY;
  }
}

function keyPressed() {
  if (keyCode === SHIFT) {
    detectedDims.push(mouseX);
    detectedDims.push(mouseY);
    if (detectedDims.length >= 4 && findNodeByCoord(detectedDims[0], detectedDims[1]) &&
      findNodeByCoord(detectedDims[2], detectedDims[3])) {
      let fromIdx = nodeIdxFinder(nodes, findNodeByCoord(detectedDims[0], detectedDims[1]).data);
      let toIdx = nodeIdxFinder(nodes, findNodeByCoord(detectedDims[2], detectedDims[3]).data);
      nodes[fromIdx].connect(nodes[toIdx], int(newEdgeWeightInp.value()));
      for (let i = 0; i < 4; i++) {
        detectedDims.pop();
      }
    }
  }
  else if (keyCode === DELETE && findNodeByCoord(mouseX, mouseY)) {
    let value = findNodeByCoord(mouseX, mouseY).data;
    let idx = nodeIdxFinder(nodes, value);
    deleteNodeOnPress(idx, value.toString());
  }
  else if (keyCode === ENTER) {
    newNodeOnPress(mouseX,mouseY);
  }
}


function findNodeByCoord(coordX, coordY) {
  for (let i = nodes.length - 1; i >= 0; i--) {
    let curr = nodes[i];
    if (dist(coordX, coordY, curr.x, curr.y) < (curr.r + 5)) {
      return curr;
    }
  }
}
