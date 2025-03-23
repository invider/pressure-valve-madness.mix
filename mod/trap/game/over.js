function over() {
    lab.control.state.transitTo('gameover', {
        onKeep: function() {
            // we are faded to black - it's time to clean up
            lab.control.game.over()
        }
    })
}
