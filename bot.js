/*
Gordon: Team chatroom built inside Git-Bash(Terminal).
Author: Rahul Sonwalkar (github.com/rahulsonwalkar)
Date: 6/6/2017
*/

//Modules
var irc = require('irc');              //Need to connect to IRC webclient
var readline = require('readline');    //Need to read input from Terminal
var beeper = require('beeper');        //Need to beep for certain events
var dateTime = require('node-datetime');  //Need for timestamp.
var chalk = require('chalk');          //Need to color console logs
var color = require('./color.js');    //Required to log messages in colors
//constants
//const username = 'SeniorIntern23'; // <Your username>
var username;
const channelName = '#ozarkawaterbottle';   // Has to start with a '#'  <Your channel name>
const chatroom = 'irc.freenode.net';
var beepCounter = true;

//Basics on I/O in the interface. (Need this for typing in the console).
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

//Get username, create connection to server and listen for new messagess
rl.question('Pick a username-> ', function(answer){
  username = answer;
  //Create an irc bot and connect to Channel
  var client = new irc.Client('irc.freenode.net', username, {
      channels: [channelName],
  });
  console.log("Connecting to channel...");

  //Log when a user joins a channel
  client.addListener('join', function (channel, nick, message) {
      console.log(color.logMessage(nick, "", "join"));
      beeper(2);  //Beeps twice when someone joins
  });

  //Listen for any incoming messages on the channel
  client.addListener('message', function (from, to, message) {

      //Generate current time. Has to be generated within this scope to get current time. Cannot be generated globally.
      var dt = dateTime.create();
      var formatted = dt.format('H:M');

      // Log the message in the console. Need substring to exculde the '#' in channelName
      console.log(color.logMessage(from, message, "incoming"));

      //Beep if it hasn't beeped in 30 seconds.
      if(beepCounter){
          beeper();

          //Reset the beepCounter
          beepCounter = false;
          setTimeout(function(){
            beepCounter = true;
          }, 30000);
      }

  });

  //Need this function because client.say() wouldn't take 'input' directly as an arguement.
  var inputlogger = function (input) {
    return input;
  }

  //'line' is called everytime there is an event emmited on the console.
  rl.on('line', (input) => {

    //Generate current time. Has to be generated within this scope to get current time. Cannot be generated globally.
    var dt = dateTime.create();
    var formatted = dt.format('H:M');

    //send the message to the chatserver when the console event is emmitted
    client.say(channelName, inputlogger(input));

    //Log your message in the console.
    console.log(color.logMessage(username, input, "outgoing"));
    //console.log(chalk.white.bgGreen.bold('GORDON') + ' '+ username + '(you) @ ' + formatted + '=> ' + input);
  });

  //Log when a user leaves irc
  client.addListener('quit', function (user, reason, channels, message) {
      console.log(color.logMessage(user, "", "quit"));
   });

  client.addListener('error', function(message) {
    console.error(message);
  });
});
//TO-DO: Add bot commands (enable/disable sound, change username).
//TO-DO: Make links clickable if possible.
