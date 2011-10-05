Lines.MainController = function() {
  var gameFieldController = Lines.GameFieldController.create();
  gameFieldController.gameStart();
};

Lines.MainController.create = function() {
  return new Lines.MainController();
};

Lines.MainController.isGameOver = false;

Lines.MainController.gameOver = function() {
  Lines.MainController.isGameOver = true;
  alert("Game Over");
};
