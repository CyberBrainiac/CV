<h1 align="center">СV</h1>

<div align="center">You can see the site CV by clicking <a href="https://resum.online">here</a></div>

## Project Overview

### Objective: *to demonstrate frontend development skills*

**Get a job at a promising company as a _Junior JavaScript developer_**

### Site feature: *responsive website design*

The site calculates the type of user's device, its size, and position in space. Based on this data, design elements are placed and their styles are created. Responsive design allows the site to look equally good on the vast majority of devices. The project was created using the «Mobile First» development principle.

## Running the project on a local server

***You can copy the code from my repository and use it for your projects***

To use the code of the site and change it, you will need:
* get a copy of my site [repository](https://github.com/PoziTronAr/CV.git)
  - download the repository in `zip` archive format;
  - unzip the archive;
  - start the file ***index.html***;
  - Open all files with extensions `.html, .js, .css` in a convenient code editor..
* Make a fork of the repository, edit files with built-in [tools](https://docs.github.com/ru/codespaces/developing-in-codespaces/developing-in-a-codespace) from GitHub
* clone the repository with the `gh repo clone PoziTronAr/CV` command and then modify the code in the code editors.

## The process of creating a website

The stages of creating the site are described below:

* research:
  - [zety: CV builder](https://zety.com/resume-builder);
  - [vista: CV templates](https://create.vista.com/ru/templates/chief-executive-officer-professional-profile/id-6061a0ffa637ee11e3fba1bc/);
  - [the muse: CV templates](https://www.themuse.com/advice/the-41-best-resume-templates-ever);
  - [microsoft: CV templates](https://templates.office.com/ru-ru/resume-templates).
* prototyping in [Figma](https://www.figma.com/):
  - `moodboard` creation;
  - `prototype` creation. Below is a screenshot of the *1st page* of the prototype site.![moodboard](/images_Readme/prototype.png)
* frontend development:
  - creating an `HTML` skeleton;
  - creating `JavaScript` animations:
    - **burger menu**;
    - **dropdown list**;
    - **preloader**;
    - **countdown timer**.
  - creating `CSS` styles.
* testing functions on different devices;
* error correction;
* optimizing the speed of the site:
  - **optimization 1**: initially, the **preloader** function started when you flipped the device and started the site for the first time. Optimization: reduced use of the **preloader** function. Its use has been reduced to 1 launch on the first loading of the site. In order to hide the changes occurring when the device is turned over, the `svg` background is raised by *z-index*, overlapping the content on the site. As a result, design redrawing speed was increased from 100ms to 40ms on modern devices;
  - **optimization 2**: initially, all the backgrounds were created in [Figma](https://www.figma.com/) and inserted into the page as `image.png`. Optimization: create background images using `HTML` tags: `<canvas>, <svg>`. The figure shows the calculations performed to derive the **formulas for rounding** right and obtuse angles in a polygon on the site (the background figure around the photo). As a result, the page rendering time was reduced by 20ms. ![image](/images_Readme/circleTangentToAnObtuseAngle.png)
* create a readme file;
* site release.



