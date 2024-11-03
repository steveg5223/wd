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
    // Serial.print("start of doLoop, winderState: ");
    // Serial.println(winderState);
    // Serial.print("loop time: ");
    // Serial.println((millis() - loopStartMillis) / 1000);
    // delay(500);
    switch (winderState) {
    case 0:  // initialize the state timer
      // Serial.println("initialize loop");
      activeRelay = 0;
      loopStartMillis = millis();
      winderState++;
      // Serial.println("Done init");
      break;
    case 1:  // start forward state
      // Serial.print("Starting forward motor #:");
      // Serial.println(activeRelay);
      startMotor();
      winderState++;
      // Serial.println("Done transitioning to Forward");
      // delay(1000);
      break;
    case 2:  // waiting for forward to end
    //  Serial.println("waiting for forward to end");
      currentMillis = millis();
      if (currentMillis - loopStartMillis > (300000)) { // are we at end of foward motion?
        stopMotor();
        // Serial.println("Done transitioning to End of Forward");
        // Serial.print("Starting forward motor #:");
        // Serial.println(activeRelay);
        // delay(1000);
        activeRelay = 1;
        startMotor();
        // Serial.println("Done transitioning to Forward");        
        delay(1000);
        winderState++;
      }
      break;
    case 3: // waiting for loop to end
      // Serial.println("in case 3");
      // Serial.print("(Start of state 3.  activeRelay: ");
      // Serial.println(activeRelay);
      currentMillis = millis();
      if (currentMillis - loopStartMillis > (600000)) {
        // Serial.println('(end of state 3.  activeRelay: ');
        // Serial.println(activeRelay);
          stopMotor();
          if (activeRelay == 0) {
          activeRelay = 1;          
        }
        else {
          winderState++;
        }
        // Serial.print("finished waiting for loop to end activeRelay: ");
        // Serial.println(activeRelay);
      }
      else {
        // Serial.print("Not ready to end state 3, loop time: ");
        // Serial.println((currentMillis - loopStartMillis));
        // Serial.print("Target end loop time: ");
        // Serial.println(60000);
        // delay(500);
      }
      break;
    case 4:
      // Serial.print("In state 4, loop time: ");
      // Serial.println((currentMillis - loopStartMillis));
      // Serial.print("Target end loop time: ");
      // Serial.println(120000);
      // delay(500);
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
  // Serial.print("in setup, isSwitchOn = ");
  // Serial.println(isSwitchOn);
  // delay(1000);
  // Serial.print("in setup, about to initialize relays");
  for (int thisRelay = 0; thisRelay < relayCount; thisRelay++) {
    pinMode(relayPins[thisRelay], OUTPUT);
  }
}

void loop() {
  sensorValue = analogRead(sensorPin);
  isSwitchStateChanged = sensorValue < 1022 ? isSwitchOn : !isSwitchOn;
  // Serial.print("start of loop, sensorValue = ");
  // Serial.println(sensorValue);
  // delay(500);
  // Serial.print("start of loop, isSwitchOn = ");
  // Serial.println(isSwitchOn);
  // Serial.print("isSwitchStateChanged = ");
  // Serial.println(isSwitchStateChanged);
  // delay(5000);
  if (isSwitchStateChanged) {
    //  Serial.println("Switch state changed");
     // delay(500);
    if (isSwitchOn) {
      // switch was on and it's now off
      // Serial.println("switch was on and it's now off");
      stopMotor();
      // Serial.println("Just finished calling stop Motor");
      // delay(500);
    }
    else {
      // switch was off and it's now on
      // Serial.println("switch was off and it's now on");
      winderState = 0; // restart
      // delay(500);
    }
  }
  isSwitchOn = sensorValue >= 1022;
  if (isSwitchOn) {
    // Serial.println("Switch is on... calling doLoop");
    doLoop();
  }
  else {
    // Serial.println("Switch is off... not calling doLoop");
  }
}