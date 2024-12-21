import { createEarthGroup, getPlanet, getRing } from './addPlanet.js';
import { createStars } from './starfield.js';

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
renderer.setClearColor(0x000000, 0);  // Keep the background transparent
renderer.clear();

const backgroundRenderer = new THREE.WebGLRenderer({ canvas: backgroundCanvas });
backgroundRenderer.setSize(window.innerWidth, window.innerHeight);

// Set initial camera position
camera.position.z = 5;

// Creating all the objects and appending to the scene 
const stars = createStars();
backgroundScene.add(stars);

const mars = getPlanet({size: 1.4, img: "mars.jpg", distance: [0, 0, 26.5], glow: 0xC97C5D});
scene.add(mars);

const jupiter = getPlanet({size: 11, img: "jupiter.jpg", distance: [-13, 3, 40], glow: 0xD1B27C});
scene.add(jupiter);

const saturn = getPlanet({size: 5, img: "saturn.jpg", distance: [-12, 4, 85], glow: 0xD1B27C});
scene.add(saturn);

const ring = getRing({img: "rings2.jpg", distance: [-12, 4, 85]})
scene.add(ring);

const {earthGroup,  earthMesh, lightsMesh, cloudsMesh, glowMesh} = createEarthGroup([1, 0, 3.5]);
scene.add(earthGroup);

const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
sunLight.position.set(-2, 0.5, 1.5);
sunLight.castShadow = false;
scene.add(sunLight);

// Function to update camera based on scroll position
function handleScroll() {
    // Get the vertical scroll position
    const scrollY = window.scrollY;
    // Maximum scrollable height
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    // Calculate the scroll fraction (0 to 1)
    const scrollFraction = scrollY / maxScroll; 

    // Adjust multiplier for the zoom effect
    camera.position.z = 5 + scrollFraction * 100;
}

// Listen for the scroll event
window.addEventListener('scroll', handleScroll);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Slight rotation of stars for added effect
    stars.rotation.x += 0.00003;
    stars.rotation.y += 0.00003;

    earthMesh.rotation.y += 0.0002;
    lightsMesh.rotation.y += 0.0002;
    glowMesh.rotation.y += 0.0002;
    cloudsMesh.rotation.y += 0.00023;

    mars.rotation.y += 0.0002;

    // Adjust mars pos based on cmaera pos 
    if (camera.position.z >= 22 && camera.position.z <= 33) {
        const offset = Math.sin(camera.position.z * 0.1) * 0.2; // Sinusoidal motion

        mars.position.z = THREE.MathUtils.lerp(mars.position.z, camera.position.z - 2.8, 0.01);
        mars.position.x = THREE.MathUtils.lerp(mars.position.x, 0 - offset, 0.05);
    }

    jupiter.rotation.y += 0.0004;
    saturn.rotation.y += 0.0008;
    ring.rotation.z += 0.0002;

    console.log(`camera z pos ${camera.position.z}`);

    backgroundRenderer.render(backgroundScene, camera);
    renderer.render(scene, camera);
}
animate();

// Adjust canvas size on window resize
window.addEventListener("resize", () => {
    backgroundRenderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});