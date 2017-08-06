import { WebGLRenderer, DefaultLoadingManager, ImageUtils } from "three"

import BackgroundScene from "./background-scene"
import CubeScene from "./cube-scene"
import MouseEvents from "./mouse-events"

import site from "../../assets/site.json"

import { MAX_RESOLUTION, MAIN_PAGE } from "./constants.js"

const   MAX_ROTATION = 1.5708,
        FACE = {
            top: 0,
            right: 1,
            bottom: 2,
            left: 3,
            front: 4
        },
        ANISOTROPIC_FILTERING = 8

class Main {

	constructor () {
		this.loadAssets()
	}

    /** 
    *   Loads textures defined in site.json. When everything is loaded, the rendering starts.
    */
	loadAssets() {
		let path = "/assets"
        this.cubeTexture = ImageUtils.loadTexture(path + site.texture)
        this.cubeTexture.anisotropy = ANISOTROPIC_FILTERING
		this.backgroundTextures = site.backgrounds.map(b => ImageUtils.loadTexture(path + b))
		DefaultLoadingManager.onProgress = ( item, loaded, total ) => {
			let percentile = Math.round(loaded / total * 100)
			document.getElementById("loading-text").innerHTML = `Loading: ${ percentile }%`
			if(loaded == total) {
				document.getElementById("loading-div").style.display = 'none'
				this.init()
			}
		}
	}

    /**
     *  Initializing all the properties & scenes
     */
	init() {
		// Scenes
		this.backgroundScene = new BackgroundScene(this.backgroundTextures[0])
		this.cubeScene = new CubeScene(this.cubeTexture)
		this.setPage(MAIN_PAGE)

		// Renderer
		this.renderer = new WebGLRenderer({ antialias: true })
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		document.body.appendChild(this.renderer.domElement)

		// Event registration
		this.eventManager = new MouseEvents(this.renderer)
		window.addEventListener('resize', this.onResize.bind(this), false)
		
		this.render()
	}

    /**
     *  The render loop
     */
	render() {
		requestAnimationFrame(this.render.bind(this))
		this.update()
		this.renderer.autoClear = false
		this.renderer.clear()
		this.renderer.render(this.backgroundScene.getScene(), this.backgroundScene.getCamera())
		this.renderer.render(this.cubeScene.getScene(), this.cubeScene.getCamera())
	}

    /**
     *  Updates & handles the user input.
     */
	update() {
        // Getting all the user interaction
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
			if (rotation.x > 0 && cubeRotation.x <= 0) rotationFace = FACE.top
			else if (rotation.x < 0 && cubeRotation.x >= 0) rotationFace = FACE.bottom 
			if (rotation.y > 0 && cubeRotation.y <= 0) rotationFace = FACE.left
			else if (rotation.y < 0 && cubeRotation.y >= 0) rotationFace = FACE.right
			if (rotationFace != -1) {
                let navigatedPage = site.pages[ 
                    site.pages[this.currentPage].navigation[rotationFace] || MAIN_PAGE 
                ]
                this.backgroundScene.setBackgroundMap( 1, this.backgroundTextures[ navigatedPage.background ])
			}
		}
		// If the user completely rotates the cube, the navigation will happen:
		// and the face textures will change 
		if (Math.abs(rotation.x) > MAX_ROTATION || Math.abs(rotation.y) > MAX_ROTATION) {
			let direction = rotation.y > 0 ? FACE.left : FACE.right
			if (Math.abs(rotation.x) > MAX_ROTATION) {
				direction = rotation.x > 0 ? FACE.top : FACE.bottom
			}
			this.setPage(site.pages[this.currentPage].navigation[direction])
			rotation.x = rotation.y = 0
        }
        // Finally we set the new cube rotation
		this.cubeScene.setCubeRotation("x", rotation.x)
		this.cubeScene.setCubeRotation("y", rotation.y)
		this.eventManager.setRotation(rotation)
	}

    /**
     * Sets the new page <pageName>, defined in the site.json. This will change the cube texture to
     * set the new faces & the background texture.
     * @param {string} pageName 
     */
	setPage(pageName) {
		this.currentPage = pageName || MAIN_PAGE
		this.cubeScene.setCubeUVs(this.currentPage, site)
        this.backgroundScene.setBackgroundMap(
            0, 
            this.backgroundTextures[ site.pages[this.currentPage].background ]
        )
	}

    /**
     *  Resizes the projections of both scenes to avoid deformation when resizing the window
     */
	onResize() {
		let width = Math.min(window.innerWidth / MAX_RESOLUTION, 1),
			height = Math.min(window.innerHeight / MAX_RESOLUTION, 1)
		this.backgroundScene.setCameraProjection( -width, width, 1, -height * height)
		this.cubeScene.setCameraAspectRatio(window.innerWidth / window.innerHeight)
		this.renderer.setSize(window.innerWidth, window.innerHeight)
	}
}

new Main()




