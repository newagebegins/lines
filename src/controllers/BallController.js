Lines.BallController = function(ball) {
  /** @private */
  this.ball = ball;
  /** @privete */
  this.ballView = Lines.BallView.create(ball);
};

Lines.BallController.create = function(ball) {
  return new Lines.BallController(ball);
};

Lines.BallController.prototype.click = function() {
  this.ballView.selectAnimation();
};
