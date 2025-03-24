const DustyButton = require('dna/hud/gadget/DustyButton')

class FuelSwitch extends DustyButton {

    constructor(st) {
        super( augment({
            name: 'fuelSwitch',
            label: 'Switch',
            sfx:   'lever-close',
        }, st) )
    }

    onClick() {
        const tank = lab.port.train.fuelTank;
        const selected = tank.selectNext();
    }

}
