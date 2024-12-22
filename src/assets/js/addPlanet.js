import { getFresnelMat } from './glow.js';

const textLoader = new THREE.TextureLoader();

// Function to create and return the Earth
export function createEarthGroup(pos) {
  // Put the Earths layers into here (i.e clouds, texture, etc)
  const earthGroup = new THREE.Group();
  // Add a slight tilt to replicate earth
  earthGroup.rotation.z = -20.4 * Math.PI / 180;

  // Load the texture for the Earth
  const texture = textLoader.load("/images/earth.jpg");
  const geometry = new THREE.IcosahedronGeometry(1, 12);
  const material = new THREE.MeshStandardMaterial({ map: texture });

  const earthMesh = new THREE.Mesh(geometry, material);
  earthGroup.add(earthMesh);
  earthGroup.position.set(...pos);

  // Load the texture for the Earth light
  const earthLight = textLoader.load("/images/earth_light.jpg");
  const lightsMat = new THREE.MeshBasicMaterial({
      map: earthLight,
      // Defines how the material blends with the background, in this case 
      // it adds up rather than replacing each other.
      blending: THREE.AdditiveBlending,
  });
  const lightsMesh = new THREE.Mesh(geometry, lightsMat);
  earthGroup.add(lightsMesh);

  // Load the texture for the Earth clouds
  const earthCloudTexture = textLoader.load("/images/earth_clouds.jpg");
  const cloudsMat = new THREE.MeshStandardMaterial({
      map: earthCloudTexture,
      transparent: true,
      // Set the transparency level
      opacity: 0.4,
      // Add the backgrounds together rather than replacing
      blending: THREE.AdditiveBlending,
  });

  const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
  cloudsMesh.scale.setScalar(1.003);
  earthGroup.add(cloudsMesh);
  
  // For visuals add glow around planet
  const fresnelMat = getFresnelMat();
  const glowMesh = new THREE.Mesh(geometry, fresnelMat);
  glowMesh.scale.setScalar(1.01);
  earthGroup.add(glowMesh);

  return { earthGroup, earthMesh, lightsMesh, cloudsMesh, glowMesh};
}

// Funtion to create any planet with no additional layers,
export function getPlanet({img = '', size = 1, position = [], glow}) {
  // Create the spherical object
  const geo = new THREE.IcosahedronGeometry(1, 12);
  // Create group to coallate the planet and frensel
  const planetGroup = new THREE.Group();
  // Set the inital position
  planetGroup.position.set(...position);

  
  const map = textLoader.load(`/images/${img}`);
  const planetMat = new THREE.MeshStandardMaterial({
    map,
  });
  const planet = new THREE.Mesh(geo, planetMat);
  planet.scale.setScalar(size);

  // Add slight tilt to the planet
  planetGroup.rotation.z = -20.4 * Math.PI / 180;
  
  const planetRimMat = getFresnelMat({ rimHex: glow, facingHex: 0x000000 });
  const planetRimMesh = new THREE.Mesh(geo, planetRimMat);
  // The frensel should just outside the planet hence the 1.01 multiplier
  planetRimMesh.scale.setScalar(1.01);
  
  planet.add(planetRimMesh);
  planetGroup.add(planet);

  return planetGroup;
}

export function getSaturnsRing({img = '', position = []}) {
  const ringTexture = textLoader.load(`/images/${img}`);
  const innerRingRadius = 8;
  const outerRingRadius = 12;
  // Higher segment makes the ring smoother
  const segmentNumber = 128;

  const ringGeometry = new THREE.RingGeometry(innerRingRadius, outerRingRadius, segmentNumber);

  const ringMaterial = new THREE.MeshBasicMaterial({
    map: ringTexture,
    // Set the base colour
    color: 0xffffff,
    // Make the ring visible from both sides
    side: THREE.DoubleSide,
  });

  const ring = new THREE.Mesh(ringGeometry, ringMaterial);

  ring.rotation.x = Math.PI / 2.2; 
  ring.rotation.z = Math.PI / 4; 

  ring.position.set(...position);

  return ring;
}

