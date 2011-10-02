Lines.Canvas = {};

Lines.Canvas.create = function() {
  var canvas = document.createElement("canvas");
  canvas.id = "lines-canvas";
  canvas.width = Lines.GameField.COLUMNS_COUNT * Lines.GameFieldView.CELL_WIDTH_PX;
  canvas.height = Lines.GameField.ROWS_COUNT * Lines.GameFieldView.CELL_HEIGHT_PX;
  document.body.appendChild(canvas);
};

Lines.Canvas.addEventListener = function(type, listener) {
  var canvas = document.getElementById("lines-canvas")
  canvas.addEventListener(type, listener);
};

Lines.Canvas.getContext = function() {
  var canvas = document.getElementById("lines-canvas");
  var context = canvas.getContext("2d");
  return context;
};
