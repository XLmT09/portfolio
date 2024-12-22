import { createEarthGroup, getPlanet, getSaturnsRing } from './addPlanet.js';
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
// Keep the background transparent
renderer.setClearColor(0x000000, 0); 
renderer.clear();

const backgroundRenderer = new THREE.WebGLRenderer({ canvas: backgroundCanvas });
backgroundRenderer.setSize(window.innerWidth, window.innerHeight);

const jupiterRadius = 10 / 2;

// Set initial camera position
camera.position.z = 5;

// Creating all the objects and appending to the scene 
const stars = createStars();
backgroundScene.add(stars);

const mars = getPlanet({size: 1.4, img: "mars.jpg", position: [-1, 0, 26.5], glow: 0xC97C5D});
scene.add(mars);

const jupiter = getPlanet({size: 10, img: "jupiter.jpg", position: [0, 0, 34], glow: 0xFF8C00});
scene.add(jupiter);

const saturn = getPlanet({size: 4, img: "saturn.jpg", position: [-12, 4, 85], glow: 0xD1B27C});
scene.add(saturn);

const ring = getSaturnsRing({img: "saturnRings.jpg", position: [-12, 4, 85]})
scene.add(ring);

const {earthGroup,  earthMesh, lightsMesh, cloudsMesh, glowMesh} = createEarthGroup([1, 0, 3.5]);
scene.add(earthGroup);

// Add light to objects so it not completely dark
const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
sunLight.position.set(-2, 0.5, 1.5);
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

    // Rotate the planets and there layers
    earthMesh.rotation.y += 0.0002;
    lightsMesh.rotation.y += 0.0002;
    glowMesh.rotation.y += 0.0002;
    cloudsMesh.rotation.y += 0.00023;
    jupiter.rotation.y += 0.0002;
    saturn.rotation.y += 0.0008;
    ring.rotation.z += 0.0002;
    mars.rotation.y += 0.0002;
        

    // Adjust mars pos based on camera pos, so it stays in view on section 2 
    if (camera.position.z >= 20 && camera.position.z <= 33) {
        // Sinusoidal motion
        const offset = Math.sin(camera.position.z * 0.1) * 0.2;

        mars.position.z = THREE.MathUtils.lerp(mars.position.z, camera.position.z - 2.8, 0.01);
        mars.position.x = THREE.MathUtils.lerp(mars.position.x, -1 - offset, 0.05);
    } else {
        // Go back to inital pos when camera out of range
        mars.position.z = THREE.MathUtils.lerp(mars.position.z, 26.5, 0.01);
    }

    //Adjust jupiter pos based on camera pos, so it stays in view on section 3
    if (camera.position.z >= 40 && camera.position.z <= 60) {
        jupiter.position.z = THREE.MathUtils.lerp(jupiter.position.z, camera.position.z -jupiterRadius - 18, 0.01);
    } else {
        // Go back to inital pos when camera out of range
        jupiter.position.z = THREE.MathUtils.lerp(jupiter.position.z, 34, 0.01);
    }

    console.log(`width ${window.innerWidth}, height ${window.innerHeight}`);
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