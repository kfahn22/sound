// Open Game Art https://opengameart.org
// Music file is "Death is Just Another Path" by Otton Holmen
const button1 = document.getElementById("button1");
let audio1 = new Audio();
audio1.src = "path.wav";
button1.addEventListener("click", function () {
  //console.log('click');
  audio1.play();
  audio1.addEventListener("playing", function () {
    console.log("Audio 1 started playing!");
  });
  audio1.addEventListener("ended", function () {
    console.log("Audio 1 ended!");
  });
});
