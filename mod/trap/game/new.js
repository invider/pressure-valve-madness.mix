module.exports = function(st) {
    lab.control.game.startNew()
    lab.control.state.transitTo('dust', st)
}
