Lines.GameField = function() {
  /** @private */
  this.cells = this.createEmptyCells();
};

Lines.GameField.create = function() {
  return new Lines.GameField();
};

Lines.GameField.COLUMNS_COUNT = 10;
Lines.GameField.ROWS_COUNT = 10;

/** @private */
Lines.GameField.prototype.createEmptyCells = function() {
  var cellsRows = [];
  
  for (var currentRow = 0; currentRow < Lines.GameField.ROWS_COUNT; currentRow++) {
    var cellsRowColumns = [];
    for (var currentColumn = 0; currentColumn < Lines.GameField.COLUMNS_COUNT; currentColumn++) {
      cellsRowColumns.push(null);
    }
    cellsRows.push(cellsRowColumns);
  }
  
  return cellsRows;
};

Lines.GameField.prototype.getBallsCount = function() {
  var ballsCount = 0;
  
  for (var currentRow = 0; currentRow < Lines.GameField.ROWS_COUNT; currentRow++) {
    for (var currentColumn = 0; currentColumn < Lines.GameField.COLUMNS_COUNT; currentColumn++) {
      if (this.cells[currentRow][currentColumn] != null) {
        ballsCount++;
      }
    }
  }
  
  return ballsCount;
};

Lines.GameField.prototype.isFull = function() {
  var maximumBallsCount = Lines.GameField.ROWS_COUNT * Lines.GameField.COLUMNS_COUNT;
  return this.getBallsCount() == maximumBallsCount;
};

Lines.GameField.prototype.placeBallAt = function(ball, row, column) {
  if (this.cells[row][column] != null) {
    throw new Error('Trying to place ball to occupied cell.');
  }
  ball.setRow(row);
  ball.setColumn(column);
  ball.setGameField(this);
  ball.setAppearing(true);
  this.cells[row][column] = ball;
};

Lines.GameField.prototype.getBallAt = function(row, column) {
  return this.cells[row][column];
};

Lines.GameField.prototype.removeBallAt = function(row, column) {
  this.cells[row][column] = null;
};

Lines.GameField.prototype.generateGrid = function() {
  var grid = [];
  var cellWithBall = 1;
  var emptyCell = 0;
  
  for (var currentRow = 0; currentRow < Lines.GameField.ROWS_COUNT; currentRow++) {
    var gridRow = [];
    
    for (var currentColumn = 0; currentColumn < Lines.GameField.COLUMNS_COUNT; currentColumn++) {
      if (this.cells[currentRow][currentColumn] != null) {
        gridRow.push(cellWithBall);
      }
      else {
        gridRow.push(emptyCell);
      }
    }
    
    grid.push(gridRow);
  }
  
  return grid;
};
