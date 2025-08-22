// Основной файл.
// Запускает игру.
require('dotenv').config()
const Game = require("./db/models/Game")

// Инициализация игры с настройками.
const game = new Game({
  trackLength: 900,
});


// Запуск игры.
game.play();
