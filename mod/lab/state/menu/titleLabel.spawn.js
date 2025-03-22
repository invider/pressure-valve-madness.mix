const titleLabel = {
    Z:    1,
    DNA: 'overlay/Label',
    rx:  .5,
    ry:  .15,
    font:  env.style.font.title.head,
    color: env.style.color.menu.title,
    text: function() {
        return (this.__.items.title || 'Menu')
    },
}

