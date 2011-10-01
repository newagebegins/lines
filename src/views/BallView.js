Lines.BallView = function(ball) {
  /** @private */
  this.ball = ball;
};

Lines.BallView.create = function(ball) {
  return new Lines.BallView(ball);
};

Lines.BallView.prototype.draw = function(ctx, xCenterPx, yCenterPx) {
  var radius = 20;
  ctx.beginPath();
  ctx.arc(xCenterPx, yCenterPx, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "#8ED6FF";
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "black";
  ctx.stroke();
};
