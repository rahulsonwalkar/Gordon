/*
Gordon: Team chatroom built inside Git-Bash(Terminal).
Author: Rahul Sonwalkar (github.com/rahulsonwalkar)
Date: 6/6/2017
*/

var irc = require('irc');
var readline = require('readline');
var beeper = require('beeper');
var username;
var beepCounter = true;
var log  = require('../Message');
const data = require('../Data')

var inputlogger = function (input) {
  return input;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.question('Pick a username-> ', function(answer){
  
      username = answer;

      var client = new irc.Client(data.chatroom, username, {
          channels: [data.channelName],
      });
      console.log("Connecting to channel...");

      client.addListener('join', function (channel, nick, message) {

          log(nick, "", "join");
          beeper(2);
      });

      client.addListener('message', function (from, to, message) {

          log(from, message, "incoming");

          if(beepCounter){
              beeper();
              beepCounter = false;
              setTimeout(function(){
                beepCounter = true;
              }, 30000);
          }
      });

      rl.on('line', (input) => {
        client.say(channelName, inputlogger(input));
        log(username, input, "outgoing");
      });

      client.addListener('quit', function (user, reason, channels, message) {
        log(user, "", "quit");
       });

      client.addListener('error', function(message) {
        console.error(message);
      });
});
//TO-DO: Add bot commands (enable/disable sound, change username).
//TO-DO: Make links clickable if possible.
