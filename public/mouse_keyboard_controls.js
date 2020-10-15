let detectedDims = [];

function mouseDragged() {
  //reverse search is used to hold the top-most ball first
  let curr = findNodeByCoord(mouseX, mouseY);
  if (curr) {
    curr.x = mouseX;
    curr.y = mouseY;
  }
}

function doubleClicked() {
  let curr = findNodeByCoord(mouseX, mouseY);
  if (!curr)
    return;
  if (dataInput.value())
    curr.data = dataInput.value();
}

function keyPressed() {
  //// TODO: solve the first click is missed bug

  if (mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0)
    return;

  if (keyCode === SHIFT) {
    detectedDims.push(mouseX);
    detectedDims.push(mouseY);
    //basicaly we store the last 2 if they are valid
    //and if they are all valid ve draw a connection
    if (detectedDims.length >= 4 && findNodeByCoord(detectedDims[0], detectedDims[1]) && //this is just spaghetti
      findNodeByCoord(detectedDims[2], detectedDims[3])) {
      let fromIdx = nodeIdxFinder(nodes, findNodeByCoord(detectedDims[0], detectedDims[1]).data);
      let toIdx = nodeIdxFinder(nodes, findNodeByCoord(detectedDims[2], detectedDims[3]).data);
      let weightVal = int(newEdgeWeightInp.value());
      if (!weightVal)
        weightVal = 0;
      nodes[fromIdx].connect(nodes[toIdx], weightVal);
      for (let i = 0; i < 4; i++) {
        detectedDims.pop();
      }
    } else if (detectedDims.length >= 4) { //the second click is missed
      for (let i = 0; i < 4; i++)
        detectedDims.splice(2, 2);
    }
  } else if (keyCode === DELETE && findNodeByCoord(mouseX, mouseY)) {
    let value = findNodeByCoord(mouseX, mouseY).data;
    let idx = nodeIdxFinder(nodes, value);
    deleteNodeOnPress(idx, value.toString());
  } else if (keyCode === ENTER) {
    newNodeOnPress(mouseX, mouseY);
  }else if(keyCode === 17){
    startX = mouseX;
    startY = mouseY;
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
