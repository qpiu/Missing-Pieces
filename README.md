# Missing-Pieces
## Demo
![Demo](https://github.com/qpiu/Missing-Pieces/blob/master/missing_pieces_demo.gif)
## Install & Run
### Web part
* Run web part from a local server. For example, install [live-server](https://www.npmjs.com/package/live-server) from npm and run the code in live-server.
```
npm install -g live-server
live-server ./Missing\ Pieces
```

### Arduino
* Hardware
  * ESP8266
    * Power Supply: 3.3V
  * HC-SR04 (Ultra-sonic Sensor) * 2
    * Power Supply: 5V
    * Ranging distance : 2cm – 500 cm
  * Bread Board
  * Jumper Wires
  * Micro USB Cable
* Software
  * Arduino IDE
* Circuit connection
  * HC-SR04 for X-axis distance detection
    * **VCC** - +5V
    * **TRIG** - D5 on ESP8266
    * **ECHO** - D6 on ESP8266
    * **GND** - GND
  * HC-SR04 for Y-axis distance detection
    * **VCC** - +5V
    * **TRIG** - D0 on ESP8266
    * **ECHO** - D1 on ESP8266
    * **GND** - GND
    
### Phone
* Download tramontana for [iOS](https://apps.apple.com/us/app/id1121069555) or for [Android](https://play.google.com/store/apps/details?id=com.pierdr.pierluigidallarosa.myactivity)
