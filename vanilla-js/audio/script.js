/** @type {HTMLCanvasElement} */

const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
const file = document.getElementById("fileupload");

let audioSource;
let analyser;

container.addEventListener("click", function () {
  const audio1 = document.getElementById("audio1");
  audio1.src = "music_assets/House In A Forest Loop.mp3";
  const audioCtx = new AudioContext();
  audio1.play();
  audioSource = audioCtx.createMediaElementSource(audio1);
  analyser = audioCtx.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination); // computer speakers
  analyser.fftSize = 2048; // default 256?
  const bufferLength = analyser.frequencyBinCount; // # of data values - half of fftSize
  const dataArray = new Uint8Array(bufferLength); // unassigned 8 bit integers

  const barWidth = 2; //canvas.width / 2 / bufferLength;
  let barHeight;
  let x = 0;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray); // between 0-255
    drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
    requestAnimationFrame(animate);
  }
  animate();
});

file.addEventListener("change", function () {
  console.log(this.files);
  const files = this.files;
  const audio1 = document.getElementById("audio1");
  //audio1.src = URL.createObjectURL(files[0]);
  //audio1.load();
  audio1.play();
  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = 2; // canvas.width / 2 / bufferLength;
  let barHeight;
  let x = 0;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequecyData(dataArray);
    drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
    requestAnimationFrame(animate);
  }
  animate();
});

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 1.5; // louder sounds produce longer bars
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    //ctx.rotate((i * Math.PI * 12) / bufferLength);
    ctx.rotate(i + (Math.PI * 12) / bufferLength);
    // const red = (i * barHeight) / 5;
    // const green = i * 4;
    // const blue = barHeight / 2;
    //ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
    const hue = 200 + i * 0.7;
    ctx.fillStyle = "hsl(" + hue + ",100%," + barHeight / 4 + "%)";
    ctx.fillRect(0, 0, barWidth, barHeight);
    x += barWidth;
    ctx.restore();
  }
  // for (let i = 0; i < bufferLength; i++) {
  //   barHeight = dataArray[i]; // louder sounds produce longer bars
  //   const red = (i * barHeight) / 5;
  //   const green = i * 4;
  //   const blue = barHeight / 2;
  //   ctx.fillStyle = "white";
  //   ctx.fillRect(
  //     x,
  //     canvas.height - barHeight - 30,
  //     barWidth,
  //     15
  //   );
  //   ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
  //   ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
  //   x += barWidth;
  // }
}

// class Bar {
//   constructor(x, y, width, height, color, index) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     this.color = color;
//     this.index = index;
//   }
//   update(micInput) {
//     this.height = micInput * 1000;
//     const sound = this.height;
//     if (sound > this.height) {
//       this.height = sound;
//     } else {
//       this.height -= this.height * 0.03;
//     }
//   }
//   draw(context, volume) {
//     context.strokeStyle = this.color;
//     context.fillStyle = this.color;
//     context.lineWidth = this.width;
//     context.save();
//     context.rotate(this.index * 0.04);
//     context.beginPath();
//     context.moveTo(0, 0);
//     context.bezierCurveTo(
//       this.x / 2,
//       this.y / 2,
//       this.height * -0.5,
//       this.height,
//       this.x,
//       this.y
//     );
//     context.stroke();
//     context.restore();
//   }
// }

// class Microphone {
//   constructor(fftSize) {
//     this.initialized = false;
//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then(
//         function (stream) {
//           this.audioContext = new AudioContext();
//           this.microphone = this.audioContext.createMediaStreamSource(stream);
//           this.analyser = this.audioContext.createAnalyser();
//           this.analyser.fftSize = fftSize;
//           const bufferLength = this.analyser.frequencyBinCount;
//           this.dataArray = new Uint8Array(bufferLength);
//           this.microphone.connect(this.analyser);
//           this.initialized = true;
//         }.bind(this)
//       )
//       .catch(function (err) {
//         alert(err);
//       });
//   }
//   getSample() {
//     this.analyser.getByteTimeDomainData(this.dataArray);
//     let normSamples = [...this.dataArray].map((e) => e / 128 - 1);
//     return normSamples;
//   }
//   getVolume() {
//     this.analyser.getByteTimeDomainData(this.dataArray);
//     let normSamples = [...this.dataArray].map((e) => e / 128 - 1);
//     let sum = 0;
//     for (let i = 0; i < normSamples.length; i++) {
//       sum += normSamples[i] * normSamples[i];
//     }
//     let volume = Math.sqrt(sum / normSamples.length);
//     return volume;
//   }
// }
// const fftSize = 512;
// //const bar1 = new Bar(200, 200, 100, 300, "orangered", 1);
// const microphone = new Microphone(512);
// let bars = [];
// let barWidth = canvs.width / (fftSize / 2);
// function createBars() {
//   for (let i = 0; i < fftSize / 2; i++) {
//     //bars.push(new Bar(barWidth * i, 200, barWidth, 50, "red", i));
//     let color = "hsl(" + i + ", 100%, 50%)";
//     bars.push(new Bar(0, i * 0.5, 0.5, 250, color, i));
//   }
// }
// createBars();

// let softVolume = 0;
// function animate() {
//   if (microphone.initialized === true) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     const samples = microphone.getSamples();
//     const volume = microphone.getVolume();
//     ctx.save();
//     ctx.translate(canvas.width / 2 - 70, canvas.height / 2 + 50);
//     bars.forEach(function (bar, i) {
//       bars.update(samples[i]);
//       bar.draw(ctx, volume);
//     });
//     ctx.restore();
//     softVolume = softVolume * 0.9 + volume * 0.1;
//     (snail.style.transform = "translate(-50%, -50%) scale(" + (1 + softVolume)),
//       1 + softVolume + ")";
//   }
//   //bar1.draw(ctx, 1);
//   requestAnimationFrame();
// }
// animate();
