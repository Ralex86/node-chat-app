//console.log(__dirname + '/../public');
// path module cross OS

const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

//static express middleware

app.use(express.static(publicPath));

app.listen(3000, () => {
  console.log(`Server is up on port : ${port}`);
});
