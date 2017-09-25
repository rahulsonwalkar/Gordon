var dateTime = require('node-datetime');

module.exports = function() {
  return dateTime.create().format('H:M');

}
