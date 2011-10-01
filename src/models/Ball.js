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
};

Lines.Ball.create = function(color) {
  return new Lines.Ball(color);
};

Lines.Ball.COLORS = ['red', 'green', 'blue'];

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
