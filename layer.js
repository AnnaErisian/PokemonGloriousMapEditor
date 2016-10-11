var layerModule = {
  module: null,
  buttonTemplate: null,
  activeLayer: null,
  setActiveLayer: function(newLayerNumber) {
    this.activeLayer = newLayerNumber;
    console.log('changed active layer: ' + newLayerNumber);
  },
  glowActiveLayer: function() {
    var buttons = this.module.find(".layerButton");
    buttons.css('box-shadow', 'none');
    buttons[this.activeLayer].style.boxShadow = "0px 0px 5px white";
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
    
    buttons[0].addEventListener("click", function() {
      layerModule.setActiveLayer(0); //passing is wierd.
      layerModule.glowActiveLayer();
    });
    buttons[1].addEventListener("click", function() {
      layerModule.setActiveLayer(1); //passing is wierd.
      layerModule.glowActiveLayer();
    });
    buttons[2].addEventListener("click", function() {
      layerModule.setActiveLayer(2); //passing is wierd.
      layerModule.glowActiveLayer();
    });
    buttons[3].addEventListener("click", function() {
      layerModule.setActiveLayer(3); //passing is wierd.
      layerModule.glowActiveLayer();
    });
    buttons[4].addEventListener("click", function() {
      layerModule.setActiveLayer(4); //passing is wierd.
      layerModule.glowActiveLayer();
    });
  }
};
