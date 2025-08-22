

const keypress = require('keypress');

// Управление.
// Настроим соответствия нажатий на клавиши и действий в игре.

// Какая-то функция.

function runInteractiveConsole(game) {
  const keyboard = {
    q: () => console.log('q'),
    d: () => {
      game.hero.moveRight(),
    game.hero.saveStats();
    },
    a: () => {game.hero.moveLeft(),
      game.hero.saveStats();
    },
    s: () => {game.hero.moveDown(),
      game.hero.saveStats();
    },
    w: () => game.hero.moveUp(),
    
    space: () => {game.hero.attack(),
      game.hero.saveStats();
    },
    c: () => {
      game.hero.showStats(); // ← показ статистики по нажатию C
    }
  }
  
  keypress(process.stdin);
  process.stdin.on('keypress', (ch, key) => {
    if (key) {
      // Вызывает команду, соответствующую нажатой кнопке.
      if (key.name in keyboard) {
        keyboard[key.name]();
      }
      // Прерывание программы.
      if (key.ctrl && key.name === 'c') {
        process.exit();
      }
    }
  });
  process.stdin.setRawMode(true);
}

// Давай попробуем запустить этот скрипт!

module.exports = runInteractiveConsole;
