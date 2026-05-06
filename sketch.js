var mode = 0;
var chicken
var cluck
let startTime = 0;
let duration = 1.5
let playing = false;
var fft
var midX 
var midY 
var counter = 0
var interval = 0;
var cluckStart = false;
var scaleFac
var scaleX
var scaleY
var point1
var point2
var myRadio
var loveJSON
var adJSON
var lifeJSON
var j
var p
let title1
let advice
let love 
let life 
var t
var u
var restart
var delay
var sonic

function preload() {
  chicken = loadImage('pngegg.png');
  cluck = loadSound('chickennoise.mp3')
  sonic = loadSound('chickennoise.mp3')
  adJSON = loadJSON("https://api.adviceslip.com/advice")
  loveJSON = loadJSON("https://api.adviceslip.com/advice/search/love")
  lifeJSON = loadJSON("https://api.adviceslip.com/advice/search/life")
}

function mousePressed() {
  if(mode==1){
  playing = true;
  }
 t = round(random(0,10))
 u = round(random(0,4)) 
}


function setup() {
  createCanvas(windowWidth, windowHeight)
  splash = new Splash();
  
    midX = width/2
  midY = height/2
  interval = random(2 * 60, 6 * 60)
  
  scaleFac = min(width, height)
  
  point1 = midX - 0.21 * scaleFac - width/6
  point2 = midY - 0.2 * scaleFac - height/12
  
  myRadio = createRadio();
  myRadio.position((point1 - (midX/2)/3) + 10, (height - (point2 - (midY/2)/3))-(midX/3)+30)
  myRadio.size(midX/3, midX/3)
  myRadio.option('Advice<p>');
  myRadio.option('Life<p>');
  myRadio.option('Love<p>');
  myRadio.hide()
 j = myRadio.value()  
  
  restart = createButton('deselect')
  restart.position((point1 - (midX/2)/3) + 10, (height - (point2 - (midY/2)/3))-(midX/3)+midX/3)
  restart.mousePressed(disableRadio);
  restart.hide()
 }

function draw() {
  if (mouseIsPressed == true && splash.update() == true) {
    mode = 1;
  }
  
  if (mode == 1) {
    splash.hide();
    
    background(255, 230, 0);


title1 = 'What would you like your life changing fortune to be about?'
advice = adJSON.slip.advice
love = loveJSON.slips[u].advice
life = lifeJSON.slips[t].advice 
 let j = myRadio.value() 

    
 if(j=='Advice<p>'){
   p = advice
 }
 else if(j=='Life<p>'){
   p = life
 }
else if(j=='Love<p>'){
   p = love
 }
 else{
   p = title1
 }
  speech(p)
    
    
    if (mouseIsPressed == true) {
    sonicCluck();
  } else {
   normalCluck() ;
  }
    
    
    
  cluckStart = false;
 
  header()
  chick()
    
   fill(255)
  strokeWeight(2)
  square(point1 - (midX/2)/3, (height - (point2 - (midY/2)/3))-(midX/3), midX/3 )
    fill(0)
  strokeWeight(0)
  textStyle(BOLD)
  textAlign(CENTER)
  textSize(midX/25)
  text('Choose Wisely', point1 - (midX/2)/3 + 5, (height + 5 - (point2 - (midY/2)/3))-(midX/3), midX/3, midX/3)
    myRadio.show()
    restart.show()

  } 
}


function normalCluck(){
  counter = counter + 1
    
    if (counter >= interval){
      counter = 0;
      interval = random(2 * 60, 5 * 60);
      cluckStart = true;
    }

  startTime = random(0, mouseY/height * 5);
  if (playing==true && cluckStart == true) {
    cluck.play()
    cluck.amp(0.4)
    cluck.jump(startTime, 1.5)
  }
  
  
}

function chick(){
  
  
 image(chicken, midX - 0.25 * scaleFac, midY - 0.25 * scaleFac, 0.5*scaleFac, 0.5*scaleFac, 0, 0, chicken.width, chicken.height, CONTAIN);

}

function speech(p){
  
  let beak1 = midX - 0.21 * scaleFac
  let beak2 = midY - 0.2 * scaleFac
  let point1 = beak1 - width/6
  let point2 = beak2 - height/12
  let triFac = scaleFac * 0.1

  
  fill(255)
  noStroke()
  triangle(point1 - triFac, point2 + triFac, midX/2, midY/2, beak1, beak2)
  ellipse(point1, point2, midX/2, midY/2)  
  
  fill(0)
  textStyle(ITALIC)
  textAlign(CENTER)
  textSize(scaleFac/40)
  text(p, point1 - (midX/2)/3, point2 - (midY/2)/3, midX/3, midY/3)
  
}
           

function header(){
  
 let title1 = 'World Famous Free Range'
 let title3 = 'Psychic Chicken'
  
  fill(255);
  textAlign(CENTER)
  stroke(0);
  strokeWeight(4);
  textStyle(BOLD)
  textSize(scaleFac/15)
  text(title1, 0 , 0, width, midY);
  
  fill(255);
  stroke(0);
  strokeWeight(4);
  textStyle(ITALIC)
  textSize(scaleFac/15)
  text(title3, 0, 40, width, midY);
}

function disableRadio() {
  myRadio.selected('')
}

function sonicCluck(){
  let reverb = new p5.Reverb()
    sonic.play()
    sonic.amp(0.4)
    sonic.jump(4.45, 0.5)
    reverb.process(sonic, 1, 2)
  
}

