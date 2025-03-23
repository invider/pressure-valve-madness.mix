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
            energyPerSecond: 1,
            efficiency: 0.2,
        }, st) 
    }

    evo(dt) {
        const energy = lab.port.burner.energy * this.energyPerSecond * dt;
        lab.port.burner.energy -= energy;
        if (lab.port.burner.energy <= 1) {
            lab.port.burner.energy = 0;
        }
        const effectiveEnergy = energy * this.efficiency;
        const delta = effectiveEnergy / (this.waterAmount * this.energyPerSecond);
        this.temp += delta;
        lab.overlay.info.set('temp', this.temp)
    }
}