"use strict";

function adaptiveDesign(preloaderControl) { /*Returns objectWithStyle or Error or null*/
  let navigationLinkArr = document.querySelectorAll(".burger-menu_nav > a");
  let menuButton = document.querySelector(".burger-menu_button");
  let background = document.querySelector(".pageBackground");
  let pageContent = document.querySelector(".pageContent");
  let menu = document.querySelector(".burger-menu");
  let darkBackgroundColor = "#1B262C";
  let lightBackgroundColor = "#BBE1FA";
  let additionalLightBackgroundColor = "#3CAE8D5";
  let additionalDarkBackgroundColor = "#28016B";
  let contrastColor = "#E08316";
  let idInterval_blinkLine;
  let pageLanguage = "ua";
  let drawDesignCount = 0;
  let cornerCircleRadius;
  let cardContentWorkHeight;
  let cardContentProjHeight;
  let windowInnerHeight;
  let windowInnerWidth;
  let buttonLines = [];
  let fontSize;

  const userDevice = function checkUserDev() {
  /*визначення типу пристрою клієнта*/
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return "Mobile";
  } else {
    return "PC";
  }
  }();

  drawDesign();

  function drawDesign() {
    windowInnerWidth = document.documentElement.clientWidth;
    windowInnerHeight = document.documentElement.clientHeight;

    try {
      /* f() for build content */
      adaptiveBodySize();
      adaptiveImage();
      adaptiveBurgerMenu();
      adaptiveScillsContainer();
      adaptivePurposeContainer();
      adaptiveContactContainer();
      adaptiveWorkContainer();
      adaptiveLanguageContainer();
      createTimer();
      adaptiveProjectContainer()
      
      /* f() for make site beauty */
      correctExtraHeight();
      drawHeaderBackground();
      drawBackgroundS1();
      drawBackgroundS1_P1();
      drawBackgroundS1_P2();
      drawBackgroundS2();
      drawBackgroundS3();
      drawBackgroundS4();
      drawFooterBackground();
    } catch (error) {
      console.log(`drawDesign > ${error.stack}`);
    }

    let mainPromise = new Promise( (resolve, reject) => {
      window.onresize = () => {
        if(windowInnerWidth != document.documentElement.clientWidth) {//цікавить тільки зміна ширини
          window.onresize = "";
          background.style.zIndex = "50";
          resolve("true");
          // preloaderControl.toggleOverlay(resolve);
        }
      }

    }).then((res) => {
      /*чистка menu handler та інтервалів*/
      if(menu.classList.contains("burger-menu_active")) {
        let navigationBackground = document.querySelector(".burger-menu_nav");
        navigationBackground.style.transitionDuration = "0s";
        menu.classList.toggle("burger-menu_active");
        animateMenuNavigation();
      }

      clearInterval(idInterval_blinkLine);
      document.querySelector(".burger-menu_button").innerHTML = '';
      buttonLines.length = 0;
      for(const link of navigationLinkArr) {
        link.removeEventListener("click", animateMenuButton);
      }
      menuButton.onclick = '';
      document.getElementById("changeLanguageBut").onclick = '';
      document.getElementById("changeLanguageBut").removeEventListener("click", animateMenuButton);


      /*чистка button handler в workContainer*/
      let workContainer = document.querySelector(".work-experience");
      let workButtonArr = workContainer.querySelectorAll(".buttonCardInfo");
      let workCardContentArr = workContainer.querySelectorAll(".card-content");

      if(workContainer.classList.contains("mobile")) {
        workContainer.classList.remove("mobile");

        for (const workButton of workButtonArr) {
          workButton.removeEventListener("click", workButton_clickHandler);
          workButton.style.display = "none";
        }

        for (const cardContent of workCardContentArr) {
          cardContent.style.display = "block";
        }
      }

      /*чистка button handler в projectsContainer*/
      let projContainer = document.querySelector(".projects");
      let projButtonArr = projContainer.querySelectorAll(".buttonCardInfo");
      let projCardContentArr = projContainer.querySelectorAll(".card-content");


      if(projContainer.classList.contains("mobile")) {
        projContainer.classList.remove("mobile");

        for (const projButton of projButtonArr) {
          projButton.removeEventListener("click", projButton_clickHandler);
          projButton.style.display = "none";
        }

        for (const cardContent of projCardContentArr) {
          cardContent.style.display = "block";
        }
      }

      /*перемальовую дизайн сторінки*/
      drawDesign();
      return("true");

    }).catch((err) => {
      console.log("Error in window resize Promise \n" + err.message);
    })

    if(drawDesignCount == 0) {
      drawDesignCount++;
      // preloaderControl.toggleOverlay();
    } else {
      drawDesignCount++;
      background.style.zIndex = "-1";
    }
  }


  function elementOffset(elem) {
    let el = elem.getBoundingClientRect();
    let scrolltop = Math.round(document.body.scrollTop + el.top);
    let scrollleft = Math.round(document.body.scrollLeft + el.left);
    let bottom = Math.round(el.bottom);
    let right = Math.round(el.right);

    return {top: scrolltop, left: scrollleft, bottom: bottom, right: right}; //повертає реальне положення елемента на сторінці
  }


  function adaptiveBodySize() {
    let sectionsArr = document.getElementsByTagName("section");
    let header = document.querySelector(".header");
    let footer = document.querySelector(".footer");
    let footerStyle = getComputedStyle( document.querySelector("footer"));
    sectionsArr = document.getElementsByTagName("section");

    if(windowInnerWidth >= 990) {
      fontSize = 22;
      pageContent.style.marginLeft = header.style.marginLeft = (windowInnerWidth - 990) / 2 + "px";
      pageContent.style.width = header.style.width = "990px";
      footer.style.marginLeft = (windowInnerWidth - 990) / 2 + "px";
      footer.style.width = "990px";

    } else if(windowInnerWidth >= 768) {
      fontSize = 20;
      pageContent.style.marginLeft = header.style.marginLeft = "0px";
      pageContent.style.width = header.style.width = windowInnerWidth + "px";
      footer.style.marginLeft = "0px";
      footer.style.width = windowInnerWidth + "px";

    } else {
      fontSize = 16;
      pageContent.style.marginLeft = header.style.marginLeft = "0px";
      pageContent.style.width = header.style.width = windowInnerWidth + "px";
      footer.style.marginLeft = "0px";
      footer.style.width = windowInnerWidth + "px";
    }

    if(windowInnerHeight < 660) {
      for(let i = 0; i < sectionsArr.length; i++) {
        if(i == 0) {
          sectionsArr[i].style.height = "720px";
        } else {
          sectionsArr[i].style.height = "660px";
        }
      }

    } else {
      for(let i = 0; i < sectionsArr.length; i++) {
        if(i == 0) {
          sectionsArr[i].style.height = windowInnerHeight - header.clientHeight + "px";

        } else if (i == sectionsArr.length - 1) {
          sectionsArr[i].style.height = windowInnerHeight - parseInt(footerStyle.height) - parseInt(footerStyle.paddingTop) - parseInt(footerStyle.paddingBottom) + "px";

        } else {
          sectionsArr[i].style.height = windowInnerHeight + "px";
        }
      }
    }

    if(userDevice == "Mobile") {
      background.style.width = "1920px";
      background.style.height = "1920px";
    }

/*Add Font Size*/
    let h2 = document.getElementsByTagName("h2");
    [...h2].forEach((elem) => {
      elem.style.fontSize = fontSize + 4 + "px";
    });

    let h3 = document.getElementsByTagName("h3");
    [...h3].forEach((elem) => {
      elem.style.fontSize = fontSize + 3 + "px";
    });

    let buttonArr = document.getElementsByTagName("button");
    for (let button of buttonArr) {
      button.style.fontSize = fontSize + 2 + "px";
    }

    let spanArr = document.getElementsByTagName("span");
    for (let span of spanArr) {
      span.style.fontSize = fontSize + "px";
    }

    let pArr = document.getElementsByTagName("p");
    for (let p of pArr) {
      p.style.fontSize = fontSize + "px";
    }

    let timeElemArr = document.getElementsByTagName("time");
    for (let timeElem of timeElemArr) {
      timeElem.style.fontSize = fontSize + "px";
    }

    let liArr = document.getElementsByTagName("li");
    for (let li of liArr) {
      li.style.fontSize = fontSize + "px";
    }

/*Add unique Font Size*/
    let footerP = footer.querySelectorAll("p");
    let headerT = header.querySelector(".title");
    let aboutPArr = document.querySelectorAll(".about > p");
    let languagePArr = document.querySelectorAll(".language > p");
    let nameContainer = document.querySelector(".name");
    nameContainer.style.fontSize = fontSize + 2 + "px";
    let figcaptionArr = document.querySelectorAll(".img-proj-resume > figure > figcaption");

    if(windowInnerWidth >= 500) {
      for (const p of footerP) {
        p.style.fontSize = "36px";
      }
      headerT.style.fontSize = "52px";

    } else {
      for (const p of footerP) {
        p.style.fontSize = "26px";
      }
      headerT.style.fontSize = "42px";
    }

    for (const aboutP of aboutPArr) {
      aboutP.style.fontSize = fontSize + 2 + "px";
    }

    for (const languageP of languagePArr) {
      languageP.style.fontSize = fontSize + 2 + "px";
    }

    for (const figcaption of figcaptionArr) {
      figcaption.style.fontSize = fontSize - 2 + "px";
    }
  }


  function adaptiveImage() {
    let imgContainer = document.querySelector(".plot-1-1");
    let imgContainer_width = parseInt( getComputedStyle(imgContainer).width);
    let imgContainer_center = {x: imgContainer_width / 2, y: imgContainer_width / 2} // background image намальований під кутом 45 градусів, довжина = ширені.
    let imgCaption = document.querySelector(".img-caption");
    let statusContent = document.querySelector(".status-cont");

    let photo = document.querySelector('.myPhoto');
    photo.style.height = imgContainer_width / 1.3 + "px";
    photo.style.width = imgContainer_width / 1.3 + "px";
    let imgRadius = parseInt(photo.style.width) / 2;

    photo.style.marginTop = (imgContainer_center.y - imgRadius) + "px";
    photo.style.marginLeft = (imgContainer_center.x - imgRadius) + "px";
    imgCaption.style.marginTop = imgRadius / 2 + "px";
  }


  function adaptiveBurgerMenu() {
    let pageContentStyle = getComputedStyle(pageContent);
    let contentWidth = parseInt(pageContentStyle.width);

/*Menu Button Style*/
    menuButton.style.top = windowInnerHeight * 0.02 + "px";
    menuButton.style.left = Math.trunc(
      (parseFloat(pageContent.style.marginLeft) + contentWidth) - contentWidth / 8) + "px";
    menuButton.style.width = Math.trunc(contentWidth / 12) + "px";

    if( parseInt(menuButton.style.width) > 60) {
      menuButton.style.height = menuButton.style.width = "60px";
    } else if (parseInt(menuButton.style.width) < 35) {
      menuButton.style.height = menuButton.style.width = "36px";
    } else {
      menuButton.style.height = menuButton.style.width;
    }

/*Menu Navigation Style*/
    let menuNav = document.querySelector(".burger-menu_nav");
    let menuNavWidth = contentWidth / 3;
    let changeLanguageBut = document.getElementById("changeLanguageBut");


    if(menuNavWidth < 156) {
      menuNav.style.width = "156px";
    } else {
      menuNav.style.width = menuNavWidth + "px";
    }

    menuNav.style.backgroundColor = additionalDarkBackgroundColor;
    menuNav.style.left = parseFloat(pageContent.style.marginLeft) + (contentWidth - parseInt(menuNav.style.width)) + "px";
    let linksOffsetTop = parseInt(menuButton.style.top) * 4 + parseInt(menuButton.style.height) + "px";
    navigationLinkArr[0].style.marginTop = linksOffsetTop;

    changeLanguageBut.onclick = () => {
      (pageLanguage === "ua") ? pageLanguage = "en" : pageLanguage = "ua";
      changeLanguage({pageLanguage});
    };

/*Create Lines*/
    let buttonLinesOffset = parseInt(menuButton.style.height) / 4; //проміжок між лініями
    let buttonLinesTopOffset = parseInt(menuButton.style.top); //відступ з гори до ліній меню

    for(let i = 0; i < 3; i++) {
      let line = document.createElement("span");
      line.classList.add("burger-menu_lines");
      // line.style.backgroundColor = contrastColor;
      if(buttonLinesOffset < 12) line.style.height = "4px";
      buttonLines.push(line);
      menuButton.appendChild(line);
    }

    for(let i = 0; i < 3; i++) { //початкове положення ліній
      buttonLines[i].style.top = buttonLinesTopOffset + "px";
      buttonLines[i].style.width = menuButton.style.width;
        
      setTimeout(() => {buttonLines[i].style.marginTop = buttonLinesOffset * (i + 1) + "px", 10});
    }
    idInterval_blinkLine = createBlinkEffect(buttonLines); //очищую інтервал мерехтіння кнопки меню

/*Create overlay*/
    let buttonOverlay = document.querySelector(".buttonOverlay");
    buttonOverlay.style.top = menuButton.style.top;
    buttonOverlay.style.left = menuButton.style.left;
    buttonOverlay.style.width = parseInt(menuButton.style.width) + 2 + "px";
    buttonOverlay.style.height = menuButton.style.height;

/*Menu Button Handlers*/
    menuButton.onclick = () => animateMenuButton();
    changeLanguageBut.addEventListener("click", animateMenuButton);
    for(let link of navigationLinkArr) {
      link.addEventListener("click", animateMenuButton);
    }
  }


  function createBlinkEffect(arrOfElements) {
    return setInterval(() => {
      for (const elem of arrOfElements) {
        (elem.style.borderColor == "black") ? elem.style.borderColor = "white" : elem.style.borderColor = "black";
      }
    }, 1000);
  }


  function animateMenuButton() {
    let buttonOverlay = document.querySelector(".buttonOverlay");
    buttonOverlay.classList.add("buttonOverlay_active");
    let buttonLinesOffset = parseInt(menuButton.style.height) / 4; //проміжок між лініями

    if(menu.classList.contains("burger-menu_active")) {
      deactivateAnimation();
    } else {
      activateAnimation();
    }

    function deactivateAnimation() {
/*деактивація меню 1 крок*/
      menu.classList.toggle("burger-menu_active");
      animateMenuNavigation();

      for(let i = 0; i < 3; i++) {
        switch (i) {
          case 0:
            buttonLines[i].style.transform = "rotate(0deg)";
            buttonLines[i].addEventListener("transitionend", handlerAnimOff);
            break;
          case 2:
            buttonLines[i].style.transform = "rotate(0deg)";
            break;
        }
      }

/*деактивація меню 2 крок*/
      function handlerAnimOff() {

        for(let i = 0; i < 3; i++) {
          buttonLines[i].style.marginTop = buttonLinesOffset * (i + 1) + "px";
          idInterval_blinkLine = createBlinkEffect(buttonLines);

          switch (i) { //лінії розходяться, середня повертаеться
            case 0:
            buttonLines[i].removeEventListener("transitionend", handlerAnimOff);
              break;
            case 1:
            buttonLines[i].style.marginLeft = "0px";
            buttonLines[i].style.backgroundColor = contrastColor;
            buttonLines[i].style.borderTop = "1px solid white";
            buttonLines[i].style.borderBottom = "1px solid white";
              break;
          }
        }
      }
    }

    function activateAnimation() {
/*активація меню 1 крок*/
      clearInterval(idInterval_blinkLine);
      for(let i = 0; i < 3; i++) {
        buttonLines[i].style.borderColor = "white";

        switch (i) {//лінії сходяться, середня відкидається
          case 0:
            buttonLines[i].addEventListener("transitionend", handlerAnimOn);
            buttonLines[i].style.marginTop = parseInt(buttonLines[i].style.marginTop) + buttonLinesOffset + "px";
            break;
          case 1:
            buttonLines[i].style.marginTop = "15px";
            buttonLines[i].style.marginLeft= "15px";
            buttonLines[i].style.backgroundColor = "transparent";
            buttonLines[i].style.border = "transparent";
            break;
          case 2:
            buttonLines[i].style.marginTop = parseInt(buttonLines[i].style.marginTop) - buttonLinesOffset + "px";
            break;
        }
      }

/*активація меню 2 крок*/
      function handlerAnimOn() {
        menu.classList.toggle("burger-menu_active");
        animateMenuNavigation();

        for(let i = 0; i < 3; i++) {
          switch (i) {
            case 0:
              buttonLines[i].removeEventListener("transitionend", handlerAnimOn);
              buttonLines[i].style.transform = "rotate(45deg)";
              break;
            case 2:
              buttonLines[i].style.transform = "rotate(-45deg)";
              break;
          }
        }
      }
    }
  }


  function animateMenuNavigation() {
    let buttonOverlay = document.querySelector(".buttonOverlay");
    let navigationBackground = document.querySelector(".burger-menu_nav");
    let changeLanguageBut = document.getElementById("changeLanguageBut");

    if(menu.classList.contains("burger-menu_active")) {
      activateAnimation();
    } else {
      deactivateAnimation();
    }

    function deactivateAnimation() {
      navigationBackground.style.height = "0";
      navigationLinkArr[0].style.borderTop = "none";

      navigationLinkArr[navigationLinkArr.length - 1].ontransitionend = () => {
        navigationLinkArr[navigationLinkArr.length - 1].ontransitionend = "";
        buttonOverlay.classList.remove("buttonOverlay_active");
      };

      for(let link of navigationLinkArr) {
        link.style.transitionDuration = "0";
        link.style.fontSize = "0px";
        link.style.color = "gray";
        link.style.borderBottom = "none";

        link.style.paddingTop = 0 + "px";
        link.style.paddingBottom = 0 + "px";
      }

      changeLanguageBut.style.display = "none";
    }

    function activateAnimation() {
      navigationBackground.style.transitionDuration = "0.4s";
      navigationBackground.style.height = "100vh";

      navigationBackground.ontransitionend = () => {
        navigationBackground.ontransitionend = "";
        navigationLinkArr[0].style.borderTop = "1px solid white";

        navigationLinkArr[navigationLinkArr.length - 1].ontransitionend = () => {
          navigationLinkArr[navigationLinkArr.length - 1].ontransitionend = "";
          buttonOverlay.classList.remove("buttonOverlay_active");
        };

        for(let link of navigationLinkArr) {
          link.style.transitionDuration = "0.3s";
          link.style.fontSize = fontSize + "px";
          link.style.borderBottom = '1px solid white';
          link.style.paddingTop = windowInnerHeight * 0.02 + "px";
          link.style.paddingBottom = windowInnerHeight * 0.02 + "px";

          setTimeout(() => link.style.color = "white", 50);
        }

        changeLanguageBut.style.display = "block";
      }
    }
  }


  function adaptiveScillsContainer() {
    let liOffset = elementOffset(document.querySelector(".status-cont")).left - parseInt(pageContent.style.marginLeft);

    if(liOffset > 32) { //щоб не загубити маркування списку
      let scillsLiArr = document.querySelectorAll(".scills > ul > li");

      for (let li of scillsLiArr) {
        li.style.marginLeft = liOffset + "px";
      }
    }
  }


  function adaptivePurposeContainer() {

    let purposeContainer = document.querySelector(".aim");
    let pageContentOffset = elementOffset(document.querySelector(".pageContent"));
    let imgCaptionContainerOffset = elementOffset(document.querySelector(".img-caption"));
    let nameHeight = document.querySelector(".name").clientHeight;
  
    if(nameHeight > fontSize + 10) {
      purposeContainer.style.marginTop = imgCaptionContainerOffset.top + nameHeight / 2 - pageContentOffset.top + "px"; //розміщую на одній висоті з 2 рядком блока imgCaption
    } else {
      purposeContainer.style.marginTop = imgCaptionContainerOffset.top - pageContentOffset.top + "px"; //розміщую на одній висоті з блоком imgCaption
    }
  }


  function adaptiveContactContainer() {
    let contactPArr = document.querySelectorAll("div.contacts > p");

    for(let p of contactPArr) {
      p.children[0].style.fontSize = fontSize + "px"; //link fontSize
      p.style.marginLeft = parseInt(pageContent.style.width) * 0.1 + fontSize + "px"; //plot1 = 40% plot 2 = 50% разом 90%, отже для симетрії 10% відступ. Також додаю значення contacts.span::before
    }
  }


  function adaptiveWorkContainer() {
    let section2 = document.getElementById("section-2");
    let workContainer = document.querySelector(".work-experience");
    let workButtonArr = workContainer.querySelectorAll(".buttonCardInfo");
    let cardContentArr = section2.querySelectorAll("div.card-content");
    cardContentWorkHeight = Math.max(... [... cardContentArr].map((elem) => { return elem.clientHeight;}));

    if(workContainer.clientHeight + parseInt(pageContent.style.width) / 3 > parseInt(section2.style.height)) {
      workContainer.classList.toggle("mobile");

      for (let workButton of workButtonArr) {
        workButton.addEventListener("click", workButton_clickHandler);

        if(workButton.id.includes("moreInfo")) {
          workButton.style.display = "block";
        } else {
          workButton.style.display = "none";
        }
      }
      for (const cardContent of cardContentArr) {
        cardContent.style.display = "none";
      }

    } else {
      for (const cardContent of cardContentArr) {
        cardContent.style.display = "block";
      }
    }
  }


  function workButton_clickHandler() {
    let section2 = document.getElementById("section-2");
    let cardContentArr = section2.querySelectorAll("div.card-content");
    let workButtonArr = Array.from(section2.querySelectorAll(".buttonCardInfo"));
    let divMoreInfoArr = [];
    let divLessInfoArr = [];

    for(let button of workButtonArr) {
      if(button.id.includes("moreInfo")) {
        divMoreInfoArr.push(button);
      } else {
        divLessInfoArr.push(button);
      }
    }


    switch (this.id) {
      case "buttWork_moreInfo1":
        divMoreInfoArr[0].style.display = "none";
        divMoreInfoArr[1].style.display = "none";
        divLessInfoArr[0].style.display = "block";
        cardContentArr[0].style.display = "block";
        break;

      case "buttWork_moreInfo2":
        divMoreInfoArr[0].style.display = "none";
        divMoreInfoArr[1].style.display = "none";
        divLessInfoArr[1].style.display = "block";
        cardContentArr[1].style.display = "block";
        break;

      case "buttWork_lessInfo1":
        divLessInfoArr[0].style.display = "none";
        divMoreInfoArr[0].style.display = "block";
        divMoreInfoArr[1].style.display = "block";
        cardContentArr[0].style.display = "none";
        break;

      case "buttWork_lessInfo2":
        divLessInfoArr[1].style.display = "none";
        divMoreInfoArr[0].style.display = "block";
        divMoreInfoArr[1].style.display = "block";
        cardContentArr[1].style.display = "none";
        break;
    }
  }


  function adaptiveLanguageContainer() {
    let languageContainer = document.querySelector(".language");

    if(userDevice == "Mobile" && innerHeight > innerWidth) {
      languageContainer.style.top = "90%";
    } else if (userDevice == "Mobile" && innerHeight < innerWidth) {
      languageContainer.style.top = "80%";
    }
  }


  function createTimer() {
    class Clock {
      constructor(container) {
          this.name = "clock";
          this.template = "d:h:m:sec";
          this.currentDate = new Date();
          this.container = container;
      }

      render() {
          let date = new Date();
          let days = '01';
          let hours = 24 - date.getHours();
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

    if(drawDesignCount === 0) {
      let container = document.querySelector('.timer');
      let timerContainer = document.createElement("div");
      timerContainer.classList.add("timerStyle");
      timerContainer.style.fontSize = fontSize * 3 + "px";
      container.appendChild(timerContainer);
      container.style.backgroundColor = darkBackgroundColor;

      let clock = new Clock(timerContainer);
      clock.start();
    }
  }


  function adaptiveProjectContainer() {
    let section3 = document.getElementById("section-3");
    let timerContainer = document.querySelector(".timer");
    let timerContainerHeight = timerContainer.clientHeight;
    let projectsContainer = document.querySelector(".projects");
    let projButtonArr = projectsContainer.querySelectorAll(".buttonCardInfo");
    let cardContentArr = section3.querySelectorAll("div.card-content");

    if(timerContainerHeight + projectsContainer.clientHeight > section3.clientHeight) {
      cardContentProjHeight = Math.max(... [... cardContentArr].map((elem) => { return elem.clientHeight;}));
      projectsContainer.classList.toggle("mobile");

      for (const projButton of projButtonArr) {
        projButton.addEventListener("click", projButton_clickHandler);

        if(projButton.id.includes("moreInfo")) {
          projButton.style.display = "block";
        } else {
          projButton.style.display = "none";
        }
      }
      for (const cardContent of cardContentArr) {
        cardContent.style.display = "none";
      }

    } else {
      for (const cardContent of cardContentArr) {
        cardContent.style.display = "block";
      }
    }
  }


  function projButton_clickHandler() {
    let section3 = document.getElementById("section-3");
    let cardContentArr = section3.querySelectorAll(".card-content");
    let workButtonArr = Array.from(section3.querySelectorAll(".buttonCardInfo"));
    let divMoreInfoArr = [];
    let divLessInfoArr = [];

    for(let button of workButtonArr) {
      if(button.id.includes("moreInfo")) {
        divMoreInfoArr.push(button);
      } else {
        divLessInfoArr.push(button);
      }
    }

    switch (this.id) {
      case "buttProj_moreInfo1":
        divMoreInfoArr[0].style.display = "none";
        divMoreInfoArr[1].style.display = "none";
        divMoreInfoArr[2].style.display = "none";
        divLessInfoArr[0].style.display = "block";
        cardContentArr[0].style.display = "block";
        break;

      case "buttProj_moreInfo2":
        divMoreInfoArr[0].style.display = "none";
        divMoreInfoArr[1].style.display = "none";
        divMoreInfoArr[2].style.display = "none";
        divLessInfoArr[1].style.display = "block";
        cardContentArr[1].style.display = "block";
        break;

      case "buttProj_moreInfo3":
        divMoreInfoArr[0].style.display = "none";
        divMoreInfoArr[1].style.display = "none";
        divMoreInfoArr[2].style.display = "none";
        divLessInfoArr[2].style.display = "block";
        cardContentArr[2].style.display = "block";
        break;

      case "buttProj_lessInfo1":
        divLessInfoArr[0].style.display = "none";
        divMoreInfoArr[0].style.display = "block";
        divMoreInfoArr[1].style.display = "block";
        divMoreInfoArr[2].style.display = "block";
        cardContentArr[0].style.display = "none";
        break;

      case "buttProj_lessInfo2":
        divLessInfoArr[1].style.display = "none";
        divMoreInfoArr[0].style.display = "block";
        divMoreInfoArr[1].style.display = "block";
        divMoreInfoArr[2].style.display = "block";
        cardContentArr[1].style.display = "none";
        break;

      case "buttProj_lessInfo3":
        divLessInfoArr[2].style.display = "none";
        divMoreInfoArr[0].style.display = "block";
        divMoreInfoArr[1].style.display = "block";
        divMoreInfoArr[2].style.display = "block";
        cardContentArr[2].style.display = "none";
        break;
    }
  }


  function correctExtraHeight() {
    const sectionsArr = document.getElementsByTagName("section");
    const legalExtraHeight = 40;

    for(let i = 0; i < sectionsArr.length; i++) {
      switch (i) { //підлаштування висоти для кожної секції сайту

        case 0:
          let photoContainHeight = parseInt(getComputedStyle(document.querySelector(".photo")).height);
          let scillsContainHeight = parseInt(getComputedStyle(document.querySelector(".scills")).height);

          if(photoContainHeight + scillsContainHeight > parseInt(sectionsArr[i].style.height)) {
            sectionsArr[i].style.height = photoContainHeight + scillsContainHeight + legalExtraHeight / 2 + "px";

          } else if((parseInt(sectionsArr[i].style.height) - photoContainHeight - scillsContainHeight) > legalExtraHeight) {
            sectionsArr[i].style.height = photoContainHeight + scillsContainHeight + legalExtraHeight + "px";
          }
        break;

        case 1:
          let workContainerHeight = document.querySelector(".work-experience").clientHeight;
          let languageContainer = document.querySelector(".language");
          let educationContainerHeight = document.querySelector(".education").clientHeight;
          let maxContainersHeight = Math.max(workContainerHeight, educationContainerHeight);
          let plot2_1_width = parseInt(pageContent.style.width) / 2; //висота фонa-трикутника секції 2
          let section2Height = parseInt(sectionsArr[i].style.height);
          cardContentWorkHeight = cardContentWorkHeight + fontSize + 10;

          if(section2Height - maxContainersHeight - plot2_1_width > legalExtraHeight) {
            sectionsArr[i].style.height = maxContainersHeight + plot2_1_width + legalExtraHeight + "px";

          } else if (section2Height - workContainerHeight - cardContentWorkHeight < 0) {
            sectionsArr[i].style.height = workContainerHeight + cardContentWorkHeight + "px";

          } else if(section2Height - maxContainersHeight - languageContainer.clientHeight * 1.5 < 0) {
            sectionsArr[i].style.height = maxContainersHeight + languageContainer.clientHeight * 1.5 + "px";
          }


          if(plot2_1_width / languageContainer.clientHeight > 2) {
            languageContainer.style.top = "80%";
          }
        break;

        case 2:
          let section3 = sectionsArr[i];
          let section3Height = parseInt(section3.style.height);
          let timerContainerHeight = document.querySelector(".timer").clientHeight;
          let plot3_2 = document.querySelector(".plot-3-2");
          let plot3_2Height = plot3_2.clientHeight;
          cardContentProjHeight = cardContentProjHeight - fontSize * 2; //зайвий розмір кнопок що будуть видалені
          
          if(section3Height - timerContainerHeight - plot3_2Height != cardContentProjHeight) {
            section3.style.height = timerContainerHeight + plot3_2Height + cardContentProjHeight + "px";
          }
        break;

        case 3:
          let section4 = sectionsArr[i];
          let plot4_1 = document.querySelector(".plot-4-1");
          let plot4_2 = document.querySelector(".plot-4-2");

          if(parseInt(section4.style.height) - plot4_1.clientHeight - plot4_2.clientHeight > legalExtraHeight * 2) {
            section4.style.height = plot4_1.clientHeight + plot4_2.clientHeight + legalExtraHeight * 2 + "px";
          }
        break;
      }
    }
  }


  function drawHeaderBackground() {
    let header = document.getElementById("header");
    header.style.backgroundColor = lightBackgroundColor;

    let cardArr = document.querySelectorAll(".card");
    for (const card of cardArr) {
      card.style.backgroundColor = additionalLightBackgroundColor;
    }
  }


  function drawBackgroundS1() {
    let section1 = document.getElementById("section-1");
    section1.style.backgroundColor = lightBackgroundColor;
  }


  function drawBackgroundS1_P1() {
    let plot1 = document.querySelector(".plot-1-1");
    let plot1Style = getComputedStyle(plot1);
    let header = document.getElementById("header");
    let headerStyle = getComputedStyle(header);

    const headerCanvas = document.getElementById("headerCanvas");
    const headerCtx = headerCanvas.getContext("2d");
    const canvas = document.getElementById("canvasS1-P1");
    const ctx = canvas.getContext("2d");
    canvas.width = parseInt(plot1Style.width);
    canvas.height = parseInt(plot1Style.height);

    
    let backgroundWidth = parseInt(plot1Style.width);
    cornerCircleRadius = backgroundWidth / 5; //x+x+0.5x = FullSide; x = FullSide/2,5; 0.5x = FullSide/5; Де x - stick; 0.5x - radiusOfCornerCircle
    let backgroudStick = backgroundWidth / 2.5;
    let roundingRadius = 30; //коефіціент скруглення кутів
    let roundingLeg = roundingRadius / 2.414; //цей коэфіцієнт, означає значення тангенсу кута протилежного до радіусу

    headerCanvas.width = backgroudStick * 1.5 + 1; //створюю ефект накладання canvas на наступну секцію на 2 px для фіксу багу на смартфоні
    headerCanvas.height = parseInt(headerStyle.height) + 1;
    headerCanvas.style.top = "0px";
    headerCanvas.style.left = pageContent.style.marginLeft;
    
/*Image Background*/
    ctx.fillStyle = darkBackgroundColor;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(backgroudStick * 1.5, 0);
    ctx.lineTo(backgroundWidth - roundingLeg, backgroudStick - roundingLeg);
    ctx.arc(backgroundWidth - roundingRadius, backgroudStick + roundingLeg, roundingRadius, 3*Math.PI/1.7, 0, false);
    ctx.lineTo(backgroundWidth, backgroudStick * 2);
    ctx.arc(backgroudStick * 2, backgroudStick * 2, cornerCircleRadius, 0, Math.PI / 2, false);
    ctx.moveTo(backgroudStick * 2, backgroundWidth);
    ctx.lineTo(backgroudStick * 1 + roundingLeg, backgroundWidth);
    ctx.arc(backgroudStick * 1 + roundingLeg, backgroundWidth - roundingRadius, roundingRadius, Math.PI / 2, 3*Math.PI/4, false);
    ctx.lineTo(0, backgroudStick * 1.5);
    ctx.lineTo(0, 0);
    ctx.fill();

/*Heder Background*/
    headerCtx.fillStyle = darkBackgroundColor;
    headerCtx.beginPath();
    headerCtx.moveTo(0, 0);
    headerCtx.lineTo(0, headerCanvas.height);
    headerCtx.lineTo(backgroudStick * 1.5 + 1, headerCanvas.height);
    headerCtx.lineTo(backgroudStick * 1.5 - headerCanvas.height + 1, 0);
    headerCtx.lineTo(0, 0);
    headerCtx.fill();
  }


  function drawBackgroundS1_P2() {
    let plot2 = document.querySelector(".plot-1-2");
    let plot2Style = getComputedStyle(plot2);
    let backgroundWidth = parseInt(plot2Style.width); 

    const canvas = document.getElementById("canvasS1-P2");
    const ctx = canvas.getContext("2d");
    canvas.width = parseInt(plot2Style.width);
    canvas.height = parseInt(plot2Style.height);

    ctx.fillStyle = darkBackgroundColor;
    ctx.beginPath();
    ctx.moveTo(backgroundWidth, 0);
    ctx.lineTo(cornerCircleRadius / 2.3, backgroundWidth - cornerCircleRadius / 2.3);
    ctx.arc(cornerCircleRadius, backgroundWidth + cornerCircleRadius / 2.4 - 1, cornerCircleRadius, 5*Math.PI/4, Math.PI, true);
    ctx.lineTo(0, parseInt(plot2Style.height));
    ctx.lineTo(backgroundWidth, parseInt(plot2Style.height));
    ctx.fill();
  }


  function drawBackgroundS2() {
    let section2 = document.getElementById("section-2");
    const canvas = document.getElementById("canvasS2");
    const ctx = canvas.getContext("2d");
    canvas.width = parseInt(pageContent.style.width);
    canvas.height = section2.clientHeight;

    section2.style.backgroundColor = lightBackgroundColor;

/*central line*/
    ctx.strokeStyle = darkBackgroundColor;
    ctx.lineWidth = (canvas.width % 2 == 1) ? 3 : 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height - canvas.width / 2 + 1);
    ctx.stroke();

/*triangle*/
    ctx.fillStyle = darkBackgroundColor;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height - canvas.width / 2);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(canvas.width / 2, canvas.height - canvas.width / 2);
    ctx.fill();
  }


  function drawBackgroundS3() {
    let section3 = document.getElementById("section-3");
    section3.style.backgroundColor = darkBackgroundColor;
  }


  function drawBackgroundS4() {
    let gradientContainer = document.querySelector(".simple-linear");
    let section4 = document.getElementById("section-4");

    gradientContainer.style.background = `linear-gradient(${darkBackgroundColor}, 40%, ${lightBackgroundColor})`;
    section4.style.backgroundColor = lightBackgroundColor;
  }


  function drawFooterBackground() {
    let footer = document.getElementById("footer");
    footer.style.backgroundColor = darkBackgroundColor;
  }


  return {
    pageLanguage,
    drawDesignCount,
  }
}
