let song;
let amp;

let button;
let angle = 0;
let ang = 0;
const a = 1;
const b = 10;
const m = 20;
const sc = 80;

// mathematical rose
let n = 4;
let d = 3;
let k = n / d;

function preload() {
  //song = loadSound("sound_assets/house_in_a_forest.mp3");
  song = loadSound("sound_assets/bright.m4a");
}

function setup() {
  createCanvas(512, 512);
  angleMode(DEGREES);
  colorMode(HSL);
  button = createButton("toggle");
  button.mousePressed(toggleSong);
  song.play();

  // Reduce bins to 64
  fft = new p5.FFT(0.8, 64);
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
  noStroke();
  translate(width / 2, height / 2);
  rotate(ang);

  for (let i = 0; i < spectrum.length; i++) {
    angle = map(i, 0, spectrum.length, 0, 360);

    let amp = spectrum[i];
    let sc = map(amp, 0, 256, 10, 350);
    let l = map(amp, 0, 256, 20, 90);
    let h = map(amp, 0, 256, 0, 60);
    let r = a + (1 / b) * hyperbolicTan(b + sin(m * angle));
    let x = r * sc * cos(angle);
    let y = r * sc * 1.5 * sin(angle);
    push();

    for (let j = 0; j < 360; j += 45) {
      rotate(j);
      fill(h, 100, l, 10);
      ellipse(0, 0, x, y);
    }

    pop();
  }

  ang += 0.1;
}

function reduceDenominator(numerator, denominator) {
  function rec(a, b) {
    return b ? rec(b, a % b) : a;
  }
  return denominator / rec(numerator, denominator);
}

function hyperbolicTan(theta) {
  let e = 2.71828;
  let l = pow(e, 2 * theta);
  return (l - 1) / (l + 1);
}
