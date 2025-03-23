const DustyButton = require('dna/hud/gadget/DustyButton')

class RefuelLever extends DustyButton {

    constructor(st) {
        super( augment({
            name: 'refuelLever',
            label: 'Refuel',
            sfx:   'lever',
        }, st) )
    }

    onClick() {
        log('refueling...')

        const tank = lab.port.train.fuelTank;
        lab.port.train.burner.add(tank.selected, tank.takeFuel(5));
    }

}
