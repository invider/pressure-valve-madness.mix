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
            if (env.debug && env.debugCoords) {

                const mx = mouse.x,
                      my = mouse.y,
                      wx = round(lab.port.lx(mouse.x)),
                      wy = round(lab.port.ly(mouse.y))

                const widget = lab.hud.pick( mx, my, ls )
                const sc = ls.filter(e => e._scaled)[0]

                if (sc) {
                    const sx = round(sc.lx(mx)),
                          sy = round(sc.ly(my))
                    env.status = `Screen::${mx}:${my} => Panel::${sx}:${sy}`
                } else {
                    env.status = `Screen::${mx}:${my} => World::${wx}:${wy}`
                }
            } else {
                env.status = ''
            }
        }

    } else {
        env.status = ''
    }
}
