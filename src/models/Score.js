Lines.Score = function() {
  this.value = 0;
};

Lines.Score.create = function() {
  return new Lines.Score();
};

Lines.Score.prototype.getValue = function() {
  return this.value;
};

Lines.Score.prototype.add = function(value) {
  this.value += value;
};
