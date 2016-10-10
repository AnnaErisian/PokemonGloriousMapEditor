var layerModule = {
  module: null,
  activeLayer: null,
  setActiveLayer: function(newLayerNumber) {
    this.activeLayer = newLayerNumber;
    console.log('changed active layer: ' + newLayerNumber);
  },
  createModule() {
    console.log("Layer Module Creation");
  },
  render: function() {
	console.log("Layer Module Render");
    //create html
    this.module = $("#layerModule");
    for(i = 0; i < 5; i++) {
      this.module.append('<span class="layerButton" id="layerButton-' + i + '" ><img src="img/ui/layerImage-' + i + '" alt="layer-' + i + '.png" /></span>');
    }
  },
  registerEvents: function() {
    var buttons = this.module.find(".layerButton");
    
    for(i = 0; i < 5; i++) {
      buttons[i].addEventListener("click", (function() {this.setActiveLayer(i);}).bind(this));
    }
  }
};
