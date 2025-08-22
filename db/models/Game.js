// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./Hero');
const Enemy = require('./Enemy');
const Boomerang = require('./Boomerang');
const View = require('./View');
const keyboard = require('./keyboard');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero({ boomerang: new Boomerang() }); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy();
    this.view = new View();
    this.track = [];
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(' '); // 88 массивов
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin;
    this.track[this.hero.boomerang.position] = this.hero.boomerang.skin;
    // Здесь сделать врага и героя
  }

  check() {
    if (this.hero.boomerang.position === this.trackLength - 1) {
      this.hero.boomerang.position = undefined;
      this.hero.boomerang.isReturning = false;
    }

    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }

    if (this.hero.boomerang.position === this.enemy.position) {
      this.enemy.die();
      console.log('Enemy is dead!');
      this.hero.boomerang.isReturning = true;
      this.hero.enemyKilled();
    }

    if (
      !this.hero.boomerang.isReturning &&
      this.hero.boomerang.position < this.enemy.position
    ) {
      this.hero.boomerang.fly('right');
    }

    if (
      this.hero.boomerang.isReturning &&
      this.hero.boomerang.position > this.hero.position
    ) {
      this.hero.boomerang.fly('left');
    }

    if (
      this.hero.boomerang.isReturning &&
      this.hero.boomerang.position === this.hero.position
    ) {
      this.hero.boomerang.position = undefined;
      this.hero.boomerang.isReturning = false;
      this.hero.showStats()
      process.exit();
      
    }
  }

  play() {
    keyboard(this);
    setInterval(() => {
      this.check();
      this.regenerateTrack();
      this.view.render(this.track);
    }, 100);
  }
}

module.exports = Game;
