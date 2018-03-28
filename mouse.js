window.addEventListener('beforeunload', function () { ws.close(); });
    var mousedown=false;
    var mysize = 2; 
     
    function get_random_color() {
      function c() {
        var hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2); // pad with zero
      }
      return "#" + c() + c() + c();
    }
   
    var mycolor = get_random_color();
    var xa = 0;
    var ya = 0;
    var s = new WebSocket('ws://'+window.location.host+':8080/');

    myCanvas.addEventListener("mousedown", function (e) {
          mousedown=true;
      document.getElementById("myCanvas").style.cursor="pointer";
    }, false);

    myCanvas.addEventListener("mousemove", function (e) {
      if( mousedown == true){
          zeichnePunkt(e);
      }
      xa = e.clientX;
      ya = e.clientY;
    }, false);


    myCanvas.addEventListener("mouseup", function (e) {
      mousedown=false;
      document.getElementById("myCanvas").style.cursor="crosshair";
    }, false);

    s.addEventListener('error', function (m) { console.log("error"); });
    s.addEventListener('open', function (m) { console.log("websocket connection open"); });
    s.addEventListener('message', function (m) {
      console.log(m.data);
      var kreis = JSON.parse(m.data);
      var mycolor = kreis.mycolor;
      var x = kreis.x;
      var y = kreis.y;
      var xa = kreis.xa;
      var ya = kreis.ya;
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(xa,ya);
      ctx.lineTo(x,y);
      //ctx.arc(x, y, mysize, 0, 2 * Math.PI);
      ctx.strokeStyle = mycolor;
      ctx.fillStyle = mycolor;
      ctx.fill();
      ctx.stroke();
    });

    function zeichnePunkt(e) {
      var x = e.clientX;
      var y = e.clientY;
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      ctx.beginPath();
      ctx.lineWidth=10;
      ctx.moveTo(xa,ya);
      ctx.lineTo(x,y);
      //ctx.arc(x, y, mysize, 0, 2 * Math.PI);
      ctx.strokeStyle = mycolor;
      ctx.fillStyle = mycolor;
      ctx.fill();
      ctx.stroke();
      var coorjs = { "mycolor": mycolor, "x": x, "y": y, "xa": xa, "ya": ya };
      document.getElementById("demo").innerHTML = JSON.stringify(coorjs);
      s.send(JSON.stringify(coorjs));
    }

    function clearCoor() {
      document.getElementById("demo").innerHTML = "";
    }
