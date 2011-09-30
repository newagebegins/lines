Lines.GameField = function(rowsCount, columnsCount) {
  /** @private */
  this.rowsCount = rowsCount;
  /** @private */
  this.columnsCount = columnsCount;
  /** @private */
  this.cells = this.createEmptyCells();
};

Lines.GameField.create = function(rowsCount, columnsCount) {
  return new Lines.GameField(rowsCount, columnsCount);
};

/** @private */
Lines.GameField.prototype.createEmptyCells = function() {
  var cellsRows = [];
  
  for (var currentRow = 0; currentRow < this.getRowsCount(); currentRow++) {
    var cellsRowColumns = [];
    for (var currentColumn = 0; currentColumn < this.getColumnsCount(); currentColumn++) {
      cellsRowColumns.push(null);
    }
    cellsRows.push(cellsRowColumns);
  }
  
  return cellsRows;
};

Lines.GameField.prototype.getRowsCount = function() {
  return this.rowsCount;
};

Lines.GameField.prototype.getColumnsCount = function() {
  return this.columnsCount;
};

Lines.GameField.prototype.getBallsCount = function() {
  var ballsCount = 0;
  
  for (var currentRow = 0; currentRow < this.getRowsCount(); currentRow++) {
    for (var currentColumn = 0; currentColumn < this.getColumnsCount(); currentColumn++) {
      if (this.cells[currentRow][currentColumn] != null) {
        ballsCount++;
      }
    }
  }
  
  return ballsCount;
};

Lines.GameField.prototype.isFull = function() {
  var maximumBallsCount = this.getRowsCount() * this.getColumnsCount();
  return this.getBallsCount() == maximumBallsCount;
};

Lines.GameField.prototype.placeBallAt = function(ball, row, column) {
  if (this.cells[row][column] != null) {
    throw new Error('Trying to place ball to occupied cell.');
  }
  this.cells[row][column] = ball;
};

Lines.GameField.prototype.getBallAt = function(row, column) {
  return this.cells[row][column];
};