Lines.BallsGenerator = function(gameField) {
  /** @private */
  this.gameField = gameField;
};

Lines.BallsGenerator.create = function(gameField) {
  return new Lines.BallsGenerator(gameField);
};

Lines.BallsGenerator.prototype.addNewBallsToGameField = function(numberOfBallsToCreate) {
  for (var currentBall = 0; currentBall < numberOfBallsToCreate; currentBall++) {
    if (this.gameField.isFull()) {
      return;
    }
    
    var placeAttempts = 0;
    var placeAttemptsLimit = 1000;
    
    while (placeAttempts < placeAttemptsLimit) {
      placeAttempts++;
      var row = Lines.RandomNumberGenerator.generateIntegerBetweenMinAndMaxInclusively(0, this.gameField.getRowsCount() - 1);
      var column = Lines.RandomNumberGenerator.generateIntegerBetweenMinAndMaxInclusively(0, this.gameField.getColumnsCount() - 1);
      
      if (this.gameField.getBallAt(row, column) != null) {
        continue;
      }
      
      this.gameField.placeBallAt(Lines.Ball.create('red'), row, column);
      break;
    }
    
    if (placeAttempts >= placeAttemptsLimit) {
      throw new Error('Could not find an empty cell.');
    }
  }
};
