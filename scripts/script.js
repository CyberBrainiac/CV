"use strict";
document.onclick = (elem) => console.log(`X:${elem.clientX} Y:${elem.clientY}`);//для тестування

function adaptiveDesign(preloaderControl) { /*Returns objectWithStyle or Error or null*/
  let navigationLinkArr = document.querySelectorAll(".burger-menu_nav > a");
  let menuButton = document.querySelector(".burger-menu_button");
  let background = document.querySelector(".pageBackground");
  let pageContent = document.querySelector(".pageContent");
  let menu = document.querySelector(".burger-menu");
  let backgroundColor = "#6D6363";
  let idInterval_blinkLine;
  let drawDesignCount = 0;
  let cornerCircleRadius;
  let windowInnerHeight;
  let windowInnerWidth;
  let buttonLines = [];
  let headerStyle;
  let footerStyle;
  let fontSize;

  const userDevice = function checkUserDev() {
  /*визначення типу пристрою клієнта*/
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return "Mobile";
  } else {
    return "PC";
  }
  }()

  const language = {
    en: {},
    ua: {},
  }

/* Перевірка єлементу на відображення

function isHidden(elem) {
return !elem.offsetWidth && !elem.offsetHeight;
}
*/

  let err = drawDesign();
  if(err instanceof Error) {
    return err;
  }


  function drawDesign() {
    windowInnerWidth = document.documentElement.clientWidth;
    windowInnerHeight = document.documentElement.clientHeight;
    headerStyle = getComputedStyle( document.querySelector("header"));
    footerStyle = getComputedStyle( document.querySelector("footer"));
    drawDesignCount++;

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
      adaptiveProjectContainer()
      
      /* f() for make site beauty */
      correctExtraHeight();
      drawBackgroundS1_P1();
      drawBackgroundS1_P2();
      drawBackgroundS2();
      drawBackgroundS3();
    } catch (error) {
      return(error); //realise my class for Error
    }

    let mainPromise = new Promise( (resolve, reject) => {
      window.onresize = () => {
        if(windowInnerWidth != document.documentElement.clientWidth) {//цікавить тільки зміна ширини
          window.onresize = "";
          background.style.zIndex = "50";
          // preloaderControl.toggleOverlay(resolve);
          resolve("true");
        }
      }

    }).then((res) => {
      // preloaderControl = res;
      /*чистка menu handler*/
      if(menu.classList.contains("burger-menu_active")) {
        let navigationBackground = document.querySelector(".burger-menu_nav");
        navigationBackground.style.transitionDuration = "0s";
        menu.classList.toggle("burger-menu_active");
        animateMenuNavigation();
      }
      clearInterval(idInterval_blinkLine);
      document.querySelector(".burger-menu_button").innerHTML = '';
      buttonLines.length = 0;
      for(let link of navigationLinkArr) {
        link.removeEventListener("click", animateMenuButton);
      }
      menuButton.onclick = '';

      /*чистка button handler в workContainer*/
      let workContainer = document.querySelector(".work-experience");
      if(workContainer.classList.contains("mobile")) {
        workContainer.classList.remove("mobile");
      }
      let cardButtonArr = document.querySelectorAll("button.buttonCardInfo");
      for (let cardButton of cardButtonArr) {
        cardButton.removeEventListener("click", cardButton_clickHandler);
      }

      drawDesign();
      console.log("complete succesfully");
      return("true");

    }).catch((err) => {
      console.log("Error in window resize Promise \n" + err.message);
    })

    if(drawDesignCount == 1) {
      preloaderControl.toggleOverlay();
    } else {
      background.style.zIndex = "-1";
    }
  }


  function elementOffset(elem) {
    let el = elem.getBoundingClientRect();
    let scrolltop = Math.round(document.body.scrollTop + el.top);
    let scrollleft = Math.round(document.body.scrollLeft + el.left);
    return {top: scrolltop, left: scrollleft}; //повертає реальне положення елемента на сторінці
  }


  function adaptiveBodySize() {
    let sectionsArr = document.getElementsByTagName("section");
    let header = document.querySelector(".header");
    let footer = document.querySelector(".footer");
    sectionsArr = document.getElementsByTagName("section");

    if(header.clientHeight < 100) {
      header.style.height = "100px";
    }

    if(windowInnerWidth > 990) {
      fontSize = 20;
      pageContent.style.marginLeft = (windowInnerWidth - 990) / 2 + "px";
      pageContent.style.width = "990px";
      header.style.marginLeft = (windowInnerWidth - 990) / 2 + "px";
      header.style.width = "990px";
      footer.style.marginLeft = (windowInnerWidth - 990) / 2 + "px";
      footer.style.width = "990px";
    } else if(windowInnerWidth >= 660 && windowInnerWidth < 990 ) {
      fontSize = 18;
      pageContent.style.marginLeft = "0px";
      pageContent.style.width = windowInnerWidth + "px";
      header.style.marginLeft = "0px";
      header.style.width = windowInnerWidth + "px";
      footer.style.marginLeft = "0px";
      footer.style.width = windowInnerWidth + "px";
    } else {
      fontSize = 16;
      pageContent.style.marginLeft = "0px";
      pageContent.style.width = windowInnerWidth + "px";
      header.style.marginLeft = "0px";
      header.style.width = windowInnerWidth + "px";
      footer.style.marginLeft = "0px";
      footer.style.width = windowInnerWidth + "px";
    }

    if(windowInnerHeight < 660) {
      for(let section of sectionsArr) {
        section.style.height = "720px";
      }
    } else {
      for(let i = 0; i < sectionsArr.length; i++) {
        if(i == 0) {
          sectionsArr[i].style.height = windowInnerHeight - parseInt(headerStyle.height) + "px";
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
      elem.style.fontSize = fontSize + 2 + "px";
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
    if(windowInnerWidth >= 500) {
      for (const p of footerP) {
        p.style.fontSize = "42px";
      }
    } else {
      for (const p of footerP) {
        p.style.fontSize = "32px";
      }
    }
  }


  function adaptiveImage() {
    let imgContainer = document.querySelector(".plot-1-1");
    let imgContainer_width = parseInt( getComputedStyle(imgContainer).width);
    let imgContainer_center = {x: imgContainer_width / 2, y: imgContainer_width / 2} // background image намальований під кутом 45 градусів, довжина = ширені.
    let imgCaption = document.querySelector(".img-caption");
    let statusContent = document.querySelector(".status-cont");

    let photo = document.querySelector('.myPhoto');
    photo.style.height = imgContainer_width / 1.4 + "px";
    photo.style.width = imgContainer_width / 1.4 + "px";
    let imgRadius = parseInt(photo.style.width) / 2;

    photo.style.marginTop = (imgContainer_center.y - imgRadius) + "px";
    photo.style.marginLeft = (imgContainer_center.x - imgRadius) + "px";
    imgCaption.style.marginTop = imgRadius / 2 + "px";
  }


  function adaptiveBurgerMenu() {
    let header = document.querySelector("header");
    let headerOffset = elementOffset(header);

/*Menu Button Style*/
    menuButton.style.top = Math.trunc( parseInt(headerStyle.height) / 10) + "px";
    menuButton.style.left = Math.trunc(
      (headerOffset.left + parseInt(headerStyle.width)) - (parseInt(headerStyle.width) / 8)) + "px";
    menuButton.style.width = Math.trunc( parseInt(headerStyle.width) / 12) + "px";

    if( parseInt(menuButton.style.width) > 60) {
      menuButton.style.height = menuButton.style.width = "60px";
    } else if (parseInt(menuButton.style.width) < 35) {
      menuButton.style.height = menuButton.style.width = "36px";
    } else {
      menuButton.style.height = menuButton.style.width;
    }

/*Menu Navigation Style*/
    let menuNav = document.querySelector(".burger-menu_nav");
    let menuNavWidth = parseInt(headerStyle.width) / 3;

    if(menuNavWidth < 156) {
      menuNav.style.width = "156px";
    } else {
      menuNav.style.width = menuNavWidth + "px";
    }

    menuNav.style.left = headerOffset.left + (parseInt(headerStyle.width) - parseInt(menuNav.style.width)) + "px";
    let linksOffsetTop = parseInt(menuButton.style.top) * 4 + parseInt(menuButton.style.height) + "px";
    navigationLinkArr[0].style.marginTop = linksOffsetTop;

/*Create Lines*/
    let buttonLinesOffset = parseInt(menuButton.style.height) / 4; //проміжок між лініями
    let buttonLinesTopOffset = parseInt(menuButton.style.top); //відступ з гори до ліній меню

    for(let i = 0; i < 3; i++) {
      let line = document.createElement("span");
      line.classList.add("burger-menu_lines");
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
            buttonLines[i].style.backgroundColor = "gray";
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
    }

    function activateAnimation() {
      navigationBackground.style.transitionDuration = "0.4s";
      navigationBackground.style.height = "100vh";

      navigationBackground.ontransitionend = () => {
        navigationBackground.ontransitionend = "";
        navigationLinkArr[0].style.borderTop = "1px solid black";

        navigationLinkArr[navigationLinkArr.length - 1].ontransitionend = () => {
          navigationLinkArr[navigationLinkArr.length - 1].ontransitionend = "";
          buttonOverlay.classList.remove("buttonOverlay_active");
        };

        for(let link of navigationLinkArr) {
          link.style.transitionDuration = "0.3s";
          link.style.fontSize = fontSize + "px";
          link.style.borderBottom = "1px solid black";
          link.style.paddingTop = parseInt(headerStyle.height) / 10 + "px";
          link.style.paddingBottom = parseInt(headerStyle.height) / 10 + "px";

          setTimeout(() => link.style.color = "white", 50);
        }
      }
    }
  }


  function adaptiveScillsContainer() {
    let liOffset = elementOffset(document.querySelector(".status-cont")).left - parseInt(pageContent.style.marginLeft);

    if(liOffset >= 20) { //щоб не загубити маркування списку
      let scillsLiArr = document.querySelectorAll(".scills > ul > li");

      for (let li of scillsLiArr) {
        li.style.marginLeft = liOffset + "px";
      }
    }
  }


  function adaptivePurposeContainer() {

    let purposeContainer = document.querySelector(".aim");
    let purposeTextContent = document.querySelector(".aim span");
    let pageContentOffset = elementOffset(document.querySelector(".pageContent"));
    let imgCaptionContainerOffset = elementOffset(document.querySelector(".img-caption"));

    purposeContainer.style.marginTop = imgCaptionContainerOffset.top - pageContentOffset.top + "px"; //розміщую на одній висоті з блоком imgCaption
    // purposeTextContent.style.fontSize = fontSize - 2 + "px";
  }


  function adaptiveContactContainer() {
    let contactSpanArr = document.querySelectorAll("div.contacts > span");

    for(let span of contactSpanArr) {
      span.children[0].style.fontSize = fontSize + "px"; //link fontSize
      span.style.marginLeft = parseInt(pageContent.style.width) * 0.1 + fontSize + "px"; //plot1 = 40% plot 2 = 50% разом 90%, отже для симетрії 10% відступ. Також додаю значення contacts.span::before
    }
  }


  function adaptiveWorkContainer() {
    let section2 = document.getElementById("section-2");
    let workContainer = document.querySelector(".work-experience");

    if(workContainer.clientHeight + parseInt(pageContent.style.width) / 3 > parseInt(section2.style.height)) {
      workContainer.classList.toggle("mobile");
    }

/*адаптація для мобільного дизайну*/
    let cardButtonArr = document.querySelectorAll("button.buttonCardInfo");
    for (let cardButton of cardButtonArr) {
      cardButton.addEventListener("click", cardButton_clickHandler);
    }
  }


  function cardButton_clickHandler() {
    let section2 = document.getElementById("section-2");
    let cardContentArr = section2.querySelectorAll("div.card-content");
    let divMoreInfoArr = section2.querySelectorAll("div.card-moreInfo");
    let divLessInfoArr = section2.querySelectorAll("div.card-lessInfo");

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
        break

      case "buttWork_lessInfo2":
        divLessInfoArr[1].style.display = "none";
        divMoreInfoArr[0].style.display = "block";
        divMoreInfoArr[1].style.display = "block";
        cardContentArr[1].style.display = "none";
        break
    }
  }


  function adaptiveLanguageContainer() {
    let languageContainer = document.querySelector(".language");

    if(userDevice == "Mobile" && innerHeight > innerWidth) {
      languageContainer.style.top = "88%";
    } else if (userDevice == "Mobile" && innerHeight < innerWidth) {
      languageContainer.style.top = "80%";
    }
  }


  function adaptiveProjectContainer() {
    let section3 = document.getElementById("section-3");
    let timerContainer = document.querySelector(".timer");
    let timerContainerHeight = timerContainer.clientHeight + timerContainer.clientHeight / 2; //сам таймер буде додано пізніше, для розрахунку розмірів мені потрібні приблизні значення
    let projectsContainer = document.querySelector(".projects");

    if(timerContainerHeight + projectsContainer.clientHeight > section3.clientHeight) {
      projectsContainer.classList.toggle("mobile");
    }
  }    


  function correctExtraHeight() {
    let sectionsArr = document.getElementsByTagName("section");
    let legalExtraHeight = 40;

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
          let workContainerHeight = parseInt(getComputedStyle(document.querySelector(".work-experience")).height);
          let educationContainerHeight = parseInt(getComputedStyle(document.querySelector(".education")).height);
          let maxContainersHeight = Math.max(workContainerHeight, educationContainerHeight);
          let plot2_1_width = parseInt(pageContent.style.width) / 2; //висота фонa-трикутника секції 2
          let section2Height = parseInt(sectionsArr[i].style.height);

          if(section2Height - maxContainersHeight - plot2_1_width > legalExtraHeight) {
            sectionsArr[i].style.height = maxContainersHeight + plot2_1_width + legalExtraHeight + "px";
          }
          break;

        case 2:
          
          break;
      }
    }
  }


  function drawBackgroundS1_P1() {
    let plot1 = document.querySelector(".plot-1-1");
    let plot1Style = getComputedStyle(plot1);

    const canvas = document.getElementById("canvasS1-P1");
    const ctx = canvas.getContext("2d");
    canvas.width = parseInt(plot1Style.width);
    canvas.height = parseInt(plot1Style.height);

    let backgroundWidth = parseInt(plot1Style.width);
    cornerCircleRadius = backgroundWidth / 5; //x+x+0.5x = FullSide; x = FullSide/2,5; 0.5x = FullSide/5; Where x - stick; 0.5x - radiusOfCornerCircle
    let backgroudStick = backgroundWidth / 2.5;
    let roundingRadius = 30; //коефіціент скруглення кутів
    let roundingLeg = roundingRadius / 2.414; //цей коэфіцієнт, означає значення тангенсу кута протилежного до радіусу. Завдяки ньому знаходимо протилежний катет трикутника побудованого на радіусі кола що дотикаеться до 2 прямих які потрібно скруглити.(більш детально у README);

/*Image Background*/
    ctx.fillStyle = backgroundColor;
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
  }


  function drawBackgroundS1_P2() {
    let plot2 = document.querySelector(".plot-1-2");
    let plot2Style = getComputedStyle(plot2);
    // let sectionStyle = getComputedStyle(document.getElementById("section-1"));

    const canvas = document.getElementById("canvasS1-P2");
    const ctx = canvas.getContext("2d");
    canvas.width = parseInt(plot2Style.width);
    canvas.height = parseInt(plot2Style.height);

    let backgroundWidth = parseInt(plot2Style.width);
    // let sectionHeight = parseInt(sectionStyle.height);

    ctx.fillStyle = backgroundColor;
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

/*central line*/
    ctx.strokeStyle = backgroundColor;
    ctx.lineWidth = (canvas.width % 2 == 1) ? 3 : 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height - canvas.width / 2 + 1);
    ctx.stroke();

/*triangle*/
    ctx.fillStyle = backgroundColor;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height - canvas.width / 2);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(canvas.width / 2, canvas.height - canvas.width / 2);
    ctx.fill();
  }


  function drawBackgroundS3() {
    let section3 = document.getElementById("section-3");
    const canvas = document.getElementById("canvasS3");
    const ctx = canvas.getContext("2d");
    canvas.width = parseInt(pageContent.style.width);
    canvas.height = section3.clientHeight;

// /*triangle*/
//     ctx.fillStyle = backgroundColor;
//     ctx.beginPath();
//     ctx.moveTo(0, 0);
//     ctx.lineTo(canvas.width / 2, canvas.width / 2);
//     ctx.lineTo(canvas.width, 0);
//     ctx.fill();

// /*central line*/
//     ctx.strokeStyle = backgroundColor;
//     ctx.lineWidth = (canvas.width % 2 == 1) ? 3 : 2;
//     ctx.beginPath();
//     ctx.moveTo(canvas.width / 2, canvas.width / 2 - 1);
//     ctx.lineTo(canvas.width / 2, canvas.height);
//     ctx.stroke();

    ctx.fillStyle = "#6D6363";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();
  }

  return {headerStyle, fontSize};
}
