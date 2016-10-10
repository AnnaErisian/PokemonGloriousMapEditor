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
    
    buttons[0].addEventListener("click", (function() {
      this.setActiveLayer(0); //passing is wierd.
    }).bind(this));
    buttons[1].addEventListener("click", (function() {
      this.setActiveLayer(1); //passing is wierd.
    }).bind(this));
    buttons[2].addEventListener("click", (function() {
      this.setActiveLayer(2); //passing is wierd.
    }).bind(this));
    buttons[3].addEventListener("click", (function() {
      this.setActiveLayer(3); //passing is wierd.
    }).bind(this));
    buttons[4].addEventListener("click", (function() {
      this.setActiveLayer(4); //passing is wierd.
    }).bind(this));
  }
};
