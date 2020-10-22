let tt = 'Happy Halloween';
let tt2 = 'Trick or Treat... do you feel lucky?'
let mysong;
let volume = 1;

let zuccaImage;
let myZuccaArrey = [];

let eyeImage, bg;
let myEyeArray = [];

///////

function preload() {
  bg = loadImage("./assets/bg.png");
  zuccaImage = loadImage("./assets/zucca.png");
  eyeImage = loadImage("./assets/lightEyes.png");
  mySong = loadSound("./assets/base.mp3");
}

///////

function setup() {
  createCanvas(windowWidth, windowHeight)
  //frameRate(2);

  //Suono The analyzer allows to perform analysis on a sound file
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);



  //crate object OCCHI
  for (let i = 0; i < 50; i++) {
    myEyeArray.push(new Occhi());
  }

  //crate object ZUCCA
  for (let i = 0; i < 1; i++) {
    myZuccaArrey.push(new Zucca());
  }
  mySong.play();
}


function draw() {
  // get the volume and remap it to a bigger value
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, zuccaImage.height / 2, zuccaImage.height); //map(value,start1,stop1,start2,stop2,[withinBounds])
  console.log(volume);
  push();
  imageMode(CORNER);
  background(bg);
  pop();

  imageMode(CENTER);
  ellipseMode(CENTER);

  //testo
  textAlign(CENTER);
  fill(255);
  //titolo
  textSize(60);
  textFont("Creepster");
  text(tt, width / 2, height / 8);
  //sottotitolo
  textSize(20);
  textFont("Source Sans Pro");
  text(tt2, width / 2, height / 5);

  for (let i = 0; i < myEyeArray.length; i++) {
    myEyeArray[i].updatePosition();
    myEyeArray[i].display();
  }

  for (let i = 0; i < myZuccaArrey.length; i++) {
    myZuccaArrey[i].zupdatePosition();
    myZuccaArrey[i].zdisplay();
  }
}


class Occhi {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.w = random(10, eyeImage.width / 10);
    this.h = random(10, eyeImage.height / 15);
    this.speed = 2;
  }

  display() {
    image(eyeImage, this.x, this.y, this.w, this.h);
  }

  updatePosition() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }
}


////////


class Zucca {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.w = zuccaImage.width / 2;
    this.h = zuccaImage.height / 2;
    this.size = volume;
    this.speed = 50;
  }

  zdisplay() {
    push();
    frameRate(2);
    image(zuccaImage, this.x, this.y, this.w, this.h * random(0.9, this.size));
    pop();
  }

  zupdatePosition() {
    this.x += this.speed;
    if (this.x < width / 2 * 0.95 || this.x > width / 2) {
      this.speed *= -1;
    }
    //
    // this.y +=  this.speed;
    // if(this.y < height/2*0.8 || this.y > height/2*1.2  )
    // {this.speed *= -1;}
  }
}



function mouseClicked() {
  //impostare espolosione
  //get pizel
  // espansione
  // impostare tre e false come finzioni esterne da leggere
  //impostare home per rigiocare?
  //foto riscordo ?
  //suoni mainstream
}
