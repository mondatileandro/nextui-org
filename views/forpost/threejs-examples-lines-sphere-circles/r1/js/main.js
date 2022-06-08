//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LINES
//******** **********

// seashell
var opt = {
    circleCount: 20,
    maxRadius: 4,
    pointsPerCircle: 30,
    colors: [0x004444, 0x00ffff],
    linewidth: 4,
    forPoint: 'seaShell',
    forOpt: function(opt, per, bias, frame, frameMax){
        opt.minRadius = 1 + 3 * bias;
    }
};
var g1 = LinesSphereCircles.create(opt);
scene.add(g1);

// plain
var g2 = LinesSphereCircles.create({ maxRadius: 4, pointsPerCircle: 20 });
g2.position.set(-10,0,0)
scene.add(g2);

// plain
var g2 = LinesSphereCircles.create({ maxRadius: 8, forPoint: 'seededRandom' });
g2.position.set(-5,-2,-25)
scene.add(g2);


//******** **********
// LOOP
//******** **********
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var fps = 15,
lt = new Date(),
frame = 0,
frameMax = 300;
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){

        LinesSphereCircles.setByFrame(g1, frame, frameMax, opt)

        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
