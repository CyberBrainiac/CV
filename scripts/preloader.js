"use strict";

function addPreloader(callback = () => {}) { //Return{preloader control}
  let preloaderControl = {
    toggleOverlay,
    get state() {return _preloaderState},
  }

  let _preloaderState = 1; //1 - on; 0 - off
  let overlay = document.getElementById("overlay");
  let overlayContent = document.createElement("div");
  let preloadHeader = document.createElement("h1");
  overlay.style.width = document.documentElement.clientWidth + "px";
  overlay.style.height = document.documentElement.clientHeight + "px";

  /*create gear images*/
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
    try {
      gearAnimation() //коли остання картинка завантажиться, починаю анімацію
    } catch (err) {
     console.log(`GearAnimationError > ${err.stack}`);
    }
  };


  preloadHeader.textContent = "LOADING";
  overlayContent.classList.add("overlayContent");
  overlayContent.append(preloadHeader);
  overlayContent.append(biggear);
  overlayContent.append(gear);
  overlay.append(overlayContent);
  let overlayContentStyle = getComputedStyle(overlayContent);
  overlayContent.style.left = document.documentElement.clientWidth / 2 - parseInt(overlayContentStyle.width) / 2 + "px";



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
      addPreloader(callback);
    }
  }

  /*ВАЖЛИВО! для швидкодії розгорнути callback*/
 //сайт завантажується надто швидко, для того, щоб роздивитися цю чудову анімацію ;)
  overlay.ontransitionend = (ev) => {
    overlay.ontransitionend = "";
    callback(preloaderControl);
  }
}
