var chalk = require('chalk');
var time = require('../Time');

module.exports = function (username, message, type) {
if(type == "join") {
  return chalk.black.bgWhite.bold('GORDON') + chalk.yellow(' '+ username + ' joined');
}
else if(type == "quit") {
  return chalk.black.bgWhite.bold('GORDON') + chalk.yellow(' '+ username + ' left');
}
else if (type == "incoming") {

  return chalk.white.bgBlue.bold('GORDON') + ' '+ username + ' @ ' + time() + '=>  ' + message;
}
else if (type == "outgoing"){

  return chalk.white.bgGreen.bold('GORDON') + ' '+ username + ' @ ' + time() + '=> ' + message;
}
else {
  return chalk.red('ERR! in color.js');
}
};
