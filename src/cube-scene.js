import {
	BoxGeometry, Mesh, MeshBasicMaterial,
	Scene, PerspectiveCamera
} from "three"

export default class CubeScene {

	constructor(map) {
		this.scene = new Scene()
		this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5)
		this.camera.position.z = 1.4
		this.cube = new Mesh(
			new BoxGeometry(1, 1, 1), 
			new MeshBasicMaterial({ 
				map, 
				transparent: true 
			})
		)
		this.scene.add(this.cube)
	}

	getScene() {
		return this.scene
	}

	getCamera() {
		return this.camera
	}

	getCubeRotation () {
		return this.cube.rotation
	}

	setCubeUVs(uv, page) {
		for (let i = 0; i < 10; ++i) {
			let isOdd = i%2 != 0,
				side = i <= 1 ? "right" : i <= 3 ? "left" : i <= 5 ? "top" : i <= 7 ? "bottom" : "front" 
			this.cube.geometry.faceVertexUvs[0][i] = [
				uv[page[side]][isOdd ? 0 : 3],
				uv[page[side]][isOdd ? 1 : 0],
				uv[page[side]][2]
			]
		}
		this.cube.geometry.faceVertexUvs[0][10] = [0, 0, 0]
		this.cube.geometry.faceVertexUvs[0][11] = [0, 0, 0]
		this.cube.geometry.uvsNeedUpdate = true
	}

	setCameraAspectRatio (aspect) {
		this.camera.aspect = aspect
		this.camera.updateProjectionMatrix()
	}

	setCubeRotation(axis, value) {
		this.cube.rotation[axis] = value
	}
}