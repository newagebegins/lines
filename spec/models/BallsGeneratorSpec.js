describe("BallsGenerator", function() {
  it("should add new balls to game field", function() {
    var gameField = Lines.GameField.create();
    var ballsGenerator = Lines.BallsGenerator.create(gameField);
    var numberOfBallsToCreate = 3;
    ballsGenerator.addNewBallsToGameField(numberOfBallsToCreate);
    expect(gameField.getBallsCount()).toEqual(numberOfBallsToCreate);
  });
  
  it("should not try to place a ball to an occupied cell", function() {
    var functionBackup = Lines.RandomNumberGenerator.generateIntegerBetweenMinAndMaxInclusively;
    
    var gameField = Lines.GameField.create();
    var ballsGenerator = Lines.BallsGenerator.create(gameField);
    
    var randomNumberGeneratorCallsCount = 0;
    Lines.RandomNumberGenerator.generateIntegerBetweenMinAndMaxInclusively = function() {
      randomNumberGeneratorCallsCount++;
      switch (randomNumberGeneratorCallsCount) {
        case 1:
        case 2:
          return 0;
        case 3:
        case 4:
          return 0;
        case 5:
        case 6:
          return 1;
      }
    };
    
    var numberOfBallsToCreate = 2;
    ballsGenerator.addNewBallsToGameField(numberOfBallsToCreate);
    expect(gameField.getBallsCount()).toEqual(numberOfBallsToCreate);
    
    Lines.RandomNumberGenerator.generateIntegerBetweenMinAndMaxInclusively = functionBackup;
  });
  
  it("should not try to add balls to fully occupied game field", function() {
    var gameField = Lines.GameField.create();
    fillGameField(gameField);
    var ballsGenerator = Lines.BallsGenerator.create(gameField);
    var numberOfBallsToCreate = 3;
    expect(function() {ballsGenerator.addNewBallsToGameField(numberOfBallsToCreate);}).not.toThrow('Could not find an empty cell.');
  });
});
