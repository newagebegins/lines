Lines.GameField = function() {
  /** @private */
  this.cells = this.createEmptyCells();
  /** @private */
  this.completedLineLength = 4;
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

Lines.GameField.prototype.completedLines = function() {
  var completedLines = [];
  var iterator = Lines.GameFieldIterator.create(this);
  
  while (!iterator.iterationCompleted()) {
    var ball = iterator.getNextBall();
    var directions = ['e', 'sw', 's', 'se'];
    
    directions.forEach(function(direction) {
      var line = [];
      line.push([ball.getRow(), ball.getColumn()]);
      
      this.getLine(direction, ball, line);

      if (line.length >= this.completedLineLength) {
        completedLines.push(line);
      }
    }, this);
  }
  
  return completedLines;
};

/** @private */
Lines.GameField.prototype.getLine = function(direction, ball, line) {
  var neighbour = ball.getNeighbour(direction);
  if (neighbour != null && neighbour.getColor() == ball.getColor()) {
    line.push([neighbour.getRow(), neighbour.getColumn()]);
    this.getLine(direction, neighbour, line);
  }
};

Lines.GameField.prototype.setCompletedLineLength = function(length) {
  this.completedLineLength = length;
};
