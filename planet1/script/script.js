// for control keys
function alignControlDiv(){
  var screenHeight = window.innerHeight;
  var fontsize = $('#controlDiv').css("font-size");
  fontsize = fontsize.split("p");
  fontsize = fontsize[0];  
  $('#controlDiv').css({
    "top":screenHeight - fontsize - 40 + "px"
  });
}
alignControlDiv();
function showText(cameraPosition) {

  var textDiv = document.getElementById('textDiv');
  if(cameraPosition.x <= (sun.planet.position.x + mercury.planet.position.x)/2) {
    // console.log("sun");
    textDiv.innerHTML = "S&nbsp;&nbsp;U&nbsp;&nbsp;N";
  } else if( cameraPosition.x <= (mercury.planet.position.x + venus.planet.position.x)/2) {
    // console.log("mercury");
    textDiv.innerHTML = "M&nbsp;&nbsp;E&nbsp;&nbsp;R&nbsp;&nbsp;C&nbsp;&nbsp;U&nbsp;&nbsp;R&nbsp;&nbsp;Y";
  } else if( cameraPosition.x <= (venus.planet.position.x + earth.planet.position.x)/2) {
    // console.log("venus");
    textDiv.innerHTML = "V&nbsp;&nbsp;E&nbsp;&nbsp;N&nbsp;&nbsp;U&nbsp;&nbsp;S";
  } else if( cameraPosition.x <= (earth.planet.position.x + mars.planet.position.x)/2) {
    // console.log("earth");
    textDiv.innerHTML = "E&nbsp;&nbsp;A&nbsp;&nbsp;R&nbsp;&nbsp;T&nbsp;&nbsp;H";
  } else if( cameraPosition.x > (earth.planet.position.x + mars.planet.position.x)/2) {
    // console.log("mars");
    textDiv.innerHTML = "M&nbsp;&nbsp;A&nbsp;&nbsp;R&nbsp;&nbsp;S";
  }
}

// document.getElementById('textDiv').addEventListener('click', function() {
//   console.log("hello");
// });
// $('#textDiv').mouseenter(function() {
//   $(this).addClass('scaling');
// });
// $('#textDiv').mouseleave(function() {
//   $(this).removeClass('scaling');
// });

//MODAL
var modal = document.getElementById('myModal');
$('#textDiv').click(function() {
    console.log("hello");
    modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
$('#spanModal').click(function() {
    modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
document.onkeydown = function(event) {  
  modal.style.display = "none";
}


document.addEventListener('keydown', function(e) {
  // console.log(e);


  var smoothness = 10;
  var unknown = 2000;



  if(e.key === "ArrowRight") {
  	e.preventDefault();

  	// console.log("right");
  	//MOVE CAMERA ALONG SPLINE
    camPosIndex+=smoothness;
    if (camPosIndex < unknown) {
      // camPosIndex = 0;
      var camPos = spline.getPoint(camPosIndex / unknown);
      var camRot = spline.getPoint(camPosIndex / unknown);
      // console.log("right2");
      camera.position.x = camPos.x;
      camera.position.y = camPos.y;
      camera.position.z = camPos.z;
      // if(camera.position.x >= mars.mesh.position.x +100) {
        // camera.rotation.x = camRot.x;
        // camera.rotation.y = camRot.y;
        // camera.rotation.z = camRot.z;
        // if(spline.getPoint((camPosIndex+smoothness) / unknown).z > spline.getPoint((camPosIndex) / unknown).z)
        //   camera.lookAt(spline.getTangent((camPosIndex-smoothness) / unknown));
        // else 
        //   camera.lookAt(spline.getTangent((camPosIndex+smoothness) / unknown));
      // }
    } else {
      camPosIndex = unknown - smoothness;
    }


   	// saturn.position.x += 2;
  	camera.updateProjectionMatrix();
  } else if (e.key === "ArrowLeft") {
  	e.preventDefault();
  	// console.log("left");
  	//MOVE CAMERA ALONG SPLINE
    camPosIndex-=smoothness;
    if (camPosIndex < unknown && camPosIndex > 0) {
      // camPosIndex = 0;
      var camPos = spline.getPoint(camPosIndex / unknown);
      var camRot = spline.getTangent(camPosIndex / unknown);
      // console.log("right2");
      camera.position.x = camPos.x;
      camera.position.y = camPos.y;
      camera.position.z = camPos.z;
      
      // camera.rotation.x = camRot.x;
      // camera.rotation.y = camRot.y;
      // camera.rotation.z = camRot.z;
      // if(spline.getPoint((camPosIndex+smoothness) / unknown).z > spline.getPoint((camPosIndex) / unknown).z)
      //   camera.lookAt(spline.getTangent((camPosIndex-smoothness) / unknown));
      // else 
      //   camera.lookAt(spline.getTangent((camPosIndex+smoothness) / unknown));
    } else {
      camPosIndex = smoothness;
    }
  	// saturn.position.x -= 2;
  	camera.updateProjectionMatrix();
  }
  // console.log(e);
});
