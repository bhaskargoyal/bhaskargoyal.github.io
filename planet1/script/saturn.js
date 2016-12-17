var Saturn = function(posx, posy, posz, wantParticles, size, detailLevel, noise, planetColor){
  //
  // CREATE A MESH
  //
  // A Mesh = Geometry + Material
  // A mesh must be added to the scene to be rendered
  // var mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);

  // to create Saturn, we need
  // - a mesh for the planet
  // - a mesh for the ring
  // - a mesh that holds the planet and the ring

  // the geometry of the planet is a tetrahedron
  this.size = size;
  var geomPlanet = new THREE.TetrahedronGeometry(size, detailLevel);  
  // The shape of the planet is too perfect for my taste
  // let's manipulate the geometry and move the vertices randomly
  // to make it look like a rock
  
  for(var i=0; i<geomPlanet.vertices.length; i++){
    var v = geomPlanet.vertices[i];
    v.x += -noise/2 + Math.random()*noise;
    v.y += -noise/2 + Math.random()*noise;
    v.z += -noise/2 + Math.random()*noise;
  }

  // create a new material for the planet
  
  var matPlanet = getMat(planetColor);
  // create the mesh of the planet
  this.planet = new THREE.Mesh(geomPlanet, matPlanet);

  this.ring = new THREE.Mesh();
  this.nParticles = 0;

  // create the particles to populate the ring
  if(wantParticles) {
    this.updateParticlesCount();
  }
  
  // Create a global mesh to hold the planet and the ring

  this.mesh = new THREE.Object3D();
  this.mesh.add(this.planet);
  this.mesh.add(this.ring);
 


  this.planet.castShadow = true;
  this.planet.receiveShadow = true;

  // update the position of the particles => must be moved to the loop
  this.updateParticlesRotation();

  this.planet.position.x = posx;
  this.planet.position.y = posy;
  this.planet.position.z = posz;
  this.ring.position.x = posx;
  this.ring.position.y = posy;
  this.ring.position.z = posz;
}

Saturn.prototype.updateParticlesCount = function(){
  
  
  if (this.nParticles < parameters.particles){
    
    // Remove particles
    
    for (var i=this.nParticles; i< parameters.particles; i++){
      var p = new Particle();
      p.mesh.rotation.x = Math.random()*Math.PI;
      p.mesh.rotation.y = Math.random()*Math.PI;
      p.mesh.position.y = -2 + Math.random()*4;
      this.ring.add(p.mesh);
    }
  }else{
    
    // add particles
    
    while(this.nParticles > parameters.particles){
      var m = this.ring.children[this.nParticles-1];
      this.ring.remove(m);
      m.userData.po = null;
      this.nParticles--;
    }
  }
  this.nParticles = parameters.particles;
  
  // We will give a specific angle to each particle
  // to cover the whole ring we need to
  // dispatch them regularly
  this.angleStep = Math.PI*2/this.nParticles;
  this.updateParticlesDefiniton();
}

// Update particles definition
Saturn.prototype.updateParticlesDefiniton = function(){
  
  for(var i=0; i<this.nParticles; i++){
    var m = this.ring.children[i];
    var s = parameters.minSize + Math.random()*(parameters.maxSize - parameters.minSize);
    m.scale.set(s,s,s);
    
    // set a random distance
    m.userData.distance = parameters.minRadius +  Math.random()*(parameters.maxRadius-parameters.minRadius);
    
    // give a unique angle to each particle
    m.userData.angle = this.angleStep*i;
    // set a speed proportionally to the distance
    m.userData.angularSpeed = rule3(m.userData.distance,parameters.minRadius,parameters.maxRadius,parameters.minSpeed, parameters.maxSpeed);
  }
}



// Update particles position
Saturn.prototype.updateParticlesRotation = function(){

  // increase the rotation of each particle
  // and update its position

  for(var i=0; i<this.nParticles; i++){
    var m = this.ring.children[i];
    // increase the rotation angle around the planet
    m.userData.angle += m.userData.angularSpeed;

    // calculate the new position
    var posX = Math.cos(m.userData.angle)*m.userData.distance;
    var posZ = Math.sin(m.userData.angle)*m.userData.distance;
    m.position.x = posX;
    m.position.z = posZ;

    //*
    // add a local rotation to the particle
    m.rotation.x += Math.random()*.05;
    m.rotation.y += Math.random()*.05;
    m.rotation.z += Math.random()*.05;
    //*/
  }
}



