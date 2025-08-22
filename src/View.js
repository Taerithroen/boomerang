// Сделаем отдельный класс для отображения игры в консоли.
const figlet = require('figlet');
const chalk = require('chalk');

class View {
  render(track) {
    const yourTeamName = 'Elbrus';

    // Тут всё рисуем.
    console.clear();
    console.log(track.join(''));
    console.log('\n\n');
    // console.log(`Created by "${yourTeamName}" with love`);


console.log(
        chalk.green(`

███╗   ██╗ ██████╗ ████████╗     ██████╗  █████╗ ██████╗ 
████╗  ██║██╔═══██╗╚══██╔══╝     ██╔══██╗██╔══██╗██╔══██╗
██╔██╗ ██║██║   ██║   ██║        ██████╔╝███████║██║  ██║
██║╚██╗██║██║   ██║   ██║        ██╔══██ ██╔══██║██║  ██║
██║ ╚████║╚██████╔╝   ██║        ██║███  ██║  ██║██████╔╝
╚═╝  ╚═══╝ ╚═════╝    ╚═╝        ╚═════╝ ╚═╝  ╚═╝╚═════╝ 
          `)
      );
    
  }
}

module.exports = View;
