import {
	PlaneGeometry, Mesh, MeshBasicMaterial,
	Scene, OrthographicCamera
} from "three"

export default class BackgroundScene {

	constructor( backgroundMap ) {
		let width = Math.ceil(window.innerWidth / 1024),
			height = Math.ceil(window.innerHeight / 1024)

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

	_newBackgroundMesh(map, isTransparent = false) {
		return new Mesh(
			new PlaneGeometry(2, 2, 0),
			new MeshBasicMaterial({ 
				map, 
				transparent: isTransparent, 
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

	setBackgroundOpacity(opacity) {
		this.backgrounds[0].material.opacity = opacity
	}

	setCameraProjection(left, right, top, bottom) {
		Object.assign(this.camera, { left, right, top, bottom })
		this.camera.updateProjectionMatrix()
	}
}