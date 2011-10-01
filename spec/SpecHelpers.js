var fillGameField = function(gameField) {
  for (var currentRow = 0; currentRow < gameField.getRowsCount(); currentRow++) {
    for (var currentColumn = 0; currentColumn < gameField.getColumnsCount(); currentColumn++) {
      var ball = Lines.Ball.create('red');
      gameField.placeBallAt(ball, currentRow, currentColumn);
    }
  }
};
