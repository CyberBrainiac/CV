"use strict";

function addPreloader(callback = () => {}) { //Returns {} with preloader control
  let preloaderControl = {
    toggleOverlay,
    get state() {return _preloaderState}}

  let _preloaderState = 1; //1 - on; 0 - off
  let overlay = document.getElementById("overlay");
  let overlayContent = document.createElement("div");
  let preloadHeader = document.createElement("h1");
  let windowInnerWidth = document.documentElement.clientWidth;
  let windowInnerHeight = document.documentElement.clientHeight;
  overlay.style.width = windowInnerWidth + "px";
  overlay.style.height = windowInnerHeight + "px";

  let biggear = document.createElement("img");
  biggear.src = "images/biggear.svg";
  biggear.alt = "bigger gear";
  biggear.classList.add("gearAnimation");
  let gear = document.createElement("img");
  gear.src = "images/gear.svg";
  gear.alt = "gear";
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

  let overlayContentStyle = getComputedStyle(overlayContent);
  overlayContent.style.left = windowInnerWidth / 2 - parseInt(overlayContentStyle.width) / 2 + "px";


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


  function toggleOverlay(callback = () => {}) {
    if(_preloaderState === 1) { //off
      _preloaderState = 0;
      overlay.style.display = "none";
      while(overlay.lastChild) {
        overlay.removeChild(overlay.lastChild);
      }

    } else { //on
      _preloaderState = 1;
      overlay.style.display = "block";
      // gearAnimation();
      addPreloader(callback);
    }
  }

  /*ВАЖЛИВО! для швидкодії розгорнути callback*/
  setTimeout( () => callback(preloaderControl), 600) //сайт завантажується надто швидко, для того, щоб роздивитися цю чудову анімацію ;)
}
