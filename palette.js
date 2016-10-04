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
    return this.tilesetModules[activeTileset].getCurrentSelection();
  },
  setTilesets: function(newTilesetsArray, newIconsArray) { //param: [], []
    this.tilesets = newTilesetsArray;
    this.icons = newIconsArray;
    console.log(newTilesetsArray);
  },
  render: function() {
    console.log("Palette Render");
  
    //add new tilesets
    var numTilesets = this.paletteModule.tilesets.length;
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
    console.log(this);
    
    //find area
    this.module = $( '#paletteModule' );
    this.tabUL = paletteModule.module.find('ul');
    
    //create tileset modules
    var numTilesets = paletteModule.tilesets.length;
    for(i = 0; i < numTilesets; i++) {
      this.tilesetModules[i] = createTilesetModule(i, this.tilesets[i], this.icons[i]);
    }
  }
};
