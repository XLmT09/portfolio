import { createEarthGroup, getPlanet, getSaturnsRing } from './addPlanet.js';
import { createStars } from './starfield.js';
import { shootLaser, moveAllLasers } from './lasers.js';
import { setScrollListener, setLaserListener, setMouseListener, setResizeListener } from './eventListeners.js';
import { handlePlanetFollow } from './handlers.js';

const w = window.innerWidth;
const h = window.innerHeight;
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const backgroundScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const canvas = document.getElementById('webgl-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
// Keep the background transparent
renderer.setClearColor(0x000000, 0); 
renderer.clear();

const backgroundRenderer = new THREE.WebGLRenderer({ canvas: backgroundCanvas });
backgroundRenderer.setSize(window.innerWidth, window.innerHeight);

// Holds all laser objects currently in scene
const lasers = [];

// This var will hold the most up to date mouse coords
const mouse = new THREE.Vector2();

// Create a reusable ray-shooting tool
const raycaster = new THREE.Raycaster();

// Set initial camera position
camera.position.z = 5;

// Creating all the objects and appending to the scene 
const stars = createStars();
backgroundScene.add(stars);

const mars = getPlanet({size: 1.4, img: "mars.jpg", position: [-1, 0, 26.5], glow: 0xC97C5D});
scene.add(mars);

const jupiter = getPlanet({size: 10, img: "jupiter.jpg", position: [0, 0, 34], glow: 0xFF8C00});
scene.add(jupiter);

const saturn = getPlanet({size: 4, img: "saturn.jpg", position: [-0.5, -1, 90], glow: 0xD1B27C});
scene.add(saturn);

const ring = getSaturnsRing({img: "saturnRings.jpg", position: [-0.5, -0.4, 90]})
scene.add(ring);

const {earthGroup,  earthMesh, lightsMesh, cloudsMesh, glowMesh} = createEarthGroup([1, 0, 3.5]);
scene.add(earthGroup);

// Add light to objects so it not completely dark
const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

// Add all the event listeners here
setScrollListener(camera);
setLaserListener(shootLaser, 100, camera, raycaster, mouse, scene, lasers);
setMouseListener(mouse);
setResizeListener(backgroundRenderer, renderer, camera);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Slight rotation of stars for added effect
    stars.rotation.x += 0.00003;
    stars.rotation.y += 0.00003;

    // Rotate the planets and there layers
    earthMesh.rotation.y += 0.0002;
    lightsMesh.rotation.y += 0.0002;
    glowMesh.rotation.y += 0.0002;
    cloudsMesh.rotation.y += 0.00023;
    jupiter.rotation.y += 0.0002;
    saturn.rotation.y += 0.0002;
    ring.rotation.z -= 0.00005;
    mars.rotation.y += 0.0002;

    handlePlanetFollow(camera, mars, jupiter, saturn, ring);
    moveAllLasers(lasers, scene);

    backgroundRenderer.render(backgroundScene, camera);
    renderer.render(scene, camera);
}
animate();