"use strict"

function changeLanguage(lang) {
  let supportLanguages = Object.keys(vocabulary);
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
  document.getElementById("changeLanguageBut").textContent = vocabulary[lang].header.changeLanguageBut;

/*Change Section-1 language*/
  document.querySelector(".name").textContent = vocabulary[lang]["section-1"]["plot-1-1"].name;
  document.querySelector(".status-cont").textContent = vocabulary[lang]["section-1"]["plot-1-1"]["status-cont"];
  document.querySelector(".scills > h2").textContent = vocabulary[lang]["section-1"]["plot-1-1"].scills.h2;

  let liArrScills = document.querySelectorAll(".scills > li");
  for(let i = 0; i < liArrScills.length; i++) {
    liArrScills[i].textContent = vocabulary[lang]["section-1"]["plot-1-1"].scills.li[i];
  }

  document.querySelector(".aim > h2").textContent = vocabulary[lang]["section-1"]["plot-1-2"].aim.h2;
  document.querySelector(".aim > span").textContent = vocabulary[lang]["section-1"]["plot-1-2"].aim.span;
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
}

const vocabulary = {
  en: {
    "header": {
      "title": "Resume",
      "burger_menu_link": ["Scills & contact", "Work & education", "My projects", "About me",],
      "changeLanguageBut": "Change language",
    },
    
    "section-1": {
      "plot-1-1": {
        "name": "Arkhipov Arsenii",
        "status-cont": "Intern web developer",
        "scills": {
          "h2": "Scills",
          "li": ["Mocha framework", "JavaScript", "HTML 5", "CSS 3", "OOP", "Git",],
        },
      },
      "plot-1-2": {
        "aim": {
          "h2": "My purpose",
          "span": "Build a brilliant career in IT",
        },
        "contacts": {
          "h2": "Contact",
          "span": ["Phone: ", "Resume: ", "GitHub: ", "Email: ",],
          "a": ["(+38) 0968098737", "pdf file", "project", "address",],
        },
      }
    },

    "section-2": {
      "work-experience": {
        "h2": "Work experience",
        "progress": {
          "h3": "SE «Ivchenko-Progress»",
          "position": "Research engineer",
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
        "p": ["English - intermediate", "Ukrainian - fluently", "Russian -fluently",],
      }
    },

    "section-3": {
      "timer": {
        "h2": "Do not miss the chance!",
        "p": "Hire the promising employee. Time left:",
      }, 
      "projects": {
        "resume": {
          "h3": "Site resume",
          "projectLanguage": ["Language:", "HTML, CSS, JavaScript",],
          "visibleCaption": "The design of this site adapts to the position of your device",
          "img-proj-resume": ["tablet", "mobile", "computer"],
          "buttProj_moreInfo1": "More info",
          "buttProj_lessInfo1": "Less info",
          "card-content": {
            "project-description": "The position of the design elements and their sizes are calculated relative to the dimensions of the user's device. Combined with the «Mobile First» design principle, which allows the site design to scale from smartphone to tablet to computer, the site adapts to the size and position of your device. That makes it possible to convey the idea on the absolute majority of devices.",
            "projectLink": "GitHub: ",
            "time": "January 2022",
          },
        },
        "dataCollectionSystem": {
          "h3": "Aircraft engine data collection system",
          "projectLanguage": ["Language:", "LabVIEW",],
          "buttProj_moreInfo2": "More info",
          "buttProj_lessInfo2": "Less info",
          "card-content": {
            "project-description": "The system for collecting data from sensors (temperature, humidity, pressure) is designed for their storage, graphical presentation in the form of a graph in real time. It has a subsystem for post-processing and visualization of measured data using averaging, interpolation and approximation algorithms.",
            "projectLink": "GitHub: ",
            "time": "December 2021",
          },
        },
        "smartHome": {
          "h3": "The device for monitoring the state of the switchboard equipment",
          "projectLanguage": ["Language:", "C++",],
          "buttProj_moreInfo3": "More info",
          "buttProj_lessInfo3": "Less info",
          "card-content": {
            "project-description": "Compact device for protection against fires, flooding, condensation. Installed in industrial or household electrical panels. It has the possibility of emergency power off in the electrical network. Measures temperature and humidity. In an emergency situation, sends SMS, MMS, and makes a call to the client's mobile phone.",
            "projectLink": "GitHub: ",
            "time": "July 2020",
          },
        }
      }
    },

    "section-4": {
      "about": {
        "h2": "About me",
        "p": ["I can study independently. Worked for himself and in a team. I have 3 years of remote work experience. There are skills in managing a team of subordinates. I have ambitions to manage my own IT business. I critically evaluate sources of knowledge, I use reliable information for my professional growth in the field of web development. I quickly adapt to changes in a turbulent time.", "I live in Ukraine in the city of Zaporizhzhia.",],
      },
    },

    "footer": {
      "p": "Power of enthusiasm",
    },
  },





  ua: {
    "header": {
      "title": "Резюме",
      "burger_menu_link": ["Навички та контакти", "Робота та освіта", "Мої проекти", "Про мене",],
      "changeLanguageBut": "Змінити мову",
    },
    
    "section-1": {
      "plot-1-1": {
        "name": "Архипов Арсеній",
        "status-cont": "Інтерн веб-розробник",
        "scills": {
          "h2": "Навички",
          "li": ["Mocha framework", "JavaScript", "HTML 5", "CSS 3", "OOP", "Git",],
        },
      },
      "plot-1-2": {
        "aim": {
          "h2": "Моя мета",
          "span": "Побудувати блискучу кар'єру в IT",
        },
        "contacts": {
          "h2": "Контакти",
          "span": ["Телефон: ", "Резюме: ", "GitHub: ", "Пошта: ",],
          "a": ["(+38) 0968098737", "pdf файл", "проєкт", "адреса",],
        },
      }
    },

    "section-2": {
      "work-experience": {
        "h2": "Досвід роботи",
        "progress": {
          "h3": "ДП «Івченко-Прогрес»",
          "position": "Інженер - дослідник",
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
          "subjectArea": "Розробка програмного забезпечення",
          "time": "Вересень 2016 - Липень 2020",
        },
      },
      "language": {
        "h2": "Мови",
        "p": ["Англійська - середній", "Українська - вільно", "Російська - вільно",],
      }
    },

    "section-3": {
      "timer": {
        "h2": "Не прогавте можливість!",
        "p": "Найміть перспективного співробітника. Часу залишилося:",
      }, 
      "projects": {
        "resume": {
          "h3": "Сайт резюме",
          "projectLanguage": ["Мова", "HTML, CSS, JavaScript",],
          "visibleCaption": "Дизайн цього сайту адаптується під положення вашого пристрою",
          "img-proj-resume": ["планшет", "мобільний", "комп'ютер"],
          "buttProj_moreInfo1": "More info",
          "buttProj_lessInfo1": "Less info",
          "card-content": {
            "project-description": "Завдяки розрахунку розмірів пристрою користувача, обчислюється положення елементів дизайну та їх розміри. У поєднанні з принципом розробки «Mobile First», який дозволяє масштабувати дизайн сайту від смартфона до планшета далі до компьютера, сайт підлаштовується під розміри та положення вашого пристрою. Що дає можливість передати задум на абсолютній більшості пристроїв.",
            "projectLink": "GitHub: ",
            "time": "Січень 2022",
          },
        },
        "dataCollectionSystem": {
          "h3": "Система збору даних з авіаційних двигунів",
          "projectLanguage": ["Мова", "LabVIEW",],
          "buttProj_moreInfo2": "More info",
          "buttProj_lessInfo2": "Less info",
          "card-content": {
            "project-description": "Система збору данних з датчиків (температури, вологи, тиску) призначена для їх збереження, графічного подання у вігляді графіку в режимі реального часу. Має підсистему постобробки та візуалізації збережених до бази даних показників за алгоритмами усереднення, інтерполяції та апроксимації.",
            "projectLink": "GitHub: ",
            "time": "Грудень 2021",
          },
        },
        "smartHome": {
          "h3": "Пристрій контролю стану електрощитового обладнання",
          "projectLanguage": ["Мова", "С++",],
          "buttProj_moreInfo3": "More info",
          "buttProj_lessInfo3": "Less info",
          "card-content": {
            "project-description": "Компактний пристрій для захисту від пожеж, затоплень, конденсату. Встановлюється в промислові чи побутові електричні щити. Має можливість аварійного вимкнення живлення в мережі. Вимірює показники температури та вологи. У аварійній ситуації передає SMS, MMS, та робить виклик на мобільний телефон клієнта.",
            "projectLink": "GitHub: ",
            "time": "Липень 2020",
          },
        }
      }
    },

    "section-4": {
      "about": {
        "h2": "Про мене",
        "p": ["Вмію навчатися самостійно. Працював на себе та в команді. Маю 3 роки досвіду віддалиної праці. Є навички управління командою підлеглих. Маю амбіції керувати власним IT бізнесом. Критично оцінюю джерела знань, достовірну інформацію використовую для свого професійного зростання у сфері веб-розробки. Швидко пристосовуюсь до змін у бурхливий час.", "Проживаю в Україні в місті Запоріжжя.",],
      },
    },

    "footer": {
      "p": "Power of enthusiasm",
    },
  },
}