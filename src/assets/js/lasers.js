// Render distance on the z axis
const MAX_RENDER_DISTANCE = 200;

export function shootLaser(camera, raycaster, mouse, scene, lasers) {
  // Creates a 3D box, in other words the laser beam
  const geometry = new THREE.BoxGeometry(0.05, 0.05, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x31f827 });
  // Combine the shape and appearance
  const laser = new THREE.Mesh(geometry, material);

  // Position at camera
  laser.position.copy(camera.position);
  // Rotate the laser to match the camera
  raycaster.setFromCamera(mouse, camera);

  // Use ray direction
  const direction = raycaster.ray.direction.clone();

  // Rotate laser to face that direction
  laser.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, -0.005),
    direction
  );

  // Take the direction the laser should travel, turn it into a speed 
  // vector, and store it on the laser so we can move it every frame.
  laser.userData.velocity = direction.multiplyScalar(0.5);

  // Push it forward a bit so it's in front of the near plane
  laser.position.add(
    new THREE.Vector3(0, 0, -0.5).applyQuaternion(camera.quaternion)
  );
  
  scene.add(laser);
  // Add inside array so that animation loop can move all the lasers in every frame
  lasers.push(laser);
}

/* 
This function will move the lasers further away from the screen.
Once it reaches MAX_RENDER_DISTANCE, it will remove the lasers.
*/
export function moveAllLasers(lasers, scene) {
  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].position.add(lasers[i].userData.velocity);

    if (lasers[i].position.length() > MAX_RENDER_DISTANCE) {
      scene.remove(lasers[i]);
      lasers.splice(i, 1);
    }
  }
}