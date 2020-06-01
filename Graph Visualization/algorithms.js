//Dijkstra Vol 3 Somehow works
function dijkstraForAllNodes(nodes,key,retObj) {
  let Q = [];
  for (let node of nodes) {
    node.distance = Infinity;
    node.prev = NaN;
   Q.push(node);
  }
  let keyIdx = nodeIdxFinder(Q,key);
  Q[keyIdx].distance = 0;
  Q[keyIdx].prev = Q[keyIdx];

  while (Q.length) {
    let txtDist = "";
    let u = minElement(Q);
    let connectionsArr = u.connections;
    findRemove(Q,u);

    console.log(u);
    console.log(Q);

    for (let connection of connectionsArr) {
        let v = connection.node;

        let alt = u.distance + connection.weight;
        if (alt < v.distance) {
          v.distance = alt;
          v.prev = u;
        }
    }
    for(let node of nodes)
      txtDist += node.distance.toString() + " ";
    retObj.table = retObj.table.concat("Node: " + u.data +" Distances: " + txtDist + '<br>');
  }
  for(let node of nodes)
    retObj.path = retObj.path.concat(node.prev.data + " ");
}

function minElement(nodeArr){
  let retNode = nodeArr[0];
  for(let node of nodeArr){
    if(node.distance<retNode.distance){
      retNode = node;
    }
  }
  return retNode;
}

function findRemove(nodeArr,node){
  for (let i=0; i<nodeArr.length;i++){
    if(nodeArr[i]===node){
      nodeArr.splice(i,1);
      return;
    }
  }
}
