var data = require('../Data')
module.exports = function(arr){
    if(arr[2]) {
      if(arr[2].charAt(0) == '#')
        return arr[2];
      else
        return '#' + arr[2];
    }
    else {
      return data.channelName;
    }
}
