var moment = require('moment');//library za rad sa vremenom

var generateMessage = function(from, text){
  return {
  	from: from,
  	text: text,
  	createdAt: moment().valueOf()
  };
};

var generateLocationMessage = function(from, latitude, longitude){
  return {
  	from: from,
  	url: `https://www.google.com/maps?q=${latitude},${longitude}`,
  	createdAt: moment().valueOf()
  };
};

module.exports = {
  generateMessage: generateMessage,
  generateLocationMessage: generateLocationMessage
};


