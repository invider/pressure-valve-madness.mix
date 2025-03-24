let id = 0

const Wheel = require('dna/dust/Wheel')

class BigWheel extends Wheel {

    constructor(st) {
        super( augment({
            w:     25,
            h:     24,
            img:   res.train.locoBigWheel,
            wheelTurnRate: 0.05,
        }, st) )
    }
}
