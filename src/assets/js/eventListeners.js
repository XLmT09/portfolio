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

function isOverBlockedArea(e) {
  return !!e.target.closest('#section3 .box-container');
}

function checkAndTriggerLaser(startFiring, stopFiring, fireOnce) {
  let startX = 0;
  let startY = 0;
  let isScrolling = false;
  const MOVE_THRESHOLD = 10; // px

  window.addEventListener("pointerdown", (e) => {
    // Do nothing if over box-container
    if (isOverBlockedArea(e)) return;

    if (e.pointerType === "mouse") {
      startFiring(); // hold to fire
    } else {
      // mobile: wait, don't fire yet (handled on pointerup)
      startX = e.clientX;
      startY = e.clientY;
      isScrolling = false;
    }
  });

  /* Touchscreen devices use tap-to-fire instead of hold-to-fire.
  This avoids inconsistent behavior caused by varying touch 
  responsiveness across devices. */

  window.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "touch") return;
    if (isOverBlockedArea(e)) return;

    const dx = Math.abs(e.clientX - startX);
    const dy = Math.abs(e.clientY - startY);

    if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) {
      isScrolling = true;
    }
  });


  window.addEventListener("pointerup", (e) => {
    if (e.pointerType === "mouse") {
      stopFiring();
      return;
    }

    if (!isScrolling) {
      fireOnce();
    }
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

  function fireOnce() {
    shootLaser(camera, raycaster, mouse, scene, lasers);
  }

  checkAndTriggerLaser(startFiring, stopFiring, fireOnce);
}