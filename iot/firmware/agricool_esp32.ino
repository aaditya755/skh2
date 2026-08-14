#include <WiFi.h>
#include <HTTPClient.h>
#include <ESP32Servo.h>
#include "DHT.h"
#include "HX711.h"

#define DHTPIN        4
#define DHTTYPE       DHT22
#define GAS_PIN       1
#define HX711_DOUT    5
#define HX711_SCK     6
#define BUZZER_PIN    7
#define SERVO_PIN     8

DHT dht(DHTPIN, DHTTYPE);
Servo ventServo;
HX711 scale;

const char* ssid = "Wokwi-GUEST";
const char* password = "";

const char* serverUrl = "https://httpbin.org/post";

void setup() {
  Serial.begin(115200);
  delay(1000);

  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);

  ventServo.attach(SERVO_PIN);
  ventServo.write(0);

  dht.begin();
  scale.begin(HX711_DOUT, HX711_SCK);

  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\n[SUCCESS] Wi-Fi Connected!");
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();

  int rawGas = analogRead(GAS_PIN);
  float ethylenePpm = map(rawGas, 0, 4095, 0, 500);

  float weightKg = 0.0;

  if (scale.is_ready()) {
    long rawWeight = scale.read();
    weightKg = rawWeight / 420.0;

    if (weightKg < 0) {
      weightKg = 0;
    }
  } else {
    weightKg = 450.0;
  }

  if (isnan(temp) || isnan(hum)) {
    Serial.println("[ERROR] Failed to read from DHT22!");
    delay(2000);
    return;
  }

  Serial.println("\n------------------------------------------");
  Serial.print("Cargo Temp      : ");
  Serial.print(temp, 1);
  Serial.println(" C");

  Serial.print("Cargo Humidity  : ");
  Serial.print(hum, 1);
  Serial.println(" %");

  Serial.print("Ethylene Level  : ");
  Serial.print(ethylenePpm, 1);
  Serial.println(" PPM");

  Serial.print("Cargo Weight    : ");
  Serial.print(weightKg, 1);
  Serial.println(" KG");

  bool isEmergency = false;

  if (temp > 12.0 || ethylenePpm > 200.0) {
    isEmergency = true;

    digitalWrite(BUZZER_PIN, HIGH);
    ventServo.write(90);

    Serial.println("CRITICAL ALERT: Vents OPENED.");
  } else {
    digitalWrite(BUZZER_PIN, LOW);
    ventServo.write(0);
  }

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    String jsonPayload = "{";
    jsonPayload += "\"truck_id\":\"MH15-AGRICOOL-01\",";
    jsonPayload += "\"commodity\":\"Tomatoes\",";
    jsonPayload += "\"temperature\":" + String(temp, 2) + ",";
    jsonPayload += "\"humidity\":" + String(hum, 2) + ",";
    jsonPayload += "\"ethylene_ppm\":" + String(ethylenePpm, 1) + ",";
    jsonPayload += "\"weight_kg\":" + String(weightKg, 1) + ",";
    jsonPayload += "\"emergency_alert\":" + String(isEmergency ? "true" : "false");
    jsonPayload += "}";

    int httpCode = http.POST(jsonPayload);

    Serial.print("HTTP Status: ");
    Serial.println(httpCode);

    http.end();
  }

  delay(4000);
}
