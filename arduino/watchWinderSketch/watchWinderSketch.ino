// motor control pins
int relayPins[] = { 4, 7, 8, 12 };
int relayCount = 4;
int activeRelay;

// loop state 
int winderState = 0;
unsigned long currentMillis;
unsigned long loopStartMillis;
unsigned long sample = 0;

// analog input for on/off switch
int sensorPin = A0;
int sensorValue = 0;
bool isSwitchOn;
bool isSwitchStateChanged;

void startMotor () {
   digitalWrite(relayPins[activeRelay], HIGH);
}
void stopMotor () {
  Serial.println("in stopMotor, about to stop all relays");
  for (int thisRelay = 0; thisRelay < relayCount; thisRelay++) {
    digitalWrite(relayPins[thisRelay], LOW);
  }
}

void doLoop() {
    switch (winderState) {
    case 0:  // initialize the state timer
      activeRelay = 0;
      loopStartMillis = millis();
      winderState++;
      break;
    case 1:  // start forward state
      startMotor();
      winderState++;
      break;
    case 2:  // waiting for forward to end
      currentMillis = millis();
      if (currentMillis - loopStartMillis > (300000)) { // are we at end of foward motion?
        stopMotor();
        activeRelay = 1;
        startMotor();
        delay(1000);
        winderState++;
      }
      break;
    case 3: // waiting for loop to end
      currentMillis = millis();
      if (currentMillis - loopStartMillis > (600000)) {
          stopMotor();
          if (activeRelay == 0) {
          activeRelay = 1;          
        }
        else {
          winderState++;
        }
      }
      else {
      }
      break;
    case 4:
      currentMillis = millis();
      if (currentMillis - loopStartMillis > (1200000)) {
          winderState = 0;
      }
    }
}

void setup() {
  
  Serial.begin(9600);
  pinMode(sensorPin,INPUT_PULLUP);
  sensorValue = analogRead(sensorPin);
  isSwitchOn = sensorValue == 1023 ? true : false;
  for (int thisRelay = 0; thisRelay < relayCount; thisRelay++) {
    pinMode(relayPins[thisRelay], OUTPUT);
  }
}

void loop() {
  sensorValue = analogRead(sensorPin);
  isSwitchStateChanged = sensorValue < 1022 ? isSwitchOn : !isSwitchOn;
  if (isSwitchStateChanged) {
    if (isSwitchOn) {
      stopMotor();