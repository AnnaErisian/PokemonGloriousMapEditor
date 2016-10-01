var paletteModule = {
  activeTileset: 0,
  tilesets: [],
  icons: [],
  void setActiveTileset()
  getCurrentSelection(): function() { //return: {i,x,y,l,h}
    return activeTileset.getCurrentSelection();
  },
  setTilesets(): function(newTilesetsArray, newIconsArray) { //param: [], []
    tilesets = newTilesetsArray;
    icons = newIconsArray;
  },
  render(): function() {
    //refresh tabs and render tileset modules
  },
  createModule(): function() {
    //create tabs and create tileset modules
  }
};
