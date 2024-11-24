// motor control pins
int relayPins[] = { 4, 7, 8, 12 };
long relayStopTimeMs[4] = {180000, 360000, 540000, 720000};
long loopStopTimeMs = 1200000;
int lastRelay = 4;
int activeRelay;

// loop state 
int winderState = 0;
unsigned long currentMillis;
unsigned long loopStartMillis;

// analog input for on/off switch
int sensorPin = A0;
int sensorValue = 0;
bool isSwitchOn;
bool isSwitchStateChanged;


void startMotor ( int relayToStart ) {
   digitalWrite(relayPins[relayToStart], HIGH);
}
void stopMotor () {
  Serial.println("in stopMotor, about to stop all relays");
  for (int thisRelay = 0; thisRelay < lastRelay; thisRelay++) {
    digitalWrite(relayPins[thisRelay], LOW);
  }
}

void doLoop() {
    long thisRelayStopMs;
    long currentLoopDurationMs;
    Serial.print("start of doLoop, winderState: ");
    Serial.print(winderState);
    Serial.print(" loop time: ");
    Serial.println((millis() - loopStartMillis) / 1000);
    switch (winderState) {
    case 0:  // initialize the state timer
      Serial.println("initialize loop");
      activeRelay = 0;
      loopStartMillis = millis();
      winderState++;
      Serial.print("In init starting motor #:");
      Serial.println(activeRelay);
      startMotor(activeRelay);
      Serial.println("Done init");
      break;
    case 1:  // start forward state
      currentMillis = millis();
      thisRelayStopMs = relayStopTimeMs[activeRelay];
      currentLoopDurationMs = currentMillis - loopStartMillis;
      Serial.print("waiting for forward to end, thisRelayStopMs: ");
      Serial.print(thisRelayStopMs, DEC);
      Serial.print(" waiting for forward to end, currentLoopDurationMs: ");
      Serial.println(currentLoopDurationMs);
      if (currentLoopDurationMs > thisRelayStopMs) { // are we at end of foward motion?
      Serial.print("End of motor run for motor: ");
      Serial.println(activeRelay);
        stopMotor();
        if (activeRelay < (lastRelay - 1)) {
          activeRelay++;
          Serial.print("Starting forward motor #:");
          Serial.println(activeRelay);
          delay(1000);
          startMotor(activeRelay);
          Serial.println("Done transitioning to Forward");        
          delay(1000);
        }
        else {
          Serial.println("moving to next state");
          winderState++;
        }
      }
      break;
    case 2: // waiting for loop to end
      Serial.println("waiting for loop to end");
      currentMillis = millis();
      if (currentMillis - loopStartMillis > loopStopTimeMs) {
          winderState = 0;
      }
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(sensorPin,INPUT_PULLUP);
  sensorValue = analogRead(sensorPin);
  isSwitchOn = sensorValue >= 1022 ? true : false;
  for (int thisRelay = 0; thisRelay < lastRelay; thisRelay++) {
    pinMode(relayPins[thisRelay], OUTPUT);
  }
}

void loop() {
  sensorValue = analogRead(sensorPin);
  isSwitchStateChanged = sensorValue < 1022 ? isSwitchOn : !isSwitchOn;
  if (isSwitchStateChanged) {
    if (isSwitchOn) {
      stopMotor();
    }
    else {
      winderState = 0; // restart
    }
  }
  isSwitchOn = sensorValue >= 1022;
  if (isSwitchOn) {
    doLoop();
  }
  else {
    Serial.println("Switch is off... not calling doLoop");
  }
}