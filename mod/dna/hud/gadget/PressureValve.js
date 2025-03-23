const DustyButton = require('dna/hud/gadget/DustyButton')

class PressureValve extends DustyButton {

    constructor(st) {
        super( augment({
            name: 'pressureValve',
            label: 'Valve',
        }, st) )
    }

    onClick() {
        log('releasing pressure...')
        // TODO release pressure
    }

}
