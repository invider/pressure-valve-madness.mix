function onActivate() {
    this.startedAt = env.time
    this.__.pressLabel.start()
    lab.background = env.style.color.title.background
}

function onDeactivate() {}

function next() {
    if (!this.startedAt) return

    this.startedAt = 0
    lab.control.state.transitTo('menu')
    lib.sfx('select')
}

function evo(dt) {
    if (this.startedAt && env.time > this.startedAt + env.tune.gameover.hold) {
        this.next()
    }
}
