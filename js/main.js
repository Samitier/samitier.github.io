var MAX_ROTATION = 1.5708;
var background,background2, backgroundScene, backgroundCam;
var cube, scene, camera;
var renderer;
var rotx, roty, mousex, mousey, mouseDown,rotationAxis;
var curPage;

function init() {
   if(Modernizr.webgl && Modernizr.canvas) {

      //BACKGROUND
      background = new THREE.Mesh(
         new THREE.PlaneGeometry(2, 2, 0),
         new THREE.MeshBasicMaterial({map: bkgMain, transparent:true, opacity: 1})
      );
      background.material.depthTest = false;
      background.material.depthWrite = false;
      background2 = new THREE.Mesh(
         new THREE.PlaneGeometry(2, 2, 0), //16,9
         new THREE.MeshBasicMaterial({map: bkgMain})
      );
      background2.material.depthTest = false;
      background2.material.depthWrite = false;
      backgroundScene = new THREE.Scene();
      var width = window.innerWidth/1024; if(width>1) width = 1;
      var height =  window.innerHeight/1024; if(height>1) height =1;
      backgroundCam = new THREE.OrthographicCamera(-width ,width,1, -height*height, 0.1, 5 );
      backgroundCam.position.z = 1;
      backgroundScene.add(backgroundCam);
      backgroundScene.add(background);
      backgroundScene.add(background2);

      //CUBE
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5);
      camera.position.z = 1.4;
      renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );
      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var texture = THREE.ImageUtils.loadTexture( 'img/pages/pages.png' );
      var material = new THREE.MeshBasicMaterial( {map: texture , transparent:true} );
      cube = new THREE.Mesh( geometry, material );
      scene.add( cube );

      //UV MAPPING - SETTING MAIN PAGE
      setPage(navs.main);

      //MOVEMENT
      rotx = roty =  mousex= mousey=0;
      mouseDown = false;
      rotationAxis = "none";

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
   //transition of the background
   if(rotationAxis == "y")background.material.opacity = 1-(Math.abs(roty)/MAX_ROTATION);
   else if(rotationAxis == "x")background.material.opacity = 1-(Math.abs(rotx)/MAX_ROTATION);
   //if the cube is between two rotations it will move itself until a final position
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
   //if user is moving the cube we set the new background that will do the transition
   else {
      if(rotx > 0 && cube.rotation.x<=0) {
         background2.material.map = navs[navs[curPage]['top']].background;
      }
      else if(rotx < 0 && cube.rotation.x>=0 ) {
         background2.material.map = navs[navs[curPage]['bottom']].background;
      }
      if(roty > 0 && cube.rotation.y<=0)  {
         background2.material.map = navs[navs[curPage]['left']].background;
      }
      else if(roty < 0 && cube.rotation.y>=0 ) {
         background2.material.map = navs[navs[curPage]['right']].background;
      }
   }
   //if the user completely rotates the cube, the navigation will happen
   if(Math.abs(rotx) > MAX_ROTATION) {
      var dir = "bottom";
      if(rotx > 0) dir = "top";
      setPage(navs[navs[curPage][dir]]);
      cube.rotation.x = rotx = 0;
   }
   else if(Math.abs(roty) > MAX_ROTATION) {
      var dir = "right";
      if(roty>0) dir = "left";
      setPage(navs[navs[curPage][dir]]);
      cube.rotation.y = roty = 0;
   }
   else {
      cube.rotation.x = rotx;
      cube.rotation.y = roty;
   }
}

function setPage(page) {
   curPage = page.front;
   cube.geometry.faceVertexUvs[0][0] = [uv[page.right][3], uv[page.right][0], uv[page.right][2]];
   cube.geometry.faceVertexUvs[0][1] = [uv[page.right][0], uv[page.right][1], uv[page.right][2]];
   cube.geometry.faceVertexUvs[0][2] = [uv[page.left][3], uv[page.left][0],uv[page.left][2]];
   cube.geometry.faceVertexUvs[0][3] = [uv[page.left][0], uv[page.left][1], uv[page.left][2]];
   cube.geometry.faceVertexUvs[0][4] = [uv[page.top][3], uv[page.top][0], uv[page.top][2]];
   cube.geometry.faceVertexUvs[0][5] = [uv[page.top][0], uv[page.top][1], uv[page.top][2]];
   cube.geometry.faceVertexUvs[0][6] = [uv[page.bottom][3], uv[page.bottom][0], uv[page.bottom][2]];
   cube.geometry.faceVertexUvs[0][7] = [uv[page.bottom][0],uv[page.bottom][1], uv[page.bottom][2]];
   cube.geometry.faceVertexUvs[0][8] = [uv[page.front][3], uv[page.front][0], uv[page.front][2]];
   cube.geometry.faceVertexUvs[0][9] = [uv[page.front][0], uv[page.front][1], uv[page.front][2]];
   //the uvs for the back face, we don't really care about them
   cube.geometry.faceVertexUvs[0][10] = [0, 0, 0];
   cube.geometry.faceVertexUvs[0][11] = [0, 0, 0];
   cube.geometry.uvsNeedUpdate = true;
   //and we set the background texture
   background.material.map = page["background"];
   background.material.opacity = 1;
}


///EVENTS///
function onMouseMove( event ) {
   if(mouseDown) {
      if(rotationAxis =="none") {
         if(event.x != mousex && event.y == mousey) rotationAxis = "y";
         else if(event.x == mousex && event.y != mousey) rotationAxis = "x";
      }
      else if (rotationAxis == "x") rotx += (event.y-mousey)*0.005;
      else if (rotationAxis == "y") roty += (event.x-mousex)*0.005;
      mousex = event.x;
      mousey = event.y;
   }
}
function onMouseDown( event ) {
   if(rotx ==0 && roty ==0) rotationAxis = "none";
   mousex = event.x;
   mousey = event.y;
   mouseDown = true;
}
function onMouseUp( event ) {
   mouseDown = false;
}
function onTouchStart (event) {
   if(rotx ==0 && roty ==0) rotationAxis = "none";
   mousex = event.touches[0].screenX;
   mousey = event.touches[0].screenY;
   mouseDown = true;
}
function onTouchMove (event) {
   if(rotationAxis =="none") {
      if(event.touches[0].screenX != mousex && event.touches[0].screenY == mousey) rotationAxis = "y";
      else if(event.touches[0].screenX == mousex && event.touches[0].screenY != mousey) rotationAxis = "x";
   }
   else if (rotationAxis == "x") rotx += (event.touches[0].screenY-mousey)*0.01;
   else if (rotationAxis == "y") roty += (event.touches[0].screenX-mousex)*0.01;
   mousex = event.touches[0].screenX;
   mousey = event.touches[0].screenY;
}

function onTouchEnd( event ) {
   mouseDown = false;
}

function onResize() {
   var width = window.innerWidth/1024;  if(width>1) width = 1;
   var height =  window.innerHeight/1024;  if(height>1) height =1;
   backgroundCam.left = -width; backgroundCam.right = width;
   backgroundCam.top = 1; backgroundCam.bottom = -height*height;
   backgroundCam.updateProjectionMatrix();
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize( window.innerWidth, window.innerHeight );
}
