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
    var numTilesets = tilesets.length;
    for(i = 0; i < numTilesets; i++) {
      //if the module doesn't exist in the html, create it
      if(tilesetModules[i].module == null) {
        tilesetModules[i].render(this);
      }
    }
    
    //refresh tabs module
    module.tabs( "refresh" );
  },
  createModule: function() { //called once and only once
    console.log("Palette Create");
    console.log(this);
    
    //find area
    module = $( '#paletteModule' );
    tabUL = module.find('ul');
    
    //create tileset modules
    var numTilesets = tilesets.length;
    for(i = 0; i < numTilesets; i++) {
      tilesetModules[i] = createTilesetModule(i, tileset[i], icons[i]);
    }
  }
};
