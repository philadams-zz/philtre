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

//////////////////////
// by-pixel filters //
//////////////////////

Philtre.brighten = function(pixels, adjustment) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    d[i] += adjustment;
    d[i+1] += adjustment;
    d[i+2] += adjustment;
  }
  return pixels;
}

Philtre.contrast = function(pixels, percent) {
  console.error('Not yet implemented');
  return pixels;
}

Philtre.flipHorizontal = function(pixels) {
  console.error('Not yet implemented');
  return pixels;
}

Philtre.flipVertical = function(pixels) {
  console.error('Not yet implemented');
  return pixels;
}

Philtre.grayscale = function(pixels, args) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i],
        g = d[i+1],
        b = d[i+2];
    // CIE luminance
    var v = 0.2126 * r + 0.7152*g + 0.0722 * b;
    d[i] = d[i+1] = d[i+2] = v;
  }
  return pixels;
};

Philtre.identity = function(pixels, args) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    d[i] = d[i];
    d[i+1] = d[i+1];
    d[i+2] = d[i+2];
    //d[i+3] = d[i+3];  // optional alpha
  }
  return pixels;
}

Philtre.invert = function(pixels) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    d[i] = 255 - d[i];
    d[i+1] = 255 - d[i+1];
    d[i+2] = 255 - d[i+2];
    //d[i+3] = 255 - d[i+3];  // optional alpha
  }
  return pixels;
}

Philtre.saturate = function(pixels, percent) {
  console.error('Not yet implemented');
  return pixels;
}

Philtre.sepia = function(pixels, percent) {
  console.error('Not yet implemented');
  return pixels;
}

Philtre.threshold = function(pixels, threshold) {
  console.error('Not yet implemented');
  return pixels;
}
