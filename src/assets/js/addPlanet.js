import { getFresnelMat } from './glow.js';

// Function to create and return the Earth
export function createEarthGroup() {
  const earthGroup = new THREE.Group();
  earthGroup.rotation.z = -20.4 * Math.PI / 180;

  // Load the texture for the Earth
  const texture = new THREE.TextureLoader().load("/images/earth.jpg");
  const geometry = new THREE.IcosahedronGeometry(1, 12);
  const material = new THREE.MeshStandardMaterial({ map: texture });

  const earthMesh = new THREE.Mesh(geometry, material);
  earthGroup.add(earthMesh);
  earthGroup.position.set(2, 1, 1);

  // Load the texture for the Earth light
  const earthLight = new THREE.TextureLoader().load("/images/earth_light.jpg");
  const lightsMat = new THREE.MeshBasicMaterial({
      map: earthLight,
      blending: THREE.AdditiveBlending,
  });
  const lightsMesh = new THREE.Mesh(geometry, lightsMat);
  earthGroup.add(lightsMesh);

  // Load the texture for the Earth clouds
  const earthCloudTexture = new THREE.TextureLoader().load("/images/earth_clouds.jpg");
  const cloudsMat = new THREE.MeshStandardMaterial({
      map: earthCloudTexture,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
  });

  const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
  cloudsMesh.scale.setScalar(1.003);
  earthGroup.add(cloudsMesh);

  const fresnelMat = getFresnelMat();
  const glowMesh = new THREE.Mesh(geometry, fresnelMat);
  glowMesh.scale.setScalar(1.01);
  earthGroup.add(glowMesh);

  return { earthGroup, earthMesh, lightsMesh, cloudsMesh, glowMesh};
}

const texLoader = new THREE.TextureLoader();
export function getPlanet({img = '', size = 1, distance = [], glow}) {
  const geo = new THREE.IcosahedronGeometry(1, 6);
  const planetGroup = new THREE.Group();

  planetGroup.position.set(...distance);

  const map = texLoader.load(`/images/${img}`);
  const planetMat = new THREE.MeshStandardMaterial({
    map,
  });
  const planet = new THREE.Mesh(geo, planetMat);
  planet.scale.setScalar(size);

  planetGroup.rotation.z = -20.4 * Math.PI / 180;
  
  const planetRimMat = getFresnelMat({ rimHex: glow, facingHex: 0x000000 });
  const planetRimMesh = new THREE.Mesh(geo, planetRimMat);
  planetRimMesh.scale.setScalar(1.01);
  planet.add(planetRimMesh);
  planetGroup.add(planet);

  return planetGroup;
}

export function getRing({img = '', distance = []}) {
  const ringTexture = texLoader.load(`/images/${img}`);

  const ringGeometry = new THREE.RingGeometry(8, 12, 128);

  const ringMaterial = new THREE.MeshBasicMaterial({
    map: ringTexture,
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
  });

  const ring = new THREE.Mesh(ringGeometry, ringMaterial);

  ring.rotation.x = Math.PI / 2.2; 
  ring.rotation.z = Math.PI / 4; 

  ring.position.set(...distance);

  return ring;
}

