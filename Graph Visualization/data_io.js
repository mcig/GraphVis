function saveJsonWithCircular(){
  saveJSON(nodes, 'graph.json');
}

function jsonToObject(objArr) {
  //first revive all the nodes then we can continue with connections array
  for (let i in objArr) {
    let newNode = new Node();
    let currObj = objArr[i];
    newNode.x = currObj.x;
    newNode.y = currObj.y;
    newNode.data = currObj.data;
    newNode.r = currObj.r;
    newNode.distance = currObj.distance;
    newNode.prev = currObj.prev;
    nodes.push(newNode);
    addNewSelections(newNode);
    nodeIndexIter++;
  }
  //now the connections
  for (let i in objArr) {
    let currObj = objArr[i];
    let currNode = nodes[nodeIdxFinder(nodes, currObj.data)];
    for (let j in currObj.connections) {
      if (!currObj.connections[j])
        continue;
      let newConnection = new Connection();
      let jsonConnection = currObj.connections[j];
      let nodePointer = nodes[nodeIdxFinder(nodes, jsonConnection.node.data)];
      newConnection.node = nodePointer;
      newConnection.weight = jsonConnection.weight;
      newConnection.colorStr = jsonConnection.colorStr;
      currNode.connections.push(newConnection);
    }
  }
}
