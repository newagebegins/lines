describe("Ball", function() {
  it("should raise an exception if color is not correct", function() {
    var correctColor = 'red';
    expect(function() {Lines.Ball.create(correctColor);}).not.toThrow('Incorrect color.');
    
    var incorrectColor = 'white';
    expect(function() {Lines.Ball.create(incorrectColor);}).toThrow('Incorrect color.');
  });
  
  it("can be moved from cell to cell", function() {
    var ball = Lines.Ball.create('red');
    var gameField = Lines.GameField.create();
    var rowFrom = 1;
    var columnFrom = 2;
    gameField.placeBallAt(ball, rowFrom, columnFrom);
    
    var rowTo = 3;
    var columnTo = 4;
    ball.moveTo(rowTo, columnTo);
    
    expect(gameField.getBallAt(rowFrom, columnFrom)).toBe(null);
    expect(gameField.getBallAt(rowTo, columnTo)).toBe(ball);
  });
  
  it("can be selected and unselected", function() {
   var ball = Lines.Ball.create('red');
   
   expect(ball.isSelected()).toBeFalsy();
   expect(Lines.Ball.getSelectedBall()).toBe(null);
   
   ball.select();
   
   expect(ball.isSelected()).toBeTruthy();
   expect(Lines.Ball.getSelectedBall()).toBe(ball);
   
   ball.unselect();
   
   expect(ball.isSelected()).toBeFalsy();
   expect(Lines.Ball.getSelectedBall()).toBe(null);
  });
  
  it("should not try to unselect not selected ball", function() {
    var ballOne = Lines.Ball.create('red');
    var ballTwo = Lines.Ball.create('green');
    
    ballOne.select();
    
    expect(ballOne.isSelected()).toBeTruthy();
    expect(ballTwo.isSelected()).toBeFalsy();
    
    ballTwo.unselect();
    
    expect(ballOne.isSelected()).toBeTruthy();
    expect(ballTwo.isSelected()).toBeFalsy();
    
    ballOne.unselect();
    
    expect(ballOne.isSelected()).toBeFalsy();
    expect(ballTwo.isSelected()).toBeFalsy();
  });
  
  it("only one ball can be selected at the same time", function() {
    var ballOne = Lines.Ball.create('red');
    var ballTwo = Lines.Ball.create('green');
    
    ballOne.select();
    
    expect(ballOne.isSelected()).toBeTruthy();
    expect(ballTwo.isSelected()).toBeFalsy();
    
    ballTwo.select();
    
    expect(ballOne.isSelected()).toBeFalsy();
    expect(ballTwo.isSelected()).toBeTruthy();
    
    ballOne.select();
    
    expect(ballOne.isSelected()).toBeTruthy();
    expect(ballTwo.isSelected()).toBeFalsy();
  });
  
  it("can't cross blocked path", function() {
    // 12#
    // 3##
    // ###
    var ballOne = Lines.Ball.create('red');
    var ballTwo = Lines.Ball.create('green');
    var ballThree = Lines.Ball.create('blue');
    var gameField = Lines.GameField.create();
    
    gameField.placeBallAt(ballOne, 0, 0);
    gameField.placeBallAt(ballTwo, 0, 1);
    gameField.placeBallAt(ballThree, 1, 0);
    
    ballOne.moveTo(1, 1);
    
    expect(gameField.getBallAt(0, 0)).toBe(ballOne);
    expect(gameField.getBallAt(1, 1)).toBe(null);
  });
});
