#pragma strict

public var enemyType:enemyTyp;
private var audioCont:AudioController;
/*this is the attack area of declarations*/
public var attackCollider: GameObject; //this is the enemies attacking collisionbox (enemyHand) drag it in in Unity


public var patrolMax:float = 50;
public var engageRange:float = 15;
public var disengageRange:float = 20;
public var specialRange:float = 14;
public var attackRange:float = 5;
public var stopRange:float = 4;
public var targetPlayer:GameObject;
public var forwardSpeed:float = .05;
public var x:float;

var anim: Animator;

private var patrolNum:float = 0; 
private var facingRight:boolean = true;
private var playerDistance:float = 0;
private var engaged:boolean = false;
private var attacking:boolean = false;

public var attackCD:float = 200;
private var currAttackCD:float = 0;
public var specialCD:float = 400;
private var currSpecialCD:float = 0;

public var maxHealth:float = 20;
private var currHealth:float = 20;
//delays to keep common sounds from playing too fast
//private var soundDelay:int = 30;
//private var currSoundD:int = 0;
//time delay for taking damage from player
public var timeDelay:float = 300;
private var currDelay:float = 0;

var goHadoken:GameObject;
var goTide:GameObject;
var goPunch:GameObject;
//HEALTH

//private var enNameArr:Array = [red, yellow, blue, bookDragon, bookBat, bush, flyTrap, water];
//red, yellow, blue, bookDragon, bookBat, bush, flyTrap, water

//unused jump things
//private var onGround:boolean = false;
public var jumpspeed:float = 5;

enum enemyTyp{
	redWiz, 
	yellowWiz, 
	blueWiz, 
	whiteWiz,
	bookDragon, 
	bookBat, 
	bush, 
	flyTrap, 
	water
}

function Start () {
	targetPlayer=GameObject.Find("Player");
	audioCont = targetPlayer.GetComponent(AudioController);
	x = transform.localScale.x;
	setupType();
	anim = this.gameObject.GetComponent(Animator);
}
function setupType(){
	/*
	redWiz, 
	yellowWiz, 
	blueWiz,
	whiteWiz, 
	bookDragon, 
	bookBat, 
	bush, 
	flyTrap, 
	water*/
	attackCollider.GetComponent(DealPlayerDamage);
	switch(enemyType){
	case enemyType.redWiz:
	  	maxHealth = 40;
	  	//setStats(/*stuuuuuff*/);
	  	//load appropriate animation(s)
	  break;
	case enemyType.yellowWiz:
	  	maxHealth = 50;
	  break;
	case enemyType.blueWiz:
	  	maxHealth = 70;
	  break;
	case enemyType.whiteWiz:
	  	maxHealth = 100;
	  break;
	case enemyType.bookDragon:
	  	maxHealth = 30;
	  break;
	case enemyType.bookBat:
	  	maxHealth = 10;
	  break;
	case enemyType.bush:
	  	maxHealth = 40;
	  break;
	case enemyType.flyTrap:
	  	maxHealth = 60;
	  break;
	case enemyType.water:
	  	maxHealth = 50;
	  break;
	default:
	  	maxHealth = 50;
	  break;
	}
	currHealth = maxHealth;
}
//call if you want to change several base stats on one line.
function setStats(maxHe:float, patrolM:float, attackR:float, stopR:float, forSpeed:float, attCD:float){
	
	maxHealth = maxHe;
 	patrolMax = patrolM;
 	attackRange = attackR;
 	stopRange = stopR;
 	forwardSpeed = forSpeed;
 	//jumpspeed:float = 5;
	attackCD = attCD;
}
function Update () {

	if(engaged){
		//if player is not at least within disengageRange, leave and go back to 
		updEngage();
		if (playerInRange(disengageRange)==false) {
			disengage();//engaged = false;
		}
	}else{
		patrol();
		if(playerInRange(engageRange) /*player in range*/){
			engage();
			//do whatever one time thing happens when they start to chase. Like a sound or something
		}
	}
	updCooldowns();
	currDelay++;
}

function patrol() {
	if(facingRight){
		if(patrolNum < patrolMax){
			patrolNum+=1;
			moveRight();
		}else{
			turnAround();
		}
	}else {
		if(patrolNum > -patrolMax){
			patrolNum -=1;
			moveLeft();
		}else{
			turnAround();
		}
	}
}
//turn around for patrol code
function turnAround(){
	facingRight = !facingRight;
	//change image
}

function moveRight(){
	transform.localScale.x = x;
	transform.position.x += Vector3.right.x* forwardSpeed;
}

function moveLeft(){
	transform.localScale.x = -x;
	transform.position.x += Vector3.left.x* forwardSpeed;
}

function updEngage(){
	//if player is in specialRange and specialCD is ready
	if (playerInRange(attackRange) && (currAttackCD >= attackCD) && !attacking){
	//shmanimation 2
	
		anim.SetBool("isAttacking", true);
	
		attack();
		anim.SetBool("isAttacking", false);
		//chompAttack();
	}else if (!playerInRange(stopRange)){
	//shmanimation 2
		chase();/*this is if the enemy isn't super close to the player*/
	}
}
//returns a boolean for if the player is within the engageRange of this object
function playerInRange(rangeThreshold:float):boolean{
	var ret:boolean;
	playerDistance = Vector3.Distance(this.transform.position, targetPlayer.transform.position);
	
	if(playerDistance < rangeThreshold){
		ret = true;
	}else{
		ret = false;
	}
	return ret;
}
function engage() {
	Debug.Log("engaging ");
	
	engaged = true;
}
function disengage(){
	engaged = false;
	Debug.Log("disengaging ");
	//move back to patrol area first maybe
}

function updCooldowns(){
	currAttackCD+=1;
	currSpecialCD+=1;
	/*
	if(currAttackCD > attackCD){
		currAttackCD = attackCD;
	}
	if(currSpecialCD > specialCD){
		currSpecialCD = specialCD;
	}*/
}
function attack(){

	//Debug.Log("attacking ");
	attacking = true;
	//shmanimation 1
	currAttackCD = 0;
	switch(enemyType){
	case enemyType.redWiz:
	  	extendedPunch();
	  break;
	case enemyType.yellowWiz:
	  	Hadoken();
	  break;
	case enemyType.blueWiz:
	  	Wave();
	  break;
	case enemyType.whiteWiz:
	  	Wave();
	  break;
	case enemyType.bookDragon:
	  	defaultAttack();
	  break;
	case enemyType.bookBat:
	  	defaultAttack();
	  break;
	case enemyType.bush:
		audioCont.playEnemySFX("bushAttack");
	 	//defaultAttack();
	  break;
	case enemyType.flyTrap:
	  	defaultAttack();
	  break;
	case enemyType.water:
	  	defaultAttack();
	  break;
	default:
		defaultAttack();
	  break;
	}
	attacking = false;
	//shmanimation 1
	//do the attack stuff
}
function defaultAttack(){
	//play attack animation
	//play attack sound
	var tempRange:float = attackRange/4;
	attackCollider.transform.localScale.x +=tempRange;
	yield WaitForSeconds(.03);
	attackCollider.transform.localScale.x +=tempRange;
	yield WaitForSeconds(.03);
	attackCollider.transform.localScale.x +=tempRange;
	yield WaitForSeconds(.03);
	attackCollider.transform.localScale.x +=tempRange;
	yield WaitForSeconds(.03);
	attackCollider.transform.localScale.x -=tempRange;
	yield WaitForSeconds(.01);
	attackCollider.transform.localScale.x -=tempRange;
	yield WaitForSeconds(.01);
	attackCollider.transform.localScale.x -=tempRange;
	yield WaitForSeconds(.01);
	attackCollider.transform.localScale.x -=tempRange;
	yield WaitForSeconds(.01);
}


//punch moves for use from bosses
//this will be the normal Punch Attack
function normalPunch(){
	attackCollider.transform.localPosition.x+=5;
	yield WaitForSeconds(.2);
	attackCollider.transform.localPosition.x-=5;


}

function extendedPunch(){
	//play attack animation
	//play attack sound
	yield WaitForSeconds(1.3);
	var goTemp:GameObject = Instantiate(goPunch,attackCollider.transform.position, Quaternion.identity);
	if(this.transform.localScale.x == -x)
		{
			goTemp.transform.localScale.x = -x;
		}
	attackCollider.transform.localPosition.x+=1;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x+=1;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x+=1;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x+=1;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	
	attackCollider.transform.localPosition.x-=1;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x-=1;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x-=1;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x-=1;
	Destroy(goTemp);
	yield WaitForSeconds(.1);
	
	
}
function Hadoken(){
	//play attack animation
	yield WaitForSeconds(1.3);
	var goTemp:GameObject = Instantiate(goHadoken,attackCollider.transform.position, Quaternion.identity);
	if(this.transform.localScale.x == -x)
		{
			goTemp.transform.localScale.x = -x;
		}
	//play attack sound
	attackCollider.transform.localPosition.x+=1;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.05);
	attackCollider.transform.localPosition.x+=1;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.05);
	attackCollider.transform.localPosition.x+=1;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.05);
	attackCollider.transform.localPosition.x+=1;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.05);
	attackCollider.transform.localPosition.x+=1;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.05);
	attackCollider.transform.localPosition.x+=1;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.05);
	attackCollider.transform.localPosition.x+=1;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.05);
	attackCollider.transform.localPosition.x-=7;
	Destroy(goTemp);
}
function Wave(){
	//play attack animation
	//play attack sound
	yield WaitForSeconds(1.3);
	var goTemp:GameObject = Instantiate(goTide,attackCollider.transform.position, Quaternion.identity);
	if(this.transform.localScale.x == -x)
		{
			goTemp.transform.localScale.x = -x;
		}
	attackCollider.transform.localScale.y+=1;
	attackCollider.transform.localPosition.x+=2;
	goTide.transform.position = attackCollider.transform.position;
	//goTide.goTide.go;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x+=2;
		goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x+=2;
		goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x+=2;
		goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x+=2;
		goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x+=2;
		goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x+=2;
		goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x-=14;
	Destroy(goTemp);

	attackCollider.transform.localScale.y-=1;
	
}


function chase(){

	if(this.transform.position.x<targetPlayer.transform.position.x)
	{
		moveRight();
	}
	if(this.transform.position.x>targetPlayer.transform.position.x)
	{
		moveLeft();
	}
	
	if(  (this.transform.position.y-targetPlayer.transform.position.y) < -2 )//this is below player
	{
		Debug.Log("want to jump");
		//jump(); //jumping has no ground restriction so they essentially fly. could ad for a particular boss
		//attack up or shake off
	}
	if(  (this.transform.position.y-targetPlayer.transform.position.y) > 2)//this is above player
	{
		//Debug.Log("stomp");
		//attack downward?
	}
		
	//Debug.Log("attempting to move ");
	//if player is to the right, move to the right
	//if player is to the left, move to the left
	//if player is high enough up to warrant it, jump
}
//jump not currently used
function jump(){
	this.rigidbody2D.velocity.y += jumpspeed;
}

function OnTriggerEnter2D(t: Collider2D)
{
	if(t.name=="Hand")
	{
		if(currDelay >= timeDelay){
			currDelay = 0;
			takeDamage(10);
		}
	}//if we want to do different damages, change the name of the collider and add else ifs for those t.name s
}
function OnTriggerExit2D(t:Collider2D)
{
	
}
function takeDamage(dam:float){
		currHealth-=dam;//all attacks do 10 damage currently
		Debug.Log("Enemy killed by player Hand");
		if(currHealth <=0){
			Death();
		}
}

function Death()
{
	currAttackCD=0;//try to prevent last second attacking and moving
	forwardSpeed=0;
	switch (enemyType) {
		case enemyType.redWiz:
			targetPlayer.GetComponent(PlayerRelated).playerHealthUp(3);
			targetPlayer.GetComponent(PlayerRelated).redSwitch=true;
			//turn on red platforms
	  	break;
		case enemyType.yellowWiz:
			targetPlayer.GetComponent(PlayerRelated).playerHealthUp(3);
			targetPlayer.GetComponent(PlayerRelated).yellowSwitch=true;
			//turn on yellow platforms
	  	break;
		case enemyType.blueWiz:
			targetPlayer.GetComponent(PlayerRelated).playerHealthUp(6);
			targetPlayer.GetComponent(PlayerRelated).blueSwitch=true;
			//turn
		case enemyType.whiteWiz:
			//win game (I lost the game)
	  	break;
		default:
	  		targetPlayer.GetComponent(PlayerRelated).playerHealthUp(1);
	  	break;
	}
	//play death animation
	//play death sound
	//blink

	
	Destroy(this.gameObject);
}

