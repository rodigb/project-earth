import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { SphereGeometry } from 'three';
import starsTexture from './star.jpg';

const scene = new THREE.Scene();//container
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
//first value is FOV, 2nd is aspect ratio, 3rd is view frustrum

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize( window.innerWidth, window.innerHeight)
camera.position.setZ(-5.5);
camera.position.setX(6);
camera.position.setY(2);

renderer.render( scene, camera );


const pointLight = new THREE.PointLight(0xffffff, 2, 300)
pointLight.position.set(50,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff )
scene.add(pointLight)
 


// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200,50)
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera,renderer.domElement)
controls.minDistance=3
controls.maxDistance=40

// function addStar(){
//   const geometry = new THREE.SphereGeometry(0.25,24,24);
//   const material = new THREE.MeshStandardMaterial({color:0xffffff})
//   const star = new THREE.Mesh(geometry, material);

//   const [x, y ,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));//random generated nubmers
//   star.position.set(x,y,z);
//   scene.add(star)
// }

// Array(200).fill().forEach(addStar)


 
const normalTexture = new THREE.TextureLoader().load('normal.jpg')
const terrainTexture = new THREE.TextureLoader().load('normal.jpg')

const spaceTexture = new THREE.TextureLoader().load('space.jpg')

 

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture, 
  starsTexture,
  starsTexture
])



const sunTexture = new THREE.TextureLoader().load('sun.jpg')

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(1,32,32),
  new THREE.MeshPhongMaterial( { 
    map:sunTexture,
     
 
 

    //position:(50,5,5)

    
     
     
  })
)

scene.add(sun);
 
sun.position.x=60
sun.position.y=5
sun.position.z=5
 


const earthTexture = new THREE.TextureLoader().load('earth.jpg')
const specularTexture = new THREE.TextureLoader().load('specular.jpg')




const earth = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial( { 
    map:earthTexture,
 
    bumpMap:normalTexture,
    bumpScale: 0.005,
    specularMap:specularTexture,

    //(50,5,5)

    
     
     
  })
)

scene.add(earth);

const moonTexture = new THREE.TextureLoader().load('moon.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 32, 32),
  new THREE.MeshPhongMaterial( { 
    map:moonTexture,
    
 
    // bumpMap:normalTexture,
    // bumpScale: 0.005,
     

    
     
     
  })
)

earth.add(moon);
moon.position.x=-2
moon.position.z=2


const atmosphereTexture = new THREE.TextureLoader().load('atmosphere.jpg')
 


const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.503, 32, 32),
  
  new THREE.MeshPhongMaterial( { 
     
    map:atmosphereTexture,
    transparent:true,
    opacity:0.2,
    
    
    
     
  })
)

scene.add(atmosphere);

const glowTexture = new THREE.TextureLoader().load('glow.jpg')
 


const glow = new THREE.Mesh(
  new THREE.SphereGeometry(0.506, 32, 32),
  
  new THREE.MeshPhongMaterial( { 
     
    map:glowTexture,
    transparent:true,
    opacity:0.2,
    
    
     
  })
)

 


 
function moveCamera(){

  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.005;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera

function animate(){
  requestAnimationFrame( animate );
  earth.rotation.y +=0.001
  sun.rotation.y= 0.002
  moon.rotation.y= +0.001
  moon.rotateY =(0.004)
  atmosphere.rotation.y +=0.002
  // earth.rotation.x +=0.001
  // earth.rotation.z +=0.001
 
  controls.update();
  renderer.render (scene,camera);
}
animate();