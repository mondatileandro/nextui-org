
(function () {

    // set location of a vert given an index value in geometry.index
    var setVert = function(geometry, vertIndex, x, y, z){
        var posIndex = geometry.index.array[vertIndex] * 3;
        position.array[posIndex] = x === undefined ? position.array[posIndex]: x;
        position.array[posIndex + 1] = y === undefined ? position.array[posIndex + 1]: y;
        position.array[posIndex + 2] = z === undefined ? position.array[posIndex + 2]: z;
    };

    var setTri = function(geometry, triIndex, x, y, z){
        var vertIndex = triIndex * 3;
        setVert(geometry, vertIndex, 1);
        setVert(geometry, vertIndex + 1, 1);
        setVert(geometry, vertIndex + 2, 1);
    };

    // scene
    var scene = new THREE.Scene();


    // GEOMETRY - starting with a cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    // check out the position attribute of a cube
    position = geometry.getAttribute('position');
    console.log( position.count ); // 24
    console.log( position.array.length ); // 72
    console.log( position.count * 3 === position.array.length); // true

    var index = geometry.getIndex();
    console.log( index.count );      // 36
    console.log( 2 * 6 );            // 12 ( number of triangles )
    console.log( index.count / 3);   /* 12 (index.count / 3 === number of triangles ) */

    setTri(geometry, 0, 1);
    setTri(geometry, 1, 1);

    // example 1
    //setVert(geometry, 0, 1, 0.25, 1.25);
    //setVert(geometry, 16, 1, 0.25, 1.25);
    //setVert(geometry, 26, 1, 0.25, 1.25);


    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    }));
    scene.add(mesh);


    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(mesh.position);

    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    var loop = function(){
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
    loop();

}
    ());
