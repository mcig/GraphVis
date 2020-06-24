function dijkstraForAllNodes(globalArr, key, retObj) {
  let Q = [];
  let nodes = [...globalArr];

  for (let node of nodes) {
    node.distance = Infinity;
    node.prev = NaN;
    Q.push(node);
  }

  let keyIdx = nodeIdxFinder(Q, key);
  Q[keyIdx].distance = 0;
  Q[keyIdx].prev = Q[keyIdx];

  while (Q.length) {
    let txtDist = "";
    let u = minElement(Q);
    let connectionsArr = u.connections;
    findRemove(Q, u);
    for (let connection of connectionsArr) {
      let v = connection.node;

      let alt = u.distance + connection.weight;
      if (alt < v.distance) {
        v.distance = alt;
        v.prev = u;
      }
    }
    for (let node of nodes)
      txtDist += node.distance.toString() + " ";
    retObj.table = retObj.table.concat("Node " + u.data + " Distances: " + txtDist + '<br>');
  }
  for (let node of nodes)
    retObj.path = retObj.path.concat("Node " + node.data + "," + node.prev.data + " ");
}

function minElement(nodeArr) {
  let retNode = nodeArr[0];
  for (let node of nodeArr) {
    if (node.distance < retNode.distance) {
      retNode = node;
    }
  }
  return retNode;
}

function findRemove(nodeArr, node) {
  for (let i = 0; i < nodeArr.length; i++) {
    if (nodeArr[i] === node) {
      nodeArr.splice(i, 1);
      return;
    }
  }
}

// function kruskal_mst(globalArr) {
//   // 1. Sort all the edges in non-decreasing order of their weight.
//   // 2. Pick the smallest edge. Check if it forms a cycle with the spanning tree formed so far.
//   // If cycle is not formed, include this edge. Else, discard it.
//   // 3. Repeat step#2 until there are (V-1) edges in the spanning tree.
//
//   let edges = [];
//   for (let node of globalArr) {
//     for (let connection of node.connections) {
//       edges.push();
//     }
//   }
//   edges = edges.sort((a, b) => {
//     if (a.weight > b.weight)
//       return 1;
//     else
//       retu
//   });
//
//   paintEdges(mst, pink);
// }



function prims_mst(globalArr) {
  // check geeks by geeks for additional Info;
  //src = https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/;
  let mst = [];
  let nodes = [...globalArr];
  //As our node class already has an attribute called distance
  //We will use it instead of creating a new attribute called key
  for (let node of nodes) {
    node.distance = Infinity;
  }
  nodes[0].distance = 0;

  while (mst.length != nodes.length) {
    let u = minElement(nodes);
    if (mst.includes(u)) {
      nodes.splice(nodeIdxFinder(nodes, u.data), 1);
      continue;
    }
    mst.push(u);
    for (connection of u.connections) {
      if (connection.weight < connection.node.distance)
        connection.distance = connection.weight;
    }
  }
  paintEdges(mst, pink);
}

function paintEdges(nodeArr, color) {
  for (let node of nodeArr) {
    for (let connection of node.connections) {
      connection.colorStr = color;
    }
  }
}
