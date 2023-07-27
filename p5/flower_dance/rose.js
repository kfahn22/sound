// Mathematical Roses
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/55-mathematical-rose-patterns
// https://editor.p5js.org/codingtrain/sketches/3kanFIcHd

class Rose {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.d = 8;
    this.n = 5;
    this.k = this.n / this.d;
    this.points = [];
  }

  addPoints() {
    for (
      let a = 0;
      a < 360 * this.reduceDenominator(this.n, this.d);
      a += 0.02
    ) {
      let r = 200 * cos(this.k * a);
      let x = r * cos(a);
      let y = r * sin(a);
      points.push(createVector(x, y));
    }
  }

  reduceDenominator() {
    function rec(a, b) {
      return b ? rec(b, a % b) : a;
    }
    return this.d / rec(this.n, this.d);
  }

  show() {
    push();
    translate(this.x, this.y);
    stroke(255);
    noFill();
    strokeWeight(2);
    beginShape();
    for (let p of points) {
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }
}
