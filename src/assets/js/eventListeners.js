export function setScrollListener(handleScroll) {
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