describe("MainController", function() {
  it("should draw game field", function() {
    var gameField = Lines.GameField.create(10, 10);
    var gameFieldView = Lines.GameFieldView.create(gameField);
    spyOn(gameFieldView, 'draw');
    Lines.GameFieldView.create = function() {return gameFieldView;};
    Lines.MainController.create();
    
    expect(gameFieldView.draw).toHaveBeenCalled();
  });
});
