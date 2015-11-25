//var compression = require('compression'); I NEED TO ADD COMPRESSION?
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
//app.use(compression.staticGzip("" + __dirname + "/build")); //I NEED TO DO THIS OR SOMETHING?
app.use(express.static(__dirname + "/build"));
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
