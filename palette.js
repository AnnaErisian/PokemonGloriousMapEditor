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
    this.tilesets = newTilesetsArray;
    this.icons = newIconsArray;
  },
  render: function() {
    console.log("Palette Render");
  
    //add new tilesets
    var numTilesets = this.tilesets.length;
    for(i = 0; i < numTilesets; i++) {
      //if the module doesn't exist in the html, create it
      if(this.tilesetModules[i].module == null) {
        this.tilesetModules[i].render(this);
      }
    }
    
    //refresh tabs module
    this.module.tabs( "refresh" );
  },
  createModule: function() { //called once and only once
    console.log("Palette Create");
    
    //find area
    this.module = $( '#paletteModule' );
    this.tabUL = this.module.find('ul');
    
    //create tileset modules
    var numTilesets = this.tilesets.length;
    for(i = 0; i < numTilesets; i++) {
      this.tilesetModules[i] = createTilesetModule(i, this.tileset[i], this.icons[i]);
    }
  }
};
