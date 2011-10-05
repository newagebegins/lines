Lines.BallView = function(ball) {
  /** @private */
  this.ball = ball;
};

Lines.BallView.create = function(ball) {
  var view = new Lines.BallView(ball);
  return view;
};

Lines.BallView.NORMAL_RADIUS = 20;

Lines.BallView.prototype.draw = function(radius) {
  radius = radius || Lines.BallView.NORMAL_RADIUS;
  var ctx = Lines.Canvas.getContext();
  var xCenterPx = Lines.GameFieldView.CELL_WIDTH_PX * (this.ball.getColumn() + 0.5);
  var yCenterPx = Lines.GameFieldView.CELL_HEIGHT_PX * (this.ball.getRow() + 0.5);
  
  ctx.beginPath();
  ctx.arc(xCenterPx, yCenterPx, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = this.ball.getColor();
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "black";
  ctx.stroke();
};

Lines.BallView.prototype.erase = function() {
  var ctx = Lines.Canvas.getContext();
  var xCenterPx = Lines.GameFieldView.CELL_WIDTH_PX * (this.ball.getColumn() + 0.5);
  var yCenterPx = Lines.GameFieldView.CELL_HEIGHT_PX * (this.ball.getRow() + 0.5);
  
  ctx.beginPath();
  ctx.arc(xCenterPx, yCenterPx, Lines.BallView.NORMAL_RADIUS + 4, 0, 2 * Math.PI, false);
  ctx.fillStyle = "white";
  ctx.fill();
};
