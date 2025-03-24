/*
 * Shows boiler water level
 *
 * Based on a thermometer, but shows the water level instead
 */

const Thermometer = require('dna/hud/gadget/Thermometer')

class WaterLevelMeter extends Thermometer {

    constructor(st) {
        super( augment({
            name: 'waterLevelMeter',

            minTemp:    0,
            maxTemp:    100,

            passive:    '#a0b9ba',
            active:     '#4f5277',
            background: env.style.color.hud.button,
        }, st) )
    }

    takeMeasure() {
        if (env.gameStarted && lab.port.train && !lab.port.train.dead && lab.port.train.boiler) {
            return clamp(lab.port.train.boiler.waterAmount, this.minTemp, this.maxTemp)
        }
        return this.minTemp
    }

}
