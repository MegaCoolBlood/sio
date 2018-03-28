const WebSocket = require('ws');
var express = require('express')
var app = express()
app.get('/', function (req, res) {
   res.sendfile(__dirname + '/mouse.html');
})
app.listen(80, function () {
   console.log('Example app listening on port 80!')
})

const wss = new WebSocket.Server({ port: 8080 });
// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data); 
    }
  });
};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      var s =  ws._socket.remoteAddress;
      var ip = s.substr(s.search(/[1-9]+.[1-9]+.[1-9]+./),s.length);
      var nachricht = JSON.parse(data);
      nachricht.ip = ip;
      if (client !== ws && client.readyState === WebSocket.OPEN) {
         client.send(JSON.stringify(nachricht)); 
      }
    });
  });
});
