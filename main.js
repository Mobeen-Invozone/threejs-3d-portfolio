import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Mesh } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

const material = new THREE.MeshStandardMaterial({color: 0xFF6347});

const torusMesh = new THREE.Mesh(geometry, material);

scene.add(torusMesh);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//const pointLightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);

//scene.add(pointLightHelper, gridHelper);

//const orbitControls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const starMesh = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

  starMesh.position.set(x, y, z);

  scene.add(starMesh);
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


// Box Avatar

const jeffTexture = new THREE.TextureLoader().load("mobeen.jpg");
const jeffMesh = new THREE.Mesh(new THREE.BoxGeometry(3,3,3), new THREE.MeshBasicMaterial({map: jeffTexture}));
scene.add(jeffMesh);

// Moon

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const moonNormalTexture = new THREE.TextureLoader().load("normal.jpg");
const moonMesh = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), 
new THREE.MeshStandardMaterial({map: moonTexture, normalMap: moonNormalTexture}))
scene.add(moonMesh);

moonMesh.position.z = 30;
moonMesh.position.x = -10;


function moveCamera(){

  const t = document.body.getBoundingClientRect().top;
  moonMesh.rotation.x += 0.05;
  moonMesh.rotation.y += 0.075;
  moonMesh.rotation.z += 0.05;

  jeffMesh.rotation.y += 0.01;
  jeffMesh.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * 0.005;
  camera.position.y = t * 0.002;
}

document.body.onscroll = moveCamera;
//moveCamera();

function animate(){
  requestAnimationFrame(animate);

  torusMesh.rotation.x += 0.01;
  torusMesh.rotation.y += 0.005;
  torusMesh.rotation.z += 0.01;

  //orbitControls.update();

  renderer.render(scene, camera);
}

animate()
