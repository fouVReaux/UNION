// -----------------------------------------------------------------------------
//
//
// -----------------------------------------------------------------------------
// Global variables
let mX, mY; // Positions of the mouse in the spectrum area
// -----------------------------------------------------------------------------
// P5JS : CANVAS 1 : spectrum
var spectrum = function(can1){
  // SETUP
  can1.setup = function () {
    // Get size of the window
    var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    x = win.innerWidth || docElem.clientWidth || body.clientWidth,
    y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
    // set Canvas size
    let canvas1 = can1.createCanvas(x, y/3) ;
    canvas1.position(0,y*2/3)
    canvas1.id('spectrumCanvas');
    // FFT for the display
    fft = new p5.FFT();
    // set the global variables with mouse events
    spectrumCanvas.addEventListener('mousemove', function (event) {
      //console.log( can1.mouseX, can1.mouseY);
      mX = can1.mouseX;
      mY = can1.mouseY;
    }, false);
  };
  // DRAW
  can1.draw = function () {
    // color stuff
    can1.stroke('white');
    can1.background(80);
    // get the FFT output
    let spectrum = fft.analyze();
    //DRAW spectrum shape logarithmically
    can1.beginShape();
     for (let i = 0; i < spectrum.length; i++) {
       can1.point(
         can1.map(can1.log(i), 0, can1.log(spectrum.length), 0, can1.width), //x axis
         can1.map(spectrum[i], 0, 255, can1.height, 0) //y axis
       );
     }
    can1.endShape();
  };
};
// -----------------------------------------------------------------------------
// P5JS : CANVAS 2 : controler
var controler = function(can2){
  // Instruments
  let mrNoisy; // noise object
  // Controls (IU)
  let playButton, stopButton; // IU elements

  // SETUP
  can2.setup = function () {
    // Get size of the window
    var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    x = win.innerWidth || docElem.clientWidth || body.clientWidth,
    y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
    // set Canvas size
    let canvas2 = can2.createCanvas(x, y*17/30) ;
    canvas2.position(0,y*1/10)

    // Instruments declaration
    mrNoisy = new p5.Noise('brown')
    mrNoisy.amp(0.1);

    // Instruments Setup

    // Controls
    playButton = can2.createButton('play');
    playButton.position(10, 10);
    playButton.mousePressed(()=>{mrNoisy.start();});

    stopButton = can2.createButton('stop');
    stopButton.position(10, 40);
    stopButton.mousePressed(()=>{mrNoisy.stop();});
  };
  can2.draw = function () {
    can2.background(150);
    console.log(mX,mY);
  };
};

ctrl = new p5(controler, "controler");
spec = new p5(spectrum, "spectrum");
