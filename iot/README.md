# AgriCool IoT Prototype

This directory contains the ESP32-S3 firmware and Wokwi simulation used to demonstrate AgriCool cold-chain monitoring.

## Hardware / Simulation

- ESP32-S3
- DHT22 temperature/humidity sensor
- Potentiometer used as an MQ135/gas-input simulator
- HX711 load-cell interface
- Buzzer for emergency alerts
- Servo for exhaust-vent actuation

## Firmware Workflow

```text
DHT22 + Gas Input + HX711
            ↓
        ESP32-S3
            ↓
    Threshold Evaluation
       ↓          ↓
    Normal      Critical
                 ↓
          Buzzer + Servo
            ↓
       HTTP Telemetry
``n## Telemetry

The prototype sends:

- Truck ID
- Commodity
- Temperature
- Humidity
- Ethylene level
- Cargo weight
- Emergency alert status

## Alert Logic

The current prototype raises a critical alert when:

- Temperature > 12°C, or
- Ethylene level > 200 PPM

When a critical condition occurs:

- The buzzer is activated.
- The exhaust servo moves to 90°.
- A critical alert is printed to the serial monitor.

## HTTP Endpoint

The current firmware uses:

`https://httpbin.org/post`

as an HTTP testing endpoint.

This is **not the AgriCool Flask backend**.

For the final-round backend integration, this endpoint will be replaced with the AgriCool Flask API.

## Libraries

- DHT sensor library
- ESP32Servo
- HX711 Arduino Library

## Files

```text
iot/
├── firmware/
│   └── agricool_esp32.ino
├── wokwi/
│   ├── diagram.json
│   └── libraries.txt
└── README.md     

