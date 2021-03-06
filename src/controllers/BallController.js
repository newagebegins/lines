Lines.BallController = function(ball) {
  Lines.Observable.call(this);
  /** @private */
  this.handledEvents = [
    'moving animation completed',
    'ball appeared'
  ];
  /** @private */
  this.ball = ball;
  /** @privete */
  this.ballView = Lines.BallView.create(ball);
};

Lines.BallController.prototype = new Lines.Observable();

Lines.BallController.create = function(ball) {
  return new Lines.BallController(ball);
};

Lines.BallController.prototype.draw = function(radius) {
  if (this.ball.isAppearing()) {
    radius = radius || 1;
  }
  else {
    radius = Lines.BallView.NORMAL_RADIUS;
  }
  
  this.ballView.draw(radius);
  radius++;
  var _this = this;
  
  if (radius <= Lines.BallView.NORMAL_RADIUS) {
    setTimeout(function() {_this.draw(radius)}, 5);
  }
  else {
    this.ball.setAppearing(false);
    this.notifyObservers('ball appeared');
  }
};

Lines.BallController.prototype.click = function() {
  this.selectAnimation();
};

Lines.BallController.prototype.selectAnimation = function(step) {
  if (!this.ball.isSelected()) {
    if (step == 2) {
      this.ballView.draw();
    }
    return;
  }
  
  step = step || 1;
  var _this = this;
  
  switch (step) {
    case 1:
      this.ballView.erase();
      setTimeout(function() {_this.selectAnimation(2)}, 300);
      break;
    case 2:
      this.ballView.draw();
      setTimeout(function() {_this.selectAnimation(1)}, 300);
      break;
  }
};

Lines.BallController.prototype.moveTo = function(goalRow, goalColumn) {
  if (!this.ball.canMoveTo(goalRow, goalColumn)) {
    return;
  }
  
  var path = this.ball.getPathTo(goalRow, goalColumn);
  this.movingAnimation(path);
};

Lines.BallController.prototype.movingAnimation = function(path, currentCell) {
  if (currentCell >= path.length) {
    this.notifyObservers('moving animation completed');
    return;
  }
  
  currentCell = (currentCell == undefined) ? 1 : currentCell;
  var currentCellRow = path[currentCell][1];
  var currentCellColumn = path[currentCell][0];
  var durationBetweenStepsMs = 50;
  this.ballView.erase();
  this.ball.moveTo(currentCellRow, currentCellColumn);
  this.ballView.draw();
  var _this = this;
  setTimeout(function() {_this.movingAnimation(path, currentCell + 1)}, durationBetweenStepsMs);
};

Lines.BallController.prototype.destroyBall = function(radius, callback) {
  radius = radius || Lines.BallView.NORMAL_RADIUS;
  this.ballView.erase();
  this.ballView.draw(radius);
  radius--;
  var _this = this;
  
  if (radius > 0) {
    setTimeout(function() {_this.destroyBall(radius, callback)}, 5);
  }
  else {
    this.ballView.erase();
    callback();
  }
};
