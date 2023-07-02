import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import bg1 from '../threejs/bg1.jpg'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, 
	window.innerWidth / window.innerHeight, 
	0.1, 
	1000 
);

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMaterial = new THREE.MeshBasicMaterial( { color: 0x73a9ad } );

const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
cube.castShadow = true;
scene.add(cube);


// mặt phẳng
function addPlane(planeGeometry, planeMaterial){
	const plane = new THREE.Mesh(planeGeometry,planeMaterial);
	plane.rotation.x = -0.5 * Math.PI;
	plane.receiveShadow = true;
	scene.add(plane);
};


const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xa281d8});

addPlane(planeGeometry, planeMaterial);



//hình cầu
const sphereGeomatry = new THREE.SphereGeometry(4);
const sphereMeterial = new THREE.MeshBasicMaterial({
	color: 0xe2c0c0,
	wireframe: true
});
const sphere = new THREE.Mesh(sphereGeomatry,sphereMeterial);

scene.add(sphere);



const gridHelper = new THREE.GridHelper(30,30);
scene.add(gridHelper);

const orbit = new OrbitControls(camera,renderer.domElement);

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

camera.position.z = 10;
orbit.update();

const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(bg1);

const gui = new dat.GUI();
const option = {
	cubeColor:'#73A9AD',
	sphereColor:'#e2c0c0',
	planeColor:'#a281d8',
};

gui.addColor(option,'cubeColor').onChange(function(e){
	cube.material.color.set(e)
})

gui.addColor(option,'sphereColor').onChange(function(e){
	sphere.material.color.set(e)
})

gui.addColor(option,'planeColor').onChange(function(e){
	plane.material.color.set(e)
})

gui.add(cube.rotation,'x', 0 , Math.PI).name('rotate Cube\'s X Axis');
gui.add(cube.rotation,'y', 0 , Math.PI).name('rotate Cube\'s Y Axis');
gui.add(cube.rotation,'z', 0 , Math.PI).name('rotate Cube\'s Z Axis');
gui.add(cube.position,'x', 0 , 4).name('Position Cube\'s X Axis');
gui.add(cube.position,'y', 0 , 4).name('Position Cube\'s Y Axis');
gui.add(cube.position,'z', 0 , 4).name('position Cube\'s Z Axis');
gui.add(cube.scale,'x', 0 , 5).name('scale Cube\'s X Axis');
gui.add(cube.scale,'y', 0 , 5).name('scale Cube\'s Y Axis');
gui.add(cube.scale,'z', 0 , 5).name('scale Cube\'s Z Axis');

//light
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
directionalLight.position.set(-30,50,0);
directionalLight.castShadow = true;
scene.add(directionalLight);

// const drLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(drLightHelper);

function loadmodel(model){
		// Instantiate a loader
	const loader = new GLTFLoader();

	// Load a glTF resource
	loader.load(
		// resource URL
		model,
		// called when the resource is loaded
		function ( gltf ) {

			scene.add( gltf.scene );

			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Group
			gltf.scenes; // Array<THREE.Group>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object

		},
		// called while loading is progressing
		function ( xhr ) {

			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},
		// called when loading has errors
		function ( error ) {

			console.log( 'An error happened' );

		}
	);
}

loadmodel('model/dining_table/scene.gltf')

function animate() {
	requestAnimationFrame( animate );

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();