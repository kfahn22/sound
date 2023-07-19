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
let c;
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
    let size = map(amp, 0, 256, 0, 3);
    let x = sc * a * cos(angle);
    let y = sc * b * sin(angle);
    c = color(h, 100, l, 10);
   stroke(h, 100, l, 10);

    // create kaleidescope effect
    push();
    for (let j = 0; j < 360; j += 45) {
      rotate(j);
      // rect(0, 0, x, y, 10, 10, 10, 10);
      // rect(x, y, size, size, 20, 20, 20, 20);
      drawShape(x, y, size, 5, size);
    }
    pop();
  }

  ang += 1;
}

function drawShape(x, y, radius, inset, n) {
  strokeWeight(2);
  noFill();
  //stroke(255);
  push();
  translate(x, y);
  beginShape();
  vertex(0, inset * radius);
  for (i = 0; i < n; i++) {
    //push();
    rotate(PI / n);
    bezierVertex(width, inset*radius, inset*radius, height/2, 0, inset * radius);
    // // pop();
    // rotate(PI / n);
    // line(-radius * inset, 0, 0, 0 - radius * inset);
  }
  endShape();
  pop();
}

function drawSeed(x, y, radius, inset, n) {
  strokeWeight(2);
  noFill();
  //stroke(255);
  push();
  translate(x, y);
  beginShape();
  vertex(0, 0 - inset * radius);
  for (i = 0; i < n; i++) {
    //push();
    rotate(PI / n);
    bezierVertex(-radius * inset, 0, 0, radius, 0, -radius * inset);
    // // pop();
    // rotate(PI / n);
    // line(-radius * inset, 0, 0, 0 - radius * inset);
  }
  endShape();
  pop();
}