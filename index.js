import * as THREE from "three"
import { OrbitControls } from 'OrbitControls'; // importation de l'addon Orbit Controls pour la gestion de la caméra

let state = 1
let firstStateDone = false 

function SunState() {               // 1
  scene.add(cube1)
  const rand = Math.random()
  console.log(`SunState probability : ${rand}`)
  if (rand < 0.75) state = 1 
  else state = 2
  if (!firstStateDone) cube1.material.opacity = 1
  firstStateDone = true
}

function GrayCloudState() {         // 2
  scene.add(cube2)
  const rand = Math.random()
  console.log(`GrayCloudState probability : ${rand}`)
  if (rand < 0.1) state = 1
  else if (rand >= 0.1 && rand < 0.45) state = 2 
  else if (rand >= 0.45 && rand < 0.8) state = 3
  else state = 4
  if (!firstStateDone) cube2.material.opacity = 1
  firstStateDone = true
}

function SnowState () {             // 3
  scene.add(cube2)
  const rand = Math.random()
  console.log(`SnowState probability : ${rand}`)
  if (rand < 0.1) state = 2
  else state = 3
  if (!firstStateDone) cube2.material.opacity = 1
  firstStateDone = true
}

function BlackCloudState () {       // 4
  scene.add(cube3)
  const rand = Math.random()
  console.log(`BlackCloudState probability : ${rand}`)
  if (rand < 0.2) state = 2
  else if (rand >= 0.2 && rand < 0.55) state = 4
  else if (rand >= 0.55 && rand < 0.9) state = 5
  else state = 6
  if (!firstStateDone) cube3.material.opacity = 1
  firstStateDone = true
}

function RainState() {              // 5
  scene.add(cube3)
  const rand = Math.random()
  console.log(`RainState probability : ${rand}`)
  if (rand < 0.1) state = 4
  else if (rand >= 0.1 && rand < 0.9) state = 5
  else state = 7
  if (!firstStateDone) cube3.material.opacity = 1
  firstStateDone = true
}

function LightningCloudState() {    // 6
  scene.add(cube3)
  const rand = Math.random()
  console.log(`LightningCloudState probability : ${rand}`)
  if (rand < 0.8) state = 4
  else state = 6
  if (!firstStateDone) cube3.material.opacity = 1
  firstStateDone = true
}

function LightningRainState() {     // 7
  scene.add(cube3)
  const rand = Math.random()
  console.log(`LightningRainState probability : ${rand}`)
  if (rand < 0.8) state = 5
  else state = 7
  if (!firstStateDone) cube3.material.opacity = 1
  firstStateDone = true
}

function StateStart() {
  const rand = Math.random()
  console.log(`StateStart probability : ${rand}`)
  if (rand < 0.2) state = 1
  else if (rand >= 0.2 && rand < 0.4) state = 2
  else if (rand >= 0.4 && rand < 0.6) state = 3
  else if (rand >= 0.6 && rand < 0.8) state = 4
  else state = 5
  // state = 2
}

let currentCube
let currentOpacity = 1
let previousState = null;

function changeState(currentState) {

  console.log("from climat" + state)

  if (currentState === previousState){
    // Changement d'état
    if (currentState == 1) {
      SunState()
    }
    else if (currentState == 2) {
      GrayCloudState()
    }
    else if (currentState == 3) {
      SnowState()
    }
    else if (currentState == 4) {
      BlackCloudState()
    }
    else if (currentState == 5) {
      RainState()
    }
    else if (currentState == 6) {
      LightningCloudState()
    }
    else if (currentState == 7) {
      LightningRainState()
    }
  }

  // Vérifie si l'état actuel est différent de l'état précédent
  if (currentState !== previousState) {

    // Changement d'état
    if (currentState == 1) {
      SunState()
    }
    else if (currentState == 2) {
      GrayCloudState()
    }
    else if (currentState == 3) {
      SnowState()
    }
    else if (currentState == 4) {
      BlackCloudState()
    }
    else if (currentState == 5) {
      RainState()
    }
    else if (currentState == 6) {
      LightningCloudState()
    }
    else if (currentState == 7) {
      LightningRainState()
    }

    let cubeChanged = false
    let previousCube

    // Changement de Cube
    if (currentState == 1) {
      // SunState();
      previousCube = currentCube
      currentCube = cube1;
      cubeChanged = true
    } 
    else if (currentState == 2 || currentState == 3) {
      // GrayCloudState();
      previousCube = currentCube
      currentCube = cube2;
      cubeChanged = true
    } 
    else if (currentState >= 4 && currentState <= 7) {
      // BlackCloudState();
      previousCube = currentCube
      currentCube = cube3;
      cubeChanged = true
    }

    // fadeIn(currentCube);  // Fondu entrant pour le nouveau cube

    previousState = currentState;

    if (cubeChanged) return {previous: previousCube, current: currentCube}
  
  }

  console.log("to climat" + state)
}

// function fadeIn(cube) {
//   scene.add(cube)
//   if (cube.material.opacity < 1) cube.material.opacity += 0.1
// }

// function fadeOut(cube) {
//   if (cube.material.opacity > 0) cube.material.opacity -= 0.1
//   scene.remove(cube)
// }


// Simulation 
StateStart()

// définition de la scene et de la caméra
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1100000 );
camera.position.z = 50
camera.position.y = 50
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// lumières
scene.add(new THREE.AmbientLight(0xd2b48c, 5))

const point = new THREE.PointLight(0xff8888, 12)
point.position.set(0, 2, 0)
point.castShadow = true
camera.add(point)

const point2 = new THREE.PointLight(0x88ff88, 12)
point2.position.set(0, -2, 0)
point2.castShadow = true
camera.add(point2)

const point3 = new THREE.PointLight(0x8888ff, 12)
point3.position.set(2, 0, 0)
point3.castShadow = true
camera.add(point3)

const point4 = new THREE.PointLight(0xffff88, 12)
point4.position.set(-2, 0, 0)
point4.castShadow = true
camera.add(point4)

// définition des contrôles de la caméra
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(camera)

// textures
const blue_sky = new THREE.TextureLoader().load("./assets/ciel_bleu")
blue_sky .wrapS = THREE.RepeatWrapping;
blue_sky .wrapT = THREE.RepeatWrapping;
blue_sky .repeat.set(1, 1)

const gray_cloud = new THREE.TextureLoader().load("./assets/nuages_gris")
gray_cloud.wrapS = THREE.RepeatWrapping;
gray_cloud.wrapT = THREE.RepeatWrapping;
gray_cloud.repeat.set(1, 1)

const black_cloud = new THREE.TextureLoader().load("./assets/nuages_noirs")
black_cloud.wrapS = THREE.RepeatWrapping;
black_cloud.wrapT = THREE.RepeatWrapping;
black_cloud.repeat.set(1, 1)

// parallépipède rectangle blue
const geometry1 = new THREE.BoxGeometry(26, 13, 26);
const material1 = new THREE.MeshBasicMaterial({ color: 0xffffff, map: blue_sky, side: THREE.BackSide, opacity: 0, transparent: true});
const cube1 = new THREE.Mesh(geometry1, material1);
        

// parallépipède rectangle gris
const geometry2 = new THREE.BoxGeometry(26, 13, 26);
const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff, map: gray_cloud, side: THREE.BackSide, opacity: 0, transparent: true});
const cube2 = new THREE.Mesh(geometry2, material2);

// parallépipède rectangle noir
const geometry3 = new THREE.BoxGeometry(26, 13, 26);
const material3 = new THREE.MeshBasicMaterial({ color: 0xffffff, map: black_cloud, side: THREE.BackSide, opacity: 0, transparent: true});
const cube3 = new THREE.Mesh(geometry3, material3);


// boucle de rendu
let frame = 0
let cubeState = {previous: cube2, current: cube2}
function animate() {
    requestAnimationFrame( animate );
    controls.update()
    renderer.render( scene, camera );
    frame++

    if (frame % 180 == 0) {
      cubeState = changeState(state)
    }
  
    if (cubeState !== undefined) {
      scene.add(cubeState.current)
      cubeState.previous.material.opacity -= 0.01;
      cubeState.current.material.opacity += 0.01;
  
      if (cubeState.previous.material.opacity <= 0) {
        scene.remove(cubeState.previous);
      }
    }
}

animate();