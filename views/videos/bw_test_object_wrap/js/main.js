(function () {

    var texture = canvasTextureMod.randomGrid([0, 'r1', 0], 128);
    var MATERIAL_WORLD = new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 1, 1),
            map: texture
        });

    var MATERIAL_TREE = MATERIAL_WORLD;

    // SCENE
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#00afaf');

    // WORLD
    var world = BetaWorld.create();
    world.userData.worldSphere.material = MATERIAL_WORLD;
    scene.add(world);

    // GUY
    var guy1 = GuyMod.create();
    guy1.group.scale.set(0.5, 0.5, 0.5);
    // CAN ROTATE guy1.group THREE.Group INSTANCE INDEPENDANT OF AN OBJECT WRAP
    guy1.group.lookAt(0, 1.55, 0);
    guy1.group.rotateY(Math.PI * 0.5);
    // CREATING AND ADDING A WRAP FOR GUY1
    var guy1_wrap = BetaWorld.createObjectWrapper(world, guy1.group);
    BetaWorld.positionObject(world, guy1_wrap, 0.05, 0.02, 1.55);
    // CAN ROTATE THE WRAP THREE.Group RATHER THAN guy1.group
    guy1_wrap.lookAt(world.position);
    scene.add(guy1_wrap);

    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 8 / 6, 0.05, 150);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    // FOR THIS TEST I AM ADDING THE CAMERA TO THE guy1.GROUP
    guy1.group.add(camera);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('video') || document.body;
    container.appendChild(renderer.domElement);

    var video = {
        frame: 0, // 1470 - sq10
        canvas: renderer.domElement,
        sequence: []
    };

    // sequence 0
    video.sequence.push({
        maxFrame: Math.ceil(30 * 4),
        forFrame: function (seq) {

            // GUY1
            var latPer = 0.125;
            var longPer = 0.01 + 0.98 * seq.per;
            // POSITIONING THE WRAP GROUP SO THAT IT ALWAYS FACES TO THE GROUND
            BetaWorld.positionObject(world, guy1_wrap, latPer, longPer, 1.55);
            guy1_wrap.lookAt(world.position);

            renderer.render(scene, camera);
        }
    });

    // load VIDEO UI Object
    videoUI.load(video);

}
    ());
