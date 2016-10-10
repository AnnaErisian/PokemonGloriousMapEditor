var mapModule = {
  module: null,
  canvas: null,
  mapData: null,
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
    
    console.log("finish with " + coords.x + ", " + coords.y + ".");
    
    this.startCoordinates = [-1, -1];
    
  },
  
  terminateSetSelection: function(event) {
    this.startCoordinates = [-1, -1];
  },
  
  createModule(data) {
    console.log("Map Creation");
//    mapData = createData(data); NOT YET IMPLEMENTED
  },
  render: function(parent) {
    console.log("Map Render");
    //create html
    $("#canvasModule").append("<canvas></canvas>");
    this.module = $("#canvasModule");
    this.canvas = this.module.find("canvas")[0];
  },
  registerEvents: function() {
    this.canvas.addEventListener("mousedown",  (function(event) { this.startSetSelection(event); }).bind(this));
    this.canvas.addEventListener("mouseup",    (function(event) { this.finishSetSelection(event); }).bind(this));
    this.canvas.addEventListener("mouseleave", (function(event) { this.terminateSetSelection(event); }).bind(this));
  }
};
