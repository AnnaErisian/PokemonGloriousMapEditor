function createTileset(id, image) {
  return {
    module: null;
    id: 0,
    tileset: null,
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
    },
    
    finishSetSelection: function(event) {
      //if start is -1 -1, null current and print error
      //otherwise, calculate current selection and reset start coords
    },
    terminateSetSelection: function(event) {
      startCoordinates = [-1, -1];
    },
    setTileset: function(data) {
      tileset = data;
    },
    render: function() {
      //create html
      //call parent's render
    },
    createModule: function() {
      //set data
    }
  };
}
