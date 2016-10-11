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
  
    var numCols = data.length;
    var numRows;
    if(numCols == 0) {
    
      this.tileData = new Array(8);
      for(i = 0; i < 8; i++) {
        this.tileData[i] = new Array(8);
        for(j = 0; j < 8; j++) {
          this.tileData[i][j] = new tile();
        }
      }
      
      return;
      
    } else {
      numRows = data[0].length;
      
      this.tileData = new Array(numCols);
      for(i = 0; i < numCols; i++) {
        this.tileData[i] = new Array(numRows);
        for(j = 0; j < numRows; j++) {
          console.log(i + ", " + j);
          this.tileData[i][j] = new tile(data[i][j]);
        }
      }
    }
    
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

class tile {
  constructor(data) {
    if(arguments.length > 0) {
      var e = data.split("|");
      this.data = new Array(5);
      for(i = 0; i < 5; i++) {
        this.data[i] = e[i];
      }
      this.text = e[5];
    } else {
      this.data = new Array(5);
      this.text = "";
    }
  }
  
  getID(layer) {
    return data[layer];
  }
}
