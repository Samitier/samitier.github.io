import { Raycaster, Vector3 } from "three"

import { MAIN_PAGE } from "./constants"
import site from "../../assets/site.json"

const ROTATION_PER_PIXEL = 0.005

export default class MouseEvents {

    /**
     *  Initializes all the events for the renderer 
     */
	constructor(renderer, scene) {
		// Movement control
		this.rotation = { x: 0, y: 0 }
		this.mouse = { x: 0, y: 0 }
		this.isMouseDown = false
		this.rotationAxis = "none"

        // Cube button logic
        this.currentPage = MAIN_PAGE
        this.buttonPressing = null
        this.scene = scene

		// Event registration
		renderer.domElement.addEventListener('mousemove', this.onMouseMove.bind(this))
		renderer.domElement.addEventListener('mousedown', this.onMouseDown.bind(this))
        renderer.domElement.addEventListener('mouseup', this.onMouseUp.bind(this))
	}

    /**
     * When moving the mouse, we have to calculate which axis the client is rotating 
     * (if they are pressing the mouse), and calculate the amount of rotation they are applying
     */
	onMouseMove(event) {
		if (this.isMouseDown) {
			if (this.rotationAxis == "none") {
				if (event.clientX != this.mouse.x && event.clientY == this.mouse.y) {
					this.rotationAxis = "y"
				}
				else if (event.clientX == this.mouse.x && event.clientY != this.mouse.y) {
					this.rotationAxis = "x"
				}
			}
			else if (this.rotationAxis == "x") {
				this.rotation.x += (event.clientY - this.mouse.y) * ROTATION_PER_PIXEL
			}
			else if (this.rotationAxis == "y") {
				this.rotation.y += (event.clientX - this.mouse.x) * ROTATION_PER_PIXEL
			}
			this.mouse.x = event.clientX
			this.mouse.y = event.clientY
		}
	}

    /**
     * If the client is pressing the mouse, we start calculating the amount of rotation 
     * they will do on mouse move
     */
	onMouseDown(event) {
		if (this.rotation.x == 0 && this.rotation.y == 0) this.rotationAxis = "none"
		this.mouse.x = event.clientX
		this.mouse.y = event.clientY
        this.isMouseDown = true
        
        // If the page has buttons, we create a raycast from the mouse to the scene to see if we intersect
        // with the coordinates defined in the page button
        if (site.pages[this.currentPage].buttons) {
            let normals = { 
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: - (event.clientY / window.innerHeight) * 2 + 1
            }
            let camera = this.scene.getCamera(),
                vector = new Vector3(normals.x, normals.y, 0.5).unproject(camera),
                raycaster = new Raycaster(camera.position, vector.sub(camera.position).normalize()),
                intersects = raycaster.intersectObjects(this.scene.getScene().children)

            if (intersects[0]) {
                for (let button of site.pages[this.currentPage].buttons) {
                    if (
                        intersects[0].point.x > button.x && intersects[0].point.x < button.x + button.width 
                        && intersects[0].point.y < button.y && intersects[0].point.y > button.y - button.height
                    ) {
                        this.buttonPressing = button
                        break
                    }
                }
            }
        }
	}

	onMouseUp() {
        this.isMouseDown = false
        // If we clicked on a button, we open its link on release
        if (this.buttonPressing) {
            window.open(this.buttonPressing.link)
            this.buttonPressing = null
        }
	}

	getRotationAxis() {
		return this.rotationAxis
	}

	getIsMouseDown() {
		return this.isMouseDown
	}

	getRotation() {
		return this.rotation
	}

	setRotation(rotation) {
		this.rotation = rotation
    }
    
    setCurrentPage (page) {
        this.currentPage = page
    }
}