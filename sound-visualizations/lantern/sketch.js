let song;
let amp;

let button;
let angle = 0;
let ang = 0;

const sc = 80;
let z = -10;
let ellipseWidth = 10;



function preload() {
  //song = loadSound("house_in_a_forest.mp3");
  song = loadSound("bright.m4a");
}

function setup() {
  createCanvas(512, 512, WEBGL);
  angleMode(DEGREES);
  colorMode(HSL);
  button = createButton("toggle");
  button.mousePressed(toggleSong);
  song.play();

  // Reduce bins to 64
  fft = new p5.FFT(0.5, 512);
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  let peakDetect = new p5.PeakDetect();
  peakDetect.onPeak(triggerBeat);
  noStroke();
  //translate(width / 2, height / 2);
  rotate(ang);

  for (let i = 0; i < spectrum.length; i++) {
    angle = map(i, 0, spectrum.length, 0, 360);

    let amp = spectrum[i];
    let sc = map(amp, 0, 256, 0, 250);
    let l = map(amp, 0, 256, 20, 90);
    let h = map(amp, 0, 256, 0, 60);
  
    let x = sc * cos(angle);
    let y = sc * sin(angle);
    // strokeWeight(i/spectrum.length);
    // stroke(h, 100, l, 10);
    // fill(h, 100, l, 10);
    // line(0, 0, x, y);
    // ellipse(x, y, 6, 6);
    let ratio = x / y;
    push();
    for (let j = 0; j < 360; j += 90) {
      rotate(j);
      //strokeWeight(i/spectrum.length);
      strokeWeight(3);
      //stroke(h, 100, l);
      fill(h, 100, l, 10);
      ellipse(0, ratio * 8, 2 * x, y);
      ellipse(0, ratio * 8, x, y);
    }
    pop();
  }
  if (spectrum.length > 360) {
    spectrum.splice(0, 1);
  }
  ang += 1;
}

function triggerBeat() {
  ellipseWidth += 1;
}
