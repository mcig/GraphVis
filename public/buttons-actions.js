let selArr = []; //array of Selection Elements
let txtSize = 15;
let deleteVal = NaN;//delete node selected jquery obj
function createDomElements() {
  createGraphButtons();
  //  createAlgoButtons();
  //  createDataIoButtons();
}

function createGraphButtons() {
  //New Node
  $('#newNodeButton').on('click', () => newNodeOnPress(width / 2, height / 2, counter));
  //Delete Node

  $('.deleteNodeSelection').on('click',(e)=>{
    deleteVal = $(e)[0].target.text;
  });

  $('#deleteNodeButton').on('click', () => {
    if(!deleteVal){//error printing
      $("#underCanvas").append("<div class='alert alert-danger popUpAlert'>"
        + "You haven't selected any nodes" + "</div>");
      $(".popUpAlert").fadeOut(3000,()=>$(".popUpAlert").remove());
    }
    let deleteNodeIdx = nodeIdxFinder(nodes, deleteVal);
    deleteNodeOnPress(deleteNodeIdx, deleteVal);
  });
}

function newNodeOnPress(coordX, coordY, data) {
  let newNode = new Node(coordX, coordY, data);
  nodes.push(newNode);
  counter++;
  $('.deleteNodeSelection').append("<a id='Node_"+data+"' class='dropdown-item'>" + data + "</a>")
}

function deleteNodeOnPress(idx, value) {
  if (idx == -1)
    return;
  clearIndirectEdges(nodes[i]);
  nodes.splice(idx, 1);
  $('#Node_'+value).remove();
  deleteVal = NaN;
}
