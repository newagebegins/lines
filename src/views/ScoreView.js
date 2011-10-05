Lines.ScoreView = function(score) {
  this.score = score;
  
  this.element = document.createElement("div");
  this.element.id = "lines-score";
  document.body.appendChild(this.element);
};

Lines.ScoreView.create = function(score) {
  return new Lines.ScoreView(score);
};

Lines.ScoreView.prototype.draw = function() {
  this.element.innerHTML = "Score: " + this.score.getValue();
};
