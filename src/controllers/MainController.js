Lines.MainController = function() {
  var gameField = Lines.GameField.create();
  var gameFieldView = Lines.GameFieldView.create(gameField);
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = gameField.getColumnsCount() * gameFieldView.getCellWidthPx();
  canvas.height = gameField.getRowsCount() * gameFieldView.getCellHeightPx();
  document.body.appendChild(canvas);
  gameFieldView.draw(ctx);
};
