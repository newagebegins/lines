Lines.GameFieldController = function() {
  this.gameField = Lines.GameField.create();
  this.gameFieldView = Lines.GameFieldView.create(this.gameField);
};

Lines.GameFieldController.create = function() {
  return new Lines.GameFieldController();
};

Lines.GameFieldController.prototype.gameStart = function() {
  Lines.Canvas.create();
  
  var _this = this;
  Lines.Canvas.addEventListener('click', function(event) {_this.click(event)});
  
  var ballsGenerator = Lines.BallsGenerator.create(this.gameField);
  ballsGenerator.addNewBallsToGameField(3);
  
  this.gameFieldView.draw();
};

Lines.GameFieldController.prototype.click = function(event) {
  var clickedCellRow = this.getClickedCellRow(event);
  var clickedCellColumn = this.getClickedCellColumn(event);
  var ball = this.gameField.getBallAt(clickedCellRow, clickedCellColumn);
    
  if (ball != null) {
    var ballController = Lines.BallController.create(ball);
    ballController.click();
  }
};

Lines.GameFieldController.prototype.getClickedCellRow = function(event) {
  var clickedRow = Math.floor((event.clientY - event.target.offsetTop) / Lines.GameFieldView.CELL_HEIGHT_PX);
  return clickedRow;
};

Lines.GameFieldController.prototype.getClickedCellColumn = function(event) {
  var clickedColumn = Math.floor((event.clientX - event.target.offsetLeft) / Lines.GameFieldView.CELL_WIDTH_PX);
  return clickedColumn;
};
