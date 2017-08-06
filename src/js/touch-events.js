const ROTATION_PER_PIXEL = 0.01

export default class TouchEvents {

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
        renderer.domElement.addEventListener('touchstart', this.onTouchStart.bind(this))
        renderer.domElement.addEventListener('touchmove', this.onTouchMove.bind(this))
        renderer.domElement.addEventListener('touchend', this.onTouchEnd.bind(this))
	}

    /**
     * When moving the mouse, we have to calculate which axis the client is rotating 
     * (if they are pressing the mouse), and calculate the amount of rotation they are applying
     */
	onTouchMove(event) {
        if (this.rotationAxis == "none") {
            if (event.touches[0].clientX != this.mouse.x && event.touches[0].clientY == this.mouse.y) {
                this.rotationAxis = "y"
            }
            else if (event.touches[0].clientX == this.mouse.x && event.touches[0].clientY != this.mouse.y) {
                this.rotationAxis = "x"
            }
        }
        else if (this.rotationAxis == "x") {
            this.rotation.x += (event.touches[0].clientY - this.mouse.y) * ROTATION_PER_PIXEL
        }
        else if (this.rotationAxis == "y") {
            this.rotation.y += (event.touches[0].clientX - this.mouse.x) * ROTATION_PER_PIXEL
        }
        this.mouse.x = event.touches[0].clientX
        this.mouse.y = event.touches[0].clientY
        document.body.style.cursor = "auto"
	}

    /**
     * If the client is pressing the mouse, we start calculating the amount of rotation 
     * they will do on mouse move
     */
	onTouchStart(event) {
		if (this.rotation.x == 0 && this.rotation.y == 0) this.rotationAxis = "none"
		this.mouse.x = event.touches[0].clientX
		this.mouse.y = event.touches[0].clientY
		this.isMouseDown = true
	}

	onTouchEnd() {
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