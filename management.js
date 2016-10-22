var managementModule = {
  module: null,
  saveButton: null,
  addRowTopButton: null,
  addRowBottomButton: null,
  addColumnLeftButton: null,
  addColumnRightButton: null,
  
  createModule() {
    console.log("Management Module Creation");
  },
  render: function() {
	  console.log("Management Module Render");
    //create html
    $("#managementModule").append('<button type="button" id="saveBtn">Save</button>' + 
                                  '<button type="button" id="addRowTopBtn">Add Row (Top)</button>' + 
                                  '<button type="button" id="addRowBotBtn">Add Row (Bottom)</button>' + 
                                  '<button type="button" id="addColLeftBtn">Add Column (Left)</button>' + 
                                  '<button type="button" id="addColRightBtn">Add Column (Right)</button>');
    this.module = $("#managementModule");
    this.saveButton = $("#saveBtn")[0];
    this.addRowTopButton = $("#addRowTopBtn")[0];
    this.addRowBottomButton = $("#addRowBotBtn")[0];
    this.addColumnLeftButton = $("#addColLeftBtn")[0];
    this.addColumnRightButton = $("#addColRightBtn")[0];
  },
  registerEvents: function() {
    this.saveButton.onclick = "";
    this.addRowTopButton.onclick = function() { mapData.addRowTop(); mapModule.setUpCanvas(); };
    this.addRowBottomButton.onclick = function() { mapData.addRowBot(); mapModule.setUpCanvas(); };
    this.addColumnLeftButton.onclick = function() { mapData.addColLeft(); mapModule.setUpCanvas(); };
    this.addColumnRightButton.onclick = function() { mapData.addColRight(); mapModule.setUpCanvas(); };
  }
};
