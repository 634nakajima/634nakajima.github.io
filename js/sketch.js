var rr;
var rx;
var ry;
var rp;
var rn = 4;
var mute = false;
var x, y;
var fontRegular;
var iconM, iconP, icon;

function preload() {
	var canvas = createCanvas(windowWidth, windowWidth/3);
	canvas.parent("jumbo");
	fontRegular = loadFont("./assets/digital-7i.ttf");
  mySound = loadSound('./assets/Furin.mp3');
	iconM = loadImage('./assets/mute.png');
	iconP = loadImage('./assets/playing.png');
	icon = iconP;
}

function setup() {
	textFont(fontRegular);
	strokeWeight(4);
	rr = new Array(rn);
	rx = new Array(rn);
	ry = new Array(rn);
	rp = new Array(rn);

	for(var i=0; i<rn; i++) {
		rp[i] = false;
		rr[i] = 0-random(200);
		rx[i] = random(windowWidth/8,windowWidth*7/8);
		ry[i] = random(windowWidth/15,windowWidth*4/15);
	}
	textAlign(CENTER);
}

function draw() {
	background('#303030');
	drawRipples();
	drawName();
	image(icon, windowWidth*14/15-20, windowWidth*(1/3-1/15),
		  windowWidth/17, windowWidth/17);
}

function drawRipples() {
	push();
	noFill();
	for(var i=0; i<rn; i++) {
		var a = 250*6*(windowWidth/6-rr[i])/windowWidth;
		stroke(180-random(60),200-random(40),250-random(20),a);
		strokeWeight(3);
		if(rr[i]>0) {
			ellipse(rx[i],ry[i], rr[i], rr[i]);
			playBell(i);
		}
		strokeWeight(2);
		if(rr[i]>20)
			ellipse(rx[i], ry[i], rr[i]-20, rr[i]-20);
		rr[i] = rr[i]+1;
		if(rr[i] > windowWidth/6) {
			rr[i] = -100-random(400);
			rp[i] = false;
			rx[i] = random(windowWidth/8,windowWidth*7/8);
			ry[i] = random(windowWidth/15,windowWidth*4/15);
		}
	}
	pop();
}

function drawName() {
	push();
	stroke('#00dd00');
	fill('#00dd00');
	strokeWeight(1);
	textSize(windowWidth/8);
	text('634.Nakajima', width/2, height*4/7);
	textSize(windowWidth/12);
	text('web portfolio', width/2, height*7/9);
	pop();
}

function playBell(n) {
	if(mute) return;
	if(rp[n]) return;
	var rate = 1.2-(ry[n]*3/windowWidth);
	var pan = -1 + 2*rx[n]/windowWidth;
	mySound.setVolume(0.1);
	mySound.rate(rate);
	mySound.pan(pan);
	mySound.play();
	rp[n] = true;
}
 
function windowResized() {
	var canvas = resizeCanvas(windowWidth, windowWidth/3);
	for(var i=0; i<5; i++) {
		//rr[i] = windowWidth/16;
	}
	textSize(windowWidth/8);
}

function mousePressed(){
	x=mouseX;
	y=mouseY;
	if(y>windowWidth/3) return;

	if(x>windowWidth*14/15-20 && windowWidth*(1/3-1/15)) {
		if(mute) {
			icon = iconP;
			mute = false;
		}
		else {
			icon = iconM;
			mute = true;
		}
	}
	var rate = 1.2-(y*3/windowWidth);
	mySound.setVolume(0.1);
	mySound.rate(rate);
	//mySound.play();
}