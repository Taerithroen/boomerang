// Враг.

class Enemy {
  constructor() {
    this.generateSkin();
    this.position = 8;
  }

  generateSkin() {
    const skins = ['👹', '👻', '👽', '👿', '🤺', '🧛', '🧟'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  die() {
    this.position = undefined;

  }
}

module.exports = Enemy;
