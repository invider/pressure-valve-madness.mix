const df = {
    debug: false,
    team:  0,
    x:     0,
    y:     0,
    dir:   0,
}

let eid = 0

// Represents any modular entity on the screen
class Entity {

    constructor(st) {
        extend(this, df, st)
        this.defineSpec()

        this._ls = []
        this._dir = {}
        this.pods = this._ls
        this.solids = []

        // autoname in needed
        this._eid = ++eid
        if (!st.id) this.id = this._eid              // guarantee id
        if (!st.name) this.name = 'entity' + this.id // guarantee name

        if (this.install) {
            for (let pod of this.install) {
                this.attach(pod)
            }
        }
    }

    // locate and assign the spec for this model
    defineSpec() {
        if (!this.model) return
        this.spec = dna.spec.locate( this.model )

        if (this.spec) {
            /*
            if (this.spec.type) this.type = this.spec.type
            if (this.spec.hull) this.hull = this.spec.hull

            if (this.spec.cost) {
                if (isNumber(this.spec.cost)) {
                    this.cost = this.spec.cost
                } else {
                    this.spec.cost = this.spec.cost.trim().toUpperCase()
                    this.cost = parseFloat(this.spec.cost)
                    const magnitude = this.spec.cost.charAt(this.spec.cost.length - 1)
                    switch(magnitude) {
                        case 'K': this.cost *= 1000;       break;
                        case 'M': this.cost *= 1000000;    break;
                        case 'B': this.cost *= 1000000000; break;
                    }
                }
            }
            */
        } else {
            if (env.debug) log.warn(`Can't find a spec for [${this.model}]`)
            this.spec = {}
        }
    }

    resurect(st) {
        extend(this, st)
        if (!st.name) this.name = 'entity' + id
        this.dead = false
    }

    // attach the pod
    attach(pod) {
        const name = pod.alias || pod.name
        if (!pod.alias) pod.alias = name

        if (name) {
            // remove pod if present
            if (this._dir[name]) {
                this.detachByName(name)
            }
            this._dir[name] = pod
            this[name] = pod
        }
        this.pods.push(pod)
        this.pods.sort(lib.util.compareZ)

        if (pod.solid) {
            this.solid = true
            this.solids.push(pod)
        }

        pod.__ = this
        pod.unit = this
        if (pod.onAttach) pod.onAttach()
        return pod
    }

    // select pod by name
    select(name) {
        return this._dir[name]
    }

    // detach provided pod
    detach(pod) {
        if (!pod) return
        const i = this.pods.indexOf(pod)
        if (i >= 0) {
            this.pods.splice(i, 1)

            if (pod.alias && this._dir[pod.alias]) {
                // alias is always preassigned to the pod on attach
                delete this[pod.alias]
                delete this._dir[pod.alias]
            }
            if (pod.onDetach) pod.onDetach()
            pod.__ = null
            pod.unit = null
            return true
        }
        return false
    }

    // detach the pod by name
    detachByName(name) {
        const pod = this.select(name)
        if (pod) this.detach(pod)
    }

    // doesn't work for rotational node - use lxy() instead 
    lx(gx) {
        throw 'wrong function - use lxy()'
    }

    // doesn't work for rotational node - use lxy() instead 
    ly(gy) {
        throw 'wrong function - use lxy()'
    }

    lxy(gx, gy) {
        const lx = gx - this.x
        const ly = gy - this.y
        return [
            lx * cos(-this.dir) - ly * sin(-this.dir),
            lx * sin(-this.dir) + ly * cos(-this.dir),
        ]
    }

    // doesn't work for rotational node - use gxy() instead 
    gx(lx) {
        throw 'wrong function - use gxy()'
    }

    // doesn't work for rotational node - use gxy() instead 
    gy(ly) {
        throw 'wrong function - use gxy()'
    }

    gxy(lx, ly) {
        return [
            (lx * cos(this.dir) - ly * sin(this.dir)) + this.x,
            (lx * sin(this.dir) + ly * cos(this.dir)) + this.y,
        ]
    }

    // tries to pick this entity at provided global point
    // The picking works by trying to touch each solid pod with local x:y.
    pick(gx, gy, ls, predicate) {
        if (predicate && !predicate( this )) return null

        if (this.name.startsWith('missile')) debugger

        const p = this.lxy(gx, gy)

        // touch each solid pod
        for (let i = 0; i < this.solids.length; i++) {
            const spod = this.solids[i]
            if (spod.touch(p[0], p[1])) {
                ls.push( this )
                return this
            }
        }
        return null
    }

    // tries to pick this entity at provided global point
    pickOne(gx, gy, predicate) {
        if (predicate && !predicate( this )) return null

        const p = this.lxy(gx, gy)
        // touch each solid pod
        for (let i = 0; i < this.solids.length; i++) {
            const spod = this.solids[i]
            if (spod.touch(p[0], p[1])) return this
        }
        return null
    }

    // tests for potential overlaps with provided target
    // Uses solid pods attached to this entity and attached to the target.
    testOverlap(target) {
        // test each solid pod with target solids
        for (let i = 0; i < this.solids.length; i++) {
            const spod = this.solids[i]

            for (let j = 0; j < target.solids.length; j++) {
                const tpod = target.solids[j]
                if (spod.testOverlap(tpod)) return true
            }
        }
        return false
    }

    // evolve attached pods
    evo(dt) {
        const ls = this.pods
        for (let i = 0; i < ls.length; i++) {
            const pod = ls[i]
            if (pod.evo && !pod.paused) pod.evo(dt)
        }
    }

    // show debug compas
    // TODO move to another pod? Different compases for different units?
    drawCompas() {
        const compas = {
            x: this.x,
            y: this.y,
            r: 50,
        }
        if (this.vector) {
            compas.dir = this.vector.dir
            compas.speed = this.vector.speed
        } else if (this.thrust) {
            compas.dir = lib.v2a.angle( this.thrust.vector )
            compas.speed = round( lib.v2a.length( this.thrust.vector ))
        }
        lib.compas.draw(compas)
    }

    drawStatus() {
        if (!this.status) return

        baseTop()
        alignCenter()
        fill('#ffff00')
        font(env.style.debug.statusFont)
        text(this.status, this.x, this.y + 20)
    }

    isVisible() {
        if (this.area) return this.area.isVisible()
        // we don't know for sure
        return true
    }

    // translate to entity origin and render all drawable pods
    draw() {
        save()

        translate(this.x, this.y)
        rotate(this.dir + HALF_PI)

        const ls = this.pods
        for (let i = 0; i < ls.length; i++) {
            const pod = ls[i]
            if (pod.draw && !pod.hidden) pod.draw()
        }

        restore()
        if (env.debug && this.debug) {
            this.drawCompas()
            this.drawStatus()
        }
    }

    // hanlde for the kill event
    onKill( killer ) {}

    // kill the entity
    kill( killer ) {
        this.dead = true
        this.onKill( killer )
    }

    destroy( killer ) {
        this.destroyed = true
        if (this.onDestroy) this.onDestroy()
    }

    onObliterate() {}

    obliterate() {
        this.dead = true
        this.onObliterate()
    }
}
