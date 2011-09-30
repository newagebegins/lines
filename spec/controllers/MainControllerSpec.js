describe("MainController", function() {
  it("should draw game field", function() {
    var gameField = Lines.GameField.create();
    var gameFieldView = Lines.GameFieldView.create(gameField);
    spyOn(gameFieldView, 'draw');
    Lines.GameFieldView.create = function() {return gameFieldView;};
    Lines.MainController.create();
    
    expect(gameFieldView.draw).toHaveBeenCalled();
  });
});
