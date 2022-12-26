"use strict";
document.onclick = (elem) => console.log(`X:${elem.clientX} Y:${elem.clientY}`);//для тестов и разработки, удалить после окончания проекта

function adaptiveDesign() {
  let menu = document.querySelector(".burger-menu");
  let button = document.querySelector(".burger-menu_button");
  let buttonLines = button.children;
  let navigationLinkArr = Array.from( document.querySelector(".burger-menu_nav").children);
  let pageContent = document.querySelector(".pageContent");
  let idIntervalArr_blinkLine = [];
  let backgroundColor = "#6D6363";
  let cornerCircleRadius;
  let windowInnerHeight;
  let windowInnerWidth;
  let headerStyle;
  let footerStyle;
  let fontSize;


  let err = drawDesign();
  if(err instanceof Error) {
    return err;
  }


  function drawDesign() {
    windowInnerWidth = document.documentElement.clientWidth; //можуть змінюватись при перевороті пристрою
    windowInnerHeight = document.documentElement.clientHeight;
    headerStyle = getComputedStyle( document.querySelector("header"));
    footerStyle = getComputedStyle( document.querySelector("footer"));

    try {
      /* f() for build content */
      adaptiveBodySize();
      createAdaptiveImage();
      createAdaptiveBurgerMenu();
      adaptiveScillsContainer();
      adaptivePurposeContainer();
      adaptiveContactContainer();

      /* f() for make site pretty */
      correctExtraHeight();
      drawBackgroundS1_P1();
      drawBackgroundS1_P2();
      drawBackgroundS2();
      toggleOverlay();
    } catch (error) {
      return(error);
    }


    // let mainPromise = new Promise( function(resolve, reject) {
    //   setInterval(function(resolve) {
    //     let currentWindowWidth = document.documentElement.clientWidth;
    //
    //     if(currentWindowWidth != windowInnerWidth) //розмір вікна змінився, очищую інтервали та hendlers
    //     return CHANGET!!!
    //   },1000);
    // });

    let intervalId_checkWidth = setInterval(() => {
      let currentWindowWidth = document.documentElement.clientWidth;

      if(currentWindowWidth != windowInnerWidth) { //розмір вікна змінився, очищую інтервали та hendlers
        console.log("windowResize");
        toggleOverlay();
        clearInterval(intervalId_checkWidth);

        if(menu.classList.contains("burger-menu_active")) {
          let navigationBackground = document.querySelector(".burger-menu_nav");
          navigationBackground.style.transitionDuration = "0s";

          menu.classList.toggle("burger-menu_active");
          animateMenuNavigation();
        }

        for(let i = 0; i < idIntervalArr_blinkLine.length; i++) {//цей код не є логіним, проте тільки в такому вігляді дійсно можу очистити всі інтервали. У віпадках перебору масиву interval_id все одно лишаються ті id, що якимось чином до нього ?не потрапили?. Не розумію  чому, помилка проявляеться тільки при швидкій зміні розмірів екрану
          if(i != intervalId_checkWidth) {
            clearInterval(idIntervalArr_blinkLine[i]);
          }
        }

        // for(let id of idIntervalArr_blinkLine) {
        //   clearInterval(idIntervalArr_blinkLine[id]);
        // }

        for(let line of buttonLines) {
          line.style.borderColor = "white";
        }

        for(let link of navigationLinkArr) {
          link.removeEventListener("click", animateMenuButton);
        }

        document.querySelector(".burger-menu_button").innerHTML = '';
        button.onclick = '';
        drawDesign();
      }
    }, 1000);
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
    sectionsArr = document.getElementsByTagName("section");

    if(windowInnerWidth > 990) {
      fontSize = 20;
      pageContent.style.marginLeft = (windowInnerWidth - 990) / 2 + "px";
      pageContent.style.width = "990px";
      header.style.marginLeft = (windowInnerWidth - 990) / 2 + "px";
      header.style.width = "990px";
    } else if(windowInnerWidth >= 660 && windowInnerWidth < 990 ) {
      fontSize = 20;
      pageContent.style.marginLeft = "0px";
      pageContent.style.width = windowInnerWidth + "px";
      header.style.marginLeft = "0px";
      header.style.width = windowInnerWidth + "px";
    } else {
      fontSize = 18;
      pageContent.style.marginLeft = "0px";
      pageContent.style.width = windowInnerWidth + "px";
      header.style.marginLeft = "0px";
      header.style.width = windowInnerWidth + "px";
    }

    if(windowInnerHeight < 660) {
      for(let section of sectionsArr) {
        section.style.height = "660px";
      }
    } else {
      for(let i = 0; i < sectionsArr.length; i++) {
        if(i == 0) {
          sectionsArr[i].style.height = windowInnerHeight - parseInt(headerStyle.height) + "px";
        } else if (i == sectionsArr.length - 1) {
          sectionsArr[i].style.height = windowInnerHeight - parseInt(footerStyle.height) - parseInt(footerStyle.paddingTop) - parseInt(footerStyle.paddingBottom) + "px";
        } else {
          sectionsArr[i].style.height = "100vh";
        }
      }
    }

    let h2 = document.getElementsByTagName("h2");
    [...h2].forEach((elem) => {
      elem.style.fontSize = fontSize + 2 + "px";
    });
  }


  function createAdaptiveImage() {
    let imgContainer = document.querySelector(".plot-1-1");
    let imgContainer_width = parseInt( getComputedStyle(imgContainer).width);
    let imgContainer_center = {x: imgContainer_width / 2, y: imgContainer_width / 2} // background image намальований під кутом 45 градусів, довжина = ширені.
    let imgCaption = document.querySelector(".img-caption");
    let fullName = document.querySelector(".full-name");
    let status = document.querySelector(".status");
    let statusContent = document.querySelector(".status-cont");

    let img = document.getElementsByTagName('img')[0];
    img.style.height = imgContainer_width / 1.4 + "px";
    img.style.width = imgContainer_width / 1.4 + "px";
    let imgRadius = parseInt(img.style.width) / 2;

    img.style.marginTop = (imgContainer_center.y - imgRadius) + "px";
    img.style.marginLeft = (imgContainer_center.x - imgRadius) + "px";

    /*Image caption*/
    imgCaption.style.marginTop = imgRadius / 2 + "px";
    statusContent.style.fontSize = fontSize - 2 + "px";
  }


  function createAdaptiveBurgerMenu() {
    let header = document.querySelector("header");
    let headerOffset = elementOffset(header);

/*Menu Button Style*/
    button.style.top = Math.trunc( parseInt(headerStyle.height) / 10) + "px";
    button.style.left = Math.trunc(
      (headerOffset.left + parseInt(headerStyle.width)) - (parseInt(headerStyle.width) / 8)) + "px";
    button.style.width = Math.trunc( parseInt(headerStyle.width) / 12) + "px";

    if( parseInt(button.style.width) > 60) {
      button.style.height = button.style.width = "60px";
    } else if (parseInt(button.style.width) < 35) {
      button.style.height = button.style.width = "36px";
    } else {
      button.style.height = button.style.width;
    }

/*Menu Navigation Style*/
    let menuNav = document.querySelector(".burger-menu_nav");
    let menuNavWidth = parseInt(headerStyle.width) / 3;
    // menuNav.style.paddingTop = parseInt(button.style.top) * 2 + parseInt(button.style.height) + "px";//in active mode
    if(menuNavWidth < 156) {
      menuNav.style.width = "156px";
    } else {
      menuNav.style.width = menuNavWidth + "px";
    }

    menuNav.style.left = headerOffset.left + (parseInt(headerStyle.width) - parseInt(menuNav.style.width)) + "px";
    let linksOffsetTop = parseInt(button.style.top) * 4 + parseInt(button.style.height) + "px"; //? Header height!
    navigationLinkArr[0].style.marginTop = linksOffsetTop;

/*Create Lines*/
    let buttonLinesOffset = parseInt(button.style.height) / 4; //проміжок між лініями
    let buttonLinesTopOffset = parseInt(button.style.top); //відступ з гори до ліній меню

    for(let i = 0; i < 3; i++) {
      let line = document.createElement("span");
      line.classList.add("burger-menu_lines");
      if(buttonLinesOffset < 12) line.style.height = "4px";
      button.appendChild(line);
    }

    for(let i = 0; i < 3; i++) { //початкове положення ліній
      buttonLines[i].style.top = buttonLinesTopOffset + "px";
      buttonLines[i].style.width = button.style.width;
      idIntervalArr_blinkLine.push(createBlinkEffect(i));
      setTimeout(() => {buttonLines[i].style.marginTop = buttonLinesOffset * (i + 1) + "px", 10});
    }

/*Create overlay*/
    let buttonOverlay = document.querySelector(".buttonOverlay");
    buttonOverlay.style.top = button.style.top;
    buttonOverlay.style.left = button.style.left;
    buttonOverlay.style.width = parseInt(button.style.width) + 2 + "px";
    buttonOverlay.style.height = button.style.height;

/*Button Handlers*/
    button.onclick = () => animateMenuButton();
    for(let link of navigationLinkArr) {
      link.addEventListener("click", animateMenuButton);
    }
  }


  function createBlinkEffect(elem) {
    let interval_Id = setInterval(() => {
      if(buttonLines[elem]) { //перевірка на існування лінії
        if(buttonLines[elem].style.borderColor == "black") {
          buttonLines[elem].style.borderColor = "white";
        } else {
          buttonLines[elem].style.borderColor = "black";
        }
      }
    }, 1000);
    return interval_Id;
  }


  function animateMenuButton() {
    let buttonOverlay = document.querySelector(".buttonOverlay");
    buttonOverlay.classList.add("buttonOverlay_active");
    let buttonLinesOffset = parseInt(button.style.height) / 4; //проміжок між лініями

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
          idIntervalArr_blinkLine.push(createBlinkEffect(i));

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
        // buttonOverlay.classList.remove("buttonOverlay_active");
      }
    }

    function activateAnimation() {
/*активація меню 1 крок*/
      for(let id of idIntervalArr_blinkLine) {
        clearInterval(id);
      }
      idIntervalArr_blinkLine.length = 0;

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
        // buttonOverlay.classList.remove("buttonOverlay_active");
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
      navigationBackground.ontransitionend = () => {
        navigationBackground.ontransitionend = undefined;
        buttonOverlay.classList.remove("buttonOverlay_active");
      }

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
        navigationBackground.ontransitionend = undefined;
        navigationLinkArr[0].style.borderTop = "1px solid black";
        buttonOverlay.classList.remove("buttonOverlay_active");

        for(let link of navigationLinkArr) {
          link.style.transitionDuration = "0.6s";
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
    let scills = document.querySelector(".scills");
    let scillsStyle = getComputedStyle(scills);
    let scillsPosition = elementOffset(scills);
    let scillsElement = scills.children;
    let liOffset = elementOffset(document.querySelector(".status-cont")).left - parseInt(pageContent.style.marginLeft);

    // console.log(scillsStyle.marginTop);
    // console.log(windowInnerHeight - (scillsPosition.top + parseInt(scillsStyle.height)));
    // console.log("Inner" + windowInnerHeight);
    // console.log("Offset" + (scillsPosition.top + parseInt(scillsStyle.height)));

    // if(parseInt(scillsStyle.marginTop) < windowInnerHeight - (scillsPosition.top + parseInt(scillsStyle.height))) {
    //
    //   scills.style.marginTop = (parseInt(scillsStyle.marginTop) + windowInnerHeight - (scillsPosition.top + parseInt(scillsStyle.height))) / 1.5 + "px"; //(відступ верхній + відступ нижній) / 2
    // }

    [...scillsElement[1].children].forEach((li) => {
      li.style.fontSize = fontSize + "px";
      if(liOffset >= 20) { //щоб не загубити маркування списку
        li.style.marginLeft = liOffset + "px";
      }
    });
  }


  function adaptivePurposeContainer() {
    let imgCaptionContainer = document.querySelector(".img-caption");
    let statusContainerOffset = elementOffset(imgCaptionContainer);
    let purposeContainer = document.querySelector(".aim");
    let purposeTextContent = document.querySelector(".aim span");
    let pageContent = document.querySelector(".pageContent");
    let pageContentOffset = elementOffset(pageContent);

    purposeContainer.style.marginTop = statusContainerOffset.top - pageContentOffset.top + "px"; //розміщую на одній висоті з блоком imgCaption
    purposeTextContent.style.fontSize = fontSize - 2 + "px";
  }


  function adaptiveContactContainer() {

    let contact = document.querySelector(".contacts");
    let contactContainerStyle = getComputedStyle( document.querySelector(".plot-1-1"));
    let arrOfSpan = [...contact.children].slice(1);
    let scillsOffset = elementOffset(document.querySelector(".scills"));
    let purposeContainer = document.querySelector(".aim");
    let purposeContainerStyle = getComputedStyle(purposeContainer);

    contact.style.marginTop = scillsOffset.top - elementOffset(purposeContainer).top - parseInt(purposeContainerStyle.height) + "px"; //позиціонований відносно ScillsContainer

    for(let span of arrOfSpan) {
      span.style.fontSize = fontSize + "px";
      span.children[0].style.fontSize = fontSize + "px"; //link fontSize
      span.style.marginLeft = windowInnerWidth / 2 - parseInt(contactContainerStyle.width) - parseInt(pageContent.style.marginLeft) + "px";
      span.style.marginLeft = parseInt(span.style.marginLeft) + 1.5 * fontSize + "px"; // додаю значення contacts.span::before.left
    }
  }


  function correctExtraHeight() {
    let sectionsArr = document.getElementsByTagName("section");
    let legalExtraHeight = 80;

    for(let i = 0; i < sectionsArr.length; i++) {
      switch (i) { //підлаштування висоти для кожної секції сайту
        case 0:
          let photoHeight = parseInt(getComputedStyle( document.querySelector(".photo")).height);
          let scillsStyle = getComputedStyle( document.querySelector(".scills"));
          let scillsHeight = parseInt(scillsStyle.height) + parseInt(scillsStyle.marginTop);

          if(parseInt(sectionsArr[i].style.height) - photoHeight - scillsHeight > legalExtraHeight) {
            sectionsArr[i].style.height = photoHeight + scillsHeight + parseInt(scillsStyle.marginTop) + "px";
          }
          break;
        case 1:

          break;
        case 2:

          break;
        default:
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
    canvas.height = parseInt(getComputedStyle(section2).height);

    let leg = canvas.width / 2; //у рівнобедренному прямокутному трикутнику катети рівні


/*central line*/
    ctx.strokeStyle = backgroundColor;
    ctx.lineWidth = (canvas.width % 2 == 1) ? 3 : 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height - leg + 1);
    ctx.stroke();

/*triangle*/
    ctx.fillStyle = backgroundColor;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height - leg);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(canvas.width / 2, canvas.height - leg);
    ctx.fill();
  }


  function toggleOverlay() {
    let overlay = document.getElementById("overlay");

    if(overlay.classList.contains("overlay")) {
      overlay.textContent = "";
      overlay.classList.toggle("overlay");
    } else {
      overlay.classList.toggle("overlay");
      overlay.textContent = "SITE IS LOADING";
    }
  }


  return {headerStyle};
}