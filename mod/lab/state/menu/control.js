function toggleResumeGameOption() {
    const resumeItem = this.__.items.filter(e => e.id === 'resume')[0]

    resumeItem.hidden = !lab.control.game.inProgress()
}

function onActivate() {
    this.toggleResumeGameOption()
}

function onDeactivate() {
}
