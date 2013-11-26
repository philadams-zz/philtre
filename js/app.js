// set up
var img = document.getElementById('demo-image');

// run filters
var idata = Philtre.filterImage(Philtre.identity, img);
var idata = Philtre.filterImage(Philtre.grayscale, img);
var idata = Philtre.filterImage(Philtre.brighten, img, 40);
var idata = Philtre.filterImage(Philtre.contrast, img, 25);
var idata = Philtre.filterImage(Philtre.saturate, img, 40);
var idata = Philtre.filterImage(Philtre.sepia, img, 40);
var idata = Philtre.filterImage(Philtre.flipVertical, img);
var idata = Philtre.filterImage(Philtre.invert, img);
var idata = Philtre.filterImage(Philtre.threshold, img, 124);
var idata = Philtre.filterImage(Philtre.flipHorizontal, img);

// show results
var canvas = document.createElement('canvas');
canvas.width = img.width;
canvas.height = img.height;
var ctx = canvas.getContext('2d');
ctx.putImageData(idata, 0, 0);
img.parentNode.insertBefore(canvas, img.nextSibling);
