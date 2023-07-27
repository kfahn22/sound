class Octogon {
  constructor(_pos, _sp) {
    this.pos = _pos;
   // this.vol = _vol;
    this.d = 10;
    this.sp = _sp;
    this.vol = 0.01;
    //this.expand = 1.0 + 2.0 * this.vol;
    this.points = [];
  }

  addPoints(spectrum) {
    this.d = map(spectrum, 0, 255, 40, 2);
   // this.sp = int(map(spectrum, 0, 255, 8, 4));
    for (let a = 0; a < 360; a += this.sp * 10) {
      let x = this.d * cos(a);
      let y = this.d * sin(a);
      this.points.push(createVector(x, y));
    }
  }

  // use FFT bin level to change speed and diameter
  update(spec) {
    this.spectrum = spec;
    //this.pos.y += this.speed.y / map(this.spectrum, 0, 255, 0.25, 1);
    //this.pos.y += this.speed.y / map(this.spectrum, 0, 255, -4, 4);
    this.pos.y += this.speed.y * map(this.spectrum, 0, 255, 0.1, 0.8);
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
