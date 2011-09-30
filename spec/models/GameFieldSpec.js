describe("GameField", function() {
  var gameField;
  
  beforeEach(function() {
    gameField = Lines.GameField.create(10, 10);
  });
  
  it("should have no balls after creation", function() {
    expect(gameField.getBallsCount()).toEqual(0);
  });
  
  it("allows to place balls", function() {
    var ball = Lines.Ball.create();
    var row = 1;
    var column = 2;
    gameField.placeBallAt(ball, row, column);
    
    expect(gameField.getBallsCount()).toEqual(1);
    expect(gameField.getBallAt(row, column)).toBe(ball);
  });
  
  it("should not allow to place ball to occupied cell", function() {
    var ballOne = Lines.Ball.create();
    var ballTwo = Lines.Ball.create();
    var row = 1;
    var column = 2;
    gameField.placeBallAt(ballOne, row, column);
    
    expect(function() {gameField.placeBallAt(ballTwo, row, column);}).toThrow('Trying to place ball to occupied cell.');
  });
});
