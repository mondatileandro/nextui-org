//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MATERIALS
//-------- ----------
const material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    side: THREE.FrontSide
});
//-------- ----------
// GEOMETRY - indexed
//-------- ----------
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    0.00,  0.00,  0.00,
    2.00,  0.00,  0.00,
    0.00,  2.00,  0.00,
    0.00,  0.00, -3.50
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.setIndex([0,1,2,1,3,2]);
geometry.computeVertexNormals();
//-------- ----------
// GEOMETRY - non-indexed
//-------- ----------
const geometry_ni = geometry.toNonIndexed();
geometry_ni.computeVertexNormals();
//-------- ----------
// SCENE CHILD OBJECTS - GRID, MESH, AND LIGHTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh1 = new THREE.Mesh( geometry, material);
mesh1.position.set(0,0.01,2);
scene.add(mesh1);
const mesh2 = new THREE.Mesh( geometry_ni, material);
mesh2.position.set(0,0.01,-2);
scene.add(mesh2);
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1,2,3);
scene.add(dl);
scene.add( new THREE.VertexNormalsHelper(mesh1, 0.5, 0x00ff00) );
//-------- ---------- 
// LOOP
//-------- ----------
camera.position.set(6, 3, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

