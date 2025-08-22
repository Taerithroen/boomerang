const figlet = require('figlet');
const chalk = require('chalk');

class View {
  render(track) {
    const yourTeamName = 'Elbrus';

    console.clear();
    console.log(track.join(''));
    console.log('\r\n');
  }
}

module.exports = View;
