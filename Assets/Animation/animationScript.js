#pragma strict

var Sprite : Sprite;

var headColor : Sprite;
var headMono : Sprite;
var torsoColor : Sprite;
var torsoMono: Sprite;
var uparmColor : Sprite;
var uparmMono : Sprite;
var lowarmColor :Sprite;
var lowarmMono : Sprite;
var handColor : Sprite;
var handMono: Sprite;
var uplegColor : Sprite;
var uplegMono : Sprite;
var lowlegColor: Sprite;
var lowlegMono : Sprite;





var redSwitch : boolean;
var blueSwitch : boolean;
var yellowSwitch : boolean;


var torso : GameObject;
var tArm : GameObject;
var lAmr : GameObject;
var bHiLeg : GameObject;
var bLoLeg : GameObject;
var fHiLeg : GameObject;
var fLoLeg : GameObject;
var hand : GameObject;
var head : GameObject;




function Start () {




}

function Update () {

	if (redSwitch == true){
		redHue();
	}

	if (blueSwitch == true){
		blueHue();
	
	}
	if (yellowSwitch == true){
		yellowHue();
	
	}
	if(redSwitch == false){
		redMono();
	
	}
	if(blueSwitch == false){
		blueMono();
	}
	if(yellowSwitch==false){
		yellowMono();
	}



}

function redMono(){

torso.GetComponent(SpriteRenderer).sprite = torsoMono;
	tArm.GetComponent(SpriteRenderer).sprite = uparmMono;
	lAmr.GetComponent(SpriteRenderer).sprite = lowarmMono;
	hand.GetComponent(SpriteRenderer).sprite = handMono;

}

function blueMono(){
	bHiLeg.GetComponent(SpriteRenderer).sprite = uplegMono;
	bLoLeg.GetComponent(SpriteRenderer).sprite = lowlegMono;
	fHiLeg.GetComponent(SpriteRenderer).sprite = uplegMono;
	fLoLeg.GetComponent(SpriteRenderer).sprite = lowlegMono;
}

function yellowMono(){
	head.GetComponent(SpriteRenderer).sprite = headMono;

}


function redHue(){
	
	
	torso.GetComponent(SpriteRenderer).sprite = torsoColor;
	tArm.GetComponent(SpriteRenderer).sprite = uparmColor;
	lAmr.GetComponent(SpriteRenderer).sprite = lowarmColor;
	hand.GetComponent(SpriteRenderer).sprite = handColor;
	
	Debug.Log("fucking red on you");

}

function blueHue(){
	bHiLeg.GetComponent(SpriteRenderer).sprite = uplegColor;
	bLoLeg.GetComponent(SpriteRenderer).sprite = lowlegColor;
	fHiLeg.GetComponent(SpriteRenderer).sprite = uplegColor;
	fLoLeg.GetComponent(SpriteRenderer).sprite = lowlegColor;

}

function yellowHue(){

	head.GetComponent(SpriteRenderer).sprite = headColor;

}