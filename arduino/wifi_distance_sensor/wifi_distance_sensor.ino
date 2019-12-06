#include <ESP8266WiFi.h>
#include <ArduinoJson.h>

// Wifi connection
const char* ssid = "SSID";
const char* password = "PASSWORD";
WiFiServer server(80);

// JSON Object for position
const int pos_size = JSON_OBJECT_SIZE(2);
StaticJsonDocument<pos_size> position;
char output[128];

// Sensor 1 for X
const int trigPin_1 = D5;
const int echoPin_1 = D6;
long duration_1;
int distance_1;

// Sensor 2 for Y
const int trigPin_2 = D0;
const int echoPin_2 = D1;
long duration_2;
int distance_2;
 
void setup() {
  pinMode(trigPin_1, OUTPUT); // Sets the trigPin as an Output
  pinMode(trigPin_2, OUTPUT);
  pinMode(echoPin_1, INPUT); // Sets the echoPin as an Input
  pinMode(echoPin_2, INPUT);
  
  Serial.begin(9600);
  delay(10);
 
  // Connect to WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
 
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
 
  // Start the server
  server.begin();
  Serial.println("Server started");
 
  // Print the IP address
  Serial.print("Use this URL to connect: ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/");
  Serial.println("");
}
 
void loop() {
  
  // Check if a client has connected
  WiFiClient client = server.available();
  if (!client) {
    return;
  }
 
  // Wait until the client sends some data
  Serial.println("new request");
  while(!client.available()){
    delay(1);
  }

// Sensor 1
  // Clears the trigPin
  digitalWrite(trigPin_1, LOW);
  delayMicroseconds(10);
  
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin_1, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin_1, LOW);

  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration_1 = pulseIn(echoPin_1, HIGH);
  
  // Calculating the distance
  distance_1 = duration_1 * 0.034 / 2;
  
  // Prints the distance on the Serial Monitor
  //Serial.print("X: ");
  //Serial.println(distance_1);

  // Sensor 2
  // Clears the trigPin
  digitalWrite(trigPin_2, LOW);
  delayMicroseconds(10);
  
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin_2, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin_2, LOW);

  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration_2 = pulseIn(echoPin_2, HIGH);
  
  // Calculating the distance
  distance_2 = duration_2 * 0.034 / 2;
  //Serial.print("Y: ");
  //Serial.println(distance_2);


// generate JSON
position["x"] = distance_1;
position["y"] = distance_2;

serializeJson(position, output);
Serial.println(output);

client.println("HTTP/1.1 200 OK");
client.println("Content-Type: application/json");
  client.println(""); //  do not forget this one
  client.println(output);

  delay(1);
  //Serial.println("Client disonnected");
  Serial.println("");
 
}
 
