
(function () {

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var width = 3.2,
    height = 2.4,
    camera = new THREE.OrthographicCamera(
            width * -1,
            width,
            height,
            height * -1,
            .1,
            50);

    // set to same position, and look at the origin
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    // point light above the camera
    var light = new THREE.PointLight();
    light.position.set(0, 2, 0);
    camera.add(light);

    // add orbit controls if there
    if (THREE.OrbitControls) {

        new THREE.OrbitControls(camera);

    }

    // Just a cube
    scene.add(
        new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0x00ffff,
                emissive: 0x0a0a0a
            })));

    // Plane
    var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10, 8, 8),
            [

                //
                new THREE.MeshStandardMaterial({
                    color: 0x00ff00,
                    emissive: 0x0a0a0a,
                    side: THREE.DoubleSide
                }),

                //
                new THREE.MeshStandardMaterial({
                    color: 0x0000ff,
                    emissive: 0x0a0a0a,
                    side: THREE.DoubleSide
                })

            ]);

    plane.position.set(0,-.5,0);
    plane.rotation.set(Math.PI / 2, 0, 0);
    plane.geometry.faces.forEach(function (face, i) {

        face.materialIndex = i % 2;

    });
    scene.add(plane);

    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);

    // loop
    var frame = 0,
    maxFrame = 100;
    var loop = function () {

        var per = frame / maxFrame,
        // camera index
        ci = Math.floor(per * 2);

        requestAnimationFrame(loop);
        renderer.render(scene, camera);

        frame += 1;
        frame = frame % maxFrame;

    };

    loop();

}
    ());
