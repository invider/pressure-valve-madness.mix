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
            maxPps: 1.2,
            // pressure to push
            ptp: 1,
            // current speed
            speed: 0,
            speedPressureKoef: 5,
            // 
            friction: 0.05
        }, st) 
        this.consumed = 0

    }

    evo(dt) {
        //res.mp3.steam_single.play();
        const pressure = Math.min(this.__.boiler.pressure, this.maxPps * dt);
        this.__.boiler.pressure -= pressure;
        this.consumed += pressure;
        if (this.consumed >= this.ptp) {
            this.speed += this.consumed * this.speedPressureKoef;
            this.consumed -= this.ptp;
            // res.mp3.steam_single.play();
            lib.sfx('steam-cycle')
        }

        if (this.speed > 0) {
            this.speed -= this.speed * this.friction * dt;
        }

        // res.mp3.steam_single.play();
        //this.speed += pressure * this.speedPressureKoef

        lab.overlay.info.set('speed', lib.math.round2(this.speed))
    }
}
