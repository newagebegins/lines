Lines.ScoreController = function() {
  this.score = Lines.Score.create();
  this.scoreView = Lines.ScoreView.create(this.score);
  this.scoreView.draw();
};

Lines.ScoreController.create = function() {
  return new Lines.ScoreController();
};

Lines.ScoreController.prototype.ballRemoved = function() {
  this.score.add(1);
  this.scoreView.draw();
};
