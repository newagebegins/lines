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
  
  this.ballView.registerObserver(this, 'moving animation completed');
  
  var path = this.ball.getPathTo(goalRow, goalColumn);
  this.ballView.movingAnimation(path);
};

Lines.BallController.prototype.notify = function(event) {
  switch (event) {
    case 'moving animation completed':
      this.notifyObservers('moving animation completed');
      break;
    default:
      throw new Error('unhandled event');
      break;
  }
};
