function mouseDown(e) {
    if (e.button === 2) {
        const ls = []
        lab.port.pick( mouse.x, mouse.y, ls )
        ls.forEach(e => console.dir(e))
    }
}
