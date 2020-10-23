//!!
//disattivare adBlock per il corretto funzionamento


let tt = 'Happy Halloween';
let tt2 = 'Quanto sei zuccone? say Spookyyyyy'
let tt3 = '- ZuccoMetro'
let tt4 = 'Press x for resalt'
let mysong;
let risataSong;

//per ballonzolo zucca
let volSong = 0;
let molla;

//per zuccaggine level
let mic;
let rW, rH, hvol;

//per oggetti
let zuccaImage, zuccaSad, zuccaDisplay;
let myZuccaArrey = [];

let eyeImage, bg;
let myEyeArray = [];

///////

function preload() {
  bg = loadImage("./assets/bg.png");
  zuccaImage = loadImage("./assets/zucca.png");
  zuccaSad = loadImage("./assets/zucca2.png");
  eyeImage = loadImage("./assets/lightEyes.png");
  mySong = loadSound("./assets/base.mp3");
  risataSong = loadSound("./assets/risata.mp3");
}

///////

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Suono: analyzer allows to perform analysis on a sound file
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
  analyzer.setInput(risataSong);
//  volume = constrain(volume, 0, 1);
 mySong.amp(0.25);
  //parte musica
  mySong.loop();

  //microfono get: Create an Audio input
  mic = new p5.AudioIn();
  mic.start();

  //crate object OCCHI
  for (let i = 0; i < 50; i++) {
    myEyeArray.push(new Occhi());
  }

  //crate object ZUCCA
  for (let i = 0; i < 1; i++) {
    myZuccaArrey.push(new Zucca());
  }
}


function draw() {
  push();
  imageMode(CORNER);
  background(bg);
  pop();

  imageMode(CENTER);
  ellipseMode(CENTER);
 angleMode(DEGREES);
  noStroke();

  // get the volume and remap it to a bigger value
  volSong = analyzer.getLevel();
  molla = map(volSong, 0, 1, 1.2, 0.3);


  //microfono
  let vol = mic.getLevel();
  console.log(vol);
  rW = 50;
  rH = 300;
  hvol= map(vol, 0, 1,0,rH);
push();
translate(width/2,height/2);
rotate(180);
//barra grigia
fill(230, 230, 230,100);
rect(width/3.5, height/7-300, rW, rH);
//barra arancio
fill(255, 173, 51, 200);
  rect(width/3.5, height/7-300, rW, hvol*1.5);
pop();


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
  text(tt3, width / 5.2, height / 2.2);
  text(tt4, width / 5, height /1.2);

  for (let i = 0; i < myEyeArray.length; i++) {
    myEyeArray[i].run();
  }

  for (let i = 0; i < myZuccaArrey.length; i++) {
    myZuccaArrey[i].zrun();
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

  run() {
    this.updatePosition();
    this.display();
  }
}


////////


class Zucca {
  constructor() {
    this.x = width / 2;
    this.y = height / 1.9;
    this.w = zuccaImage.width / 2;
    this.h = zuccaImage.height / 2;
    this.speed = 50;
  }

  zdisplay() {
    push();
    frameRate(2);
    if (mouseIsPressed) {
      zuccaDisplay = image(zuccaImage, this.x, this.y, this.w, this.h * molla);
      risataSong.play();

    } else {
      console.log(molla);
    zuccaDisplay = image(zuccaSad, this.x, this.y, this.w, this.h * molla); //random(0.9, this.size)
      risataSong.stop();
    }
    pop();
  }

  zupdatePosition() {
    this.x += this.speed;
    if (this.x < width / 2 * 0.95 || this.x > width / 2) {
      this.speed *= -1;
    }
  }
  zrun() {
    this.zupdatePosition();
    this.zdisplay();

  }
}


function good() {

}

function bad() {

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
