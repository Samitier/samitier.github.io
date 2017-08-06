import {
	PlaneGeometry, Mesh, MeshBasicMaterial,
	Scene, OrthographicCamera
} from "three"

import { MAX_RESOLUTION } from "./constants.js"


export default class BackgroundScene {

    /**
     * Initializes the background scene
     */
	constructor( backgroundMap ) {
		let width = Math.min(window.innerWidth / MAX_RESOLUTION, 1),
			height = Math.min(window.innerHeight / MAX_RESOLUTION, 1)

        // We need two backgrounds, to make the alpha animation between two backgrounds. 
        // One of them will change its alpha when the cube is rotating
		this.backgrounds = [
			this._newBackgroundMesh(backgroundMap, true),
			this._newBackgroundMesh(backgroundMap)
		]
		
		this.scene = new Scene()

		this.camera = new OrthographicCamera(-width, width, 1, -height * height, 0.1, 5)
		this.camera.position.z = 1
		this.scene.add(this.camera)
		for (let background of this.backgrounds) this.scene.add(background)
	}

    /**
     * Creates a simple plane mesh for the background
     * @param { any } map 
     * @param { boolean } transparent 
     */
	_newBackgroundMesh(map, transparent = false) {
		return new Mesh(
			new PlaneGeometry(2, 2, 0),
			new MeshBasicMaterial({ 
				map, 
				transparent, 
				opacity: 1, 
				depthTest: false,
				depthWrite: false
			})
		)
	}

	getScene() {
		return this.scene
	}

	getCamera() {
		return this.camera
	}

	setBackgroundMap(backgroundIndex, map) {
		this.backgrounds[backgroundIndex].material.map = map
		this.backgrounds[backgroundIndex].material.opacity = 1
	}

    /**
     * Sets the opacity of the first background (the only one with transparency)
     * @param {number} opacity 
     */
	setBackgroundOpacity(opacity) {
		this.backgrounds[0].material.opacity = opacity
	}

	setCameraProjection(left, right, top, bottom) {
		Object.assign(this.camera, { left, right, top, bottom })
		this.camera.updateProjectionMatrix()
	}
}