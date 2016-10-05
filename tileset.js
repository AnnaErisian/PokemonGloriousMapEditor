function createTilesetModule(idNum, image, iconimage) {
  return {
    tabTemplate: $("#tabTemplate").html(),
    tilesheetTemplate: $("#tilesheetTemplate").html(),
    module: null,
    canvas: null,
    id: idNum,
    tileset: image,
    icon: iconimage,
    currentSelection: null,
    startCoordinates: [-1,-1],
    
    getCurrentSelection: function() { //returns {i,x,y,l,h}
      return {
        i: id,
        x: currentSelection.x,
        y: currentSelection.y,
        l: currentSelection.l,
        h: currentSelection.h
      };
    },
    
    startSetSelection: function(event) {
      //set startCoords to current coords (32px squares, we want 1-8th square number)
      var coords = getCursorPosition(canvas, event);
      this.startCoordinates[0] = coords.x/32;
      this.startCoordinates[1] = coords.y/32;
    },
    
    finishSetSelection: function(event) {
      //if start is -1 -1, leave current and print error
      if(this.startCoordinates[0] == -1 && this.startCoordinates[1] == -1) {
        console.log("finished Set Selection flow without starting coordinates");
        return;
      }
      //otherwise, calculate current selection and reset start coords
      var coords = getCursorPosition(this.canvas, this.event);
      coords.x = coords.x/32;
      coords.y = coords.y/32;
      this.currentSelection = {
        x: coords.x,
        y: coords.y,
        w: coords.x - startCoordinates[0],
        h: coords.y - startCoordinates[1],
      };
      this.startCoordinates = [-1, -1];
    },
    
    terminateSetSelection: function(event) {
      this.startCoordinates = [-1, -1];
    },
    
    render: function(parent) {
      console.log("Tileset Render");
      
      //create html
      console.log(tabTemplate);
      parent.tabUL.innerHTML += Mustache.render(tabTemplate, {iconImg: this.icon, n: this.id});
      parent.module.innerHTML += Mustache.render(tilesheetTemplate, {n: this.id});
      this.module = {tabHead: parent.module.find("#tabHead-"+id), tab: parent.module.find("tabs-"+id)};
      this.canvas = module.tab.find("canvas");
    }
  };
}
