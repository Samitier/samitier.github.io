import {
	BoxGeometry, Mesh, MeshBasicMaterial,
	Scene, PerspectiveCamera, Vector2
} from "three"

import { MAIN_PAGE } from "./constants.js"

export default class CubeScene {

    /**
     * Initializes the cube scene, and creates a cube with the texture <<map>>
     */
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

    /**
     * Sets the face textures for the page << pageName >> and all its navigations.
     * @param {string} pageName 
     * @param {object} site 
     */
	setCubeUVs(pageName, site) {
		let page = site.pages[pageName],
            facePerWidth = this.textureWidth / site.faceSize,
            faceWidthRatio = 1 / facePerWidth,
            facePerHeight = this.textureHeight / site.faceSize,
            faceHeightRatio = 1 / facePerHeight,
            // This sets the order we want to update the <<faceVertexUvs>> array 
            // (top face, right face, bottom face, left face & front face)
            vertexUvs = [ 4, 0, 6, 2, 8 ] 

        // This will set the vertex uvs for each face of the cube, for the pages defined in the navigation
        // array in pages.json
        for (let i = 0; i <= page.navigation.length; ++i) {
            let hPosition = i < page.navigation.length 
                            ? site.pages[ page.navigation[i] || MAIN_PAGE ].position : page.position
            // vertical position of the face image in the faces texture
            let vPosition = Math.floor(hPosition / facePerWidth)
            // horizontal position of the face image in the faces texture
            hPosition %= facePerWidth
            // calculating texture uvs for this piece of the texture
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
            // setting texture uvs on the correct face of the cube
            this.cube.geometry.faceVertexUvs[0][vertexUvs[i]] = [uvs[3], uvs[0], uvs[2]]
            this.cube.geometry.faceVertexUvs[0][vertexUvs[i] + 1] = [uvs[0], uvs[1], uvs[2]]
        }
        // Back faces of the cube, we don't care about them
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