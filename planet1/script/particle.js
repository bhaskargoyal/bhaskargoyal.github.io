var Particle = function(){
  // Size of the particle, make it random
  var s = 1;
  
  // geometry of the particle, choose between different shapes
  var geom,random = Math.random();

  if (random<.25){
     // Cube
     geom = new THREE.BoxGeometry(s,s,s);

  }else if (random < .5){
    // Pyramid
    geom = new THREE.CylinderGeometry(0,s,s*2, 4, 1);

  }else if (random < .75){
    // potato shape
    geom = new THREE.TetrahedronGeometry(s,2);

  }else{
    // thick plane
    geom = new THREE.BoxGeometry(s/6,s,s); // thick plane
  }
  // color of the particle, make it random and get a material
  var color = getRandomColor();
  var mat = getMat(color);

  // create the mesh of the particle
  this.mesh = new THREE.Mesh(geom, mat);
  this.mesh.receiveShadow = true;
  this.mesh.castShadow = true;
  this.mesh.userData.po = this;
}
