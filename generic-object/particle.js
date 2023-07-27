// For more info on blur, see 10X Faster Blur Effect in p5.js by Kazulki Umeda
// https://www.youtube.com/watch?v=s7CTmJt0NfI

// r1 = r2  & adj = n get regular shape
// adj determines whether shape is
// n is number of sides

class Particle {
  constructor(_pos, _sc, _n) {
    // this.r = 100;
    this.inset = 0.5;
    this.adj = 20;
    this.points = [];
    this.n = 12;
    this.pos = _pos;
    this.vol = 0.01;
    // this.diameter =
    //   map(this.spectrum, 0, 255, 10, 50) * this.scale * this.expand;
    this.scale = random(0, 2);
    this.speed = createVector(0, random(0, 2));
    // this.scale = _sc;
    // this.speed = createVector(0, random(0, 2));
    this.diameter = 50;
    //this.spectrum = 0;
    this.expand = 1.0 + 2.0 * this.vol;
  }

  addPoints(spectrum) {
    this.spectrum = spectrum;
    this.n = map(this.spectrum, 0, 255, 4, 24, 2);
    //this.vol = vol;
    for (let i = 0; i < this.n; i++) {
      let angle = (360 * i) / this.n;
      let x = cos(angle) * this.diameter;
      let y = sin(angle) * this.diameter;
      this.points.push(createVector(x, y));
      angle += 360 / this.adj;
      x = cos(angle) * this.diameter * this.inset;
      y = sin(angle) * this.diameter * this.inset;
      this.points.push(createVector(x, y));
    }
    //console.log(this.points.length);
    return this.points;
  }

  reset() {
    this.points = [];
  }

  // use FFT bin level to change speed and diameter
  update(spec) {
    this.spectrum = spec;
    //this.pos.y += this.speed.y / map(this.spectrum, 0, 255, 0.25, 1);
    //this.pos.y += this.speed.y / map(this.spectrum, 0, 255, -4, 4);
    this.pos.y += this.speed.y *  map(this.spectrum, 0, 255, 0.1, 0.8);
    //this.pos.x += this.speed.x / map(this.spectrum, 0, 255, -3, 3);
    if (this.pos.y > height) {
      this.pos.y = 0;
    }
    // if (this.pos.x > width) {
    //   this.pos.x = 0;
    // }
    // } else if (this.pos.y < 0) {
    //   this.pos.height = height;
    // }
  }

  drawShape() {
    push();
    translate(this.pos.x, this.pos.y);
    beginShape();
    for (let point of this.points) {
      vertex(point.x, point.y);
    }
    endShape(CLOSE);
    pop();
  }

  show(vol, spectrum, blurAmount) {
    this.vol = vol;
    // this.diameter =
    //   map(spectrum, 0, 255, 50, 0) * this.scale * this.expand;

    let hue =  map(spectrum, 0, 255, 180, 360);
    //hue = constrain(hue, 180, 360);
    let sat = 100;
    //var sat = map(volume, 0, 0.5, 80, 100);
    // var sat = map(someLevel, 0, 255, 40, 80);
    let bri = map(this.vol, 0, 0.5, 60, 100);
    //var bri = map(this.radius, 0, width/1.2, 80, 100);
    let alp = map(this.vol, 0, 0.5, 20, 100);
    //strokeWeight(3);
    drawingContext.filter = "blur(" + str(blurAmount) + "px)";
    fill(hue, sat, bri, alp);
    this.drawShape();
  }
}
