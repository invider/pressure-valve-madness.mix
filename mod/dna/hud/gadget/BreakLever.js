const DustyButton = require('dna/hud/gadget/DustyButton')

class BreakLever extends DustyButton {

    constructor(st) {
        super( augment({
            name: 'breakLever',
            label: 'Break',
        }, st) )
    }

    onClick() {
        log('break!!!')
        // TODO break the train
    }

}
