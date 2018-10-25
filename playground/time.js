var moment = require('moment');
// new Date().getTime();
// var date = new Date();
// console.log(date.getMonth());
var createdAt = 1234;
var date = moment(createdAt);//pomocu moment library-a pravimo novi datum
// date.add(100, 'year');
// date.subtract(19, 'months');
console.log(date.format());
console.log('-------------------------------------');
console.log(date.format('MMMM'));
console.log('-------------------------------------');
console.log(date.format('MMM YYYY'));
console.log('-------------------------------------');
console.log(date.format('MMM Do, YYYY h:mm a'));
console.log('-------------------------------------');
console.log(date.format('h:mm a'));
console.log('-------------------------------------');
console.log('-------------------------------------');
var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);


