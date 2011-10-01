describe("GameFieldIterator", function() {
  it("should raise an exception when trying to get next ball of the empty game field", function() {
    var gameField = Lines.GameField.create(10, 10);
    var gameFieldIterator = Lines.GameFieldIterator.create(gameField);
    expect(function() {gameFieldIterator.getNextBall();}).toThrow('Trying to get next ball after iteration is completed.');
  });
  
  it("should perform iteration", function() {
    var gameField = Lines.GameField.create(10, 10);
    
    var ballOne = Lines.Ball.create('red');
    gameField.placeBallAt(ballOne, 1, 1);
    
    var ballTwo = Lines.Ball.create('red');
    gameField.placeBallAt(ballTwo, 2, 2);
    
    var ballThree = Lines.Ball.create('red');
    gameField.placeBallAt(ballThree, 3, 3);
    
    var gameFieldIterator = Lines.GameFieldIterator.create(gameField);
    var retrievedBalls = [];
    
    while (!gameFieldIterator.iterationCompleted()) {
      retrievedBalls.push(gameFieldIterator.getNextBall());
    }
    
    expect(retrievedBalls.length).toEqual(3);
    expect(retrievedBalls[0]).toBe(ballOne);
    expect(retrievedBalls[1]).toBe(ballTwo);
    expect(retrievedBalls[2]).toBe(ballThree);
  });
});
