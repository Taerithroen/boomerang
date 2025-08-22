const Hero = require('./Hero');
const Enemy = require('./Enemy');
const Boomerang = require('./Boomerang');
const View = require('./View');
const keyboard = require('./keyboard');

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero({ boomerang: new Boomerang() });
    this.enemy = new Enemy();
    this.view = new View();
    this.track = [];
    this.regenerateTrack();
  }

  regenerateTrack() {
    this.track = new Array(this.trackLength).fill(' ');
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin;
    this.track[this.hero.boomerang.position] = this.hero.boomerang.skin;
  }

  check() {
    if (this.hero.boomerang.position === this.trackLength - 1) {
      this.hero.boomerang.position = undefined;
      this.hero.boomerang.isReturning = false;
    }

    if (this.hero.position === this.enemy.position) {
      this.hero.die();
      this.hero.showStats();
      process.exit();
    }

    if (this.hero.boomerang.position === this.enemy.position) {
      this.enemy.die();
      this.enemy = new Enemy();

      this.hero.boomerang.isReturning = true;
      this.hero.enemyKilled();
    }
    if (this.hero.position < this.enemy.position) {
      this.enemy.moveLeft();
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
