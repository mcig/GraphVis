//Dijkstra Vol 1 Somehow works
// function Dijkstra(nodesArr, keyNode, retObj) {
//   //used the wikipedia's algorithm
//   //src = https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
//   //the variables are deeply explained there
//   let Q = []; //set of nodes
//   let dist = []; //distances of each node to key node
//   let prev = []; //the previous element of the current element via shortest path
//   let idxKeyNode = nodeIdxFinder(nodesArr, keyNode);
//
//   for (let node of nodesArr) {
//     dist.push(Infinity);
//     prev.push(NaN);
//     Q.push(node);
//   }
//   dist[idxKeyNode] = 0;
//   prev[idxKeyNode] = idxKeyNode;
//   let distManipulate = [...dist];
//
//   //Solve the Q and node index bug
//   while (Q.length) {
//     let idxU = idxOfMin(distManipulate) % Q.length;
//     let u = Q[idxU];
//
//     let connectionsArr = u.connections;
//     Q.splice(idxU, 1);
//     distManipulate[idxU] = Infinity;
//
//     for (let i = 0; i < connectionsArr.length; i++) {
//       let currConnection = connectionsArr[i];
//       let v = currConnection.node;
//       let idxV = nodeIdxFinder(nodesArr, v.data);
//
//       let alt = dist[idxU] + currConnection.weight;
//       if (alt < dist[idxV]) {
//         dist[idxV] = alt;
//         distManipulate[idxV] = alt;
//         prev[idxV] = u.data;
//       }
//     }
//     retObj.table = retObj.table.concat("Node " + u.data + " distances: " + dist + '<br>');
//   }
//   retObj.path = retObj.path.concat(prev);
// }
//
// function idxOfMin(arr) {
//   let min = arr[0],
//     idx = 0,
//     i = 1;
//   for (; i < arr.length; i++) {
//     if (arr[i] < min) {
//       min = arr[i];
//       idx = i;
//     }
//   }
//   return idx;
// }




//**********************************************************//
//Dijkstra Vol 2 Infinite Loop Error
// function Dijkstra(nodes, key, retObj) {
//   //used the wikipedia's algorithm
//   //src = https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
//   //the variables are deeply explained there
//   let Q = [];
//   let dist = [];
//   let prev = [];
//   let idxMap = [];
//   for (let node of nodes) {
//     dist.push(Infinity);
//     prev.push(NaN);
//     idxMap.push(0);
//     Q.push(node);
//   }
//   dist[nodeIdxFinder(nodes, key)] = 0;
//   while (Q.length) {
//     let u, idxU;
//
//
//     Q.splice(idxU, 1);
//
//     for (connection of u.connections) {
//       if (!isInsideArray(connection.node, Q))
//         continue;
//       let alt = dist[idxU] + connection.weight;
//       let idxV = nodeIdxFinder(connection.node);
//       if (alt < dist[idxV]) {
//         dist[idxV] = alt;
//         prev[idxV] = u.data;
//       }
//     }
//     retObj.table = retObj.table.concat("Node " + u.data +
//       " distances: " + dist + '<br>');
//   }
//   retObj.path = retObj.path.concat(prev);
// }
//
// function minIdxFinder(arr,map) {
//   let min = arr[0],
//     i = 1,
//     idx = 0;
//   for (; i < arr.length; i++) {
//     if (arr[i] < min) {
//       min = arr[i];
//       idx = i;
//     }
//   }
//   if(map[i]==1)
//     return -1;
//   return idx;
// }
//
// function isInsideArray(keyNode, nodeArray) {
//   let isInside = 0;
//   for (node of nodeArray) {
//     if (keyNode.data == node.data) {
//       isInside = 1;
//     }
//   }
//   return isInside;
// }
//
// function mapAllTicked(map){
//   let allTicked = 1;
//   for (let val of map){
//     if(val == 0)
//       allTicked = 0;
//   }
//   return allTicked;
// }


//Dijkstra Vol 3 with Priority Queue Somehow works
// function dijkstraForAllNodes(nodes,key,retObj) {
//   let dist = [];
//   let prev = [];
//   let Q = new PriorityQueue();
//
//   for (let node of nodes) {
//    dist.push(Infinity);
//    prev.push(NaN);
//    Q.queue(node);
//   }
//   dist[key] = 0;
//   prev[key] = key;
//
//   while (Q.length) {
//     let u = Q.dequeue();
//     console.log(u);
//     let connectionsArr = u.connections;
//
//     for (let connection of connectionsArr) {
//         let v = connection.node;
//
//         let alt = dist[u.data] + connection.weight;
//         if (alt < dist[v.data]) {
//           dist[v.data] = alt;
//           prev[v.data] = u.data;
//         }
//       }
//       retObj.table = retObj.table.concat("Distances: " + dist + '<br>');
//   }
//   retObj.path = retObj.path.concat(prev);
// }
