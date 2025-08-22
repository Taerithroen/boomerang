const keypress = require('keypress');

function runInteractiveConsole(game) {
  const keyboard = {
    q: () => console.log('q'),
    d: () => {
      game.hero.moveRight(), game.hero.saveStats();
    },
    a: () => {
      game.hero.moveLeft(), game.hero.saveStats();
    },
    s: () => {
      game.hero.moveDown(), game.hero.saveStats();
    },
    w: () => game.hero.moveUp(),

    space: () => {
      game.hero.attack(), game.hero.saveStats();
    },
    c: () => {
      game.hero.showStats();
    },
  };

  keypress(process.stdin);
  process.stdin.on('keypress', (ch, key) => {
    if (key) {
      if (key.name in keyboard) {
        keyboard[key.name]();
      }

      if (key.ctrl && key.name === 'c') {
        process.exit();
      }
    }
  });
  process.stdin.setRawMode(true);
}

module.exports = runInteractiveConsole;
