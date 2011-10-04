Lines.Canvas = {};

Lines.Canvas.create = function() {
  var canvas = document.createElement("canvas");
  canvas.id = "lines-canvas";
  canvas.width = Lines.GameField.COLUMNS_COUNT * Lines.GameFieldView.CELL_WIDTH_PX;
  canvas.height = Lines.GameField.ROWS_COUNT * Lines.GameFieldView.CELL_HEIGHT_PX;
  document.body.appendChild(canvas);
};

Lines.Canvas.getCanvas = function() {
  return document.getElementById("lines-canvas");
};

Lines.Canvas.addEventListener = function(type, listener) {
  var canvas = Lines.Canvas.getCanvas();
  canvas.addEventListener(type, listener);
};

Lines.Canvas.getContext = function() {
  var canvas = Lines.Canvas.getCanvas();
  var context = canvas.getContext("2d");
  return context;
};

Lines.Canvas.clear = function() {
  var canvas = Lines.Canvas.getCanvas();
  canvas.width = canvas.width;
};
