// motor control pins
int directionPin1 = 12;
int pwmPin1 = 3;
int brakePin1 = 9;
int directionPin2 = 13;
int pwmPin2 = 11;
int brakePin2 = 8;
// pwm work duty
int pwmWD = 100;
//boolean to switch direction
bool directionState;

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

void startMotors () {
  //write direction to the direction pin (13)
  directionState = winderState == 1 ? 0 : 1;
  digitalWrite(directionPin1, directionState);
  digitalWrite(directionPin2, directionState);

  //set work duty for the motor
  analogWrite(pwmPin1,pwmWD);
  analogWrite(pwmPin2,pwmWD);
}
void stopMotors () {
  //set work duty for the motor
  analogWrite(pwmPin1,0);
  analogWrite(pwmPin2,0);

  //activate breaks
  digitalWrite(brakePin1, HIGH);
  digitalWrite(brakePin2, HIGH);

  delay(100);
  //release breaks
  digitalWrite(brakePin1, LOW);
  digitalWrite(brakePin2, LOW);
}

void doLoop() {
    switch (winderState) {
    case 0:  // initialize the state timer
      Serial.println("init");
      //write a low state to the direction pin (13)
      loopStartMillis = millis();
      winderState++;
      Serial.println("Done init");
      break;
    case 1:  // start forward state
      Serial.println("Forward");
      startMotors();
      winderState++;
      Serial.println("Done transitioning to Forward");
      break;
    case 2:  // waiting for forward to end
      Serial.println("waiting for forward to end");
      currentMillis = millis();
      if (currentMillis - loopStartMillis > (3 * 60 * 1000)) { // are we at end of foward motion?
        stopMotors();
        winderState++;
        Serial.println("Done transitioning to End of Forward");
      }
      break;
    case 3:  // starting reverse state
      Serial.println("reverse");
      startMotors();
      winderState++;
      Serial.println("done starting reverse");
      break;
    case 4:  // waiting for reverse to end
      Serial.println("waiting for reverse to end");
      currentMillis = millis();
      if (currentMillis - loopStartMillis > (6 * 60 * 1000)) {{ // are we at end of reverse motion?
        stopMotors();
        winderState++;
        Serial.println("end of reverse");
      }
      break;
    case 5:  // waiting for loop to end
      currentMillis = millis();
      if (sample++ % 10000 == 0) {
       Serial.println((currentMillis - loopStartMillis) / 1000);
      }
      if (currentMillis - loopStartMillis > (20 * 60 * 1000)) {
        winderState = 0;
      }
      break;

    }
  }
}

void setup() {
  
  Serial.begin(9600);
  //define pins
  pinMode(directionPin1, OUTPUT);
  pinMode(pwmPin1, OUTPUT);
  pinMode(brakePin1, OUTPUT);
  pinMode(directionPin2, OUTPUT);
  pinMode(pwmPin2, OUTPUT);
  pinMode(brakePin2, OUTPUT);
  sensorValue = analogRead(sensorPin);
  isSwitchOn = sensorValue > 900 ? true : false;
  Serial.print("in setup, isSwitchOn = ");
  Serial.println(isSwitchOn);
}

void loop() {

  sensorValue = analogRead(sensorPin);
  isSwitchStateChanged = isSwitchOn ? 
                          sensorValue < 900 ? true : false :
                          sensorValue >= 900 ? true : false;
  // Serial.print("start of loop, sensorValue = ");
  // Serial.println(sensorValue);
  // Serial.print("start of loop, isSwitchOn = ");
  // Serial.println(isSwitchOn);
  // Serial.print("isSwitchStateChanged = ");
  // Serial.println(isSwitchStateChanged);
  // delay(500);
  if (isSwitchStateChanged) {
    //  Serial.println("Switch state changed");
     // delay(500);
    if (isSwitchOn) {
      // switch was on and it's now off
      Serial.println("switch was on and it's now off");
      stopMotors();
      Serial.println("Just finished calling stop Motors");
      // delay(500);
    }
    else {
      // switch was off and it's now on
      Serial.println("switch was off and it's now on");
      winderState = 0; // restart
      // delay(500);
    }
  }
  isSwitchOn = sensorValue > 900;
  if (isSwitchOn) {
    // Serial.println("Switch is on... calling doLoop");
    doLoop();
  }
  else {
    Serial.println("Switch is of... not calling doLoop");
  }
}