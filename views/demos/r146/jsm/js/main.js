
import * as three from '/js/threejs/0.146.0/three.module.js';
import * as THREE from '/js/threejs/0.146.0/three.module.js';

//import * as OC from '/js/threejs/0.146.0/controls/OrbitControls.js';

console.log(three);

//import * as THREE from 'three';

//import { OrbitControls } from '/js/threejs/0.146.0/controls/OrbitControls.js';

//console.log(THREE)
//console.log(three)
//console.log(OC);

(function(){
	
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(1.25, 1.25, 1.25);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // OBJECTS
    // ---------- ----------
    scene.add( new THREE.GridHelper( 10,10 ) );
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
    scene.add(box);
    // render
    renderer.render(scene, camera);
    // ---------- ----------
    // CONTROLS
    // ---------- ----------

    //const controls = new OC.OrbitControls(camera, renderer.domElement);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30,     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 120;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const degree = 360 * (frame / frameMax);
        box.rotation.x = THREE.MathUtils.degToRad(degree);
    };
    // loop
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS_UPDATE){
            // update, render
            update( Math.floor(frame), FRAME_MAX);
            renderer.render(scene, camera);
            // step frame
            frame += FPS_MOVEMENT * secs;
            frame %= FRAME_MAX;
            lt = now;
        }
    };
    loop();
}());