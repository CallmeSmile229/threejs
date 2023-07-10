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

function createBox() {
	const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
	const cubeMaterial = new THREE.MeshBasicMaterial( { color: 0x73a9ad } );
	const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
	cube.castShadow = true;
	scene.add(cube);

	const gui = new dat.GUI();
	const option = {
		cubeColor:'#73A9AD',
	};

	gui.addColor(option,'cubeColor').onChange(function(e){
		cube.material.color.set(e)
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

}	

const cBox = document.getElementById('createBox');
cBox.addEventListener('click',createBox);

// // mặt phẳng
function createPlane(){
	const planeGeometry = new THREE.PlaneGeometry(30,30);
	const planeMaterial = new THREE.MeshStandardMaterial({color: 0xa281d8});
	const plane = new THREE.Mesh(planeGeometry,planeMaterial);
	plane.rotation.x = -0.5 * Math.PI;
	plane.receiveShadow = true;
	scene.add(plane);

	const gui2 = new dat.GUI();
	const option = {
		planeColor:'#a281d8',
	};

	gui2.addColor(option,'planeColor').onChange(function(e){
		plane.material.color.set(e)
	})
};


const cPlane = document.getElementById('createPlane');
cPlane.addEventListener('click',createPlane);

// addPlane(planeGeometry, planeMaterial);



// hình cầu
function createSphere(){
	const sphereGeomatry = new THREE.SphereGeometry(1);
	const sphereMeterial = new THREE.MeshBasicMaterial({
		color: 0xe2c0c0,
		// wireframe: true
	});
	const sphere = new THREE.Mesh(sphereGeomatry,sphereMeterial);
	const gui3 = new dat.GUI();
	const option = {
		sphereColor:'#e2c0c0',
	};

	gui3.addColor(option,'sphereColor').onChange(function(e){
		sphere.material.color.set(e)
	})

	gui3.add(sphere.position,'x', 0 , 4).name('Position sphere\'s X Axis');
	gui3.add(sphere.position,'y', 0 , 4).name('Position sphere\'s Y Axis');
	gui3.add(sphere.position,'z', 0 , 4).name('position sphere\'s Z Axis');
	gui3.add(sphere.scale,'x', 0 , 5).name('scale sphere\'s X Axis');
	gui3.add(sphere.scale,'y', 0 , 5).name('scale sphere\'s Y Axis');
	gui3.add(sphere.scale,'z', 0 , 5).name('scale sphere\'s Z Axis');
	scene.add(sphere);
}

const cSphere = document.getElementById('createSphere');
cSphere.addEventListener('click',createSphere);


const gridHelper = new THREE.GridHelper(30,30);
scene.add(gridHelper);

const orbit = new OrbitControls(camera,renderer.domElement);

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

camera.position.z = 10;
orbit.update();

const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(bg1);

//light
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
directionalLight.position.set(-30,50,0);
directionalLight.castShadow = true;
scene.add(directionalLight);


function loadModel(){
		// Instantiate a loader
	const loader = new GLTFLoader();

	// Load a glTF resource
	loader.load(
		// resource URL
		'model/dining_table/scene.gltf',
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

const lModel = document.getElementById('loadModel');
lModel.addEventListener('click',loadModel);
// lModel('model/dining_table/scene.gltf')

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();