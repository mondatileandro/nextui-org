
(function () {
    //-------- ----------
    // HELPERS
    //-------- ----------
    // vector from angles helper
    var vectorFromAngles = function(a, b, c, len, start){
        len = len = undefined ? 1 : len;
        var e = new THREE.Euler(
            THREE.MathUtils.degToRad(a),
            THREE.MathUtils.degToRad(b), 
            THREE.MathUtils.degToRad(c));
        var v = start || new THREE.Vector3(0, 1, 0);
        v.applyEuler(e).normalize();
        return v.multiplyScalar(len);
    };
    // create capsule group
    var createCapsuleGroup = function(opt){
        opt = opt || {};
        opt.data = opt.data || [];
        var group = new THREE.Group();
        opt.data.forEach(function(opt, i, arr){
            // create a normalize vector based on the given options for x, y, and z
            // then apply the unit length option using multiplyScalar
            var v = new THREE.Vector3(opt.x, opt.y, opt.z).normalize().multiplyScalar(opt.ul);
            // UNIT LENGTH ( or distance to 0,0,0 ) can be used to 
            // set length attribute of capsule geometry based mesh object
            var geo = new THREE.CapsuleGeometry( 0.1, v.length(), 30, 30 );
            // translate geometry on y by half the vector length
            // also rotate on x by half of unit length
            geo.translate(0, v.length() / 2, 0);
            geo.rotateX(Math.PI * 0.5);
            // creating mesh object
            var mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.6}));
            // copy vector to position of mesh object
            // and have the mesh look at the origin
            mesh.position.copy(v);
            mesh.lookAt(0, 0, 0);
            group.add(mesh);
        });
        return group;
    };
    // set to group helper
    var setToGroup = function(groups, mesh, groupIndex, capsuleIndex, alpha){
        var v = new THREE.Vector3();
        var g = groups.children[groupIndex];
        g.children[capsuleIndex].getWorldPosition(v);
        var origin = g.position.clone();
        mesh.position.copy( origin.clone().lerp(v, alpha) );
        mesh.lookAt(g.position);
    };
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(-2.5, 5, 10);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // ADD MESH OBJECTS
    //-------- ----------
    // create groups
    var groups = new THREE.Group();
    scene.add(groups);
    // group index 0
    var g = createCapsuleGroup({
        data: [
            {x: 0, y: 1, z: 0, ul: 3},
            {x: 1, y: 0, z: 0, ul: 5},
            {x: 0, y: 0, z: 1, ul: 5},
            {x: 1, y: 1, z: 1, ul: 2},
            {x: -1, y: 0, z: -1, ul: 5},
            {x: -1, y: -1, z: 1, ul: 4}
        ]
    });
    groups.add(g);
    // group index 1
    var g = createCapsuleGroup({
        data: [
            {x: 0, y: 1, z: 0, ul: 4},
            {x: 1, y: 0, z: -1, ul: 3},
            {x: -5, y: 0, z: 0, ul: 3}
        ]
    });
    g.position.set(-4, 0, -5);
    groups.add(g);
    // MESH OBJECT
    var s = 1.0;
    var mesh1 = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    var mesh2 = new THREE.Mesh(new THREE.SphereGeometry(s, 30, 30), new THREE.MeshNormalMaterial());
    scene.add(mesh2);
    var mesh3 = new THREE.Mesh(new THREE.ConeGeometry(s / 2, s * 2, 30, 30), new THREE.MeshNormalMaterial());
    mesh3.geometry.rotateX(Math.PI * 1.5);
    scene.add(mesh3);
    //-------- ----------
    // LOOP
    //-------- ----------
    var d = 0,
    f = 0,
    fMax = 30;
    var lt = new Date(),
    fps = 30;
    var loop = function(){
        var now = new Date(),
        secs = ( now - lt ) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / fps){
            // update
            var p = f / fMax;
            var b = 1 - Math.abs(0.5 - p) / 0.5;
            d = 1 - b;
            setToGroup(groups, mesh1, 0, 0, d);
            setToGroup(groups, mesh2, 1, 1, 1 - 0.95 * d);
            setToGroup(groups, mesh3, 0, 5, 0.5 + 0.5 * d);
            // step frame
            f += 1;
            f %= fMax;
            // render
            renderer.render(scene, camera);
            // lt
            lt = now;
        }
    };
    loop();
}
    ());
