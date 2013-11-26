Philtre = {};

// a canvas for all not-in-place pixel wrangling
Philtre.scratchCanvas = document.createElement('canvas');
Philtre.scratchCtx = Philtre.scratchCanvas.getContext('2d');

// imagedata of the img from document.getElement
Philtre.getPixels = function(img) {
  var canvas = this.getCanvas(img.width, img.height);
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

// create a canvas with the specified width and height
Philtre.getCanvas = function(width, height) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

// empty imagedata object for filtered output
// either from a tmpCanvas.ctx, or (for signed data) a Float32Array
Philtre.createImageData = function(width, height) {
  return this.scratchCtx.createImageData(width, height);
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
};

Philtre.contrast = function(pixels, percent) {
  console.error('Not yet implemented');
  return pixels;
};

Philtre.flipHorizontal = function(pixels) {
  var src = pixels.data,
      w = pixels.width,
      h = pixels.height;
  var output = Philtre.createImageData(w, h);
  var dst = output.data;
  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var srcpxl = (y*w+x)*4;
      var dstpxl = (y*w+(w-x-1))*4;
      dst[dstpxl] = src[srcpxl];
      dst[dstpxl+1] = src[srcpxl+1];
      dst[dstpxl+2] = src[srcpxl+2];
      dst[dstpxl+3] = src[srcpxl+3];
    }
  }
  return output;
};

Philtre.flipVertical = function(pixels) {
  console.error('Not yet implemented');
  return pixels;
};

Philtre.grayscale = function(pixels, args) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i],
        g = d[i+1],
        b = d[i+2];
    // standard objective luminance (CIE)
    // TODO play with different luminance parameters?
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
};

Philtre.invert = function(pixels) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    d[i] = 255 - d[i];
    d[i+1] = 255 - d[i+1];
    d[i+2] = 255 - d[i+2];
    //d[i+3] = 255 - d[i+3];  // optional alpha
  }
  return pixels;
};

Philtre.saturate = function(pixels, percent) {
  console.error('Not yet implemented');
  return pixels;
};

Philtre.sepia = function(pixels, percent) {
  console.error('Not yet implemented');
  return pixels;
};

Philtre.threshold = function(pixels, threshold) {
  // 0.299*R + 0.587*G + 0.114*B
  if (threshold == null) {
    threshold = 124;
  }
  var high = 255,
      low = 0;
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    var v = (0.299*r + 0.587*g + 0.114*b >= threshold) ? high : low;
    d[i] = d[i+1] = d[i+2] = v;
  }
  return pixels;
};
