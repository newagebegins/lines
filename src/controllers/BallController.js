Lines.BallController = function(ball) {
  Lines.Observable.call(this);
  /** @private */
  this.handledEvents = ['moving animation completed'];
  /** @private */
  this.ball = ball;
  /** @privete */
  this.ballView = Lines.BallView.create(ball);
};

Lines.BallController.prototype = new Lines.Observable();

Lines.BallController.create = function(ball) {
  return new Lines.BallController(ball);
};

Lines.BallController.prototype.click = function() {
  this.ballView.selectAnimation();
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
  this.ballView.draw(Lines.BallView.NORMAL_RADIUS);
  var _this = this;
  setTimeout(function() {_this.movingAnimation(path, currentCell + 1)}, durationBetweenStepsMs);
};
