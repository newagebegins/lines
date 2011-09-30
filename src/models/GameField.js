Lines.GameField = function() {
  /** @private */
  this.rowsCount = 10;
  /** @private */
  this.columnsCount = 10;
};

Lines.GameField.prototype.getRowsCount = function() {
  return this.rowsCount;
};

Lines.GameField.prototype.getColumnsCount = function() {
  return this.columnsCount;
};
