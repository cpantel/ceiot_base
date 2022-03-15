#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#include "DHTesp.h" 
  
DHTesp dht;

float humidity = 0.0;
float temperature = 0.0;


#define DEVICE_ID "61"
#define SERVER_IP "192.168.0.100:8080"

#define STASSID ""
#define STAPSK  ""


void setup() {
  delay(10000);

  Serial.begin(115200);

  Serial.println("ESP8266 DHT HTTP POST");
  
  dht.setup(2, DHTesp::DHT11);
  delay(dht.getMinimumSamplingPeriod());

  Serial.println(dht.getStatusString());
  humidity    = dht.getHumidity();
  temperature = dht.getTemperature();
  Serial.print("Temperature : ");
  Serial.println(temperature);
  Serial.print("Humidity : ");
  Serial.println(humidity);


  Serial.println();
  Serial.println();
  Serial.println();

  WiFi.begin(STASSID, STAPSK);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());

}

void loop() {
  // wait for WiFi connection
  if ((WiFi.status() == WL_CONNECTED)) {

  Serial.println(dht.getStatusString());
  humidity    = dht.getHumidity();
  temperature = dht.getTemperature();
  Serial.print("Temperature : ");
  Serial.println(temperature);
  Serial.print("Humidity : ");
  Serial.println(humidity);


    WiFiClient client;
    HTTPClient http;

    Serial.print("[HTTP] begin...\n");
    // configure traged server and url
    http.begin(client, "http://" SERVER_IP "/measurement"); //HTTP
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    Serial.print("[HTTP] POST...\n");
    // start connection and send HTTP header and body
    String post("id=");
    post += DEVICE_ID;
    post += "&t=28.7&h=55.6";
    int httpCode = http.POST(post);

    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);

      // file found at server
      if (httpCode == HTTP_CODE_OK) {
        const String& payload = http.getString();
        Serial.println("received payload:\n<<");
        Serial.println(payload);
        Serial.println(">>");
      }
    } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
  }

  delay(10000);
}
