var MAX_ROTATION = 1.5708;
var background,background2, backgroundScene, backgroundCam;
var cube, scene, camera;
var uvCoords;
var renderer;
var rotx, roty, mousex, mousey, mouseDown,axisRotating;
var curPage;
var textureMain, textureProva, backgroundTexture, backgroundTexture2;

function init() {
   if(Modernizr.webgl && Modernizr.canvas) {

      //BACKGROUND
      backgroundTexture = THREE.ImageUtils.loadTexture( 'img/bkg/bkg1.png' );
      background = new THREE.Mesh(
         new THREE.PlaneGeometry(2, 2, 0),
         new THREE.MeshBasicMaterial({map: backgroundTexture, transparent:true, opacity: 1})
      );
      background.material.depthTest = false;
      background.material.depthWrite = false;
      backgroundTexture2 = THREE.ImageUtils.loadTexture( 'img/bkg/bkg2.jpg' );
      background2 = new THREE.Mesh(
         new THREE.PlaneGeometry(2, 2, 0),
         new THREE.MeshBasicMaterial({map: backgroundTexture2, transparent:true, opacity: 1})
      );
      background2.material.depthTest = false;
      background2.material.depthWrite = false;
      backgroundScene = new THREE.Scene();
      backgroundCam = new THREE.Camera();
      backgroundScene.add(backgroundCam);
      backgroundScene.add(background);
      backgroundScene.add(background2);


      //CUBE
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
      renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );
      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      textureMain = THREE.ImageUtils.loadTexture( 'img/pages/main.png' );
      textureProva = THREE.ImageUtils.loadTexture( 'img/pages/prova.png' );
      var material = new THREE.MeshBasicMaterial( {map: textureMain} );
      curPage = "main";

      //UV MAPPING
      uvCoords={front :[new THREE.Vector2(0, .666), new THREE.Vector2(.5, .666), new THREE.Vector2(.5, 1), new THREE.Vector2(0, 1)],
               back:[new THREE.Vector2(.5, .666), new THREE.Vector2(1, .666), new THREE.Vector2(1, 1), new THREE.Vector2(.5, 1)],
               left:[new THREE.Vector2(0, .333), new THREE.Vector2(.5, .333), new THREE.Vector2(.5, .666), new THREE.Vector2(0, .666)],
               right:[new THREE.Vector2(.5, .333), new THREE.Vector2(1, .333), new THREE.Vector2(1, .666), new THREE.Vector2(.5, .666)],
               top:[new THREE.Vector2(0, 0), new THREE.Vector2(.5, 0), new THREE.Vector2(.5, .333), new THREE.Vector2(0, .333)],
               down:[new THREE.Vector2(.5, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, .333), new THREE.Vector2(.5, .333)]};

      geometry.faceVertexUvs[0][0] = [uvCoords.right[3], uvCoords.right[0], uvCoords.right[2]];
      geometry.faceVertexUvs[0][1] = [uvCoords.right[0], uvCoords.right[1], uvCoords.right[2]];
      geometry.faceVertexUvs[0][2] = [uvCoords.left[3], uvCoords.left[0], uvCoords.left[2]];
      geometry.faceVertexUvs[0][3] = [uvCoords.left[0], uvCoords.left[1], uvCoords.left[2]];
      geometry.faceVertexUvs[0][4] = [uvCoords.top[3], uvCoords.top[0], uvCoords.top[2]];
      geometry.faceVertexUvs[0][5] = [uvCoords.top[0], uvCoords.top[1], uvCoords.top[2]];
      geometry.faceVertexUvs[0][6] = [uvCoords.down[3], uvCoords.down[0], uvCoords.down[2]];
      geometry.faceVertexUvs[0][7] = [uvCoords.down[0], uvCoords.down[1], uvCoords.down[2]];
      geometry.faceVertexUvs[0][8] = [uvCoords.front[3], uvCoords.front[0], uvCoords.front[2]];
      geometry.faceVertexUvs[0][9] = [uvCoords.front[0], uvCoords.front[1], uvCoords.front[2]];
      geometry.faceVertexUvs[0][10] = [uvCoords.back[3], uvCoords.back[0], uvCoords.back[2]];
      geometry.faceVertexUvs[0][11] = [uvCoords.back[0], uvCoords.back[1], uvCoords.back[2]];

      cube = new THREE.Mesh( geometry, material );
      scene.add( cube );
      camera.position.z = 1.4;

      //MOVEMENT
      rotx = roty =  mousex= mousey=0;
      mouseDown = false;
      axisRotating = "none";

      //EVENTS
      window.addEventListener( 'resize', onResize, false );
      if (Modernizr.touch) {
         renderer.domElement.addEventListener( 'touchstart', onTouchStart);
         renderer.domElement.addEventListener( 'touchmove', onTouchMove);
         renderer.domElement.addEventListener( 'touchend', onTouchEnd);
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

   update();

   renderer.autoClear = false;
   renderer.clear();
   renderer.render(backgroundScene, backgroundCam);
   renderer.render( scene, camera );
}

function update() {
   if(axisRotating =='y')background.material.opacity = 1-(Math.abs(roty)/MAX_ROTATION);
   else if(axisRotating =='x')background.material.opacity = 1-(Math.abs(rotx)/MAX_ROTATION);

   if(!mouseDown){
      if(Math.abs(rotx) > MAX_ROTATION/2){
         rotx += 0.05*Math.sign(rotx);
      }
      else if(Math.abs(rotx)>0.05)rotx -= 0.05*Math.sign(rotx);
      else rotx = 0;
      if(Math.abs(cube.rotation.y) > MAX_ROTATION/2){
         roty += 0.05*Math.sign(roty);
      }
      else  if(Math.abs(roty)>0.05)roty -= 0.05*Math.sign(roty);
      else roty =0;
   }
   if(Math.abs(rotx) > MAX_ROTATION) {
      cube.rotation.x = rotx = 0;
      var material;
      if(curPage == 'main') {
          material = new THREE.MeshBasicMaterial( {map: textureProva } );
          background.material.map = backgroundTexture2;
          background.material.opacity = 1;
          background2.material.map = backgroundTexture;
          curPage = 'prova';
       }
       else if(curPage == 'prova') {
          material = new THREE.MeshBasicMaterial( {map: textureMain } );
          background.material.map = backgroundTexture;
          background.material.opacity = 1;
          background2.material.map = backgroundTexture2;
          curPage = 'main';
       }
      cube.material = material;
   }
   else cube.rotation.x = rotx;
   if(Math.abs(roty) > MAX_ROTATION) {
      cube.rotation.y = roty = 0;
      var material;
      if(curPage == 'main') {
         material = new THREE.MeshBasicMaterial( {map: textureProva } );
         background.material.map = backgroundTexture2;
         background.material.opacity = 1;
         background2.material.map = backgroundTexture;
         curPage = 'prova';
      }
      else if(curPage == 'prova') {
         material = new THREE.MeshBasicMaterial( {map: textureMain } );
         background.material.map = backgroundTexture;
         background.material.opacity = 1;
         background2.material.map = backgroundTexture2;
         curPage = 'main';
      }
      cube.material = material;
   }
   else cube.rotation.y = roty;
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
   mouseDown = true;
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

function onTouchEnd( event ) {
   mouseDown = false;
}

function onResize() {
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize( window.innerWidth, window.innerHeight );
}
