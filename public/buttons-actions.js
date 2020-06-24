let selArr = []; //array of Selection Elements

function createDomElements() {
  createGraphButtons();
  //  createAlgoButtons();
  //  createDataIoButtons();
}

function createGraphButtons() {
  $('#newNodeButton').on('click', () => newNodeOnPress(width / 2, height / 2, 'fixThis'));

}

function newNodeOnPress(coordX, coordY, data) {
  let newNode = new Node(coordX, coordY, data);
  nodes.push(newNode);
  $('.nodeSelection').append("<a class='dropdown-item'>" + data + "</a>")
}
