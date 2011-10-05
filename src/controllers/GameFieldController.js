Lines.GameFieldController = function() {
  this.gameField = Lines.GameField.create();
  this.gameFieldView = Lines.GameFieldView.create(this.gameField);
};

Lines.GameFieldController.create = function() {
  return new Lines.GameFieldController();
};

Lines.GameFieldController.prototype.gameStart = function() {
  Lines.Canvas.create();
  
  var _this = this;
  Lines.Canvas.addEventListener('click', function(event) {_this.click(event)});
  
  this.addNewBalls();
  this.draw();
};

Lines.GameFieldController.prototype.draw = function() {
  this.gameFieldView.draw();
  
  var gameFieldIterator = Lines.GameFieldIterator.create(this.gameField);
  
  while (!gameFieldIterator.iterationCompleted()) {
    var ball = gameFieldIterator.getNextBall();
    var ballController = Lines.BallController.create(ball);
    ballController.registerObserver(this, 'ball appeared');
    ballController.draw();
  }
};

Lines.GameFieldController.prototype.click = function(event) {
  if (Lines.MainController.isGameOver) {
    return;
  }
  
  var clickedCellRow = this.getClickedCellRow(event);
  var clickedCellColumn = this.getClickedCellColumn(event);
  var ball = this.gameField.getBallAt(clickedCellRow, clickedCellColumn);
  var ballController = null;
    
  if (ball != null) {
    if (!ball.isSelected()) {
      ball.select();
      ballController = Lines.BallController.create(ball);
      ballController.click();
    }
    return;
  }
  
  var selectedBall = Lines.Ball.getSelectedBall();

  if (selectedBall != null) {
    selectedBall.unselect();
    ballController = Lines.BallController.create(selectedBall);
    ballController.registerObserver(this, 'moving animation completed');
    ballController.moveTo(clickedCellRow, clickedCellColumn);
  }
};

Lines.GameFieldController.prototype.getClickedCellRow = function(event) {
  var clickedRow = Math.floor((event.clientY - event.target.offsetTop) / Lines.GameFieldView.CELL_HEIGHT_PX);
  return clickedRow;
};

Lines.GameFieldController.prototype.getClickedCellColumn = function(event) {
  var clickedColumn = Math.floor((event.clientX - event.target.offsetLeft) / Lines.GameFieldView.CELL_WIDTH_PX);
  return clickedColumn;
};

Lines.GameFieldController.prototype.notify = function(event) {
   switch (event) {
    case 'moving animation completed':
      var completedLines = this.gameField.completedLines();
      if (completedLines.length > 0) {
        this.removeCompletedLines(completedLines);
      }
      else {
        this.addNewBalls();
        this.gameFieldView.erase();
        this.draw();
      }
      break;
      
    case 'ball appeared':
      if (!this.gameField.allBallsAppeared()) {
        break;
      }
      if (this.gameField.isFull()) {
        Lines.MainController.gameOver();
      }
      break;
      
    default:
      throw new Error('unhandled event');
      break;
  }
};

Lines.GameFieldController.prototype.addNewBalls = function() {
  var ballsGenerator = Lines.BallsGenerator.create(this.gameField);
  ballsGenerator.addNewBallsToGameField(3);
  
  var completedLines = this.gameField.completedLines();
  if (completedLines.length > 0) {
    this.removeCompletedLines(completedLines);
  }
};

Lines.GameFieldController.prototype.removeCompletedLines = function(completedLines) {
  completedLines.forEach(function(completedLine) {
    completedLine.forEach(function(cell) {
      this.gameField.removeBallAt(cell[0], cell[1]);
    }, this);
  }, this);
  this.gameFieldView.erase();
  this.draw();
};
