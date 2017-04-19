var moment = require('moment');

var date = moment();
// check moments documentation online
// console.log(date.format('MMM Do, YYYY')); // MMM short version of month
//
// console.log(date.format('HH:mm'));

//new Date().getTime()
var someTimestamp = moment().valueOf(); // return a timestamp in linux epic


var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('HH:mm'));
