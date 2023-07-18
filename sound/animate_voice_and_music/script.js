/** @type {HTMLCanvasElement} */

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Bar {
    constructor(x, y, width, height, color, index) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.index = index;
    }
    update(micInput) {
      this.height = micInput * 1000;
      const sound = this.height;
      if (sound > this.height) {
        this.height = sound;
      } else {
        this.height -= this.height * 0.03;
      }
    }
    draw(context, volume) {
      context.strokeStyle = this.color;
      context.fillStyle = this.color;
      context.lineWidth = this.width;
      context.save();
      context.rotate(this.index * 0.04);
      context.beginPath();
      context.moveTo(0, 0);
      context.bezierCurveTo(
        this.x / 2,
        this.y / 2,
        this.height * -0.5,
        this.height,
        this.x,
        this.y
      );
      context.stroke();
      context.restore();
    }
  }

  class Microphone {
    constructor(fftSize) {
      this.initialized = false;
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(
          function (stream) {
            this.audioContext = new AudioContext();
            this.microphone = this.audioContext.createMediaStreamSource(stream);
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = fftSize;
            const bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(bufferLength);
            this.microphone.connect(this.analyser);
            this.initialized = true;
          }.bind(this)
        )
        .catch(function (err) {
          alert(err);
        });
    }
    getSample() {
      this.analyser.getByteTimeDomainData(this.dataArray);
      let normSamples = [...this.dataArray].map((e) => e / 128 - 1);
      return normSamples;
    }
    getVolume() {
      this.analyser.getByteTimeDomainData(this.dataArray);
      let normSamples = [...this.dataArray].map((e) => e / 128 - 1);
      let sum = 0;
      for (let i = 0; i < normSamples.length; i++) {
        sum += normSamples[i] * normSamples[i];
      }
      let volume = Math.sqrt(sum / normSamples.length);
      return volume;
    }
  }
  const fftSize = 512;
  //const bar1 = new Bar(200, 200, 100, 300, "orangered", 1);
  const microphone = new Microphone(512);
  let bars = [];
  let barWidth = canvs.width / (fftSize / 2);
  function createBars() {
    for (let i = 0; i < fftSize / 2; i++) {
      //bars.push(new Bar(barWidth * i, 200, barWidth, 50, "red", i));
      let color = "hsl(" + i + ", 100%, 50%)";
      bars.push(new Bar(0, i * 0.5, 0.5, 250, color, i));
    }
  }
  createBars();

  let softVolume = 0;
  function animate() {
    if (microphone.initialized === true) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const samples = microphone.getSamples();
      const volume = microphone.getVolume();
      ctx.save();
      ctx.translate(canvas.width / 2 - 70, canvas.height / 2 + 50);
      bars.forEach(function (bar, i) {
        bars.update(samples[i]);
        bar.draw(ctx, volume);
      });
      ctx.restore();
      softVolume = softVolume * 0.9 + volume * 0.1;
      (snail.style.transform =
        'translate(-50%, -50%) scale(' + (1 + softVolume)),
        1 + softVolume + ')';
    }
    //bar1.draw(ctx, 1);
    requestAnimationFrame();
  }
  animate();
});
