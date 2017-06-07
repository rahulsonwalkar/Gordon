/*
Gordon: Team chatroom built inside Git-Bash(Terminal).
Author: Rahul Sonwalkar (github.com/rahulsonwalkar)
Date: 6/6/2017
*/

//Modules
var irc = require('irc');
var readline = require('readline');
var beeper = require('beeper');
var dateTime = require('node-datetime');  //Need for timestamp.

//constants
const username = '<Your username>'; //
const channelName = '#<Your channel name>';   // Has to start with a '#'
const chatroom = 'irc.freenode.net';
var beepCounter = true;

//Create a bot and connect to Channel
var client = new irc.Client('irc.freenode.net', username, {
    channels: [channelName],
});

//Create current timestamp
var dt = dateTime.create();
var formatted = dt.format('H:M');

//Listen for any incoming messages on the channel
client.addListener('message', function (from, to, message) {
    console.log('[GORDON] '+ from + ' @ ' + formatted + '=>  ' + message);  // Log the message in the console. Need substring to exculde the '#'

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

//Basics on I/O in the interface. (Need this for typing in the console).
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Need this function because client.say() wouldn't take 'input' directly as an arguement.
var inputlogger = function (input) {
  return input;
}

//'line' is called everytime there is an event emmited on the console.
rl.on('line', (input) => {
  //send the message to the chatserver when the console event is emmitted
  client.say(channelName, inputlogger(input));
  //Log your message in the console.

  console.log('[GORDON] '+ username + '(you) @ ' + formatted + '=> ' + input);
});

//Log when a user joins a channel
//For some unkown reason, nick contains the username of the person who joins.
client.addListener('join', function (channel, nick, message) {
    console.log('[GORDON] '+ nick + ' joined the chat');
    beeper(2);  //Beeps twice when someone joins
});


//Log when a user leaves irc
client.addListener('quit', function (nick, reason, channels, message) {
    console.log('[GORDON] '+ nick + ' left the chat');
 });


//TO-DO: Add bot commands (enable/disable sound, change username).
//TO-DO: Make links clickable if possible.
