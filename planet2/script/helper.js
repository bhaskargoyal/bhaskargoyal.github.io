////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
///////////////////////Helper Functions/////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
function rotateObjectAboutYAxis(object, angle) {
  angle = angle*Math.PI/180;
  var newx, newz;
  newx = Math.sin(angle)*Number(object.position.z) + Math.cos(angle)*Number(object.position.x);
  newz = Math.cos(angle)*Number(object.position.z) - Math.sin(angle)*Number(object.position.x);
  object.position.x = newx;
  object.position.z = newz;
}




function handleWindowResize() {
  // Recalculate Width and Height as they had changed
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  
  // Update the renderer and the camera
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();

  // call control div to realign
  alignControlDiv();
}


// Helper function to calculate the angular speed


function rule3(v,vmin,vmax,tmin, tmax){
  var nv = Math.max(Math.min(v,vmax), vmin);
  var dv = vmax-vmin;
  var pc = (nv-vmin)/dv;
  var dt = tmax-tmin;
  var tv = tmin + (pc*dt);
  return tv;
}


// get the Material based on the color
function getMat(color){
  // our material is a phong material, with no shininess (highlight) and a black specular
  return new THREE.MeshStandardMaterial({
    color:color,
    roughness:0.9,
    //shininess:0,
    //specular:0x000000,
    emissive:0x270000,
    shading:THREE.FlatShading // THREE.SmoothShading
  });
}

// colors

var Colors = {
  green : 0x8fc999,
  blue : 0x5fc4d0,
  orange : 0xee5624,
  yellow : 0xfaff70,
}



var colorsLength = Object.keys(Colors).length;

function getRandomColor(){
  var colIndx = Math.floor(Math.random()*colorsLength);
  var colorStr = Object.keys(Colors)[colIndx];
  return Colors[colorStr];
}

// parameters to customize the planet
var parameters = {
  minRadius : 30,
  maxRadius : 50,
  minSpeed:.015,
  maxSpeed:.025,
  particles:300,
  minSize:.1,
  maxSize:2,
}



function initGUI(){
  var gui = new dat.GUI();
  gui.width = 250;
  gui.add(parameters, 'minRadius').min(20).max(60).step(1).name('Inner Radius').onChange(function(){
    saturn.updateParticlesDefiniton();
  });
  gui.add(parameters, 'maxRadius').min(40).max(100).step(1).name('Outer Radius').onChange(function(){
    saturn.updateParticlesDefiniton();
  });
  gui.add(parameters, 'particles').min(50).max(800).step(1).name('Particles').onChange(function(){
    saturn.updateParticlesCount();
  });
  gui.add(parameters, 'minSpeed').min(.005).max(0.05).step(.001).name('Min Speed').onChange(function(){
    saturn.updateParticlesDefiniton();
  });
  gui.add(parameters, 'maxSpeed').min(.005).max(0.05).step(.001).name('Max Speed').onChange(function(){
    saturn.updateParticlesDefiniton();
  });
  
  gui.add(parameters, 'minSize').min(.1).max(5).step(.1).name('Min Size').onChange(function(){
    saturn.updateParticlesDefiniton();
  });
  gui.add(parameters, 'maxSize').min(.1).max(5).step(.1).name('Max Size').onChange(function(){
    saturn.updateParticlesDefiniton();
  });;
}