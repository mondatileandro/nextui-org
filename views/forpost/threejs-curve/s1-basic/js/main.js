//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
let scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
let camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// LIGHT
//******** **********
let dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 10, 1).normalize();
scene.add(dl);

scene.add( new THREE.AmbientLight(0xffffff, 0.05) )

//******** **********
// CURVE, TubeGeometry, Mesh
//******** **********
class CustomSinCurve extends THREE.Curve {
    constructor( scale = 1 ) {
        super();
        this.scale = scale;
    }
    getPoint( t, optionalTarget = new THREE.Vector3() ) {
        let tx = t * 3 - 1.5,
        ty = Math.sin( 24 * Math.PI * t ) * 0.5,
        tz = Math.cos( 24 * Math.PI * t ) * 0.25;
        return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
    }
};
class DataCurve extends THREE.Curve {
    constructor( data = [] ) {
        super();
        this.data = data;
    }
    getPoint( t, optionalTarget = new THREE.Vector3() ) {
        let i = Math.floor( t * ( (this.data.length ) / 3 ) );        
        let tx = this.data[ i ] === undefined ? 0 : this.data[ i ],
        ty = this.data[ i + 1] === undefined ? 0 : this.data[ i + 1],
        tz = this.data[ i + 2] === undefined ? 0 : this.data[ i + 2];
        return optionalTarget.set( tx * t, ty * t, tz * t );
    }
};
let path = new CustomSinCurve( 5 ),
tubularSegments = 800,
radius = 0.25,
radialSegments = 20;
// creating a tube geometry with path and additional arguments
let mesh = new THREE.Mesh( 
    new THREE.TubeGeometry( path, tubularSegments, radius, radialSegments, false ), 
    new THREE.MeshStandardMaterial( { color: 0xff0000, side: THREE.DoubleSide })
);
scene.add( mesh );
//******** **********
// RENDER
//******** **********
renderer.render(scene, camera);      

