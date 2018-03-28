var path = require('path');
var app = require('express')();
var ws = require('express-ws')(app);
app.get('/', (req, res) => {
  console.error('express connection');
  res.sendFile(path.join(__dirname, 'ws2.html'));
});
app.ws('/', (s, req) => {
  console.error('websocket connection');
  for (var t = 0; t < 3; t++)
    setTimeout(() => s.send('message from server', ()=>{}), 1000*t);
});
app.listen(8080, () => console.error('listening on http://localhost:8080/'));
console.error('websocket example');
