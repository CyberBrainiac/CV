<h1 align="center">СV</h1>

<div align="center"><a href="https://resum.online">Вы можете увидеть сайт-резюме по ссылке</a></div>

## Обзор проекта

### Цель создания проекта: *продемонстрировать навыки frontend разработки*
Также, устроиться в перспективную компанию на должность Junior JavaScript developer

### Особенность сайта: *полностью адаптивний дизайн сайта*
The site calculates the type of user's device, its size, and position in space. Based on this data, design elements are placed and their styles are created. Responsive design allows the site to look equally good on the vast majority of devices. The project was created using the «Mobile First» development principle.


## Запуск проекта на локальком сервере

***Вы можете копировать код с моего репозитария и использовать для своих проектов***

Для использования кода сайта и его изменения потребуеться:
* получить копию [репозитария](https://github.com/PoziTronAr/CV.git) моего сайта:
  - загрузить репозитарий в формате `zip` архива;
  - распаковать архив;
  - запустить файл ***index.html***;
  - открыть все файлы с расширением `.html, .js, .css` в удобном редакторе кода.
* сделать форк репозитария, редактировать файлы встроенными [инструментами](https://docs.github.com/ru/codespaces/developing-in-codespaces/developing-in-a-codespace) от GitHub;
* клонировать репозитарий командой `gh repo clone PoziTronAr/CV`, с последующим изменением кода в редакторах кода.

## Процесс создания сайта

Этапы создания сайта описаны ниже:

* исследование области:
  - [zety CV builder](https://zety.com/resume-builder);
  - [vista шаблоны резюме](https://create.vista.com/ru/templates/chief-executive-officer-professional-profile/id-6061a0ffa637ee11e3fba1bc/);
  - [the muse шаблоны резюме](https://www.themuse.com/advice/the-41-best-resume-templates-ever);
  - [microsoft шаблоны резюме](https://templates.office.com/ru-ru/resume-templates).
* создание прототипа в [Figma](https://www.figma.com/):
  - создание `moodboard`; 
  - создание `прототипа`. Ниже приведён скрин *1 страницы* прототипа сайта: ![moodboard](/images_Readme/prototype.png)
* frontend разработка:
  - создание `HTML` каркаса;
  - создание `JavaScript` анимаций:
    - **burger menu**;
    - **dropdown list**;
    - **preloader**;
    - **countdown timer**.
   - создание `CSS` стилей.
* тестирование функций на разних устройствах;
* исправление ошибок;
* оптимизация скорости работы сайта:
  - **оптимизация 1**: изначально при перевороте устройства и при первом запуске сайта запускалась функция **preloader**. Оптимизация: сокращение использования функции **preloader**. Её использование было сокращено до 1 запуска при первой загрузке сайта. Что бы скрыть происходящие изменение при перевороте устройства, поднимается `svg` фон по *z-index*, перекрывая контент на сайте. В результате скорость перерисовки дизайна была увеличена со 100мс до 40мс на современных устройствах;
  - **оптимизация 2**: изначально все фоновые рисунки были созданны в [Figma](https://www.figma.com/) и вставлены на страницу как `image.png`. Оптимизация: создание фоновых изображений при помощи `HTML` тегов: `<canvas>, <svg>`. На рисунке изображены проведенные расчёты для выведения **формулы скругления** прямых и тупых углов в многоуголинике на сайте (фоновая фигура вокруг фото). В результате, время на отрисовку страницы сократилось на 20мс ![картинка](/images_Readme/circleTangentToAnObtuseAngle.png)
* создание readme файла;
* релиз сайта.



