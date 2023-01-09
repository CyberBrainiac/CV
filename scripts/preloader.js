"use strict";

function addPreloader(callback = undefined) { //Returns {} with preloader control
  let preloaderControl = {
    toggleOverlay,
    get state() {return _preloaderState}}
  
  let _preloaderState = 1; //1 - on; 0 - off
  let overlay = document.getElementById("overlay");
  let overlayContent = document.createElement("div");
  let preloadHeader = document.createElement("h1");

  let biggear = document.createElement("img");
  biggear.src = "images/biggear.svg";
  biggear.classList.add("gearAnimation");
  let gear = document.createElement("img");
  gear.src = "images/gear.svg";
  gear.classList.add("gearAnimation");
  gear.style.left = "-2px";
  gear.style.top = "-20px";
  biggear.onload = () => {
    gearAnimation() //коли остання картинка завантажиться, починаю анімацію
  };

  preloadHeader.textContent = "LOADING";
  overlayContent.classList.add("overlayContent");
  overlayContent.append(preloadHeader);
  overlayContent.append(biggear);
  overlayContent.append(gear);
  overlay.append(overlayContent);


  function gearAnimation() {
    const step = 10;
    let deg = 0;

    let gearAnimIntervalId = setInterval(() => {
      if(_preloaderState) {
        deg += step;
        biggear.style.transform = `rotate(${deg}deg)`;
        gear.style.transform = `rotate(-${deg}deg)`;
      } else {
        clearInterval(gearAnimIntervalId);
      }
    }, 100);
  }


  function toggleOverlay() {
    if(_preloaderState === 1) { //off
      _preloaderState = 0;
      overlay.style.display = "none";
    } else { //on
      _preloaderState = 1;
      overlay.style.display = "contents";
      gearAnimation();
    }
  }

  callback(preloaderControl);
}
