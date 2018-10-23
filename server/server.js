const path = require('path');
const publicPath = path.join(__dirname, '../public');//ovo je samo da i napravili cistiju i kracu putanju do public foldera(glupost)
const express = require('express');
const port = process.env.PORT || 3000;
// console.log(publicPath);

var app = express();

app.use(express.static(publicPath));

app.listen(3000, () => {
  console.log(`Server is up on port ${port}`);	
});



