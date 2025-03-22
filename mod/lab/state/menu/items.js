const items = [
    {
        title: 'New Game',
        select: function(menu) {
            trap('game/new')
        },
    },
    {
        title: 'Options',
        submenu: 'options',
    },
    {
        title: 'Credits',
        select: function() {
            lab.control.state.transitTo('credits')
        }
    },
    {
        id:     'resume',
        hidden:  true,
        title:  'Resume Game',
        select: function() {
            lab.control.state.transitTo('desert')
        },
    },
]
items.preservePos = true

