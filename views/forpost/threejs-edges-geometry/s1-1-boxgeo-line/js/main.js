(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.25, 1.75, 1.25);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // JUST USING BOX GEOMETRY WITH THREE.Line
    //-------- ----------
    const boxGeo = new THREE.BoxGeometry(1, 1, 1),
    line = new THREE.Line(
            boxGeo,
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    scene.add(line);
    //-------- ----------
    // SCENE
    //-------- ----------
    renderer.render(scene, camera);
}());