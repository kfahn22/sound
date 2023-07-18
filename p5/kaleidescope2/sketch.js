// Code base from Daniel Shiffman

// Music by syncopika CC BY-3.0
// https://opengameart.org/content/happy-bgm-090719

let song;
let amp;

let button;
let angle = 0;
let ang = 0;
let a = 0.5;
let b = 1;
const sc = 80;

function preload() {
  song = loadSound("happy.wav");
}

function setup() {
  createCanvas(512, 512);
  angleMode(DEGREES);
  rectMode(CENTER);
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
    let sc = map(amp, 0, 256, 5, 400);
    let l = map(amp, 0, 256, 20, 90);
    //let h = map(amp, 0, 256, 0, 60);  //orange and yellow
    let h = map(amp, 0, 256, 230, 360);
    let size = map(amp, 0, 256, 0, 8);
    let x = sc * a * cos(angle);
    let y = sc * b * sin(angle);
    fill(h, 100, l, 10);

    // create kaleidescope effect
    push();
    for (let j = 0; j < 360; j += 45) {
      rotate(j);
      rect(x, y, size, size, 10, 10, 10, 10);
      rect(0, 0, x, y, 10, 10, 10, 10);
    }
    pop();
  }

  ang += 1;
}
