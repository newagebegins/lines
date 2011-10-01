Lines.Ball = function() {
  /** @private */
  this.row = undefined;
  /** @private */
  this.column = undefined;
};

Lines.Ball.create = function() {
  return new Lines.Ball();
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
