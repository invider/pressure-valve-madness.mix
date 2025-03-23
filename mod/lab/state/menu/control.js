function toggleResumeGameOption() {
    const resumeItem = this.__.items.filter(e => e.id === 'resume')[0]

    resumeItem.hidden = !lab.control.game.inProgress()
}

function onActivate() {
    lab.background = env.style.color.menu.background
    this.toggleResumeGameOption()
}

function onDeactivate() {
}
