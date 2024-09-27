"use strict";

const playNpauseBtn = document.querySelector("#play-pause");
const video = document.querySelector("video");
const rewindBtn = document.querySelector("#rewind");
const fastForwardBtn = document.querySelector("#fast-forward");
const volumeBtn = document.querySelector("#volume");
const progressIndicator = document.querySelector("#progress-indicator");
const progressBar = document.querySelector("#progress-bar");

function playNpauseFn() {
  video.paused ? video.play() : video.pause();
}

function updatePlayNPauseIcon() {
  const icon = playNpauseBtn.querySelector("i");
  icon.textContent = "";

  icon.textContent = video.paused ? "play_arrow" : "paused";
}

function rewindNForwardFn(type) {
  video.currentTime += (type === "rewind" ? -10 : 10);
}

function muteAndUnmuteFn(){
  video.muted = video.muted ? false : true;
}

function updateVolumeIcon() {
  const icon = volumeBtn.querySelector("i");
  icon.textContent = "";

  icon.textContent = video.muted ? "volume_off" : "volume_up";
}

function updateProgress() {
  const progressPercentage = (video.currentTime / video.duration) * 100;

  progressIndicator.style.width = `${progressPercentage}%`
}

function seekingFn(e) {
  const updatedTime = (e.offsetX / progressBar.offsetWidth) * video.duration;

  video.currentTime = updatedTime;
}

video.addEventListener("play", updatePlayNPauseIcon);
video.addEventListener("pause", updatePlayNPauseIcon);
video.addEventListener("click", playNpauseFn);
playNpauseBtn.addEventListener("click", playNpauseFn);
rewindBtn.addEventListener("click", () => rewindNForwardFn('rewind'));
rewindBtn.addEventListener("click", () => rewindNForwardFn('forward'));
video.addEventListener("volumechange", updateVolumeIcon);
volumeBtn.addEventListener("click", muteAndUnmuteFn);
video.addEventListener("timeupdate", updateProgress);


// Seeking functionality
let mouseIsDown = false;

progressBar.addEventListener("mousedown", () => (mouseIsDown = true));
progressBar.addEventListener("mouseup", () => (mouseIsDown = false));
progressBar.addEventListener("click", seekingFn);
progressBar.addEventListener("mousemove", (e) => mouseIsDown && seekingFn);


window.addEventListener("keyup", (e) => {
  if(e.code === "Space") {
    playNpauseFn();
  } else if (e.code === "ArrowLeft") {
    rewindNForwardFn('rewind');
  } else if (e.code === "ArrowRight") {
    rewindNForwardFn('forward');
  } else {
    return;
  }
});

