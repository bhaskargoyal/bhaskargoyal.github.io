var scene, renderer, camera, light;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var orbitalControl;


// for controls
// initGUI();

// initialise the world

//SCENE
scene = new THREE.Scene();

//CAMERA
camera = new THREE.PerspectiveCamera(75, WIDTH/HEIGHT, .1, 2000);
camera.position.z = 100;

//RENDERER
renderer = new THREE.WebGLRenderer({ 
  canvas: document.getElementById('myCanvas'),
  alpha: true, 
  antialias: true 
});
renderer.setSize(WIDTH, HEIGHT);
renderer.shadowMap.enabled = true;
renderer.setClearColor(0x000000);

//LIGHT
// test these
// var globalLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
// var ambiantLight = new THREE.AmbientLight( globalColor );
// var pointLight = new THREE.PointLight(color, intensity, radius, decay);
// var directionalLight = new THREE.DirectionlLight(color, intensity);

ambientLight = new THREE.AmbientLight(0x663344,2);
scene.add(ambientLight);

light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(200,100,200);
light.castShadow = true;
light.shadow.camera.left = -400;
light.shadow.camera.right = 400;
light.shadow.camera.top = 400;
light.shadow.camera.bottom = -400;
light.shadow.camera.near = 1;
light.shadow.camera.far = 1000;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
scene.add(light);


// CONTROLS
// used to rotate around the scene with the mouse
// you can drag to rotate, scroll to zoom
// orbitalControl = new THREE.OrbitControls(camera, renderer.domElement);


// HANDLE SCREEN RESIZE
window.addEventListener('resize', handleWindowResize, false);


// CREATE THE OBJECT

var distanceBetweenPlanets = 200;
var planetXCoordinate = 0;

// make celestial bodies
var sun = new Saturn(planetXCoordinate, 0 , 0, false, 150, 5, 5, 0xfaff70);       // posx, posy, posz, wantParticles, size, detailLevel, noise, planetColor
sun.mesh.rotation.x = .02;
sun.mesh.rotation.z = .02;
scene.add(sun.mesh);
planetXCoordinate += 300;



var mercury = new Saturn(planetXCoordinate, 0 , 0, false, 10, 2, 1, 0xee5624);       // wantParticles, x, y, z
mercury.mesh.rotation.x = .02;
mercury.mesh.rotation.z = .02;
scene.add(mercury.mesh);
planetXCoordinate += distanceBetweenPlanets;

var venus = new Saturn(planetXCoordinate, 0 , 0, false, 10, 4, 2, 0xfaff70);       // wantParticles, x, y, z
venus.mesh.rotation.x = .02;
venus.mesh.rotation.z = .02;
scene.add(venus.mesh);
planetXCoordinate += distanceBetweenPlanets;

var earth = new Saturn(planetXCoordinate, 0 , 0, false, 20, 4, 2, 0x0000ff);       // wantParticles, x, y, z
earth.mesh.rotation.x = .02;
earth.mesh.rotation.z = .02;
scene.add(earth.mesh);
planetXCoordinate += distanceBetweenPlanets;

var mars = new Saturn(planetXCoordinate, 0 , 0, false, 20, 4, 2, 0xee5624);       // wantParticles, x, y, z
mars.mesh.rotation.x = .02;
mars.mesh.rotation.z = .02;
scene.add(mars.mesh);
planetXCoordinate += distanceBetweenPlanets;



// // SPLINE CURVE
var camPosIndex = 0;
var randomPoints = [];
// for ( var i = 0; i < 100; i ++ ) {


  //////////
  //////////
  //for getTangent in the script.js (camer.lookAt)
  //////////
// camera.position.z = 300;
//     randomPoints.push(
//         new THREE.Vector3(0, 0, 300),
//         new THREE.Vector3(400, 0, 300),
//         new THREE.Vector3(400, 0, 0),
//         new THREE.Vector3(700, 10, 0),
//         new THREE.Vector3(750, 0, 0),     //reched venus
//         new THREE.Vector3(800, 10, 100),
//         new THREE.Vector3(1100, 0, 0),
//         new THREE.Vector3(1000, 0, 0),
//         new THREE.Vector3(900, 0, 200),
//         new THREE.Vector3(900, 0, 100)


//     );
// }

camera.position.z = 2*sun.size;
  // for getPoint
  var nearness;
  var cameraMovingFarPoint = 600;
  var cameraMovingNearPoint = 100;
  randomPoints.push(
      new THREE.Vector3(sun.planet.position.x, sun.planet.position.y, 2*sun.size),
      new THREE.Vector3(mercury.planet.position.x, mercury.planet.position.y+5, cameraMovingFarPoint),
      new THREE.Vector3(mercury.planet.position.x, mercury.planet.position.y+5, 2*mercury.size),
      new THREE.Vector3(venus.planet.position.x, venus.planet.position.y+10, cameraMovingFarPoint),
      new THREE.Vector3(venus.planet.position.x, venus.planet.position.y+10, 2*venus.size),
      new THREE.Vector3(earth.planet.position.x, earth.planet.position.y +15, cameraMovingFarPoint),
      new THREE.Vector3(earth.planet.position.x, earth.planet.position.y +15, 2*earth.size),
      new THREE.Vector3(mars.planet.position.x, mars.planet.position.y + 20, cameraMovingFarPoint),
      new THREE.Vector3(mars.planet.position.x, mars.planet.position.y +20, 2*mars.size)
      // new THREE.Vector3(mars.planet.position.x, mars.planet.position.y+20 + cameraMovingFarPoint,  2*mars.size)
      // new THREE.Vector3(mars.planet.position.x, mars.planet.position.y+20 + mars.size,  2*mars.size)


  );
  var spline = new THREE.CatmullRomCurve3(randomPoints);









/// stars
var minDistance = 700;
var maxDistance = 3000;

for (var i = 0; i < 6000; i++) {
  var star = new Star(1, 1, 1);
  
  star.mesh.position.x = -minDistance + Math.random() * maxDistance;
  star.mesh.position.y = -minDistance + Math.random() * maxDistance;  
  star.mesh.position.z = -minDistance + Math.random() * 2*minDistance;
  
  scene.add(star.mesh);
}












// START THE LOOP
loop();

var angle=0;

function loop(){
  
  //
  // Life is about movement, make the cube rotate
  // increase the rotation by a small amount in each frame
  //cube.rotation.z +=.01;
  //cube.rotation.x +=.05;
  
  //PLANET ROTATION  --> for testing comment it
  sun.planet.rotation.y+=.01;
  sun.updateParticlesRotation();

  mercury.planet.rotation.y+=.01;
  mercury.updateParticlesRotation();

  venus.planet.rotation.y-=.01;
  venus.updateParticlesRotation();

  earth.planet.rotation.y-=.01;
  earth.updateParticlesRotation();

  mars.planet.rotation.y-=.01;
  mars.updateParticlesRotation();

  

  // angle += 1;
  // angle = 1;
  // rotateObjectAboutYAxis(mercury.mesh, angle);
  // mercury.mesh.rotation.y += (angle*Math.PI/180);
  // mercury.mesh.upadteMatrixWorld = 1;
  // randomPoints[1].x = mercury.planet.position.x + 1.5*mercury.size;
  // randomPoints[2].x = mercury.planet.position.x + 1.5*mercury.size;
  // rotateObjectAboutPoint(venus.mesh, 0.7);
  // rotateObjectAboutPoint(earth.mesh, 0.5);
  // rotateObjectAboutPoint(mars.mesh, 0.4);
  
  // UPADTE DATA
  showText(camera.position);


  // RENDER !
  renderer.render(scene, camera);
  
  // REQUEST A NEW FRAME
  requestAnimationFrame(loop);
}





















