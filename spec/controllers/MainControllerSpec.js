describe("MainController", function() {
  it("should draw game field", function() {
    var gameField = new Lines.GameField();
    var gameFieldView = new Lines.GameFieldView(gameField);
    spyOn(gameFieldView, 'draw');
    Lines.GameFieldView.create = function() {return gameFieldView;};
    var mainController = new Lines.MainController();
    expect(gameFieldView.draw).toHaveBeenCalled();
  });
});
