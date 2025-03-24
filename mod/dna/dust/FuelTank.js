class FuelTank {
    constructor(st) {
        augment(this, {
            name: 'fuelTank',
            x:    0,
            y:    0,
            w:    0,
            h:    0,
            selected: "coal",
            amount: 1000,
            fuel:{
                coal: {
                        amount: 10,
                        // energy capacity
                        capacity: 100000,
                        // how much fuel of this type is burned per second
                        cps: 0.03
                    },
                wood: {
                    amount: 50,
                    // energy capacity
                    capacity: 50000,
                    // how much fuel of this type is burned per second
                    cps: 0.03
                },
                peat: {
                    amount: 50,
                    // energy capacity
                    capacity: 200000,
                    // how much fuel of this type is burned per second
                    cps: 0.03
                }
            }
        }, st) 
    }

    takeFuel(amount){
        const fuel = this.fuel[this.selected];
        const heap = {
            amount: Math.min(fuel.amount, amount),
            capacity: fuel.capacity,
            cps: fuel.cps
        };
        fuel.amount -= heap.amount;
        return heap;
    }
    
    _getAsArray(){
        let fuels = [];
        for (const k in this.fuel) {
            fuels.push(k)    
        }
        return fuels;
    }

    selectNext(){
        const fuelArr = this._getAsArray().filter(o => this.fuel[o].amount > 0);
        const idx = fuelArr.indexOf(this.selected);
        if (idx == -1 || idx == fuelArr.length - 1){
            this.selected = fuelArr[0];
            return
        }
        this.selected = fuelArr[idx + 1];
        return this.selected
    }

    evo(dt) {
        lab.overlay.info.set('selected fuel', this.selected)
    }
}
