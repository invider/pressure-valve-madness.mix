class Breaks {
    constructor(st) {
        augment(this, {
            name: 'breaks',
            x:    0,
            y:    0,
            w:    0,
            h:    0,
            temp: 0,
            breakingPowerPerSecond: 10,
            heatingPerSecond: 10,
            coolingPerSecond: 1,
            minTemp: 10,
            maxTemp: 100,
            breaking: false,
            melted: false
        }, st) 
    }


    hit(){
        this.breaking = true;
    }

    release(){
        this.breaking = false;
    }

    // called if the breaking system was melted
    melt(){
        this.melted = true;
    }

    evo(dt) {
        if (this.breaking && !this.melted){
            this.temp += this.heatingPerSecond * dt;
            this.__.engine.setSpeed(this.__.engine.speed - this.breakingPowerPerSecond * dt);
        }

        if (this.temp > this.maxTemp){
            this.melt();
            this.temp = this.maxTemp;
        }

        if (this.temp > this.minTemp){
            this.temp -= this.coolingPerSecond * dt;
        }

        if (this.temp < this.minTemp){
            this.temp = this.minTemp;
        }

        lab.overlay.info.set('breaks temp', lib.math.round2(this.temp))
    }
}