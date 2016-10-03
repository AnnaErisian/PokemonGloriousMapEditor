var paletteModule = {
  module: null,
  tabUL: null,
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
    paletteModule.tilesets = newTilesetsArray;
    paletteModule.icons = newIconsArray;
    console.log(newTilesetsArray);
  },
  render: function() {
    console.log("Palette Render");
  
    //add new tilesets
    var numTilesets = paletteModule.tilesets.length;
    for(i = 0; i < numTilesets; i++) {
      //if the module doesn't exist in the html, create it
      if(paletteModule.tilesetModules[i].module == null) {
        paletteModule.tilesetModules[i].render(this);
      }
    }
    
    //refresh tabs module
    paletteModule.module.tabs( "refresh" );
  },
  createModule: function() { //called once and only once
    console.log("Palette Create");
    console.log(this);
    
    //find area
    paletteModule.module = $( '#paletteModule' );
    paletteModule.tabUL = paletteModule.module.find('ul');
    
    //create tileset modules
    var numTilesets = paletteModule.tilesets.length;
    for(i = 0; i < numTilesets; i++) {
      paletteModule.tilesetModules[i] = createTilesetModule(i, paletteModule.tilesets[i], paletteModule.icons[i]);
    }
  }
};
