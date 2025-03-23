class DesertCamera extends dna.SlideCamera {

    constructor(st) {
        super( augment({
            pan: true,
        }, st) )
    }

    panIn(dt) {
        const viewport = this.viewport()

        const targetScale = ctx.width / env.style.dimension.camera.targetW

        if (this.scale < targetScale) {
            this.scale += this.zoomSpeed * dt
            if (this.scale > targetScale) this.scale = targetScale
        } else if (this.scale > targetScale) {
            this.scale -= this.zoomSpeed * dt
            if (this.scale < targetScale) this.scale = targetScale
        }
    }

    evo(dt) {
        super.evo(dt)
        if (this.pan) this.panIn(dt)
    }
}
