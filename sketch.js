
//!!
//disattivare adBlock per il corretto funzionamento

let tt = 'Happy Halloween';
let tt2 = 'Quanto sei zuccone? say Boooooo'
let tt3 = '- ZuccoMetro'
let tt4 = 'Press enter for result'
let mysong;
let risataSong;
let goodSong;
let badSong;

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

//score
let candyImage;
let fantasmaImage;

///////

function preload() {
  bg = loadImage("./assets/bg.png");
  zuccaImage = loadImage("./assets/zucca.png");
  zuccaSad = loadImage("./assets/zucca2.png");
  eyeImage = loadImage("./assets/lightEyes.png");
  candyImage = loadImage("./assets/candy.png");
  fantasmaImage = loadImage("./assets/fantasma.png");
  mySong = loadSound("./assets/base.mp3");
  risataSong = loadSound("./assets/risataSong.mp3");
  goodSong = loadSound("./assets/goodjohn-cena.mp3");
  badSong = loadSound("./assets/no.mp3");
}

///////

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Suono: analyzer allows to perform analysis on a sound file
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
  analyzer.setInput(risataSong);
  //controllo volume
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

let a;

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
  hvol = map(vol, 0, 1, 0, rH);
  //punteggio ZuccoMetro
  if (hvol > 100) {
    a = 1;
  } else {
    a = 0;
  }

  //testo
  textAlign(CENTER);
  fill(255);
  //titolo
  textSize(60);
  textFont("Creepster");
  text(tt, width / 2, height / 8);

  //tasto invio
  if (keyIsDown(ENTER)) {

    if (a === 1) {
      mySong.stop();
      goodSong.play();
      image(candyImage, width / 2, height / 2.5, candyImage.width / 2.5, candyImage.height / 2.5);
      textSize(20);
      textFont("Source Sans Pro");
      text('Score:  GoooooD', width / 2, height / 1.5);
      text('La tua zuccaggine ti ha fatto guadagnare delle caramelle', width / 2, height / 1.4);
      text('Unisciti anche tu al lato oscuro ;)', width / 2, height / 1.3);
      noLoop();
    } else {
      mySong.stop();
      badSong.play();
      image(fantasmaImage, width / 2, height / 2.5, fantasmaImage.width / 1.5, fantasmaImage.height / 2);
      textSize(20);
      textFont("Source Sans Pro");
      text('Score:   Evil', width / 2, height / 1.5);
      text('Non sei abbastanza zuccone', width / 2, height / 1.4);
      text('Sei stato selezionato per vincere un kg di sale x)', width / 2, height / 1.3);
      noLoop();
    }

  } else {
    push();
    translate(width / 2, height / 2);
    rotate(180);
    //barra grigia
    fill(230, 230, 230, 100);
    rect(width / 3.5, height / 7 - 300, rW, rH);
    //barra arancio
    fill(255, 173, 51, 200);
    rect(width / 3.5, height / 7 - 300, rW, hvol * 1.5);
    pop();


    //sottotitolo
    textSize(20);
    textFont("Source Sans Pro");
    text(tt2, width / 2, height / 5);
    text(tt3, width / 5.2, height / 2.2);
    text(tt4, width / 5, height / 1.2);

    for (let i = 0; i < myEyeArray.length; i++) {
      myEyeArray[i].run();
    }

    for (let i = 0; i < myZuccaArrey.length; i++) {
      myZuccaArrey[i].zrun();
    }
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
