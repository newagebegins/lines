Lines.Ball = function(color) {
  if (Lines.Ball.COLORS.indexOf(color) === -1) {
    throw new Error('Incorrect color.');
  }
  
  /** @private */
  this.row = undefined;
  /** @private */
  this.column = undefined;
  /** @private */
  this.color = color;
  /** @private */
  this.gameField = undefined;
};

Lines.Ball.create = function(color) {
  return new Lines.Ball(color);
};

Lines.Ball.COLORS = ['red', 'green', 'blue'];

Lines.Ball.selectedBall = null;

Lines.Ball.getSelectedBall = function() {
  return Lines.Ball.selectedBall;
};

Lines.Ball.prototype.getRow = function() {
  return this.row;
};

Lines.Ball.prototype.setRow = function(row) {
  this.row = row;
};

Lines.Ball.prototype.getColumn = function() {
  return this.column;
};

Lines.Ball.prototype.setColumn = function(column) {
  this.column = column;
};

Lines.Ball.prototype.getColor = function() {
  return this.color;
};

Lines.Ball.prototype.setGameField = function(gameField) {
  this.gameField = gameField;
};


Lines.Ball.prototype.moveTo = function(row, column) {
  if (this.canMoveTo(row, column)) {
    this.gameField.removeBallAt(this.getRow(), this.getColumn());
    this.gameField.placeBallAt(this, row, column);
  }  
};

Lines.Ball.prototype.canMoveTo = function(goalRow, goalColumn) {
  var path = this.getPathTo(goalRow, goalColumn);
  var goalCanBeReached = path.length > 0;
  return goalCanBeReached;
};

Lines.Ball.prototype.getPathTo = function(goalRow, goalColumn) {
  var start = [this.getColumn(), this.getRow()];
  var end = [goalColumn, goalRow];
  var grid = this.gameField.generateGrid();
  var path = AStar(grid, start, end);
  return path;
};

Lines.Ball.prototype.isSelected = function() {
  return Lines.Ball.getSelectedBall() == this;
};

Lines.Ball.prototype.select = function() {
  Lines.Ball.selectedBall = this;
};

Lines.Ball.prototype.unselect = function() {
  if (this.isSelected()) {
    Lines.Ball.selectedBall = null;
  }  
};
