Lines.GameFieldView = function(gameField) {
  /** @private */
  this.gameField = gameField;
  /** @private */
  this.width = Lines.GameField.COLUMNS_COUNT * Lines.GameFieldView.CELL_WIDTH_PX;
  /** @private */
  this.height = Lines.GameField.ROWS_COUNT * Lines.GameFieldView.CELL_HEIGHT_PX;
};

Lines.GameFieldView.create = function(gameField) {
  return new Lines.GameFieldView(gameField);
};

Lines.GameFieldView.CELL_WIDTH_PX = 50;
Lines.GameFieldView.CELL_HEIGHT_PX = 50;

Lines.GameFieldView.prototype.draw = function() {
  this.drawLines();
  this.drawBalls();
};

/** @private */
Lines.GameFieldView.prototype.drawLines = function() {
  this.drawHorizontalLines();
  this.drawVerticalLines();
};

/** @private */
Lines.GameFieldView.prototype.drawBalls = function() {
  var gameFieldIterator = Lines.GameFieldIterator.create(this.gameField);
  
  while (!gameFieldIterator.iterationCompleted()) {
    var ball = gameFieldIterator.getNextBall();
    this.drawBall(ball);
  }
};

/** @private */
Lines.GameFieldView.prototype.drawBall = function(ball) {
  var ballView = Lines.BallView.create(ball);
  ballView.draw();
};

/** @private */
Lines.GameFieldView.prototype.drawHorizontalLines = function() {
  var ctx = Lines.Canvas.getContext();
  
  ctx.beginPath();
  var xStart = 0;
  var xEnd = this.width;
  
  for (var currentRow = 0; currentRow <= Lines.GameField.ROWS_COUNT; currentRow++) {
    var y = currentRow * Lines.GameFieldView.CELL_HEIGHT_PX;
    ctx.moveTo(xStart, y);
    ctx.lineTo(xEnd, y);
  }
  
  ctx.closePath();
  ctx.stroke();
};

/** @private */
Lines.GameFieldView.prototype.drawVerticalLines = function() {
  var ctx = Lines.Canvas.getContext();
  
  ctx.beginPath();
  var yStart = 0;
  var yEnd = this.height;
  
  for (var currentColumn = 0; currentColumn <= Lines.GameField.COLUMNS_COUNT; currentColumn++) {
    var x = currentColumn * Lines.GameFieldView.CELL_WIDTH_PX;
    ctx.moveTo(x, yStart);
    ctx.lineTo(x, yEnd);
  }
  
  ctx.closePath();
  ctx.stroke();
};

Lines.GameFieldView.prototype.redraw = function() {
  this.erase();
  this.draw();
};

Lines.GameFieldView.prototype.erase = function() {
  Lines.Canvas.clear();
};
