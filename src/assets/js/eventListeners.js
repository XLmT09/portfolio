export function setScrollListener(camera) {
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

  window.addEventListener('scroll', handleScroll);
}

// Get latest coords of mouse and convert them into ThreeJS coords
export function setMouseListener(mouse) {
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });
}

// Adjust canvas size on window resize
export function setResizeListener(backgroundRenderer, renderer, camera) {
  window.addEventListener("resize", () => {
    backgroundRenderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
  });
}

export function setLaserListener(shootLaser, fireRate, camera, raycaster, mouse, scene, lasers) {
  let isFiring = false;
  let fireInterval = null;

  function startFiring() {
    if (isFiring) return;
    isFiring = true;

    shootLaser(camera, raycaster, mouse, scene, lasers); // immediate shot

    fireInterval = setInterval(() => {
      shootLaser(camera, raycaster, mouse, scene, lasers);
    }, fireRate);
  }

  function stopFiring() {
    isFiring = false;
    clearInterval(fireInterval);
  }

  window.addEventListener('pointerdown', startFiring);
  window.addEventListener('pointerup', stopFiring);
}