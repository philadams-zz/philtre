// set up
var img = document.getElementById('demo-image');

// run filter
var idata = Philtre.filterImage(Philtre.identity, img);

// show results
var canvas = Philtre.getCanvas(img.width, img.height);
var ctx = canvas.getContext('2d');
ctx.putImageData(idata, 0, 0);
img.parentNode.insertBefore(canvas, img);
