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
        // TODO refueling
        lab.port.train.burner.add('coal', {
            amount: 5,
            capacity: 100000,
            cps: 0.3            
        })
    }

}
