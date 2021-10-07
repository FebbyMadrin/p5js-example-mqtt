var bg;
var posX = [];
var posY = [];
var posZ = [];
var rssi = 0;

// Called after form input is processed
function startConnect() {
    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 100);

    // Fetch the hostname/IP address and port number from the form
    host = document.getElementById("host").value;
    port = document.getElementById("port").value;

    // Print output for the user in the messages div
    document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
    document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';

    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Connect the client, if successful, call onConnect function
    client.connect({ 
        onSuccess: onConnect,
    });
}

// Called when the client connects
function onConnect() {
    // Fetch the MQTT topic from the form
    topic = document.getElementById("topic").value;
	topic1 = "dwm/node/9899/uplink/data"
    // Print output for the user in the messages div
    document.getElementById("messages").innerHTML += '<span>Subscribing to: ' + topic + '</span><br/>';

    // Subscribe to the requested topic
    //client.subscribe(topic, topic1);
	client.subscribe(topic);
	client.subscribe(topic1);
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    console.log("onConnectionLost: Connection Lost");
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
    }
}

// Called when a message arrives
function onMessageArrived(message) {
	var payload = null;
    console.log("onMessageArrived: " + message.payloadString);
	payload = JSON.parse(message.payloadString);
    document.getElementById("messages").innerHTML += '<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>';
    //document.getElementById("coba").innerHTML += '<span>' + hex_to_ascii(base64ToHex(payload.data)) + '</span><br/>';
	//document.getElementById("coba").innerHTML += '<span>' + payload.position.x + '</span><br/>';
	//if (message.destinationName="dwm/node/9899/uplink/location"){
		if (payload.position){
	posX.push(payload.position.x);
	posY.push(payload.position.y);
	}
	if (payload.data){
	//document.getElementById("coba").innerHTML += '<span>' + hex_to_ascii(base64ToHex(payload.data)) + '</span><br/>';
	var splitData = hex_to_ascii(base64ToHex(payload.data)).split(",");
	rssi = splitData[8]
	//console.log(rssi);
	}
	updateScroll(); // Scroll to bottom of window
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
    updateScroll(); // Scroll to bottom of window
}

// Updates #messages div to auto-scroll
function updateScroll() {
    var element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
}

function base64ToHex(base64String) {
    var binString = atob(base64String),
            hexArray = [];
    for (var i = 0; i < binString.length; i++) {
        hexArray.push(toHex(binString.charCodeAt(i)));
    }
    return hexArray.join('');
}
function toHex(b)
{
    var h = b.toString(16);
    if (h.length == 1) {
        h = '0' + h;
    }
    return h;
}
function hex_to_ascii(str1)
     {
    	var hex  = str1.toString();
    	var str = '';
    	for (var n = 0; n < hex.length; n += 2) {
    		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    	}
    	return str;
     }
	 
/// drawing	 ///////////////////////////////////////////////////////////////////////////////
function preload()
{
  // load image
  bg = loadImage("bg.png");
}	 
	 
	 
function setup() {
  //bg = loadImage("https://drive.google.com/file/d/1cRbnudlx-MQIBLav0DzbdJ52Xbd1P4B3/view?usp=sharing");
  createCanvas(1019, 706);
  background(bg);
}

function draw() {
  // Call the variableEllipse() method and send it the
  // parameters for the current mouse position
  // and the previous mouse position
  //variableEllipse(posX, posY, pmouseX, pmouseY);
  variableEllipse(50*Number(posX[posX.length - 1]), 50*Number(posY[posY.length - 1]), 50*Number(posX[posX.length - 2]), 50*Number(posY[posY.length - 2]));
  //variableEllipse((500+Number(posX[posX.length - 1])), Number(posY[posY.length - 1]), Number(posX[posX.length - 2]), Number(posY[posY.length - 2]));
  //line (500,600,400,300);
  }

// The simple method variableEllipse() was created specifically
// for this program. It calculates the speed of the mouse
// and draws a small ellipse if the mouse is moving slowly
// and draws a large ellipse if the mouse is moving quickly

function variableEllipse(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  stroke(10);
  if (rssi == 3){
	  fill(0,0,255);
  }else{
	  fill(255);
  }
  ellipse(x, y, 10, 10);
}