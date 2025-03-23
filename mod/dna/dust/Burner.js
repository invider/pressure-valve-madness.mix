class Burner {
    constructor(st) {
        augment(this, {
            name: 'burner',
            x:    0,
            y:    0,
            w:    0,
            h:    0,
            efficiency: 0.2,
            fuel:     {
                "coal": {
                    amount: 10,
                    // energy capacity
                    capacity: 100000,
                    // how much fuel of this type is burned per second
                    cps: 0.3
                }
            }
        }, st) 
        this.energy = 0;
    }


    _burnFuel(dt, fuel) {
        const toBurn = fuel.cps * dt;
        const currentTickAmount = Math.min(fuel.amount, toBurn);
        this.energy += currentTickAmount * fuel.capacity;
        fuel.amount -= currentTickAmount;
        return fuel.amount <= 0;
    }

    evo(dt) {
        const toDelete = [];
        for (const f in this.fuel) {
            lab.overlay.info.set('f:' + f, this.fuel[f].amount)
            if (this._burnFuel(dt, this.fuel[f])){
                toDelete.push(f);
            }
            
        }
        for (const f of toDelete) {
            delete this.fuel[f];
        }
        lab.overlay.info.set('energy', this.energy)
    }
}