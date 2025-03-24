/*
 * Shows boiler temperature
 *
 * Must be linked to the Train.boiler object!
 */

const Thermometer = require('dna/hud/gadget/Thermometer')

class BoilerThermometer extends Thermometer {

    constructor(st) {
        super( augment({
            name: 'boilerThermometer',

            minTemp:    0,
            maxTemp:    250,
        }, st) )
    }

    takeMeasure() {
        if (env.gameStarted && lab.port.train && !lab.port.train.dead && lab.port.train.boiler) {
            return clamp(lab.port.train.boiler.temp, this.minTemp, this.maxTemp)
        }
        return this.minTemp
    }

}
