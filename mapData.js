var mapData = {
  tileData: null, //column major
  addRowTop: function() {
    var numCols = tileData.length;
    for(i = 0; i < numCols; i++) {
      this.tileData[i].unshift(new tile());
    }
  },
  addRowBot: function() {
    var numCols = tileData.length;
    for(i = 0; i < numCols; i++) {
      this.tileData[i].push(new tile());
    }
  },
  addColLeft: function() {
    var numRows = tileData[0].length;
    this.tileData.unshift(new Array(numRows));

    for(i = 0; i < numRows; i++) {
      this.tileData[0][i] = new tile();
    }
  },
  addColRight: function() {
    var numRows = tileData[0].length;
    this.tileData.push(new Array(numRows));

    var numCols = tileData.length;
    for(i = 0; i < numRows; i++) {
      this.tileData[numCols][i] = new tile();
    }
  },
  init: function(data) {
    console.log(data);
  },
  setRect: function(x, y, l, h, layer) {
    for(i = x; i < x+l; i++) {
      for(j = y; j < y+h; j++) {
        //TODO
      }
    }
  },
  getTile: function(x, y, layer) {
    return tileData[x][y].getID(layer);
  }
};
