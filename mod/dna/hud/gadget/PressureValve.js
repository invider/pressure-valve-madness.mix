const DustyButton = require('dna/hud/gadget/DustyButton')

class PressureValve extends DustyButton {

    constructor(st) {
        super( augment({
            name:    'pressureValve',
            label:   'Valve',
            sfx:     'clank',
            sfxOver: 'click',
        }, st) )
    }

    onMouseDown() {
        super.onMouseDown()
        log('releasing pressure...')
        lab.port.train.boiler.openLetOffValve();
    }

    onMouseUp() {
        super.onMouseUp()
        lab.port.train.boiler.closeLetOffValve();
    }

}
