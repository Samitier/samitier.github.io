var scene, camera, renderer;
var cube;
var rotx, roty, mousex, mousey, mouseDown;

function init() {
   if(Modernizr.webgl && Modernizr.canvas) {
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

   renderer.setClearColor( 0xffffff, 1);
   renderer.render( scene, camera );
}

///EVENTS///
function onMouseMove( event ) {
   if(mouseDown) {
      roty += (event.x-mousex)*0.01;
      rotx += (event.y-mousey)*0.01;
      mousex = event.x;
      mousey = event.y;
   }
}
function onMouseDown( event ) {
   mousex = event.x;
   mousey = event.y;
   mouseDown = true;
}
function onMouseUp( event ) {
   mouseDown = false;
}
function onTouchStart (event) {
   mousex = event.touches[0].screenX;
   mousey = event.touches[0].screenY;
}
function onTouchMove (event) {
   roty += (event.touches[0].screenX-mousex)*0.01;
   rotx += (event.touches[0].screenY-mousey)*0.01;
   mousex = event.touches[0].screenX;
   mousey = event.touches[0].screenY;
}
