//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.TorusGeometry(1, 0.25, 20, 80);
//-------- ----------
// POINTS, GRID HELPER
//-------- ----------
const material = new THREE.PointsMaterial({ size: 0.05, color: 0x00ffff });
const points = new THREE.Points(geometry, material);
scene.add(points);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 2, 3);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);