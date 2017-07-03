const express = require("express"),
      app     = express(),
      http    = require("http").Server(app),
      io  = require("socket.io")(http);



app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// socket io stuff
io.on('connection', (o) => {
   o.emit("server", "hello from server");
   o.on('client', (msg) => {
       console.log(msg);
   });
});


// end

http.listen(8080, function(){
  console.log('listening on port 8080');
});