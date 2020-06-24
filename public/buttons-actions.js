let selArr = []; //array of Selection Elements
let txtSize = 15;
function createDomElements() {
  createGraphButtons();
  //  createAlgoButtons();
  //  createDataIoButtons();
}

function createGraphButtons() {
  //New Node
  $('#newNodeButton').on('click', () => newNodeOnPress(width / 2, height / 2, 'fixThis'));
  //Delete Node
  let deleteValue = NaN;
  $('.deleteNodeSelection').on('click',()=>{
    deleteValue = $(this).text();
  });
  
  $('#deleteNodeButton').on('click', () => {
    let deleteNodeIdx = nodeIdxFinder(nodes, deleteValue);
    deleteNodeOnPress(deleteNodeIdx, deleteValue);
  });
}

function newNodeOnPress(coordX, coordY, data) {
  let newNode = new Node(coordX, coordY, data);
  nodes.push(newNode);
  $('.nodeSelection').append("<a class='dropdown-item'>" + data + "</a>")
}



function deleteNodeOnPress(idx, value) {
  if (idx != -1) {
    clearIndirectEdges(nodes[i]);
    nodes.splice(idx, 1);
    for (sel of selArr)
      sel.disable(value);
  }
}
