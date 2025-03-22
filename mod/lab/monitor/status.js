function evo(dt) {
    if (!mouse.out) {
        const ls = []

        const last = lab.port.pick( mouse.x, mouse.y, ls )
        if (last) {
            if (isFun(last.getStatus)) {
                env.status = last.getStatus()
            } else if (last.status) {
                env.status = last.status
            } else if (last.name) {
                env.status = last.name
            } else {
                env.status = ''
            }
        } else {
            if (env.debug) {
                const wx = round(lab.port.lx(mouse.x)),
                      wy = round(lab.port.ly(mouse.y))
                env.status = `${wx}:${wy}`
            }
        }

    } else {
        env.status = ''
    }
}
