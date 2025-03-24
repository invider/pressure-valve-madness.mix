class Boiler {
    constructor(st) {
        augment(this, {
            name: 'boiler',
            x:    0,
            y:    0,
            w:    0,
            h:    0,
            temp:     0,
            pressure: 0,
            waterAmount: 0,
            maxWaterAmount: 100,
            energyPerSecond: 100,
            minTemp: 10,
            boilingPoint: 101.3,
            efficiency: 0.9,
            waterBoilingCoef: 1,
            // the factor, affects on the boiling temperature, depending on pressure, bigger means bigger affection
            pressureBoilingFactor: 8,
            pressureCoef: 1,
            maxPressure: 10,
            letOffPerSecond: 1,
            valveOpened: false,
            exploded: false,
        }, st) 
    }

    drainWater(dt) {
        if (this.waterAmount < this.maxWaterAmount) {
            const amount = Math.min(this.__.waterTank.amount, this.maxWaterAmount - this.waterAmount);
            this.__.waterTank.amount -= amount;
            this.waterAmount += amount;
        }
    }

    boilWater(dt) {
        if (this.temp > this.boilingPoint) {

            const boilingPoint = this.boilingPoint + this.pressure * this.pressureBoilingFactor;
            const overheat = (this.temp - boilingPoint);
            const amount = overheat * this.waterBoilingCoef * dt;
            this.waterAmount -= amount;
            this.pressure += this.pressureCoef * amount;
            this.temp -= overheat;
        }
    }

    drainEnergy(dt) {
        const energy = this.__.burner.energy * this.energyPerSecond * dt;
        this.__.burner.energy -= energy;
        if (this.__.burner.energy < 0) {
            this.__.burner.energy = 0;
        }
        return energy;
    }

    openLetOffValve(){
        this.valveOpened = true;
    }

    closeLetOffValve(){
        this.valveOpened = false;
    }

    blowUp(){
        // called once the boiler reached the maximum pressure and explodes
        console.log('BOILER EXPLODED')
        this.exploded = true;
        this.pressure = 0;

        let delay = 0
        const boiler = this,
              spreadX = 60,
              spreadY = 25,
              sx =  25,
              sy = -15
        defer(() => lib.vfx.explosionAt(boiler.x + sx, boiler.y + sy, 2), delay)
        for (let i = 0; i < 3; i++) {
            delay += .4
            defer(() => lib.vfx. explosionAt(
                    boiler.x + sx + spreadX*rnd() - .5*spreadX,
                    boiler.y + sy + spreadY*rnd() - .5*spreadY,
                    .5 + 1 * rnd()),
                delay
            )
        }
    }
    evo(dt) {
        if (this.exploded){
            return;
        }

        this.drainWater(dt);

        const energy = this.drainEnergy(dt);
        const delta = energy / this.waterAmount;
        this.temp += delta;
        this.temp -= this.temp * dt * this.efficiency;

        if (this.temp < this.minTemp) {
            this.temp = this.minTemp;
        }

        this.boilWater(dt);
        if (this.pressure > this.maxPressure && !this.exploded) {
            this.blowUp()
        }

        if (this.valveOpened){
            this.pressure -= this.letOffPerSecond * dt;
            // TODO: add sound of the running out steam
        }

        lab.overlay.info.set('boilerEnergy', lib.math.round2(energy))
        lab.overlay.info.set('temp', lib.math.round2(this.temp))
        lab.overlay.info.set('pressure', lib.math.round2(this.pressure))
        lab.overlay.info.set('boilerWater', lib.math.round2(this.waterAmount))
    }
}
