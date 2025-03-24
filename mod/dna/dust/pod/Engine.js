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
            targetSpeed: 0,
            speedPressureKoef: 5,
            speedGrowthPs: 20,
            // 
            friction: 0.05
        }, st) 
        this.consumed = 0

    }

    setSpeed(speed) {
        this.targetSpeed = speed;
        if (this.targetSpeed < 0) {
            this.targetSpeed = 0;
        }
    }

    evo(dt) {
        //res.mp3.steam_single.play();
        const pressure = Math.min(this.__.boiler.pressure, this.maxPps * dt);
        this.__.boiler.pressure -= pressure;
        this.consumed += pressure;
        if (this.consumed >= this.ptp) {
            this.targetSpeed += this.consumed * this.speedPressureKoef;
            this.consumed -= this.ptp;
            // res.mp3.steam_single.play();
        }

        if (this.targetSpeed > 0) {
            this.targetSpeed -= this.targetSpeed * this.friction * dt;
        }
        const speedDiff = this.targetSpeed - this.speed;
        if (speedDiff != 0) {
            const speedSign = Math.abs(speedDiff) / speedDiff;
            this.speed += speedSign * this.speedGrowthPs * dt
        }
        // res.mp3.steam_single.play();
        //this.targetSpeed += pressure * this.targetSpeedPressureKoef

        lab.overlay.info.set('speed', lib.math.round2(this.targetSpeed))
    }
}
