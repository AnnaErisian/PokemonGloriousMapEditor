var layerModule = {
  module: null,
  buttonTemplate: null,
  activeLayer: null,
  setActiveLayer: function(newLayerNumber) {
    this.activeLayer = newLayerNumber;
    console.log('changed active layer: ' + newLayerNumber);
  },
  createModule() {
    console.log("Layer Module Creation");
	this.buttonTemplate = $("#layerButtonTemplate")[0];
  },
  render: function() {
	console.log("Layer Module Render");
    //create html
    this.module = $("#layerModule");
    for(i = 0; i < 5; i++) {
      this.module.append(Mustache.render(this.buttonTemplate.innerHTML, {n: i}));
    }
  },
  registerEvents: function() {
    var buttons = this.module.find(".layerButton");
    
    for(i = 0; i < 5; i++) {
      buttons[i].addEventListener("click", (function() {this.setActiveLayer(i);}).bind(this));
    }
  }
};
