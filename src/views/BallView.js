Lines.BallView = function(ball) {
  /** @private */
  this.ball = ball;
};

Lines.BallView.create = function(ball) {
  return new Lines.BallView(ball);
};

Lines.BallView.prototype.draw = function(ctx, xCenterPx, yCenterPx, radius) {
  radius = radius || 1;
  var maxRadius = 20;
  
  ctx.beginPath();
  ctx.arc(xCenterPx, yCenterPx, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = this.ball.getColor();
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "black";
  ctx.stroke();
  
  radius++;
  var _this = this;
  
  if (radius <= maxRadius) {
    setTimeout(function() {_this.draw(ctx, xCenterPx, yCenterPx, radius)}, 5);
  }
};
