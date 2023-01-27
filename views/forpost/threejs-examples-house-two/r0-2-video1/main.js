// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// will load this in
let mesh_house = null;
// update
const update = function(frame, frameMax){
    const a1 = frame / FRAME_MAX;
    const a2 = 1 - Math.abs(0.5 - a1 * 2 % 1) / 0.5;

    const e = new THREE.Euler(0,0,0);
    e.y = Math.PI * 2 * a1;
    e.z = Math.PI / 180 * ( 20 + 20 * a2 );
    camera.position.set(1, 0, 0).applyEuler(e).normalize().multiplyScalar(4);

    if(mesh_house){
        camera.lookAt(mesh_house.position);
    }
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
//-------- ----------
// LOADING
//-------- ----------
DAE_loader({
    // custom cloner
    cloner: (obj, scene_source ) => {
        if(obj.type === 'Mesh'){
            const mat = new THREE.MeshBasicMaterial({
                map: obj.material.map
            });
            const mesh = new THREE.Mesh(obj.geometry, mat);
            mesh.name = obj.name;
            mesh.rotation.copy(obj.rotation);
            scene_source.add(mesh);
        }
    },
    urls_dae: [
        '/dae/house_two/house_2.dae'
    ],
    urls_resource: [
        '/dae/house_two/skins/windows/'
    ]
})
.then( (scene_source) => {
    console.log('done loading');
    scene.add( new THREE.GridHelper(10, 40) )
    mesh_house = scene_source.getObjectByName('house_0').clone();
    scene.add( mesh_house )
    loop();
})
.catch( (e) => {
    console.warn(e);
});