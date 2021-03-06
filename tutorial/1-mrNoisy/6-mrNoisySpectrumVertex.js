// --------------------------------------------------------------------
// Autor : FouVReaux
// Date  : 22/01/2020
// Lang  : Node JS
// --------------------------------------------------------------------
// 4d tutorial : Noise generator with full button
// --------------------------------------------------------------------
// Based on the youtube video :
// https://youtu.be/OjBcx7OVdCI?list=PLLgJJsrdwhPywJe2TmMzYNKHdIZ3PASbr
//
// References from :
// https://p5js.org/reference/#/p5.Noise
//
// Notes:
// ------
// Copy/paste this code in editor.p5js.org editor

// global declarations
let mrNoisy; // noise object
let playButton, stopButton, chooseNoise, setVolume; // IU elements
let toggleOnOff;
let fft;

// global initializations
function setup() {

  createCanvas(400,400);

  mrNoisy = new p5.Noise('white')
  mrNoisy.amp(0.1);

  fft = new p5.FFT();

  stroke('white');

  // on and off button
  toggleOnOff = createButton("Play");
  toggleOnOff.position(10,10).style('font-family', 'courier');
  toggleOnOff.mousePressed(function(){
    if (mrNoisy.started) {
      mrNoisy.stop();
      toggleOnOff.html('Play');
    } else {
      mrNoisy.start();
      toggleOnOff.html('Stop');
    }
  });

  chooseNoise = createSelect();
  chooseNoise.position(110,10).style('font-family', 'courier');
  chooseNoise.option('white');
  chooseNoise.option('pink');
  chooseNoise.option('brown');
  chooseNoise.changed(function(){
    console.log(chooseNoise.value());
    fill(chooseNoise.value());
    stroke(chooseNoise.value());
    mrNoisy.setType(chooseNoise.value());
  });

  setVolume = createSlider(-60, 0, -60, 1); // from, to, init, step // -60dB -> 0dB
  setVolume.position(110, 60).style('font-family', 'courier');
  setVolume.input(function(){
    if (setVolume.value() > -56){
        // amplitude = 10^(dB/20)
        // pow(base,exposent)
        // pow(10, setVolume.value()/20)
        mrNoisy.amp(pow(10, setVolume.value() / 20), 0.1);//smooth the move of the silder
    } else {
        mrNoisy.amp(map(setVolume.value(), -60, -56, 0, 0.0016), 0.1); //0.01 sloop : smooth the move of the silder
    }
  });
}

function draw() {
  background(80);
  //every frame, create an array containing spectrum data from fft
  let spectrum = fft.analyze();
  //DRAW spectrum shape logarithmically
  beginShape();
    vertex(0, height);
    for (let i = 0; i < spectrum.length; i++) {
      vertex(
        map(log(i), 0, log(spectrum.length), 0, width), //x axis
        map(spectrum[i], 0, 255, height, 0) //y axis
      );
    }
    vertex(width, height);
  endShape();
}

// ---------------------------------------------
// Google update on autoplay policy
// this force the audioContext to start a startup
//new google autoplay policy: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
function touchStarted(){
  if (getAudioContext().state !== 'running'){
    getAudioContext().resume();
  }
}
