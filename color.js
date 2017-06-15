/* Color Scheme
  Join/Quit: Gordon(White), Text (Red)
  Incoming Message: Gordon(Blue), Text (normal)
  Outgoing Message: Gordon(Green), Text (normal)
*/

var chalk = require('chalk');   //Required to color console logs
var dateTime = require('node-datetime');  //Required to generate Time Stamp

//Generate Time Stamp
var dt = dateTime.create();
var formatted = dt.format('H:M');

exports.logMessage = function (username, message, type) {
if(type == "join") {
  return chalk.black.bgWhite.bold('GORDON') + chalk.yellow(' '+ username + ' joined the chat');
}
else if(type == "quit") {
  return chalk.black.bgWhite.bold('GORDON') + chalk.yellow(' '+ username + ' quit the chat');
}
else if (type == "incoming") {
  return chalk.white.bgBlue.bold('GORDON') + ' '+ username + ' @ ' + formatted + '=>  ' + message;
}
else if (type == "outgoing"){
  return chalk.white.bgGreen.bold('GORDON') + ' '+ username + '(you) @ ' + formatted + '=> ' + message;
}
else {
  return chalk.red('ERR! in color.js');
}
};
