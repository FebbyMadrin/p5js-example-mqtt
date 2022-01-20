var bg;
var messages1 = [{"timestamp":"2022-01-20T13:22:49.434Z","type":"Gateway","mac":"AC233FC0BC43","gatewayFree":23,"gatewayLoad":1.3400000000000001},{"timestamp":"2022-01-20T13:22:49.519Z","type":"iBeacon","mac":"AC233F8C7CEE","bleName":"","ibeaconUuid":"E2C56DB5DFFB48D2B060D0F5A71096E0","ibeaconMajor":0,"ibeaconMinor":0,"rssi":-38,"ibeaconTxPower":-59,"battery":0},{"timestamp":"2022-01-20T13:22:49.431Z","type":"iBeacon","mac":"AC233FAA1AF3","bleName":"","ibeaconUuid":"E2C56DB5DFFB48D2B060D0F5A71096E0","ibeaconMajor":0,"ibeaconMinor":0,"rssi":-34,"ibeaconTxPower":-59,"battery":0}]
let showTextbuttonG1 = false;

/// drawing	 ///////////////////////////////////////////////////////////////////////////////
function preload()
{
  // load image
  bg = loadImage("bg.png");
}	 
	 
	 
function setup() {
  createCanvas(1019, 706);
  background(bg);

  buttonG1 = createButton('Room A');
  buttonG1.position(200, 200);
  buttonG1.mouseOver(buttonG1showMessage);
  buttonG1.mouseOut(buttonG1deleteMessage);
}

function draw() {

    if (showTextbuttonG1){
        text(messages1[0].mac, 200, 250);
        text(messages1[1].mac+'  |  '+messages1[1].rssi, 200, 265);
        text(messages1[2].mac+'  |  '+messages1[2].rssi, 200, 280);
      }

      buttonG1.html('Room A  ( '+ (messages1.length-1) + ' )');

}

function buttonG1showMessage() {
    showTextbuttonG1 = true;
  }

function buttonG1deleteMessage() {
    setup();
    showTextbuttonG1 = false;
}