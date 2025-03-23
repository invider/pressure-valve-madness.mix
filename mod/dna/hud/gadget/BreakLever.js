const DustyButton = require('dna/hud/gadget/DustyButton')

class BreakLever extends DustyButton {

    constructor(st) {
        super( augment({
            name:    'breakLever',
            label:   'Break',
            sfx:     'clank',
            sfxOver: 'click',
        }, st) )
    }

    onMouseDown() {
        super.onMouseDown()
        log('break!!!')
        lab.port.train.breaks.hit();
    }

    onMouseUp() {
        super.onMouseUp()
        log('break release!!!')
        lab.port.train.breaks.release();
    }

}
