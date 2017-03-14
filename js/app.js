var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, '/../views')));
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../js')));

app.listen(3000, function(){
    console.log("Server running on port 3000");
});