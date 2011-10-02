Lines.GameFieldIterator = function(gameField) {
  /** @private */
  this.gameField = gameField;
  /** @private */
  this.currentRow = 0;
  /** @private */
  this.currentColumn = 0;
  /** @private */
  this.ballsRemaining = this.gameField.getBallsCount();
};

Lines.GameFieldIterator.create = function(gameField) {
  return new Lines.GameFieldIterator(gameField);
};

Lines.GameFieldIterator.prototype.getNextBall = function() {
  if (this.iterationCompleted()) {
    throw new Error('Trying to get next ball after iteration is completed.');
  }
  
  while (this.currentRow < Lines.GameField.ROWS_COUNT) {
    while (this.currentColumn < Lines.GameField.COLUMNS_COUNT) {
      var ball = this.gameField.getBallAt(this.currentRow, this.currentColumn);
      this.currentColumn++;
      
      if (this.currentColumn >= Lines.GameField.COLUMNS_COUNT) {
        this.currentColumn = 0;
        this.currentRow++;
      }
      
      if (ball != null) {
        this.ballsRemaining--;
        return ball;
      }
      
      if (this.currentColumn == 0) {
        break;
      }
    }
  }
};

Lines.GameFieldIterator.prototype.iterationCompleted = function() {
  if (this.ballsRemaining == 0) {
    return true;
  }
  return false;
};
