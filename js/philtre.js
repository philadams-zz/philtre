Philtre = {};

// img from document.getElement
Philtre.getPixels = function(img) {
  var canvas = this.getCanvas(img.width, img.height);
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

Philtre.getCanvas = function(width, height) {
  canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

Philtre.filterImage = function(filter, image, var_args) {
  var args = [this.getPixels(image)];
  for (var i=2; i<arguments.length; i++) {
    args.push(arguments[i]);
  }
  return filter.apply(null, args);
};

Philtre.identity = function(pixels, args) {
  return pixels;
}
