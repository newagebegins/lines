var fillGameField = function(gameField) {
  for (var currentRow = 0; currentRow < Lines.GameField.ROWS_COUNT; currentRow++) {
    for (var currentColumn = 0; currentColumn < Lines.GameField.COLUMNS_COUNT; currentColumn++) {
      var ball = Lines.Ball.create('red');
      gameField.placeBallAt(ball, currentRow, currentColumn);
    }
  }
};
