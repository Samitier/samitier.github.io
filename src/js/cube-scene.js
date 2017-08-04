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

	setCubeUVs(page, site) {
		let facesPerWidth = site.texture.image.width / site.faceSize

		// Top
		let topPosition = site.pages[page.navigation[0]].position
		this.cube.geometry.faceVertexUvs[0][4] = [uv[page.top][3], uv[page.top][0], uv[page.top][2]];
		this.cube.geometry.faceVertexUvs[0][5] = [uv[page.top][0], uv[page.top][1], uv[page.top][2]];
		
		// Right
		this.cube.geometry.faceVertexUvs[0][0] = [uv[page.right][3], uv[page.right][0], uv[page.right][2]];
		this.cube.geometry.faceVertexUvs[0][1] = [uv[page.right][3], uv[page.right][0], uv[page.right][2]];

		var uv     = { main : [new Vector2(0, .75), new Vector2(.125, .75), new Vector2(.125, 1),new Vector2(0, 1)],

cube.geometry.faceVertexUvs[0][0] = [uv[page.right][3], uv[page.right][0], uv[page.right][2]];
	cube.geometry.faceVertexUvs[0][1] = [uv[page.right][0], uv[page.right][1], uv[page.right][2]];
	cube.geometry.faceVertexUvs[0][2] = [uv[page.left][3], uv[page.left][0], uv[page.left][2]];
	cube.geometry.faceVertexUvs[0][3] = [uv[page.left][0], uv[page.left][1], uv[page.left][2]];
	cube.geometry.faceVertexUvs[0][6] = [uv[page.bottom][3], uv[page.bottom][0], uv[page.bottom][2]];
	cube.geometry.faceVertexUvs[0][7] = [uv[page.bottom][0], uv[page.bottom][1], uv[page.bottom][2]];
	cube.geometry.faceVertexUvs[0][8] = [uv[page.front][3], uv[page.front][0], uv[page.front][2]];
	cube.geometry.faceVertexUvs[0][9] = [uv[page.front][0], uv[page.front][1], uv[page.front][2]];

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