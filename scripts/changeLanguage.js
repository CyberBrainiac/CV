"use strict"

function changeLanguage(adaptiveDesignStyle, preloaderControl) {
  let lang = adaptiveDesignStyle.pageLanguage;
  let supportLanguages = Object.keys(vocabulary);
  let drawDesignCount = adaptiveDesignStyle.drawDesignCount;

  if(!supportLanguages.includes(lang)) {
    throw new Error(`'${lang}' language is not supported`);
  }

/*Change button language*/
  let buttonCardInfo = Array.from(document.querySelectorAll(".buttonCardInfo"));
  for(const button of buttonCardInfo) {
    if(button.id.includes("moreInfo")) {
      button.textContent = vocabulary[lang]["section-2"]["work-experience"]["progress"].buttWork_moreInfo1;
    } else {
      button.textContent = vocabulary[lang]["section-2"]["work-experience"]["progress"].buttWork_lessInfo1;
    }
  }

/*Change Header language*/
  document.querySelector(".title").textContent = vocabulary[lang].header.title;
  let links = document.querySelectorAll(".burger_menu_link");
  for(let i = 0; i < links.length; i++) {
    links[i].textContent = vocabulary[lang].header.burger_menu_link[i];
  }
  document.querySelector(".changeLanguageBut > span").textContent = vocabulary[lang].header.changeLanguageBut.span;
  document.querySelector(".changeLanguageBut > img").src =  vocabulary[lang].header.changeLanguageBut.img;

/*Change Section-1 language*/
  document.querySelector(".name").textContent = vocabulary[lang]["section-1"]["plot-1-1"].name;
  document.querySelector(".status-cont").textContent = vocabulary[lang]["section-1"]["plot-1-1"]["status-cont"];
  document.querySelector(".skills > h2").textContent = vocabulary[lang]["section-1"]["plot-1-1"].skills.h2;

  let liArrSkills = document.querySelectorAll(".skills > li");
  for(let i = 0; i < liArrSkills.length; i++) {
    liArrSkills[i].textContent = vocabulary[lang]["section-1"]["plot-1-1"].skills.li[i];
  }

  document.querySelector(".aim > h2").textContent = vocabulary[lang]["section-1"]["plot-1-2"].aim.h2;
  document.querySelector(".aim .aim-container .aim-text").textContent = vocabulary[lang]["section-1"]["plot-1-2"].aim["aim-text"];
  document.querySelector(".contacts > h2").textContent = vocabulary[lang]["section-1"]["plot-1-2"].contacts.h2;

  let spanArr = document.querySelectorAll(".contacts > p > span");
  for(let i = 0; i < spanArr.length; i++) {
    spanArr[i].textContent = vocabulary[lang]["section-1"]["plot-1-2"].contacts.span[i];
  }

  let aArr = document.querySelectorAll(".contacts > p > a");
  for(let i = 0; i < aArr.length; i++) {
    aArr[i].textContent = vocabulary[lang]["section-1"]["plot-1-2"].contacts.a[i];
  }

/*Change Section-2 language*/
  document.querySelector(".work-experience > h2").textContent = vocabulary[lang]["section-2"]["work-experience"].h2;
  document.querySelector(".progress > h3").textContent =
  vocabulary[lang]["section-2"]["work-experience"]["progress"].h3;
  document.querySelector(".progress > .position").textContent = vocabulary[lang]["section-2"]["work-experience"]["progress"].position;

  let liArrProgress = document.querySelectorAll(".progress > .card-content > ul> li");
  for(let i = 0; i < liArrProgress.length; i++) {
    liArrProgress[i].textContent = vocabulary[lang]["section-2"]["work-experience"]["progress"]["card-content"][i];
  }

  document.querySelector(".progress > .time").textContent = vocabulary[lang]["section-2"]["work-experience"]["progress"].time;
  document.querySelector(".jiji > h3").textContent = vocabulary[lang]["section-2"]["work-experience"]["jiji"].h3;
  document.querySelector(".jiji > .position").textContent = vocabulary[lang]["section-2"]["work-experience"]["jiji"].position;

  let liArrJiji = document.querySelectorAll(".jiji > .card-content > ul> li");
  for(let i = 0; i < liArrJiji.length; i++) {
    liArrJiji[i].textContent = vocabulary[lang]["section-2"]["work-experience"]["jiji"]["card-content"];
  }

  document.querySelector(".jiji > .time").textContent = vocabulary[lang]["section-2"]["work-experience"]["jiji"].time;

  document.querySelector(".education > h2").textContent = vocabulary[lang]["section-2"]["education"].h2;
  document.querySelector(".master > h3").textContent = vocabulary[lang]["section-2"]["education"].master.h3;
  document.querySelector(".master > .degree").textContent = vocabulary[lang]["section-2"]["education"].master.degree;
  document.querySelector(".master > .subjectArea").textContent = vocabulary[lang]["section-2"]["education"].master.subjectArea;
  document.querySelector(".master > .time").textContent = vocabulary[lang]["section-2"]["education"].master.time;

  document.querySelector(".bachelor > h3").textContent = vocabulary[lang]["section-2"]["education"].bachelor.h3;
  document.querySelector(".bachelor > .degree").textContent = vocabulary[lang]["section-2"]["education"].bachelor.degree;
  document.querySelector(".bachelor > .subjectArea").textContent = vocabulary[lang]["section-2"]["education"].bachelor.subjectArea;
  document.querySelector(".bachelor > .time").textContent = vocabulary[lang]["section-2"]["education"].bachelor.time;

  document.querySelector(".language > h2").textContent = vocabulary[lang]["section-2"]["language"].h2;

  let pArrLanguage = document.querySelectorAll(".language > p");
  for(let i = 0; i < pArrLanguage.length; i++) {
    pArrLanguage[i].textContent = vocabulary[lang]["section-2"]["language"].p[i];
  }

/*Change Section-3 language*/
  document.querySelector(".myProjectsTitle").textContent = vocabulary[lang]["section-3"].myProjectsTitle;
  document.querySelector(".resume > h3").textContent = vocabulary[lang]["section-3"].projects.resume.h3;
  document.querySelector(".resume .projectLanguage > span > b").textContent = vocabulary[lang]["section-3"].projects.resume.projectLanguage;
  document.querySelector(".resume .projectLanguage .projLang").textContent = vocabulary[lang]["section-3"].projects.resume.projLang;

  let figcaptionArr = document.querySelectorAll(".img-proj-resume > figure > figcaption");

  for(let i = 0; i < figcaptionArr.length; i++) {
    figcaptionArr[i].textContent = vocabulary[lang]["section-3"].projects.resume["img-proj-resume"][i];
  }

  document.querySelector(".resume .card-content .project-description > p").textContent = vocabulary[lang]["section-3"].projects.resume["card-content"]["project-description"];
  document.querySelector(".resume .projectLink > a").textContent = vocabulary[lang]["section-3"].projects.resume.projectLink.a;
  document.querySelector(".resume .time").textContent = vocabulary[lang]["section-3"].projects.resume.time;

  document.querySelector(".dataCollectionSystem > h3").textContent = vocabulary[lang]["section-3"].projects.dataCollectionSystem.h3;
  document.querySelector(".dataCollectionSystem .projectLanguage > p > span > b").textContent = vocabulary[lang]["section-3"].projects.dataCollectionSystem.projectLanguage;
  document.querySelector(".dataCollectionSystem .projectLanguage .projLang").textContent = vocabulary[lang]["section-3"].projects.dataCollectionSystem.projLang;
  document.querySelector(".dataCollectionSystem .card-content .project-description > p").textContent = vocabulary[lang]["section-3"].projects.dataCollectionSystem["card-content"]["project-description"];
  document.querySelector(".dataCollectionSystem .projectLink > a").textContent = vocabulary[lang]["section-3"].projects.dataCollectionSystem.projectLink.a;
  document.querySelector(".dataCollectionSystem .time").textContent = vocabulary[lang]["section-3"].projects.dataCollectionSystem.time;

  document.querySelector(".smartHome > h3").textContent = vocabulary[lang]["section-3"].projects.smartHome.h3;
  document.querySelector(".smartHome .projectLanguage > p > span > b").textContent = vocabulary[lang]["section-3"].projects.smartHome.projectLanguage;
  document.querySelector(".smartHome .projectLanguage .projLang").textContent = vocabulary[lang]["section-3"].projects.smartHome.projLang;
  document.querySelector(".smartHome .card-content .project-description > p").textContent = vocabulary[lang]["section-3"].projects.smartHome["card-content"]["project-description"];
  document.querySelector(".smartHome .projectLink > a").textContent = vocabulary[lang]["section-3"].projects.smartHome.projectLink.a;
  document.querySelector(".smartHome .time").textContent = vocabulary[lang]["section-3"].projects.smartHome.time;

/*Change Section-4 language*/
  document.querySelector(".timerTitle").textContent = vocabulary[lang]["section-4"].timer.timerTitle;
  document.querySelector(".timer > p").textContent = vocabulary[lang]["section-4"].timer.p;

  let timerCaptureArr = document.querySelectorAll(".timerCapture");
  for (let i = 0; i < timerCaptureArr.length; i++) {
    timerCaptureArr[i].textContent = vocabulary[lang]["section-4"].timer.timerCapture[i];
  }

  document.querySelector(".about > h2").textContent =  vocabulary[lang]["section-4"].about.h2;
  let aboutPArr = document.querySelectorAll(".about > p");
  for(let i = 0; i < aboutPArr.length; i++) {
    aboutPArr[i].textContent = vocabulary[lang]["section-4"].about.p[i];
  }

/*Change footer language*/
  let footerPArr = document.querySelectorAll(".footer .footerMessage");
  for(let i = 0; i < footerPArr.length; i++) {
    footerPArr[i].textContent = vocabulary[lang].footer.footerMessage;
  }

/*Turn off Overlay*/
  if(drawDesignCount === 1) {

    try {
      preloaderControl.toggleOverlay();
    } catch (error) {
      alert("Sorry the site is broken");
    }
  }
}


const vocabulary = {
  en: {
    "header": {
      "title": "CV",
      "burger_menu_link": ["Skills & contacts", "Work & education", "My projects", "About me",],
      "changeLanguageBut": {
        "span": "Change language",
        "img": "images/ukraine-flag-icon.svg",
      },
    },
    
    "section-1": {
      "plot-1-1": {
        "name": "Arkhipov Arsenii",
        "status-cont": "JavaScript developer",
        "skills": {
          "h2": "Skills",
          "li": ["Mocha framework", "JavaScript", "HTML 5", "CSS 3", "OOP", "Git",],
        },
      },
      "plot-1-2": {
        "aim": {
          "h2": "My purpose",
          "aim-text": "Build a brilliant career in IT",
        },
        "contacts": {
          "h2": "Contact",
          "span": ["Phone: ", "GitHub: ", "Email: ", "CV: ",],
          "a": ["(+38) 0968098737", "account", "arsenij.arxipov.1998 @gmail.com", "pdf file",],
        },
      }
    },

    "section-2": {
      "work-experience": {
        "h2": "Work experience",
        "progress": {
          "h3": "SE «Ivchenko-Progress»",
          "position": "Software engineer",
          "buttWork_moreInfo1": "More info",
          "buttWork_lessInfo1": "Less info",
          "card-content": ["Pascal and LabVIEW programming", "Aircraft engine test systems management",
          "Organization of the process of preparing an aircraft engine for testing",],
          "time": "September 2020 - Present",
        },
        "jiji": {
          "h3": "Genesis «Jiji»",
          "position": "Remote moderator",
          "buttWork_moreInfo2": "More info",
          "buttWork_lessInfo2": "Less info",
          "card-content": "Checking user content for compliance with the rules of the online marketplace",
          "time": "July 2019 - October 2022",
        },
      },
      "education": {
        "h2": "Education",
        "master": {
          "h3": "National university «Zaporizhzhia polytechnic»",
          "degree": "Master",
          "subjectArea": "Computer sciences",
          "time": "September 2020 - December 2021",
        },
        "bachelor": {
          "h3": "National university «Zaporizhzhia polytechnic»",
          "degree": "Bachelor",
          "subjectArea": "Software engineering",
          "time": "September 2016 - July 2020",
        },
      },
      "language": {
        "h2": "Languages",
        "p": ["Russian - native", "Ukrainian - native", "English - intermediate",],
      }
    },

    "section-3": {
      "myProjectsTitle": "My projects",
      "projects": {
        "resume": {
          "h3": "Site CV",
          "projectLanguage": "Technology stack: ",
          "projLang": "HTML 5, CSS 3, JavaScript",
          "visibleCaption": "Design for:",
          "img-proj-resume": ["tablet", "mobile", "computer"],
          "buttProj_moreInfo1": "More info",
          "buttProj_lessInfo1": "Less info",
          "card-content": {
            "project-description": "The site calculates the type of user's device, its size, and position in space. Based on this data, design elements are placed and their styles are created. Responsive design allows the site to look equally good on the vast majority of devices. The project was created using the «Mobile First» development principle.",
          },
          "projectLink": {
            "span": "GitHub: ",
            "a": "project link",
          },
          "time": "February 2023",
        },
        "dataCollectionSystem": {
          "h3": "Organick Shop",
          "projectLanguage": "Technology stack: ",
          "projLang": "TypeScript, MySQL, Scss, React",
          "buttProj_moreInfo2": "More info",
          "buttProj_lessInfo2": "Less info",
          "card-content": {
            "project-description": "Finally project in Sigma Software University.This fullstack project is online shop with MySQL database. Client part uses React library, server part uses Express library. User can view product and details, add product to cart, remove product from cart, complete order.",
          },
          "projectLink": {
            "span": "GitHub: ",
            "a": "project link",
          },
          "time": "September 2023",
        },
        "smartHome": {
          "h3": "SEO-Buy site",
          "projectLanguage": "Technology stack: ",
          "projLang": "TypeScript, Firestore Database, Scss, React, Redux",
          "buttProj_moreInfo3": "More info",
          "buttProj_lessInfo3": "Less info",
          "card-content": {
            "project-description": "The site was created for SEO and content writing specialists to promote the brand and the ambitious team. In the Tools section, you will find applications for automating routine work. These include: searching websites to post content, classifying websites by topic from a database.",
          },
          "projectLink": {
            "span": "GitHub: ",
            "a": "project link",
          },
          "time": "January 2024",
        }
      }
    },

    "section-4": {
      "timer": {
        "timerTitle": "Do not miss the chance!",
        "p": "Hire the promising employee. Time left:",
        "timerCapture": ["day", "hour", "min", "sec"],
      }, 
      "about": {
        "h2": "About me",
        "p": ["I can study independently. Worked for himself and in a team. I have 3 years of remote work experience. There are skills in managing a team of subordinates. I have ambitions to manage my own IT business. I critically evaluate sources of knowledge, I use reliable information for my professional growth in the field of web development. I quickly adapt to changes in a turbulent time.", "I live in Ukraine in the city of Zaporizhzhia.",],
      },
    },

    "footer": {
      "footerMessage": "Power of enthusiasm",
    },
  },


  ua: {
    "header": {
      "title": "Резюме",
      "burger_menu_link": ["Навички та контакти", "Робота та освіта", "Мої проєкти", "Про мене",],
      "changeLanguageBut": {
        "span": "Змінити мову",
        "img": "images/flag-united-kingdom.svg",
      },
    },
    
    "section-1": {
      "plot-1-1": {
        "name": "Архипов Арсеній",
        "status-cont": "JavaScript розробник",
        "skills": {
          "h2": "Навички",
          "li": ["Mocha framework", "JavaScript", "HTML 5", "CSS 3", "OOP", "Git",],
        },
      },
      "plot-1-2": {
        "aim": {
          "h2": "Моя мета",
          "aim-text": "Збудувати блискучу кар'єру в IT",
        },
        "contacts": {
          "h2": "Контакти",
          "span": ["Телефон: ", "GitHub: ", "Пошта: ", "Резюме: ",],
          "a": ["(+38) 0968098737", "аккаунт", "arsenij.arxipov.1998 @gmail.com", "pdf файл",],
        },
      }
    },

    "section-2": {
      "work-experience": {
        "h2": "Досвід роботи",
        "progress": {
          "h3": "ДП «Івченко-Прогрес»",
          "position": "Інженер - програміст",
          "buttWork_moreInfo1": "Детальніше",
          "buttWork_lessInfo1": "Загальніше",
          "card-content": ["Програмування на Pascal, LabVIEW", "Управління системами для випробувань авіаційних двигунів", "Організація процесу підготовки авіадвигуна до випробувань",],
          "time": "Вересень 2020 - Зараз",
        },
        "jiji": {
          "h3": "Genesis «Jiji»",
          "position": "Віддаленний модератор",
          "buttWork_moreInfo2": "Детальніше",
          "buttWork_lessInfo2": "Загальніше",
          "card-content": "Перевірка контенту користувачів на відповідність правилам інтернет-магазину",
          "time": "Липень 2019 - Жовтень 2022",
        },
      },
      "education": {
        "h2": "Освіта",
        "master": {
          "h3": "Національний університет «Запорізька політехніка»",
          "degree": "Магістр",
          "subjectArea": "Комп'ютерні науки",
          "time": "Вересень 2020 - Грудень 2021",
        },
        "bachelor": {
          "h3": "Національний університет «Запорізька політехніка»",
          "degree": "Бакалавр",
          "subjectArea": "Інженерія програмного забезпечення",
          "time": "Вересень 2016 - Липень 2020",
        },
      },
      "language": {
        "h2": "Мої мови",
        "p": ["Російська - вільно", "Українська - вільно", "Англійська - intermediate",],
      }
    },

    "section-3": {
      "myProjectsTitle": "Мої проєкти",
      "projects": {
        "resume": {
          "h3": "Сайт резюме",
          "projectLanguage": "Стек технологій: ",
          "projLang": "HTML 5, CSS 3, JavaScript",
          "visibleCaption": "Дизайн для:",
          "img-proj-resume": ["планшет", "мобільний", "комп'ютер"],
          "buttProj_moreInfo1": "More info",
          "buttProj_lessInfo1": "Less info",
          "card-content": {
            "project-description": "Сайт обчислює тип пристрою користувача, його розміри, та положення у просторі. На основі цих данних розміщуються елементи дизайну, та створюються їх стилі. Адаптивний дизайн дозволяє сайту виглядати однаково гарно на абсолютній більшості пристроїв. При створенні проєкту використовувався принцип розробки «Mobile First».",
          },
          "projectLink": {
            "span": "GitHub: ",
            "a": "посилання на проєкт",
          },
          "time": "Лютий 2023",
        },
        "dataCollectionSystem": {
          "h3": "Organick Shop",
          "projectLanguage": "Стек технологій: ",
          "projLang": "TypeScript, MySQL, Scss, React",
          "buttProj_moreInfo2": "More info",
          "buttProj_lessInfo2": "Less info",
          "card-content": {
            "project-description": "Останній проект в Sigma Software University. Цей fullstack проект являє собою інтернет-магазин з базою даних MySQL. Клієнтська частина використовує бібліотеку React, серверна частина використовує бібліотеку Express. Користувач може переглянути товар та деталі, додати товар до кошика, видалити товар з кошика, завершити замовлення.",
          },
          "projectLink": {
            "span": "GitHub: ",
            "a": "посилання на проєкт",
          },
          "time": "Вересень 2023",
        },
        "smartHome": {
          "h3": "SEO-Buy сайт",
          "projectLanguage": "Стек технологій: ",
          "projLang": "TypeScript, Firestore Database, Scss, React, Redux",
          "buttProj_moreInfo3": "More info",
          "buttProj_lessInfo3": "Less info",
          "card-content": {
            "project-description": "Сайт створений для фахівців з SEO та написання контенту для просування бренду та амбітної команди. У розділі 'Інструменти' ви знайдете додатки для автоматизації рутинної роботи. Серед них: пошук сайтів для розміщення контенту, класифікація сайтів за темами з бази даних.",
          },
          "projectLink": {
            "span": "GitHub: ",
            "a": "посилання на проєкт",
          },
          "time": "Січень 2024",
        }
      }
    },

    "section-4": {
      "timer": {
        "timerTitle": "Не прогавте можливість!",
        "p": "Найміть перспективного співробітника. Часу залишилося:",
        "timerCapture": ["день", "год", "хв", "сек"],
      }, 
      "about": {
        "h2": "Про мене",
        "p": ["Вмію навчатися самостійно. Працював на себе та в команді. Маю 3 роки досвіду віддалиної праці. Є навички управління командою підлеглих. Маю амбіції керувати власним IT бізнесом. Критично оцінюю джерела знань, достовірну інформацію використовую для свого професійного зростання у сфері веб-розробки. Швидко пристосовуюсь до змін у бурхливий час.", "Проживаю в Україні в місті Запоріжжя.",],
      },
    },

    "footer": {
      "footerMessage": "Сила натхнення",
    },
  },
}