Lines.GameFieldView = function(gameField) {
  /** @private */
  this.gameField = gameField;
  /** @private */
  this.cellWidthPx = 50;
  /** @private */
  this.cellHeightPx = 50;
};

Lines.GameFieldView.create = function(gameField) {
  return new Lines.GameFieldView(gameField);
};

Lines.GameFieldView.prototype.getCellWidthPx = function() {
  return this.cellWidthPx;
};

Lines.GameFieldView.prototype.getCellHeightPx = function() {
  return this.cellHeightPx;
};

Lines.GameFieldView.prototype.draw = function(ctx) {
  this.drawLines(ctx);
  this.drawBalls(ctx);
};

/** @private */
Lines.GameFieldView.prototype.drawLines = function(ctx) {
  this.drawHorizontalLines(ctx);
  this.drawVerticalLines(ctx);
};

/** @private */
Lines.GameFieldView.prototype.drawBalls = function(ctx) {
  var gameFieldIterator = Lines.GameFieldIterator.create(this.gameField);
  
  while (!gameFieldIterator.iterationCompleted()) {
    var ball = gameFieldIterator.getNextBall();
    this.drawBall(ball, ctx);
  }
};

/** @private */
Lines.GameFieldView.prototype.drawBall = function(ball, ctx) {
  var ballView = Lines.BallView.create(ball);
  var xCenterPx = this.getCellWidthPx() * (ball.getColumn() + 0.5);
  var yCenterPx = this.getCellHeightPx() * (ball.getRow() + 0.5);
  ballView.draw(ctx, xCenterPx, yCenterPx);
};

/** @private */
Lines.GameFieldView.prototype.drawHorizontalLines = function(ctx) {
  ctx.beginPath();
  var xStart = 0;
  var xEnd = this.gameField.getColumnsCount() * this.cellWidthPx;
  
  for (var currentRow = 0; currentRow <= this.gameField.getRowsCount(); currentRow++) {
    var y = currentRow * this.cellHeightPx;
    ctx.moveTo(xStart, y);
    ctx.lineTo(xEnd, y);
  }
  
  ctx.closePath();
  ctx.stroke();
};

/** @private */
Lines.GameFieldView.prototype.drawVerticalLines = function(ctx) {
  ctx.beginPath();
  var yStart = 0;
  var yEnd = this.gameField.getRowsCount() * this.cellHeightPx;
  
  for (var currentColumn = 0; currentColumn <= this.gameField.getColumnsCount(); currentColumn++) {
    var x = currentColumn * this.cellWidthPx;
    ctx.moveTo(x, yStart);
    ctx.lineTo(x, yEnd);
  }
  
  ctx.closePath();
  ctx.stroke();
};
