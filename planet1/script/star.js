function Star(sizex, sizey, sizez) {
	this.geometry = new THREE.BoxGeometry(sizex, sizey, sizey);
	this.material = new THREE.MeshBasicMaterial({color: "#EEEDDD"});
	this.mesh = new THREE.Mesh(this.geometry, this.material);
}