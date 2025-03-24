// play a configured sound
//
// Sound effects are configured in /env/sfx
//
module.exports = function(name, vol, pan) {
    if (!env.opt.sfx) return

    vol = vol || 1
    vol *= env.opt.sfxVolume

    const container = res.sfx
    let clip = container[name]
    let config = env.sfx[name]

    if (!config) {
        config = env.sfx['default']
        log.warn(`missing config for sfx [${name}], using default`)
    } else {
        if (config.res) clip = container[config.res]
    }

    if (config.vol) vol *= config.vol
    if (!clip) {
        log.warn(`missing the sound for [${name}] in /res/sfx/`)
        lib.sfx('missing')
        return
    }
    log(`plaing [${name}]`)
    sfx(clip, vol, pan)
}
