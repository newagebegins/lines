describe("GameField", function() {
  it("should have no balls after creation", function() {
    var gameField = Lines.GameField.create();
    
    expect(gameField.getBallsCount()).toEqual(0);
  });
  
  it("allows to place balls", function() {
    var gameField = Lines.GameField.create();
    var ball = Lines.Ball.create();
    var row = 1;
    var column = 2;
    gameField.placeBallAt(ball, row, column);
    
    expect(gameField.getBallsCount()).toEqual(1);
    expect(gameField.getBallAt(row, column)).toBe(ball);
  });
  
  it("should not allow to place ball to occupied cell", function() {
    var gameField = Lines.GameField.create();
    var ballOne = Lines.Ball.create();
    var ballTwo = Lines.Ball.create();
    var row = 1;
    var column = 2;
    gameField.placeBallAt(ballOne, row, column);
    
    expect(function() {gameField.placeBallAt(ballTwo, row, column);}).toThrow('Trying to place ball to occupied cell.');
  });
});
