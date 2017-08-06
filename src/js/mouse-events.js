const ROTATION_PER_PIXEL = 0.005

export default class MouseEvents {

    /**
     *  Initializes all the events for the renderer 
     */
	constructor(renderer) {
		// Movement control
		this.rotation = { x: 0, y: 0 }
		this.mouse = { x: 0, y: 0 }
		this.isMouseDown = false
		this.rotationAxis = "none"

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
			document.body.style.cursor = "auto"
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
	}

	onMouseUp() {
		this.isMouseDown = false
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
}