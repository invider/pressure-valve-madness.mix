class Boiler {
    constructor(st) {
        augment(this, {
            name: 'boiler',
            x:    15,
            y:    4,
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
            criticalPressure: 10,
            maxPressure: 12,
            letOffPerSecond: 1,
            valveOpened: false,
            exploded: false,

            PUFF_THRESHOLD: .5,
            _lastSteam: 0,
            _lastHorn:  0,
            _lastBlowCheck: 0
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
        if (this.pressure > this.PUFF_THRESHOLD && (env.time - this._lastHorn > 5)) {
            this._lastHorn = env.time
            lib.sfx('horn')
        }
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
              train  = this.__,
              spreadX = 80,
              spreadY = 20,
              bx      = train.x + boiler.x + 0,
              by      = train.y + boiler.y + 0 - 10
        defer(() => lib.vfx.explosionAt(bx, by, 1), delay)
        for (let i = 0; i < 6; i++) {
            delay += .4
            defer(()=> lib.vfx.explosionAt(
                    bx + spreadX*rnd() - .5*spreadX,
                    by + spreadY*rnd() - .5*spreadY,
                    .5 + .5 * rnd()),
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
        if (this.pressure > this.criticalPressure) {
            const criticalSection = this.maxPressure - this.criticalPressure;
            const blowPossibilityGate = (this.pressure - this.criticalPressure) / criticalSection;
            if ( rnd() < blowPossibilityGate * dt) {
                this.blowUp();
            }
        }
        if (this.pressure > this.maxPressure && !this.exploded) {
            this.blowUp()
        }

        if (this.valveOpened){
            if (this.pressure > this.PUFF_THRESHOLD) {
                this.__.puff(1, true)
                if (env.time - this._lastSteam > 1) {
                    this._lastSteam = env.time
                    lib.sfx('steam')
                }
            }
            this.pressure = max(this.pressure - this.letOffPerSecond * dt, 0)
            // TODO: add sound of the running out steam
        }

        lab.overlay.info.set('boilerEnergy', lib.math.round2(energy))
        lab.overlay.info.set('temp', lib.math.round2(this.temp))
        lab.overlay.info.set('pressure', lib.math.round2(this.pressure))
        lab.overlay.info.set('boilerWater', lib.math.round2(this.waterAmount))
    }
}
