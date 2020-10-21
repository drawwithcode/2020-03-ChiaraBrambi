let tt  = 'Happy Halloween';
let tt2 ='Treak or Treat... do you feel lucky?'
let mysong;
let volume = 0;

let zuccaImage;
let eyeImage;

let myZuccaArrey = [];
let myEyeArray = [];

///////

function preload() {
zuccaImage = loadImage("./assets/zucca.png");
eyeImage = loadImage ("./assets/lightEyes.png");
mySong = loadSound("./assets/base.mp3");
}

///////

function setup() {
  createCanvas(windowWidth, windowHeight)
  frameRate(7); // Attempt to refresh at starting FPS
//Suono The analyzer allows to perform analysis on a sound file
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
    mySong.loop();

//crate object
    for (let i = 0; i < 50; i++) {
      myEyeArray.push(new Occhi ());
  }
}


function draw() {
// get the volume and remap it to a bigger value
    volume = analyzer.getLevel();
    volume = map(volume,0,1,0,5);
    background(0);
    imageMode(CENTER);
    ellipseMode(CENTER);
  //testo
    textAlign(CENTER);
    fill(255);
  //titolo
    textSize(60);
    textFont("Creepster");
      text(tt, width /2, height /8);
  //sottotitolo
    textSize(20);
    textFont("Source Sans Pro");
        text(tt2, width /2, height /5);

      for(let i = 0; i < myEyeArray.length; i++) {
        myEyeArray[i].updatePosition();
        myEyeArray[i].display();
      }
}


class Occhi{
  constructor() {
    this.x= random(width);
    this.y= random(height);
    this.w= random(10,eyeImage.width/5);
    this.h= random(10,eyeImage.height/10);
    this.speed = 1;
  }

  display() {
     image(eyeImage, this.x, this.y, this.w, this.h);
   }

   updatePosition() {
     this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
   }

}
