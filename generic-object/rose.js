// Mathematical Roses
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/55-mathematical-rose-patterns

class Rose {
  constructor(_pos, _sc) {
    this.pos = _pos;
    this.d = 8;
    this.n = 6;
    this.sc = _sc;
    this.vol = 0.01;
    //this.expand = 1.0 + 2.0 * this.vol;
    this.k = this.n / this.d;
    //this.end = this.reduceDenominator(this.n, this.d);
    this.points = [];
  }

  reduceDenominator() {
    function rec(a, b) {
      return b ? rec(b, a % b) : a;
    }
    return this.d / rec(this.n, this.d);
  }

  addPoints(spectrum) {
    this.spectrum = spectrum;

    this.n = map(this.spectrum, 0, 255, 4, 10, 6);
    this.d = map(this.spectrum, 0, 255, 4, 6, 4);
    this.k = this.n / this.d;
    let r = 1;
    let end = this.reduceDenominator(this.n, this.d);
    for (let a = 0; a < 360 * end; a += 60) {
      //let r = this.sc * cos(this.k * a);
      let x = this.sc * cos(a);
      let y = this.sc * sin(a);
      this.points.push(createVector(x, y));
    }
  }

  reset() {
    this.points = [];
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

    let hue = map(spectrum, 0, 255, 180, 360);
    //hue = constrain(hue, 180, 360);
    let sat = 100;
    //var sat = map(volume, 0, 0.5, 80, 100);
    // var sat = map(someLevel, 0, 255, 40, 80);
    let bri = map(this.vol, 0, 0.5, 60, 100);
    //var bri = map(this.radius, 0, width/1.2, 80, 100);
    let alp = map(this.vol, 0, 0.5, 20, 100);
    //strokeWeight(3);
    //drawingContext.filter = "blur(" + str(blurAmount) + "px)";
    fill(hue, sat, bri, alp);
    this.drawShape();
  }
}
