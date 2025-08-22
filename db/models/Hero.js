const Stats = require('./Stat');

class Hero {
  constructor({ boomerang, playerName = 'Player' }) {
    this.skin = '🤠';
    this.position = 0;
    this.boomerang = boomerang;
    this.playerName = playerName;
    this.stats = {
      score: 0,
      kills: 0,
      moves: 0,
    };
    console.log(`Новый игрок: ${this.playerName}`);
  }

  async saveStats() {
    try {
      const stat = await Stats.create({
        player: this.playerName,
        score: this.stats.score,
        kills: this.stats.kills,
        moves: this.stats.moves,
      });
      console.log('✅ Статистика сохранена');
    } catch (error) {
      console.log('❌ Ошибка сохранения:', error.message);
    }
  }

  moveLeft() {
    this.position -= 1;
    this.stats.moves++;
  }

  moveRight() {
    this.position += 1;
    this.stats.moves++;
  }

  attack() {
    this.boomerang.position = this.position + 1;
  }

  enemyKilled() {
    this.stats.kills++;
    this.stats.score += 100;
  }

  showStats() {
    console.log('\n=== СТАТИСТИКА ===');
    console.log(`Игрок: ${this.playerName}`);
    console.log(`Очки: ${this.stats.score}`);
    console.log(`Убито: ${this.stats.kills}`);
    console.log(`Шагов: ${this.stats.moves}`);
  }

  async die() {
    this.skin = '💀';
    console.log('\n💀 YOU ARE DEAD!');

    try {
      await this.saveStats();
      this.showStats();
    } catch (error) {
      console.log('Ошибка при сохранении статистики:', error.message);
    }

    process.exit(0);
  }
}

module.exports = Hero;
