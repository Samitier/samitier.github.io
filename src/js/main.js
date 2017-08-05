import { WebGLRenderer, DefaultLoadingManager, TextureLoader } from "three"

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
		this.backgroundTextures = site.backgrounds.map(b => loader.load(path + b))
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
		this.setPage("home")

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
				rotationFace = -1
			if (rotation.x > 0 && cubeRotation.x <= 0) rotationFace = 0
			else if (rotation.x < 0 && cubeRotation.x >= 0) rotationFace = 2
			if (rotation.y > 0 && cubeRotation.y <= 0) rotationFace = 3
			else if (rotation.y < 0 && cubeRotation.y >= 0) rotationFace = 1
			if (rotationFace >= 0) {
                let navigatedPage = site.pages[ site.pages[this.currentPage].navigation[rotationFace] || "home" ]
                this.backgroundScene.setBackgroundMap( 1, this.backgroundTextures[ navigatedPage.background ])
			}
		}
		// If the user completely rotates the cube, the navigation will happen:
		// and the face textures will change 
		if (Math.abs(rotation.x) > MAX_ROTATION || Math.abs(rotation.y) > MAX_ROTATION) {
			let direction = rotation.y > 0 ? 3 : 1
			if (Math.abs(rotation.x) > MAX_ROTATION) {
				direction = rotation.x > 0 ? 0 : 2
			}
			this.setPage(site.pages[this.currentPage].navigation[direction])
			rotation.x = rotation.y = 0
		}
		this.cubeScene.setCubeRotation("x", rotation.x)
		this.cubeScene.setCubeRotation("y", rotation.y)
		this.eventManager.setRotation(rotation)
	}

	setPage(pageName) {
		this.currentPage = pageName || "home"
		this.cubeScene.setCubeUVs(this.currentPage, site)
        this.backgroundScene.setBackgroundMap(
            0, 
            this.backgroundTextures[ site.pages[this.currentPage].background ]
        )
	}

	onResize() {
		let width = Math.ceil( window.innerWidth / 1024 ),
			height = Math.ceil( window.innerHeight / 1024 )
		this.backgroundScene.setCameraProjection( -width, width, 1, -height * height)
		this.cubeScene.setCameraAspectRatio(window.innerWidth / window.innerHeight)
		this.renderer.setSize(window.innerWidth, window.innerHeight)
	}
}

new Main()




