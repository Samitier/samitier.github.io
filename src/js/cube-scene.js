import {
	BoxGeometry, Mesh, MeshBasicMaterial,
	Scene, PerspectiveCamera, Vector2
} from "three"

export default class CubeScene {

	constructor(map) {
		this.scene = new Scene()
		this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5)
		this.camera.position.z = 1.4
        this.textureWidth =  map.image.width
        this.textureHeight =  map.image.height
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

	setCubeUVs(pageName, site) {
		let page = site.pages[pageName],
            facePerWidth = this.textureWidth / site.faceSize,
            faceWidthRatio = 1 / facePerWidth,
            facePerHeight = this.textureHeight / site.faceSize,
            faceHeightRatio = 1 / facePerHeight,
            vertexUvs = [ 4, 0, 6, 2, 8 ]
        for (let i = 0; i <= page.navigation.length; ++i) {
            let hPosition = i < page.navigation.length 
                            ? site.pages[page.navigation[i] || "home"].position : page.position
            let vPosition = Math.floor(hPosition / facePerWidth)
            hPosition %= facePerWidth
            let topx = hPosition * faceWidthRatio,
                bottomx = (hPosition + 1) * faceWidthRatio,
                topy = 1 - vPosition * faceHeightRatio, 
                bottomy = 1 - ((vPosition + 1) * faceHeightRatio),
                uvs = [
                    new Vector2(topx, bottomy),
                    new Vector2(bottomx, bottomy),
                    new Vector2(bottomx, topy),
                    new Vector2(topx, topy),
                ]
            this.cube.geometry.faceVertexUvs[0][vertexUvs[i]] = [uvs[3], uvs[0], uvs[2]]
            this.cube.geometry.faceVertexUvs[0][vertexUvs[i] + 1] = [uvs[0], uvs[1], uvs[2]]
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