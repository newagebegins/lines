describe("GameField", function() {
  var gameField;
  
  beforeEach(function() {
    gameField = Lines.GameField.create();
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
  
  it("should find completed lines - two balls horizontally", function() {
    var ballOne = Lines.Ball.create('red');
    var ballTwo = Lines.Ball.create('red');
    gameField.placeBallAt(ballOne, 0, 0);
    gameField.placeBallAt(ballTwo, 0, 1);
    gameField.setCompletedLineLength(2);
    
    var completedLines = gameField.completedLines();
    
    expect(completedLines).toEqual([
      [[0, 0], [0, 1]]
    ]);
  });
  
  it("completed lines should contain only balls of the same color", function() {
    var ballOne = Lines.Ball.create('red');
    var ballTwo = Lines.Ball.create('green');
    gameField.placeBallAt(ballOne, 0, 0);
    gameField.placeBallAt(ballTwo, 0, 1);
    gameField.setCompletedLineLength(2);
    
    var completedLines = gameField.completedLines();
    
    expect(completedLines).toEqual([]);
  });
  
  it("should find completed lines - two balls vertically", function() {
    var ballOne = Lines.Ball.create('red');
    var ballTwo = Lines.Ball.create('red');
    gameField.placeBallAt(ballOne, 0, 0);
    gameField.placeBallAt(ballTwo, 1, 0);
    gameField.setCompletedLineLength(2);
    
    var completedLines = gameField.completedLines();
    
    expect(completedLines).toEqual([
      [[0, 0], [1, 0]]
    ]);
  });
  
  it("should find completed lines - two balls diagonally", function() {
    var ballOne = Lines.Ball.create('red');
    var ballTwo = Lines.Ball.create('red');
    gameField.placeBallAt(ballOne, 0, 0);
    gameField.placeBallAt(ballTwo, 1, 1);
    gameField.setCompletedLineLength(2);
    
    var completedLines = gameField.completedLines();
    
    expect(completedLines).toEqual([
      [[0, 0], [1, 1]]
    ]);
  });
  
  it("should find completed lines - three balls horizontally", function() {
    var ballOne = Lines.Ball.create('red');
    var ballTwo = Lines.Ball.create('red');
    var ballThree = Lines.Ball.create('red');
    gameField.placeBallAt(ballOne, 0, 0);
    gameField.placeBallAt(ballTwo, 0, 1);
    gameField.placeBallAt(ballThree, 0, 2);
    gameField.setCompletedLineLength(3);
    
    var completedLines = gameField.completedLines();
    
    expect(completedLines).toEqual([
      [[0, 0], [0, 1], [0, 2]]
    ]);
  });
  
  it("should find completed lines - four balls horizontally", function() {
    var ballOne = Lines.Ball.create('red');
    var ballTwo = Lines.Ball.create('red');
    var ballThree = Lines.Ball.create('red');
    var ballFour = Lines.Ball.create('red');
    gameField.placeBallAt(ballOne, 0, 0);
    gameField.placeBallAt(ballTwo, 0, 1);
    gameField.placeBallAt(ballThree, 0, 2);
    gameField.placeBallAt(ballFour, 0, 3);
    gameField.setCompletedLineLength(4);
    
    var completedLines = gameField.completedLines();
    
    expect(completedLines).toEqual([
      [[0, 0], [0, 1], [0, 2], [0, 3]]
    ]);
  });
  
  it("should find completed lines - three balls vertically", function() {
    var ballOne = Lines.Ball.create('red');
    var ballTwo = Lines.Ball.create('red');
    var ballThree = Lines.Ball.create('red');
    gameField.placeBallAt(ballOne, 0, 0);
    gameField.placeBallAt(ballTwo, 1, 0);
    gameField.placeBallAt(ballThree, 2, 0);
    gameField.setCompletedLineLength(3);
    
    var completedLines = gameField.completedLines();
    
    expect(completedLines).toEqual([
      [[0, 0], [1, 0], [2, 0]]
    ]);
  });
  
  it("should find completed lines - three balls diagonally", function() {
    var ballOne = Lines.Ball.create('red');
    var ballTwo = Lines.Ball.create('red');
    var ballThree = Lines.Ball.create('red');
    gameField.placeBallAt(ballOne, 0, 0);
    gameField.placeBallAt(ballTwo, 1, 1);
    gameField.placeBallAt(ballThree, 2, 2);
    gameField.setCompletedLineLength(3);
    
    var completedLines = gameField.completedLines();
    
    expect(completedLines).toEqual([
      [[0, 0], [1, 1], [2, 2]]
    ]);
  });
  
  it("should find two completed lines - two horizontal lines", function() {
    // rrgrr
    gameField.placeBallAt(Lines.Ball.create('red'), 0, 0);
    gameField.placeBallAt(Lines.Ball.create('red'), 0, 1);
    gameField.placeBallAt(Lines.Ball.create('green'), 0, 2);
    gameField.placeBallAt(Lines.Ball.create('red'), 0, 3);
    gameField.placeBallAt(Lines.Ball.create('red'), 0, 4);
    gameField.setCompletedLineLength(2);
    
    var completedLines = gameField.completedLines();
    
    expect(completedLines).toEqual([
      [[0, 0], [0, 1]],
      [[0, 3], [0, 4]]
    ]);
  });
  
  it("should find two completed lines - two lines with common balls", function() {
    // rrr
    // r##
    // r##
    gameField.placeBallAt(Lines.Ball.create('red'), 0, 0);
    gameField.placeBallAt(Lines.Ball.create('red'), 0, 1);
    gameField.placeBallAt(Lines.Ball.create('red'), 0, 2);
    
    gameField.placeBallAt(Lines.Ball.create('red'), 1, 0);
    gameField.placeBallAt(Lines.Ball.create('red'), 2, 0);
    
    gameField.setCompletedLineLength(3);
    
    var completedLines = gameField.completedLines();
    
    expect(completedLines).toEqual([
      [[0, 0], [0, 1], [0, 2]],
      [[0, 0], [1, 0], [2, 0]],
    ]);
  });
  
  it("should find two completed lines - different lines", function() {
    // ####rrrgr#
    // #g##bbb###
    // #g###b####
    // #g##rrbb##
    gameField.placeBallAt(Lines.Ball.create('red'), 0, 4);
    gameField.placeBallAt(Lines.Ball.create('red'), 0, 5);
    gameField.placeBallAt(Lines.Ball.create('red'), 0, 6);
    gameField.placeBallAt(Lines.Ball.create('green'), 0, 7);
    gameField.placeBallAt(Lines.Ball.create('red'), 0, 8);
    
    gameField.placeBallAt(Lines.Ball.create('green'), 1, 1);
    gameField.placeBallAt(Lines.Ball.create('green'), 2, 1);
    gameField.placeBallAt(Lines.Ball.create('green'), 3, 1);
    
    gameField.placeBallAt(Lines.Ball.create('blue'), 1, 4);
    gameField.placeBallAt(Lines.Ball.create('blue'), 1, 5);
    gameField.placeBallAt(Lines.Ball.create('blue'), 1, 6);
    
    gameField.placeBallAt(Lines.Ball.create('blue'), 2, 5);
    gameField.placeBallAt(Lines.Ball.create('blue'), 3, 6);
    
    gameField.placeBallAt(Lines.Ball.create('red'), 3, 4);
    gameField.placeBallAt(Lines.Ball.create('red'), 3, 5);
    gameField.placeBallAt(Lines.Ball.create('blue'), 3, 7);
    
    gameField.setCompletedLineLength(3);
    
    var completedLines = gameField.completedLines();
    
    expect(completedLines).toEqual([
      [[0, 4], [0, 5], [0, 6]],
      [[1, 1], [2, 1], [3, 1]],
      [[1, 4], [1, 5], [1, 6]],
      [[1, 4], [2, 5], [3, 6]],
    ]);
  });
  
  it("should find completed lines - three balls diagonally south west", function() {
    // ##r
    // #r#
    // r##
    gameField.placeBallAt(Lines.Ball.create('red'), 0, 2);
    gameField.placeBallAt(Lines.Ball.create('red'), 1, 1);
    gameField.placeBallAt(Lines.Ball.create('red'), 2, 0);
    
    gameField.setCompletedLineLength(3);
    
    var completedLines = gameField.completedLines();
    
    expect(completedLines).toEqual([
      [[0, 2], [1, 1], [2, 0]]
    ]);
  });
  
  it("should find two completed lines - three lines with common balls", function() {
    // ##rr
    // rrrr
    // #rr#
    // r#r#
    gameField.placeBallAt(Lines.Ball.create('red'), 0, 2);
    gameField.placeBallAt(Lines.Ball.create('red'), 0, 3);
    gameField.placeBallAt(Lines.Ball.create('red'), 1, 0);
    gameField.placeBallAt(Lines.Ball.create('red'), 1, 1);
    gameField.placeBallAt(Lines.Ball.create('red'), 1, 2);
    gameField.placeBallAt(Lines.Ball.create('red'), 1, 3);
    gameField.placeBallAt(Lines.Ball.create('red'), 2, 1);
    gameField.placeBallAt(Lines.Ball.create('red'), 2, 2);
    gameField.placeBallAt(Lines.Ball.create('red'), 3, 0);
    gameField.placeBallAt(Lines.Ball.create('red'), 3, 2);
    
    gameField.setCompletedLineLength(4);
    
    var completedLines = gameField.completedLines();
    
    expect(completedLines).toEqual([
      [[0, 2], [1, 2], [2, 2], [3, 2]],
      [[0, 3], [1, 2], [2, 1], [3, 0]],
      [[1, 0], [1, 1], [1, 2], [1, 3]],
    ]);
  });
});
