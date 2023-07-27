// https://mathworld.wolfram.com/GearCurve.html
// https://help.tc2000.com/m/69445/l/755460-hyperbolic-functions-table

class Gear {
  constructor(_pos) {
    this.pos = _pos;
    this.a = 1;
    this.b = 10;
    this.m = 10;
    this.sc = 50;
    this.points = [];
    this.rot = 30;
    //this.st = _st;
    //this.c = _c;
    //this.col = color(this.c);
  }

  hyperbolicTan(theta) {
    let e = 2.71828;
    let l = pow(e, 2 * theta);
    return (l - 1) / (l + 1);
  }

  // We need to loop through curve once before creating object
  addPoints() {
    for (let theta = 0; theta < 361; theta += 1) {
      // Equationss for gear curve
      let r =
        1 + (1 / this.b) * this.hyperbolicTan(this.b * sin(this.m * theta));
      let x = this.sc * r * sin(theta);
      let y = this.sc * r * cos(theta);
      let p = createVector(x, y);
      if (this.points.length < 361) {
        this.points[theta] = p;
      } else {
        break;
      }
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
    let alp = map(this.vol, 0, 50, 20, 100);
    //strokeWeight(3);
    //drawingContext.filter = "blur(" + str(blurAmount) + "px)";
    fill(hue, sat, bri, alp);
    this.drawShape();
  }
}
