var scene = new THREE.Scene();

// create a wrap group
var wrap = new THREE.Group();

// add a sphere to the wrap
var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 40, 40),
        new THREE.MeshNormalMaterial({
            wireframe: true
        }));
wrap.userData.sphere = sphere;
wrap.add(sphere);

var surface = new THREE.Group();
wrap.userData.surface = surface;
wrap.add(surface);

// create a cube
var cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshNormalMaterial({
            wireframe: false
        }));
cube.name = 'cube';
wrap.userData.cube = cube;
wrap.userData.surface.add(cube);


// distance, lat, and long values
var d = 1.25, // radius + half of mesh height
lat = 0.75,   // 0 - 1
long = 0.5;   // 0 - 1

var setObjToLatLong = function(wrap, childName, lat, long){
    var child = wrap.getObjectByName(childName),
    d = 1.25;
    // set lat
    var radian = Math.PI * -0.5 + Math.PI * lat,
    x = Math.cos(radian) * d,
    y = Math.sin(radian) * d;
    child.position.set(x, y, 0);
    // set long
    surface.rotation.y = Math.PI * 2 * long;
    // look at origin
    child.lookAt(0,0,0);
};

setObjToLatLong(wrap, 'cube', lat, long);


// add wrap the the scene
scene.add(wrap);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3.0, 0.0, 0.0);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement)

var lt = new Date(),
frame = 0,
maxFrame = 600,
fps = 30;
var loop = function(){
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;

    requestAnimationFrame(loop);

    if(secs > 1 / fps){
        lat = Math.sin(Math.PI * bias);
        long = per;
        setObjToLatLong(wrap, 'cube', lat, long);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt =  now;
    }
}
loop();