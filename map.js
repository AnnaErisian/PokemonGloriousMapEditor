var mapModule = {
  module: null,
  canvas: null,
  startCoordinates: [-1,-1],
  
  startSetSelection: function(event) {
    //set startCoords to current coords (32px squares, we want 1-8th square number)
    var coords = getCursorPosition(this.canvas, event);
    this.startCoordinates[0] = Math.floor(coords.x/32);
    this.startCoordinates[1] = Math.floor(coords.y/32);
    
    console.log("start with " + this.startCoordinates[0] + ", " + this.startCoordinates[1] + ".");
  },
  
  finishSetSelection: function(event) {
    //if start is -1 -1, leave current and print error
    if(this.startCoordinates[0] == -1 && this.startCoordinates[1] == -1) {
      console.log("finished Set Selection flow without starting coordinates");
      return;
    }
    //otherwise, calculate current selection and reset start coords
    var coords = getCursorPosition(this.canvas, event);
    coords.x = Math.floor(coords.x/32);
    coords.y = Math.floor(coords.y/32);
    
    //Set data
    var w = coords.x - this.startCoordinates[0] + 1;
    var h = coords.y - this.startCoordinates[1] + 1;
    
    //reverse if necessary
    if(w < 1) { this.startCoordinates[0] = coords.x; h++; }
    if(h < 1) { this.startCoordinates[1] = coords.y; w++; }
    
    mapData.setRect(this.startCoordinates[0], this.startCoordinates[1], w, h);
    
    console.log("finish with " + coords.x + ", " + coords.y + ".");

    console.log("map draw with these coords: \nx: "+this.startCoordinates[0]+"\ny: "+this.startCoordinates[0]+"\nw: "+w+"\nh: " + h);

    this.startCoordinates = [-1, -1];
    
    this.drawCanvas();
    
  },
  
  terminateSetSelection: function(event) {
    this.startCoordinates = [-1, -1];
  },
  
  createModule(data) {
    console.log("Map Creation");
    mapData.init(data);
  },
  render: function(parent) {
    console.log("Map Render");
    //create html
    $("#canvasModule").append("<canvas></canvas>");
    this.module = $("#canvasModule");
    this.canvas = this.module.find("canvas")[0];
    this.drawCanvasIfReady();
    this.setUpCanvas()
  },
  registerEvents: function() {
    this.canvas.addEventListener("mousedown",  (function(event) { this.startSetSelection(event); }).bind(this));
    this.canvas.addEventListener("mouseup",    (function(event) { this.finishSetSelection(event); }).bind(this));
    this.canvas.addEventListener("mouseleave", (function(event) { this.terminateSetSelection(event); }).bind(this));
  },
  setUpCanvas: function() {
    this.canvas.width = mapData.tileData.length * 32;
    this.canvas.height = mapData.tileData[0].length * 32;
  },
  drawCanvasIfReady: function() {
    for(var i = 0; i < paletteModule.tilesetModules.length; i++) {
      if(!paletteModule.tilesetModules[i].ready)
        return;
    }
    this.drawCanvas();
  },
  drawCanvas: function() {
    var ts = mapData.tileData;
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(var i = 0; i < ts.length; i++) {
      for(var j = 0; j < ts[0].length; j++) {
        var tile = ts[i][j];
        for(var l = 0; l < 5; l++) {
          if(tile.data[l][0] != -1) {
            var img = paletteModule.tilesetModules[tile.data[l][0]].image;
            var x = tile.data[l][1] % 8;
            var y = Math.floor(tile.data[l][1] / 8);
            //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            ctx.drawImage(img, x*32, y*32, 32, 32, i*32, j*32, 32, 32);
          }
        }
      }
    }
  }
};
