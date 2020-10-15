class ReturnObj {
  constructor() {
    this.path = "";
    this.table = "";
  }
}

class Connection {
  constructor(node, weight = 0, colorStr = NaN) {
    this.node = node;
    this.weight = weight;
    this.colorStr = colorStr;
  }
}

class Node {
  constructor(x, y, data) {
    this.x = x;
    this.y = y;
    this.data = data;
    this.r = textWidth(this.data) + txtSize;
    this.connections = [];
    this.distance = Infinity;
    this.prev = NaN;
  }

  connect(node, weight = 0) {
    if (node != this) {
      let tmp = new Connection(node, weight);
      this.connections.push(tmp);
    }
  }

  appear(r = this.r) {
    //Draw connections
    for (let connection of this.connections) {
      if (connection.colorStr) //will be used while algorithms are implemented
        stroke(connection.colorStr);
      /*
      //Homing Triangle Stuff
      let middleX = (this.x + connection.node.x) / 2;
      let middleY = (this.y + connection.node.y) / 2;
      //find the radian
      let angle = atan2(connection.node.y - this.y, connection.node.x - this.x);
      push();
      // move to central position
      translate(middleX, middleY);
      // rotate from translated position
      rotate(angle);
      // render triangle
      triangle(0, 5, 5, 0, 0, -5);
      pop();
      line(this.x, this.y, connection.node.x, connection.node.y);
      */
      drawLinkWithTriangle(this,connection.node);
      if (weightSlider.value()) //weighted unweighted check
        text(connection.weight, middleX, middleY - 10);
    }
    //Draw node
    stroke(white);
    ellipse(this.x, this.y, 2 * r);
    text(this.data, this.x - txtSize / 5, this.y);
  }
}

function drawLinkWithTriangle(from,to,color = white){
  stroke(color);
  //Homing Triangle Stuff
  let middleX = (from.x + to.x) / 2;
  let middleY = (from.y + to.y) / 2;
  //find the radian
  let angle = atan2(to.y - from.y, to.x - from.x);
  push();
  // move to central position
  translate(middleX, middleY);
  // rotate from translated position
  rotate(angle);
  // render triangle
  triangle(0, 5, 5, 0, 0, -5);
  pop();
  line(from.x, from.y, to.x, to.y);
}
