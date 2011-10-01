describe("GameField", function() {
  var gameField;
  
  beforeEach(function() {
    gameField = Lines.GameField.create(10, 10);
  });
  
  it("should have no balls after creation", function() {
    expect(gameField.getBallsCount()).toEqual(0);
  });
  
  it("allows to place balls", function() {
    var placedBall = Lines.Ball.create('red');
    var row = 1;
    var column = 2;
    gameField.placeBallAt(placedBall, row, column);
    
    expect(gameField.getBallsCount()).toEqual(1);
    
    var retrievedBall = gameField.getBallAt(row, column);
    expect(retrievedBall).toBe(placedBall);
    expect(retrievedBall.getRow()).toEqual(row);
    expect(retrievedBall.getColumn()).toEqual(column);
  });
  
  it("should not allow to place ball to occupied cell", function() {
    var ballOne = Lines.Ball.create('red');
    var ballTwo = Lines.Ball.create('red');
    var row = 1;
    var column = 2;
    gameField.placeBallAt(ballOne, row, column);
    
    expect(function() {gameField.placeBallAt(ballTwo, row, column);}).toThrow('Trying to place ball to occupied cell.');
  });
  
  it("should indicate if it is full", function() {
    expect(gameField.isFull()).toBeFalsy();
    fillGameField(gameField);
    expect(gameField.isFull()).toBeTruthy();
  });
});
