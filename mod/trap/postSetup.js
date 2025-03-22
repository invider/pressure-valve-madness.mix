function postSetup() {
    if (env.config['new']) {
        trap('game/new', {
            fadein:  0,
        })
    } else {
        lab.control.state.transitTo('title', {
            fadein: 0,
        })
    }
}
