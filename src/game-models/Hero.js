const Stats = require('./models/Stats');

class Hero {
  constructor({ boomerang }) {
    this.skin = '🤠';
    this.position = 0;
    this.boomerang = boomerang;
    this.playerName = playerName;
    this.stats = {
      score: 0,
      kills: 0,
      moves: 0,
    };
    this.loadStats();
  }
 async loadStats() {
    try {
      const stats = await Stats.findOne({ where: { player: this.playerName } });
      if (stats) {
        this.stats = stats;
        console.log(`Статистика: ${this.stats.score} очков`);
      }
    } catch (error) {
      console.log('ОшибОчка');
    }
  }

  async saveStats() {
    try {
      await Stats.upsert({
        player: this.playerName,
        score: this.stats.score,
        kills: this.stats.kills,
        moves: this.stats.moves
      });
    } catch (error) {
      console.log('Не сохранилось', error);
    }
  }
  moveLeft() {
    // Идём влево.
    this.position -= 1;
     this.saveStats();
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
     this.saveStats();
  }
    moveDown() {
    // Идём вправо.
    this.position += 143;
  }
      moveUp() {
    // Идём вправо.
    this.position -= 143;
  }

  attack() {
    // Атакуем.
    this.boomerang.position = this.position + 1;
     this.saveStats();
  }
addKill() {
    this.stats.kills++;
    this.stats.score += 100;
    console.log(`Враг улетел на повтор! Очки: ${this.stats.score}`);
    this.saveStats();
  }

  async die() {
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    console.log('\n=== СТАТИСТИКА ===');
    console.log(`Очки: ${this.stats.score}`);
    console.log(`Убито: ${this.stats.kills}`);
    console.log(`Шагов: ${this.stats.moves}`);
    
    await this.saveStats();
    process.exit();
  }
}

module.exports = Hero;
