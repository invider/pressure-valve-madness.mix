/**
 * Consumes the pressure
 */
class Engine {
    constructor(st) {
        augment(this, {
            name: 'engine',
            x:    0,
            y:    0,
            w:    0,
            h:    0,
            // max pressure per second
            maxPps: 1000,
            // current speed
            speed: 0,
            speedPressureKoef: 1
        }, st) 
    }

    evo(dt) {
        
        const pressure = Math.min(this.__.boiler.pressure, this.maxPps * dt);
        this.__.boiler.pressure -= pressure;
        this.speed += pressure * this.speedPressureKoef

        lab.overlay.info.set('speed', this.speed)
    }
}