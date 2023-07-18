let song;
let amp;
let button;
let ang = 0;
const a = 1;
const b = 4;
const m = 10;
const sc = 70;

function preload() {
  song = loadSound("sound_assets/house_in_a_forest.mp3");
}
function setup() {
  createCanvas(256, 256);
  angleMode(DEGREES);
  colorMode(HSL);
  button = createButton("toggle");
  button.mousePressed(toggleSong);
  song.play();

  // Reduce bins to 64
  fft = new p5.FFT(0.8, 1024);
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
  beginShape();
  for (let i = 0; i < spectrum.length; i++) {
    let angle = map(i, 0, spectrum.length, 0, 360);
    let amp = spectrum[i];
    let sc = map(amp, 0, 256, 10, 220);
    let l = map(amp, 0, 256, 20, 100);
    //let b = map(amp, 0, 256, 4, 10);
    let r = a + (1 / b) * hyperbolicTan(cos(m * angle));

    let x = r * sc * cos(angle);
    let y = r * sc * sin(angle);

    fill(200, 100, l, 10);
    ellipse(0, 0, x, y);

    rotate(90);

    fill(250, 100, l, 10);
    ellipse(0, 0, y, x);
  }
  endShape();
  ang += 1;
}

function hyperbolicTan(theta) {
  let e = 2.71828;
  let l = pow(e, 2 * theta);
  return (l - 1) / (l + 1);
}
