Lines.MainController = function() {
  var gameField = new Lines.GameField();
  var gameFieldView = new Lines.GameFieldView(gameField);
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = gameField.getColumnsCount() * gameFieldView.getCellWidthPx();
  canvas.height = gameField.getRowsCount() * gameFieldView.getCellHeightPx();
  document.body.appendChild(canvas);
  gameFieldView.draw(ctx);
};
