const express = require("express"),
      app     = express(),
      http    = require("http").Server(app),
      io  = require("socket.io")(http);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// socket

io.on('connection', (o) => {
    o.on('send', (data) => {
      io.emit('sent', data); 
    //   io.emit('user.add', o.id);
    });
});

io.on('connection', (o) => {
    io.emit('user.add', o.id);
    o.on('disconnect', () => {
        io.emit('user.remove', o.id);
    });
});


// end


http.listen(8080, function(){
  console.log('listening on port 8080');
});