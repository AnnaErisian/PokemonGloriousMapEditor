var paletteModule = {
  module: null,
  tabUL: null,
  activeTileset: 0,
  tilesetURIs: [], //stored for creation of tilesetsModules
  icons: [], //stored for creation of tilesetsModules
  tilesetModules: [], //holds the tilesetModules
  setActiveTileset: function(event) {
    
  },
  getCurrentSelection: function() { //return: {i,x,y,l,h}
    return this.tilesetModules[activeTileset].getCurrentSelection();
  },
  setTilesets: function(newTilesetsArray, newIconsArray) { //param: [], []
    this.tilesetURIs = newTilesetsArray;
    this.icons = newIconsArray;
    console.log(newTilesetsArray);
  },
  render: function() {
    console.log("Palette Render");
  
    //add new tilesets
    var numTilesets = this.tilesetURIs.length;
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
    var numTilesets = this.tilesetURIs.length;
    for(i = 0; i < numTilesets; i++) {
      this.tilesetModules[i] = createTilesetModule(i, this.tilesetURIs[i], this.icons[i]);
    }
    
    this.module.tabs();
    
  },
  registerEvents: function() {
    var numTilesets = this.tilesetURIs.length;
    for(i = 0; i < numTilesets; i++) {
      this.tilesetModules[i].registerEvents();
    }
  }
};
