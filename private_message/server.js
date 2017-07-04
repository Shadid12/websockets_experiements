const express = require("express"),
      app     = express(),
      http    = require("http").Server(app),
      io  = require("socket.io")(http);
      
var sockets = {};

io.on('connection', (o) => {
    for (var i in sockets){
        o.emit('user.add', {
           username: sockets[i].username,
           id: sockets[i].id
        });
    }
    
    o.on('username.create', (username) => {
        o.username = username;
        sockets[o.id] = o;
        io.emit('user.add', { username: io.username, id: o.id });
        console.log(username);
    });
    
    o.on("pm", (d) => {
       sockets[d.id].emit('pmed', { username: o.username, msg: d.msg }) 
    });
    
});


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


http.listen(8080, function(){
  console.log('listening on port 8080');
});