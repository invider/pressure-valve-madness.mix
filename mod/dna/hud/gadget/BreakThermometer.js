/*
 * Shows boiler temperature
 *
 * Must be linked to the Train.boiler object!
 */

const Thermometer = require('dna/hud/gadget/Thermometer')

class BreakThermometer extends Thermometer {

    constructor(st) {
        super( augment({
            name: 'breakThermometer',

            minTemp:    0,
            maxTemp:    120,
        }, st) )
    }

    takeMeasure() {
        if (env.gameStarted && lab.port.train && !lab.port.train.dead && lab.port.train.breaks) {
            return clamp(lab.port.train.breaks.temp, this.minTemp, this.maxTemp)
        }
        return this.minTemp
    }

}
