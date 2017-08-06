export const webGlSupport = function() { 
    try {
        let canvas = document.createElement('canvas')
        return  !! window.WebGLRenderingContext && ( 
                    canvas.getContext('webgl') 
                    || canvas.getContext('experimental-webgl') 
                )
    }
    catch(e) { return false } 
}

export const isTouchDevice = function() {
    return 'ontouchstart' in window || navigator.maxTouchPoints
}