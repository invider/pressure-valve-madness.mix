const DustyButton = require('dna/hud/gadget/DustyButton')

class PressureValve extends DustyButton {

    constructor(st) {
        super( augment({
            name: 'pressureValve',
            label: 'Valve',
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
