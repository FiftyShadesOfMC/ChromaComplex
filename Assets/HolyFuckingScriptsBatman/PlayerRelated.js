#pragma strict

var maxHealth:int = 6;
var curHealth:int;
var maxEnergy:int = 10;
var curEnergy:int;
var energyResetTimer:float;
var energyResetValue:float;


var healthbar : GUITexture;
var specialbar: GUITexture;
var six : Texture2D;
var five : Texture2D;
var four : Texture2D;
var three : Texture2D;
var two : Texture2D;
var one : Texture2D;
var zero : Texture2D;
var spten :Texture2D;
var spnine :Texture2D;
var speight :Texture2D;
var spseven :Texture2D;
var spsix :Texture2D;
var spfive :Texture2D;
var spfour :Texture2D;
var spthree :Texture2D;
var sptwo :Texture2D;
var spone :Texture2D;
var spzero :Texture2D;

var redSwitch:boolean = true;
var blueSwitch:boolean = false;
var yellowSwitch:boolean = false;
var redPlatforms: GameObject[];
var bluePlatforms: GameObject[];
var yellowPlatforms: GameObject[];

var platRed:GameObject;
var platBlue:GameObject;
var platYellow:GameObject;

function Start () {
	curHealth = maxHealth;
	curEnergy = maxEnergy;
	energyResetTimer=energyResetValue;
	healthbar.transform.position.x=.01;
	healthbar.transform.position.y=.9;
	specialbar.transform.position.x=.01;
	specialbar.transform.position.y=.8;
}

function Update () {
	energyResetTimer-=Time.deltaTime;
	if(energyResetTimer<=0)
		{
			energyResetTimer=energyResetValue;
			playerEnergyUp(1);
		}
		
	if(redSwitch== true){
		//BroadcastMessage("platRed");
		for (var temp:GameObject in redPlatforms){
			temp.GetComponent(SpriteRenderer).enabled = true;
			temp.GetComponent(BoxCollider2D).enabled = true;
		}
		Debug.Log("BROADCAST");
	}
	if(blueSwitch==true){
		for (var temp:GameObject in bluePlatforms){
			temp.GetComponent(SpriteRenderer).enabled = true;
			temp.GetComponent(BoxCollider2D).enabled = true;
		}
		Debug.Log("Blue Switch is true");
	}
	if(yellowSwitch==true){
		for (var temp:GameObject in yellowPlatforms){
			temp.GetComponent(SpriteRenderer).enabled = true;
			temp.GetComponent(BoxCollider2D).enabled = true;
		}
		Debug.Log("Yellow Switch is true");
	}
}

function playerHealthDown(amount:int):void{
	this.curHealth -= amount;
	if(this.curHealth == 0){
		gameOver();
	}
	healthGUI();
}

function playerHealthUp(amount:int):void{
		this.curHealth += amount;
	if(this.curHealth>this.maxHealth)
	{
	curHealth=maxHealth;
	}
	healthGUI();

}
function healthGUI(){
	if(this.curHealth==1)
		{
			healthbar.texture = one;
		}
	if(this.curHealth==2)
		{
			healthbar.texture = two;
		}
	if(this.curHealth==3)
		{
			healthbar.texture = three;
		}
	if(this.curHealth==4)
		{
			healthbar.texture = four;
		}
	if(this.curHealth==5)
		{
			healthbar.texture = five;
		}
	if(this.curHealth==6)
		{
			healthbar.texture = six;
		}
}

function playerEnergyDown(amount:int):void{
	this.curEnergy -= amount;
	EnergyGUI();
}

function playerEnergyUp(amount:int):void{
	this.curEnergy += amount;
	if(this.curEnergy>this.maxEnergy)
		{
		this.curEnergy = maxEnergy;
		}
		EnergyGUI();
}
function EnergyGUI(){
if(curEnergy==0){
specialbar.texture = spzero;
}
if(curEnergy==1){
specialbar.texture = spone;
}
if(curEnergy==2){
specialbar.texture = sptwo;
}
if(curEnergy==3){
specialbar.texture = spthree;
}
if(curEnergy==4){
specialbar.texture = spfour;
}
if(curEnergy==5){
specialbar.texture = spfive;
}
if(curEnergy==6){
specialbar.texture = spsix;
}
if(curEnergy==7){
specialbar.texture = spseven;
}
if(curEnergy==8){
specialbar.texture = speight;
}
if(curEnergy==9){
specialbar.texture = spnine;
}
if(curEnergy==10){
specialbar.texture = spten;
}
}
function gameOver():void{
	var levelname:String;
	levelname = "mainmenu";
	Application.LoadLevel(levelname);
}



