function dijkstraForAllNodes(globalArr,key,retObj) {
  let Q = [];
  let nodes = [...globalArr];

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
    retObj.table = retObj.table.concat("Node " + u.data +" Distances: " + txtDist + '<br>');
  }
  for(let node of nodes)
    retObj.path = retObj.path.concat("Node " + node.data + "," + node.prev.data + " ");
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

function prims_mst(globalArr,retObj){
  // check geeks by geeks for additional Info;
  //src = https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/;
  // 1) Create a set mstSet that keeps track of vertices already included in MST.
  // 2) Assign a key value to all vertices in the input graph.
  // Initialize all key values as INFINITE.
  // Assign key value as 0 for the first vertex so that it is picked first.
  // 3) While mstSet doesn’t include all vertices
  // ….a) Pick a vertex u which is not there in mstSet and has minimum key value.
  // ….b) Include u to mstSet.
  // ….c) Update key value of all adjacent vertices of u.
  //  To update the key values, iterate through all adjacent vertices.
  //  For every adjacent of v, if weight of edge u-v is less than the previous key value of v,
  //   update the key value as weight of u-v

  // let mst = [];
  // let nodes = [...globalArr];
  // //As our node class already has an attribute called distance we will use it
  // //instead of creating a new attribute called key
  // for(let node of nodes){
  //   node.distance = Infinity;
  // }
  // nodes[0].distance = 0;
  //
  // while(mst.length!=nodes.length){
  //   let u = minElement(Q);
  //   findRemove(Q,u);
  // }
}
