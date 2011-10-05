Lines.BallView = function(ball) {
  /** @private */
  this.ball = ball;
};

Lines.BallView.views = [];

Lines.BallView.create = function(ball) {
  var view = new Lines.BallView(ball);
  Lines.BallView.views.push(view);
  return view;
};

Lines.BallView.NORMAL_RADIUS = 20;

Lines.BallView.prototype.draw = function(radius) {
  if (this.ball.isAppearing()) {
    radius = radius || 1;
  }
  else {
    radius = Lines.BallView.NORMAL_RADIUS;
  }
  
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
  
  radius++;
  var _this = this;
  
  if (radius <= Lines.BallView.NORMAL_RADIUS) {
    setTimeout(function() {_this.draw(radius)}, 5);
  }
  else {
    this.ball.setAppearing(false);
  }
};

Lines.BallView.prototype.selectAnimation = function(step) {
  if (!this.ball.isSelected()) {
    this.draw(Lines.BallView.NORMAL_RADIUS);
    return;
  }
  
  step = step || 1;
  var _this = this;
  
  switch (step) {
    case 1:
      this.erase();
      setTimeout(function() {_this.selectAnimation(2)}, 300);
      break;
    case 2:
      this.draw(Lines.BallView.NORMAL_RADIUS);
      setTimeout(function() {_this.selectAnimation(1)}, 300);
      break;
  }
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
