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
            waterAmount: 100,
            maxWaterAmount: 100,
            energyPerSecond: 100,
            minTemp: 10,
            boilingPoint: 115.4,
            efficiency: 0.2,
            waterBoilingCoef: 1,
            pressureCoef: 1
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
            const overheat = this.temp - this.boilingPoint;
            const amount = overheat * this.waterBoilingCoef * dt;
            this.waterAmount -= amount;
            this.pressure += this.pressureCoef * amount;
            this.temp -= overheat;
        }
    }

    drainEnergy(dt) {
        const energy = lab.port.burner.energy * this.energyPerSecond * dt;
        lab.port.burner.energy -= energy;
        // if (lab.port.burner.energy < 0) {
        //     lab.port.burner.energy = 0;
        // }
        return energy;
    }
    evo(dt) {
        this.drainWater(dt);

        const energy = this.drainEnergy(dt);
        const delta = energy / this.waterAmount;
        this.temp += delta;
        this.temp -= this.temp * dt * this.efficiency;

        if (this.temp < this.minTemp) {
            this.temp = this.minTemp;
        }

        this.boilWater(dt);
        lab.overlay.info.set('boilerEnergy', lib.math.round2(energy))
        lab.overlay.info.set('temp', lib.math.round2(this.temp))
        lab.overlay.info.set('pressure', lib.math.round2(this.pressure))
        lab.overlay.info.set('boilerWater', lib.math.round2(this.waterAmount))
    }
}