int directionPin1 = 12;
int pwmPin1 = 3;
int brakePin1 = 9;
int directionPin2 = 13;
int pwmPin2 = 11;
int brakePin2 = 8;

// where we are in the loop
int loopState = 0;
unsigned long currentMillis;
unsigned long loopStartMillis;
unsigned long forwardEndMillis;
unsigned long reverseEndMillis;
unsigned long pauseEndMillis;
unsigned long sample = 0;

// pwm work duty
int pwmWD = 100;

//boolean to switch direction
bool directionState;

void setup() {
  
Serial.begin(9600);
//define pins
pinMode(directionPin1, OUTPUT);
pinMode(pwmPin1, OUTPUT);
pinMode(brakePin1, OUTPUT);
pinMode(directionPin2, OUTPUT);
pinMode(pwmPin2, OUTPUT);
pinMode(brakePin2, OUTPUT);

}

void loop() {
// Serial.println("start of loop!");
  switch (loopState) {
    case 0:  // initialize the state timer
      Serial.println("init");
      //write a low state to the direction pin (13)
      loopStartMillis = millis();
      loopState++;
      Serial.println("Done init");
      break;
    case 1:  // start forward state
      Serial.println("Forward");
      //write a low state to the direction pin (13)
      digitalWrite(directionPin1, LOW);
      digitalWrite(directionPin2, LOW);

      //set work duty for the motor
      analogWrite(pwmPin1,pwmWD);
      analogWrite(pwmPin2,pwmWD);
      loopState++;
      Serial.println("Done transitioning to Forward");
      break;
    case 2:  // waiting for forward to end
      Serial.println("waiting for forward to end");
      currentMillis = millis();
      if (currentMillis - loopStartMillis > 5000) { // are we at end of foward motion?
        //set work duty for the motor
        analogWrite(pwmPin1,pwmWD);
        analogWrite(pwmPin2,pwmWD);

        //activate breaks
        digitalWrite(brakePin1, HIGH);
        digitalWrite(brakePin2, HIGH);

        delay(500);
        //release breaks
        digitalWrite(brakePin1, LOW);
        digitalWrite(brakePin2, LOW);
        loopState++;
      Serial.println("Done transitioning to End of Forward");
      }
      break;
    case 3:  // starting reverse state
      Serial.println("reverse");

      // set direction to reverse
      digitalWrite(directionPin1, HIGH);
      digitalWrite(directionPin2, HIGH);

      //set work duty for the motor
      analogWrite(pwmPin1,pwmWD);
      analogWrite(pwmPin2,pwmWD);
      loopState++;
      Serial.println("done starting reverse");
      break;
    case 4:  // waiting for reverse to end
      Serial.println("waiting for reverse to end");
      currentMillis = millis();
      if (currentMillis - loopStartMillis > 10500) {{ // are we at end of reverse motion?
        //set work duty for the motor
        analogWrite(pwmPin1,0);
        analogWrite(pwmPin2,0);

        //activate breaks
        digitalWrite(brakePin1, HIGH);
        digitalWrite(brakePin2, HIGH);

        delay(500);
        //release breaks
        digitalWrite(brakePin1, LOW);
        digitalWrite(brakePin2, LOW);
        loopState++;
        Serial.println("end of reverse");
      }
      break;
    case 5:  // waiting for loop to end
      currentMillis = millis();
      if (sample++ % 10000 == 0) {
       Serial.println((currentMillis - loopStartMillis) / 1000);
      }
      if (currentMillis - loopStartMillis > 600000) {
        loopState = 0;
      }
      break;

    }
  }
}