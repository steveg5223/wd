int directionPin1 = 12;
int pwmPin1 = 3;
int brakePin1 = 9;
int directionPin2 = 13;
int pwmPin2 = 11;
int brakePin2 = 8;

// where we are in the loop
int loopState = 0;

// pwm work duty
int pwmWD = 70;

//boolean to switch direction
bool directionState;

void setup() {
  
//define pins
pinMode(directionPin1, OUTPUT);
pinMode(pwmPin1, OUTPUT);
pinMode(brakePin1, OUTPUT);
pinMode(directionPin2, OUTPUT);
pinMode(pwmPin2, OUTPUT);
pinMode(brakePin2, OUTPUT);

}

void loop() {

//write a low state to the direction pin (13)
digitalWrite(directionPin1, LOW);
digitalWrite(directionPin2, LOW);


//set work duty for the motor
analogWrite(pwmPin1,pwmWD);
analogWrite(pwmPin2,pwmWD);


delay(5000);

//activate breaks
digitalWrite(brakePin1, HIGH);
digitalWrite(brakePin2, HIGH);

delay(500);
//release breaks
digitalWrite(brakePin1, LOW);
digitalWrite(brakePin2, LOW);

digitalWrite(directionPin1, HIGH);
digitalWrite(directionPin2, HIGH);

//set work duty for the motor
analogWrite(pwmPin1,pwmWD);
analogWrite(pwmPin2,pwmWD);

delay(5000);
//set work duty for the motor to 0 (off)
analogWrite(pwmPin1, 0);
analogWrite(pwmPin2, 0);

delay(50000);
}