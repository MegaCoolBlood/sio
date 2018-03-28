window.addEventListener('beforeunload', function () { ws.close(); });
var textarea = document.getElementById("textarea");

function textsenden() {
    var text =  document.getElementById("input_text").value;  
    
    document.getElementById("textarea").value= 'localhost:' + '\t'  +text.substr(0,40); 
    var coorjs = { "type":"2","ip":"xxx","text":text };
    sx.send(JSON.stringify(coorjs));
    document.getElementById("input_text").value='';
}

var sx = new WebSocket('ws://'+window.location.host+':8081/');
sx.addEventListener('error', function (m) { console.log("error"); });
sx.addEventListener('open', function (m) { console.log("websocket connection open"); });

sx.addEventListener('message', function (m) { 
  console.log(m.data); 

  var nachricht = JSON.parse(m.data);
  if (nachricht.type == 2){
     document.getElementById("textarea").value= nachricht.ip +':'  + '\t'  + nachricht.text + '\n'  + document.getElementById("textarea").value; 
  } 
});
