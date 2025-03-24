const DustyButton = require('dna/hud/gadget/DustyButton')

class RefuelLever extends DustyButton {

    constructor(st) {
        super( augment({
            name: 'refuelLever',
            label: 'Refuel',
            sfx:   'lever',
        }, st) )
    }

    evo(dt) {
        super.evo(dt)

        const tank = lab.port.train.fuelTank;
        switch(tank.selected) {
            case 'wood': this.label = '+Wood'; break;
            case 'peat': this.label = '+Peat'; break;
            case 'coal': this.label = '+Coal'; break;
            default: this.label = 'No Fuel';
        }
    }

    onClick() {
        const tank = lab.port.train.fuelTank;
        lab.port.train.burner.add(tank.selected, tank.takeFuel(5));
    }

}
