![Website Status](https://img.shields.io/website?url=https://xlmt09.github.io/portfolio/)
![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue)
![Version](https://img.shields.io/badge/version-1.5.1-brightgreen)
![Three.js](https://img.shields.io/badge/3D-Three.js-green)

# Hijithan's Website

My portfolio website is developed using HTML, CSS, and JavaScript, incorporating the Three.js library for 3D graphics. It showcases my skills and projects through interactive and visually engaging elements, providing a modern and dynamic user experience.\
You can access the website [here](https://xlmt09.github.io/portfolio/).

<img src="project\public\images\section3\section3_portfolio.png" alt="Screenshot" width="430" height="400">

## How to Run Locally
1. Go to the project directory.
2. Install dependencies.
3. Use the command `npm run dev` to run localhost website.

## Access Localhost on other Devices
1. Make sure all devices are connected to the same network (e.g. the same Wi-Fi).
2. Start the development server with host access enabled `npm run dev -- --host`.
3. After the server starts, one or more network URLs will be displayed.
4. Open one of the network URLs on another device to access the webpage.

## How to Deploy New Changes
1. First we need to build our dist package and commit it:
    ```bash
    npm run build
    git add build -f
    git commit -m "..."
    ```
2. Push to prod branch
    ```bash
    git subtree push --prefix project origin gh-pages
    ```

## Credits
All image textures under the `planets` directory were taken from [solarsystemscope](https://www.solarsystemscope.com/textures/).
