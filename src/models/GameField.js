Lines.GameField = function() {
  /** @private */
  this.rowsCount = 10;
  /** @private */
  this.columnsCount = 10;
};

Lines.GameField.create = function() {
  return new Lines.GameField();
};

Lines.GameField.prototype.getRowsCount = function() {
  return this.rowsCount;
};

Lines.GameField.prototype.getColumnsCount = function() {
  return this.columnsCount;
};
