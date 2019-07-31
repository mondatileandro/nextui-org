
var Tree = function (opt) {

    opt = opt || {};
    this.sections = opt.sections || 2;
    this.conesPerSection = opt.conesPerSection || 7;
    this.sectionYStep = opt.sectionYStep || 1;
    this.sectionRadius = opt.sectionRadius || 3;
    this.coneMaterial = opt.coneMaterial || new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
    this.group = new THREE.Group();

    var sectionIndex = 0;
    while (sectionIndex < this.sections) {

        var groupSection = new THREE.Group();

        var coneIndex = 0;
        while (coneIndex < this.conesPerSection) {

            var cone = new THREE.ConeGeometry(1, 7, 32),
            per = coneIndex / this.conesPerSection,
            radian = Math.PI * 2 * per,
            x = Math.cos(radian) * this.sectionRadius,
            y = 0,
            z = Math.sin(radian) * this.sectionRadius;

            var mesh = new THREE.Mesh(
                    cone,
                    this.coneMaterial);

            mesh.position.set(x, y, z);
            mesh.rotateX(Math.PI / 2);
            mesh.rotateZ(Math.PI * 2 / this.conesPerSection * coneIndex - Math.PI / 2);
            //this.group.add(mesh);
            groupSection.add(mesh);

            coneIndex += 1;

        }

        groupSection.position.y = this.sectionYStep * sectionIndex;
        this.group.add(groupSection);

        sectionIndex += 1;

    }

};

(function () {
    // SCENE
    var scene = new THREE.Scene();
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 10);
    camera.lookAt(0, 0, 0);
    // LIGHT
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff);
    camera.add(light);
    // TREE
    var tree = new Tree({
            coneMaterial: new THREE.MeshStandardMaterial({
                color: 0x00af00
            })
        });
    scene.add(tree.group);
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    // CONTROLS
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // LOOP
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();
}
    ());
