const jupiterRadius = 10 / 2;
const planetSpeed = 0.01;

// Function to update planet positions based on camera
export function handlePlanetFollow(camera, mars, jupiter, saturn, ring) {
    // Adjust mars pos based on camera pos, so it stays in view on section 2 
    if (camera.position.z >= 20 && camera.position.z <= 33) {
        // Sinusoidal motion
        const offset = Math.sin(camera.position.z * 0.1) * 0.2;

        mars.position.z = THREE.MathUtils.lerp(mars.position.z, camera.position.z - 2.8, planetSpeed);
        mars.position.x = THREE.MathUtils.lerp(mars.position.x, -1 - offset, planetSpeed);
    } else {

        // Go back to initial pos when camera out of range
        mars.position.z = THREE.MathUtils.lerp(mars.position.z, 26.5, planetSpeed);
    }

    // Adjust jupiter pos based on camera pos, so it stays in view on section 3
    if (camera.position.z >= 40 && camera.position.z <= 60) {
        jupiter.position.z = THREE.MathUtils.lerp(jupiter.position.z, camera.position.z -jupiterRadius - 18, planetSpeed);
    } else {
        // Go back to initial pos when camera out of range
        jupiter.position.z = THREE.MathUtils.lerp(jupiter.position.z, 30, planetSpeed);
    }

    // Adjust saturn pos based on camera pos, so it stays in view on section 4
    if (camera.position.z >= 75 && camera.position.z <= 100) {
        saturn.position.z = THREE.MathUtils.lerp(saturn.position.z, camera.position.z - 16, planetSpeed);
        ring.position.z = THREE.MathUtils.lerp(ring.position.z, camera.position.z - 16, planetSpeed);
    } else {
        // Go back to initial pos when camera out of range
        saturn.position.z = THREE.MathUtils.lerp(saturn.position.z, 90, planetSpeed);
        ring.position.z = THREE.MathUtils.lerp(ring.position.z, 90, planetSpeed);
    }
}