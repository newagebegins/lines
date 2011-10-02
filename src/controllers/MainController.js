Lines.MainController = function() {
  var gameFieldController = Lines.GameFieldController.create();
  gameFieldController.gameStart();
};

Lines.MainController.create = function() {
  return new Lines.MainController();
};
