let detectedDims = [];

function mouseDragged() {
  if(mouseX>width||mouseX<0||mouseY>height||mouseY<0)
    return;

  //reverse search is used to hold the top-most ball first
  let currNode = findNodeByCoord(mouseX, mouseY);
  if (currNode) {
    currNode.x = mouseX;
    currNode.y = mouseY;
  }
}

function keyPressed() {
  //TODO: solve the first click is missed bug

  //quick brake if we are out of bounds
  if(mouseX>width||mouseX<0||mouseY>height||mouseY<0)
    return;
  switch(keyCode){
    case(SHIFT):
      detectedDims.push(mouseX);
      detectedDims.push(mouseY);
      //basicaly we store the last 2 if they are valid
      //and if they are all valid we draw a connection
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
      break;
    case(DELETE):
      if(!findNodeByCoord(mouseX, mouseY))
        break;
      let value = findNodeByCoord(mouseX, mouseY).data;
      let idx = nodeIdxFinder(nodes, value);
      deleteNodeOnPress(idx,value);
      break;
    case(ENTER):
      newNodeOnPress(mouseX, mouseY,counter);
      break;
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
