function keyDown(e) {
    switch(e.code) {
       case 'Escape':
          if (!env.transition) {
              lab.control.state.transitTo('menu')
          }
          break
    }
}
