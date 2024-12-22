export function createStars() {
    const starGeometry = new THREE.BufferGeometry();

    // Load the circle texture
    const diamondTexture = new THREE.TextureLoader().load('images/stars/diamond.png');

    // Create the PointsMaterial using the texture
    const starMaterial = new THREE.PointsMaterial({
        size: 0.8,
        map: diamondTexture, // Use the circle texture
        transparent: true, // Ensure the texture background is transparent
        depthWrite: false, // Prevent z-fighting for transparent particles
        blending: THREE.AdditiveBlending, // Additive blending for a glow effect
    });

    const starVertices = [];
    for (let i = 0; i < 20000; i++) {
        starVertices.push(
            (Math.random() - 0.5) * 1000, // X-coordinate
            (Math.random() - 0.5) * 1000, // Y-coordinate
            (Math.random() - 0.5) * 1000  // Z-coordinate
        );
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);

    return stars;
}