class Boiler {
    constructor(st) {
        augment(this, {
            name: 'boiler',
            x:    0,
            y:    0,
            w:    0,
            h:    0,
            temp:     0,
            pressure: 0,
            efficiency: 0.2,
        }, st) 
        this._heatIntegral = 0;
    }

    evo(dt) {
        
    }
}