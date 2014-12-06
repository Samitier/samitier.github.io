var MAX_ROTATION = 1.5708;
var background, backgroundScene, backgroundCam;
var cube, scene, camera;
var renderer;
var rotx, roty, mousex, mousey, mouseDown,axisRotating;

function init() {
   if(Modernizr.webgl && Modernizr.canvas) {
      //BACKGROUND
      var backgroundTexture = THREE.ImageUtils.loadTexture( 'bkg.png' );
      background = new THREE.Mesh(
         new THREE.PlaneGeometry(2, 2, 0),
         new THREE.MeshBasicMaterial({map: backgroundTexture})
      );
      background.material.depthTest = false;
      background.material.depthWrite = false;

      backgroundScene = new THREE.Scene();
      backgroundCam = new THREE.Camera();
      backgroundScene.add(backgroundCam);
      backgroundScene.add(background);

      //CUBE
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
      renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var texture = THREE.ImageUtils.loadTexture( 'txt.png' );
      var material = new THREE.MeshBasicMaterial( {map: texture } );
      cube = new THREE.Mesh( geometry, material );
      scene.add( cube );
      camera.position.z = 1.4;

      rotx = roty =  mousex= mousey=0;
      mouseDown = false;
      axisRotating = "none";

      if (Modernizr.touch) {
         renderer.domElement.addEventListener( 'touchstart', onTouchStart);
         renderer.domElement.addEventListener( 'touchmove', onTouchMove);
      } else {
         renderer.domElement.addEventListener( 'mousemove', onMouseMove );
         renderer.domElement.addEventListener( 'mousedown', onMouseDown );
         renderer.domElement.addEventListener( 'mouseup', onMouseUp );
      }
      render();
   }
   else alert("Your browser don't support WebGl! :(");
}

function render() {
   requestAnimationFrame( render );

   cube.rotation.x = rotx;
   cube.rotation.y = roty;

   renderer.autoClear = false;
   renderer.clear();
   renderer.render(backgroundScene, backgroundCam);
   renderer.render( scene, camera );
}

///EVENTS///
function onMouseMove( event ) {
   if(mouseDown) {
      if(axisRotating =="none") {
         if(event.x != mousex && event.y == mousey) axisRotating = "y";
         else if(event.x == mousex && event.y != mousey) axisRotating = "x";
      }
      else if (axisRotating == "x") rotx += (event.y-mousey)*0.005;
      else if (axisRotating == "y") roty += (event.x-mousex)*0.005;
      mousex = event.x;
      mousey = event.y;
   }
}
function onMouseDown( event ) {
   axisRotating = "none";
   mousex = event.x;
   mousey = event.y;
   mouseDown = true;
}
function onMouseUp( event ) {
   mouseDown = false;
}
function onTouchStart (event) {
   axisRotating = "none";
   mousex = event.touches[0].screenX;
   mousey = event.touches[0].screenY;
}
function onTouchMove (event) {
   if(axisRotating =="none") {
      if(event.touches[0].screenX != mousex && event.touches[0].screenY == mousey) axisRotating = "y";
      else if(event.touches[0].screenX == mousex && event.touches[0].screenY != mousey) axisRotating = "x";
   }
   else if (axisRotating == "x") rotx += (event.touches[0].screenY-mousey)*0.01;
   else if (axisRotating == "y") roty += (event.touches[0].screenX-mousex)*0.01;
   mousex = event.touches[0].screenX;
   mousey = event.touches[0].screenY;
}
