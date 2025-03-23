const DustyButton = require('dna/hud/gadget/DustyButton')

class RefuelLever extends DustyButton {

    constructor(st) {
        super( augment({
            name: 'refuelLever',
            label: 'Refuel',
        }, st) )
    }

    onClick() {
        log('refueling...')
        // TODO refueling
    }

}
