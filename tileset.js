function createTilesetModule(idNum, image, iconimage) {
  return {
    ready: false,
    tabTemplate: "" + $("#tabTemplate")[0].innerHTML,
    tilesheetTemplate: "" + $("#tilesheetTemplate")[0].innerHTML,
    module: null,
    canvas: null,
    image: null,
    id: idNum,
    tileset: image,
    icon: iconimage,
    currentSelection: null,
    startCoordinates: [-1,-1],
    
    getCurrentSelection: function() { //returns {i,x,y,w,h}
      return {
        id: this.id,
        x: this.currentSelection.x,
        y: this.currentSelection.y,
        w: this.currentSelection.w,
        h: this.currentSelection.h
      };
    },
    
    startSetSelection: function(event) {
      //set startCoords to current coords (32px squares, we want 1-8th square number)
      var coords = getCursorPosition(this.canvas, event);
      this.startCoordinates[0] = Math.floor(coords.x/32);
      this.startCoordinates[1] = Math.floor(coords.y/32);
    },
    
    finishSetSelection: function(event) {
      //if start is -1 -1, leave current and print error
      if(this.startCoordinates[0] == -1 && this.startCoordinates[1] == -1) {
        console.log("finished Set Selection flow without starting coordinates");
        return;
      }
      //otherwise, calculate current selection and reset start coords
      if(event.button == 0) {//left button
        var coords = getCursorPosition(this.canvas, event);
        coords.x = Math.floor(coords.x/32);
        coords.y = Math.floor(coords.y/32);
        this.currentSelection = {
          x: this.startCoordinates[0],
          y: this.startCoordinates[1],
          w: coords.x - this.startCoordinates[0] + 1,
          h: coords.y - this.startCoordinates[1] + 1,
        };
      } else { //right button or any other I guess
        this.currentSelection = {
            x: -1,
            y: 0,
            w: 1,
            h: 1,
          };
      }
      this.startCoordinates = [-1, -1];
      console.log("set these values for currentselection of tileset "+this.id+"\nx: "+this.currentSelection.x+"\ny: "+this.currentSelection.y+"\nw: "+this.currentSelection.w+"\nh: " + this.currentSelection.h);
    },
    
    terminateSetSelection: function(event) {
      this.startCoordinates = [-1, -1];
    },
    
    render: function(parent) {
      console.log("Tileset Render");
      
      //create html
      var renderedTab = Mustache.render(tabTemplate.innerHTML, {iconImg: this.icon, n: this.id});
      var renderedSheet = Mustache.render(tilesheetTemplate.innerHTML, {n: this.id});
      
      parent.tabUL.append(renderedTab);
      parent.module.append(renderedSheet);
      
      var tabVar = parent.module.find("#tabs-"+this.id);
      var tabHeadVar = parent.module.find("#tabHead-"+this.id);
      
      this.canvas = tabVar.find("canvas")[0];
      this.module = {tabHead: tabHeadVar[0], tab: tabVar[0]};
      
      this.image = new Image();
      
      //load image, then continue when done
      this.image = new Image();
      this.image.callAfterLoading = this.drawImageToCanvas.bind(this);
      this.image.canvas = this.canvas;
      
      this.image.onload = function() {
        //prepare canvas
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.callAfterLoading();
      }
      
      this.image.src = this.tileset;
    },
    registerEvents: function() {
      this.canvas.addEventListener("mousedown",  (function(event) { this.startSetSelection(event); }).bind(this));
      this.canvas.addEventListener("mouseup",    (function(event) { this.finishSetSelection(event); }).bind(this));
      this.canvas.addEventListener("mouseleave", (function(event) { this.terminateSetSelection(event); }).bind(this));
    },
    drawImageToCanvas: function() {
      var ctx = this.canvas.getContext("2d");
      
      var tilesDown   = Math.floor(this.image.height / 32)
      var tilesAcross = Math.floor(this.image.width / 32)
      
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      for(var i = 0; i < tilesDown; i++) {
        for(var j = 0; j < tilesAcross; j++) {
          //ctx.drawImage(image,    sx,   sy,   sWidth, sHeight, dx,   dy,   dWidth, dHeight);
          ctx.drawImage(this.image, i*32, j*32, 32,     32,      i*33, j*33, 32,     32);
          }
        }
      }
      this.ready = true;
      mapModule.drawCanvasIfReady();
    }
  };
}
