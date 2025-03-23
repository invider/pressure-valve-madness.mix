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
                    capacity: 10,
                    // how much fuel of this type is burned per second
                    cps: 0.3
                }
            }
        }, st) 
        this._energy = 0;
    }


    _burnFuel(dt, fuel) {
        const toBurn = fuel.cps * dt;
        const currentTickAmount = Math.min(fuel.amount, toBurn);
        this._energy += currentTickAmount * fuel.capacity;
        fuel.amount -= currentTickAmount;
        return fuel.amount <= 0;
    }

    evo(dt) {
        const toDelete = [];
        for (const f in this.fuel) {
            if (this._burnFuel(dt, this.fuel[f])){
                toDelete.push(f);
            }
        }
        for (const f of toDelete) {
            delete this.fuel[f];
        }
    }
}