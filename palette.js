var paletteModule = {
  module: null;
  activeTileset: 0,
  tilesets: [], //stored for creation of tilesetsModules
  icons: [], //stored for creation of tilesetsModules
  tilesetModules: [], //holds the tilesetModules
  setActiveTileset: function(event) {
    
  },
  getCurrentSelection: function() { //return: {i,x,y,l,h}
    return activeTileset.getCurrentSelection();
  },
  setTilesets: function(newTilesetsArray, newIconsArray) { //param: [], []
    tilesets = newTilesetsArray;
    icons = newIconsArray;
  },
  render: function() {
    //add new tilesets
    var numTilesets = tilesets.length;
    for(i = 0; i < numTilesets; i++) {
      //if the module doesn't exist, create it
      if(tilesetModules[i] == undefined) {
        
      }
    }
    
    //refresh tabs module
    
  },
  createModule: function() {
    //create tabs
    //create tileset modules
    
  },
};
