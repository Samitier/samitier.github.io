import {
	Raycaster, Vector2, PlaneGeometry, Mesh, MeshBasicMaterial,
	Scene, OrthographicCamera, PerspectiveCamera, WebGLRenderer,
	BoxGeometry, ImageUtils, DefaultLoadingManager, TextureLoader
} from "three"

import BackgroundScene from "./background-scene"
import CubeScene from "./cube-scene"
import MouseEvents from "./mouse-events"

import site from "../../assets/site.json"

const MAX_ROTATION = 1.5708

class Main {

	constructor () {
		this.loadAssets()
	}

	loadAssets() {
		let loader = new TextureLoader(),
			path = "/assets"
		this.cubeTexture = loader.load(path + site.texture)
		this.backgroundTextures = site.backgrounds.map(b => loader.load(path + site.texture))
		DefaultLoadingManager.onProgress = ( item, loaded, total ) => {
			let percentile = Math.round(loaded/total*100)
			document.getElementById("loading-text").innerHTML = `Loading: ${percentile}%`
			if(loaded == total) {
				document.getElementById("loading-div").style.display = 'none'
				this.init()
			}
		}
	}

	init() {
		// Scenes
		this.backgroundScene = new BackgroundScene(this.backgroundTextures[0])
		this.cubeScene = new CubeScene(this.cubeTexture)
		this.setPage(0)

		// Renderer
		this.renderer = new WebGLRenderer()
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		document.body.appendChild(this.renderer.domElement)

		// Event registration
		this.eventManager = new MouseEvents(this.renderer)
		window.addEventListener('resize', this.onResize.bind(this), false)
		
		this.render()
	}

	render() {
		requestAnimationFrame(this.render.bind(this))
		this.update()
		this.renderer.autoClear = false
		this.renderer.clear()
		this.renderer.render(this.backgroundScene.getScene(), this.backgroundScene.getCamera())
		this.renderer.render(this.cubeScene.getScene(), this.cubeScene.getCamera())
	}

	update() {
		let rotationAxis = this.eventManager.getRotationAxis(),
			isMouseDown = this.eventManager.getIsMouseDown(),
			rotation = this.eventManager.getRotation()

		// Alpha-transition of the background depending on the rotation percentage.
		if (rotationAxis == "y" || rotationAxis == "x") {
			this.backgroundScene.setBackgroundOpacity( 
				1 - (Math.abs(rotation[rotationAxis]) / MAX_ROTATION)
			)
		}
		// If the cube is half rotated and the user stops interacting, 
		// it will move itself to a final position.
		if (!isMouseDown) {
			if (Math.abs(rotation.x) > MAX_ROTATION / 2) {
				rotation.x += 0.05 * Math.sign(rotation.x)
			}
			else if (Math.abs(rotation.x) > 0.05) {
				rotation.x -= 0.05 * Math.sign(rotation.x)
			}
			else rotation.x = 0
			if (Math.abs(rotation.y) > MAX_ROTATION / 2) {
				rotation.y += 0.05 * Math.sign(rotation.y)
			}
			else if (Math.abs(rotation.y) > 0.05) {
				rotation.y -= 0.05 * Math.sign(rotation.y)
			}
			else rotation.y = 0
		}
		// If the user is moving the cube we set the new transitioning background
		else {
			let cubeRotation = this.cubeScene.getCubeRotation(),
				rotationFace = ""
			if (rotation.x > 0 && cubeRotation.x <= 0) rotationFace = "top"
			else if (rotation.x < 0 && cubeRotation.x >= 0) rotationFace = "bottom"
			if (rotation.y > 0 && cubeRotation.y <= 0) rotationFace = "left"
			else if (rotation.y < 0 && cubeRotation.y >= 0) rotationFace = "right"
			if (rotationFace) {
				this.backgroundScene.setBackgroundMap(
					1, navs[navs[this.curPage][rotationFace]].background
				)
			}
		}
		// If the user completely rotates the cube, the navigation will happen:
		// and the face textures will change 
		if (Math.abs(rotation.x) > MAX_ROTATION || Math.abs(rotation.y) > MAX_ROTATION) {
			let dir = ""
			if (Math.abs(rotation.x) > MAX_ROTATION) {
				dir = rotation.x > 0 ? "top" : "bottom"
			}
			else if(Math.abs(rotation.y) > MAX_ROTATION) {
				dir = rotation.y > 0 ? "left" : "right"
			}
			this.setPage(navs[navs[this.curPage][dir]])
			rotation.x = rotation.y = 0
		}
		this.cubeScene.setCubeRotation("x", rotation.x)
		this.cubeScene.setCubeRotation("y", rotation.y)
		this.eventManager.setRotation(rotation)
	}

	setPage(pagePosition) {
		this.currentPage = pagePosition
		this.cubeScene.setCubeUVs(this.getCurrentPage, site)
		this.backgroundScene.setBackgroundMap(0, page["background"])
	}

	onResize() {
		let width = Math.ceil( window.innerWidth / 1024 ),
			height = Math.ceil( window.innerHeight / 1024 )
		this.backgroundScene.setCameraProjection( -width, width, 1, -height * height)
		this.cubeScene.setCameraAspectRatio(window.innerWidth / window.innerHeight)
		this.renderer.setSize(window.innerWidth, window.innerHeight)
	}

	getCurrentPage() {
		return site.pages.find(p => p.position == this.currentPage)
	}
}


///////////////////////////////////////////////////////////////////////////////////////////////



var uv     = { main : [new Vector2(0, .75), new Vector2(.125, .75), new Vector2(.125, 1),new Vector2(0, 1)],
               website : [new Vector2(.125, .75), new Vector2(.2499, .75), new Vector2(.2499, 1),new Vector2(.125, 1)],
               contact : [new Vector2(.250, .75), new Vector2(.375, .75), new Vector2(.375, 1),new Vector2(.250, 1)],
               me : [new Vector2(.3751, .75), new Vector2(.500, .75), new Vector2(.500, 1),new Vector2(.3751, 1)],
               projects : [new Vector2(.5, .75), new Vector2(.625, .75), new Vector2(.625, 1),new Vector2(.5, 1)],
               education : [new Vector2(.6251, .75), new Vector2(.7499, .75), new Vector2(.7499, 1),new Vector2(.6251, 1)],
               skills : [new Vector2(.75, .75), new Vector2(.875, .75), new Vector2(.875, 1),new Vector2(.75, 1)],
               motivations : [new Vector2(.8751, .75), new Vector2(1, .75), new Vector2(1, 1),new Vector2(.8751, 1)],

               vj1 : [new Vector2(0, .5), new Vector2(.125, .5), new Vector2(.125, .75),new Vector2(0, .75)],
               vj2 : [new Vector2(.125, .5), new Vector2(.25, .5), new Vector2(.25, .75),new Vector2(.125, .75)],
               vj3 : [new Vector2(.250, .5), new Vector2(.375, .5), new Vector2(.375, .75),new Vector2(.250, .75)],
               vj4 : [new Vector2(.375, .5), new Vector2(.500, .5), new Vector2(.500, .75),new Vector2(.375, .75)],
               vj5 : [new Vector2(.5, .5), new Vector2(.625, .5), new Vector2(.625, .75),new Vector2(.5, .75)],

               w1 : [new Vector2(0, .25), new Vector2(.125, .25), new Vector2(.125, .5),new Vector2(0, .5)],
               w2 : [new Vector2(.125, .25), new Vector2(.25, .25), new Vector2(.25, .5),new Vector2(.125, .5)],
               w3 : [new Vector2(.250, .25), new Vector2(.375, .25), new Vector2(.375, .5),new Vector2(.250, .5)],

               a1 : [new Vector2(0, .0), new Vector2(.1249, .0), new Vector2(.1249, .25),new Vector2(0, .25)],
               a2 : [new Vector2(.125, .0), new Vector2(.25, .0), new Vector2(.25, .25),new Vector2(.125, .25)]



};

var pages = ImageUtils.loadTexture( '/assets/pages/pages.png' );console.log(pages);

var bkgMain = ImageUtils.loadTexture( '/assets/bkg/bkgmain.jpg' );
var bkgWebsite = ImageUtils.loadTexture( '/assets/bkg/bkgweb.jpg');
var bkgContact = ImageUtils.loadTexture( '/assets/bkg/bkgcontact.jpg');
var bkgAboutMe = ImageUtils.loadTexture( '/assets/bkg/bkgAboutMe.jpg');
var bkgProjects = ImageUtils.loadTexture( '/assets/bkg/bkgProjects.jpg');
var bkgMotivations = ImageUtils.loadTexture( '/assets/bkg/bkgMotivations.jpg');
var bkgSkills = ImageUtils.loadTexture( '/assets/bkg/bkgSkills.jpg');
var bkgEducation = ImageUtils.loadTexture( '/assets/bkg/bkgEducation.jpg');
var bkgVj = ImageUtils.loadTexture( '/assets/bkg/bkgVj.png');
var bkgWb = ImageUtils.loadTexture( '/assets/bkg/bkgWb.jpg');
var bkgAndroid = ImageUtils.loadTexture( '/assets/bkg/bkgAndroid.jpg');

DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
    document.getElementById("loading-text").innerHTML = "Loading: " + Math.round(loaded/total*100) + "%";
    if(loaded==total) {
        document.getElementById("loading-div").style.display = 'none';
    }
};

var navs = {   main:      {top : "projects",bottom : "me",   left : "website", right: "contact", front: "main",    background:bkgMain},
               website:   {top : "main",    bottom : "main", left : "main",    right: "main",     front: "website", background:bkgWebsite},
               contact:   {top : "main",    bottom : "main", left : "main",    right: "main",     front: "contact", background:bkgContact},
               me:        {top : "main",    bottom : "skills", left : "education",    right: "motivations",     front: "me",      background:bkgAboutMe},
               projects:  {top : "w1",    bottom : "main", left : "a1",    right:"vj1",      front: "projects",background:bkgProjects},
               education: {top : "main",    bottom : "main", left : "main",    right:"me",      front: "education",background:bkgEducation},
               skills:    {top : "me",    bottom : "main", left : "main",    right:"main",      front: "skills",   background:bkgSkills},
               motivations:{top : "main",   bottom : "main", left : "me",    right:"main",      front: "motivations",  background:bkgMotivations},

               vj1: {top : "vj2",   bottom : "vj5", left : "projects",    right:"main",      front: "vj1",  background:bkgVj, buttons:[{height:0.073, width:0.34, x:0.08, y:-0.288, link:"https://www.youtube.com/watch?v=tVEEdebiVG8"}]},
               vj2: {top : "vj3",   bottom : "vj1", left : "projects",    right:"main",      front: "vj2",  background:bkgVj, buttons:[{height:0.073, width:0.34, x:0.08, y:-0.288, link:"https://www.youtube.com/watch?v=Vp_X0DgzwpI"},{height:0.073, width:0.34, x:-0.42, y:-0.288, link:"http://www.kongregate.com/games/lepka/mongo-the-shurmanos"}]},
               vj3: {top : "vj4",   bottom : "vj2", left : "projects",    right:"main",      front: "vj3",  background:bkgVj, buttons:[{height:0.073, width:0.34, x:0.08, y:-0.288, link:"https://www.youtube.com/watch?v=U5m4ixkeEX0"},{height:0.073, width:0.34, x:-0.42, y:-0.288, link:"http://samitier.github.io/Snow-Bros-Reborn/"}]},
               vj4: {top : "vj5",   bottom : "vj3", left : "projects",    right:"main",      front: "vj4",  background:bkgVj, buttons:[{height:0.073, width:0.34, x:0.08, y:-0.288, link:"https://www.youtube.com/watch?v=5jJCd3k_l98"},{height:0.073, width:0.34, x:-0.42, y:-0.288, link:"https://github.com/albarralnunez/TowerDefense"}]},
               vj5: {top : "vj1",   bottom : "vj4", left : "projects",    right:"main",      front: "vj5",  background:bkgVj, buttons:[{height:0.073, width:0.34, x:0.08, y:-0.288, link:"https://www.youtube.com/channel/UCjI7xjQrVNpVbXngJEimwSQ"}]},

               w1: {top : "main",   bottom : "projects", left : "w3",    right:"w2",      front: "w1",  background:bkgWb, buttons:[{height:0.073, width:0.34, x:-0.178, y:-0.342, link:"http://dhis2-hii.asfes.org/"}]},
               w2: {top : "main",   bottom : "projects", left : "w1",    right:"w3",      front: "w2",  background:bkgWb, buttons:[{height:0.073, width:0.34, x:0.08, y:-0.288, link:"https://github.com/ferranmarlet/ticketForAll"},{height:0.073, width:0.34, x:-0.42, y:-0.288, link:"http://ticketforall.herokuapp.com/"}]},
               w3: {top : "main",   bottom : "projects", left : "w2",    right:"w1",      front: "w3",  background:bkgWb},

               a1: {top : "a2",   bottom : "a2", left : "main",    right:"projects",      front: "a1",  background:bkgMain, buttons:[{height:0.073, width:0.34, x:-0.178, y:-0.342, link:"https://github.com/Samitier/Share-the-Sound"}]},
               a2: {top : "a1",   bottom : "a1", left : "main",    right:"projects",      front: "a2",  background:bkgAndroid},
}
new Main()

///////////////////////////////////////////////////////////////////////////////////////////////////





