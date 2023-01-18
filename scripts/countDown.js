"use strict";

function createTimer(container, resOfAdaptDesign) {
    let timerContainer = document.createElement("div");
    timerContainer.classList.add("timerStyle");
    timerContainer.style.fontSize = resOfAdaptDesign.fontSize * 3 + "px";
    container.appendChild(timerContainer);

    class Clock {
        constructor(container) {
            this.name = "clock";
            this.template = "d:h:m:sec";
            this.currentDate = new Date();
            this.container = container;
        }

        render() {
            let date = new Date();
            let days = '00';
            let hours = date.getHours();
            if (hours < 10) hours = '0' + hours;
            if (hours == 24) hours = '00';
            let mins = 60 - date.getMinutes();
            if (mins < 10) mins = '0' + mins;
            if (mins == 60) mins = '00';
            let secs = 60 - date.getSeconds();
            if (secs < 10) secs = '0' + secs;
            if (secs == 60) secs = '00';
            let output = this.template
                .replace('d', days)
                .replace('h', hours)
                .replace('m', mins)
                .replace('sec', secs);
            this.container.textContent = output;

            this.container.classList.add("blink");
            setTimeout(() => {
                this.container.classList.remove("blink");
            }, 100);
        }

        stop() {
            clearInterval(this.timer);
        }

        start() {
            this.render();
            this.timer = setInterval(() => this.render(), 1000);
        }
    }

    return new Clock(timerContainer);
}
