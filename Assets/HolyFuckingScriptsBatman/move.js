#pragma strict
import XInputDotNetPure;
enum playerState{
	onLand,
	notOnLand
}
var playerCheck: playerState;	
var playerHealth: PlayerRelated;	//playerRelated is PlayerRelated.js

var buttonAPressed:boolean;
var buttonXPressed:boolean;
var buttonYPressed:boolean;
var buttonBPressed:boolean;
var buttonLTPressed:boolean;

var goHadoken:GameObject;
var goExtendedPunch: GameObject;
var goWave: GameObject;

private var canjump:boolean = true;
var forwardspeed :float = 7;
var jumpspeed : float;
var playerGravity: float = 1.5;
var velocity : Vector3;

var x:float;
var handx:float;
var sprintEnergyTimer:float;		//sprint energy is the timer for how long it takes for energy to roll off.
var floatHeight: float;     // Desired floating height.
var liftForce: float;       // Force to apply when lifting the rigidbody.
var damping: float;         // Force reduction proportional to speed (reduces bouncing).

var state: GamePadState;
var movement;
var target : Object;

var anima : Animator;
var playerAnima : Transform;

/*this is the attack area of declarations*/
var attackCollider: GameObject;



function Start () {
buttonAPressed = false;
buttonXPressed = false;
playerHealth = this.gameObject.GetComponent(PlayerRelated);
sprintEnergyTimer = 1.0;
x = transform.localScale.x;
handx = attackCollider.transform.localPosition.x;
playerAnima = transform.Find("PLAYER");
anima = playerAnima.GetComponent(Animator);
}

function Update () {

	state = GamePad.GetState(0);
	if(state.ThumbSticks.Left.X>.5)
		{
			moveRight();
		}
	if(state.ThumbSticks.Left.X<-.5)
		{
			moveLeft();
		}
	if(state.Buttons.A==ButtonState.Pressed&&buttonAPressed == false)
		{
			Jump();
			buttonAPressed = true;
		}
	if(state.Buttons.A == ButtonState.Released)
		{
			buttonAPressed = false;
		}
	if(state.Buttons.B==ButtonState.Pressed&&buttonBPressed==false)
		{
			
			if(attackCollider.transform.localPosition.x==handx&&playerHealth.curEnergy>0)
				{
				Debug.Log(playerHealth.yellowSwitch);
					if(playerHealth.yellowSwitch==true)
					{
						Hadoken();
						buttonBPressed = true;
						
					}
				}

		}
	if(state.Buttons.B==ButtonState.Released)
		{
	
			buttonBPressed = false;
		}
	if(state.Buttons.Y==ButtonState.Pressed&& buttonYPressed==false)
		{
			if(attackCollider.transform.localPosition.x==handx&&playerHealth.curEnergy>0)
				{
					Debug.Log(playerHealth.redSwitch);
				if(playerHealth.redSwitch==true)
					{
						buttonYPressed=true;
						extendedPunch();
					
					}
				}
		}
	if(state.Buttons.Y == ButtonState.Released)
		{
			buttonYPressed = false;
		}
	if(state.Buttons.X==ButtonState.Pressed	&& buttonXPressed==false)
		{
			if(attackCollider.transform.localPosition.x==handx&&playerHealth.curEnergy>0)
				{
					buttonXPressed = true;
					normalPunch();
				}
		}
	if(state.Buttons.X==ButtonState.Released)
		{
			buttonXPressed = false;
		}
	if(state.Triggers.Right>.5&&state.ThumbSticks.Left.X>.5&&playerHealth.curEnergy>0)
		{
			if(sprintEnergyTimer<=0)
				{
					playerHealth.playerEnergyDown(1);
					sprintEnergyTimer=1;
				}
			sprintEnergyTimer-=Time.deltaTime;	//drops the sprint timer, when that reaches 0 we will subtract 1 energy.
			sprintRight();
		}
		if(state.Triggers.Right>.5&&state.ThumbSticks.Left.X<-.5&&playerHealth.curEnergy>0)
		{
			if(sprintEnergyTimer<=0)
				{
					playerHealth.playerEnergyDown(1);
					sprintEnergyTimer=1;
				}
			sprintEnergyTimer-=Time.deltaTime;//drops the sprint timer, when that reaches 0 we will subtract 1 energy.
			sprintLeft();
		}
	if(state.Triggers.Right<.5)
		{
			sprintEnergyTimer = 1.0;
		}
	if(state.Triggers.Left>.5&&buttonLTPressed==false)
		{
			if(attackCollider.transform.localPosition.x==handx)
				{
				Debug.Log(playerHealth.blueSwitch);
				if(playerHealth.blueSwitch==true)
					{
					buttonLTPressed=true;
					Wave();
					}
				}
		}
	if(state.Triggers.Left<.5)
		{
			buttonLTPressed=false;
		}

	/*Collision cooldown  				*/
		
	
}

function FixedUpdate() {
	// Cast a ray straight down.
	var hit: RaycastHit2D;
	hit= Physics2D.Raycast(transform.position+new Vector3(0,-2.75,0), -Vector2.up, 0.2f);
	Debug.DrawRay(transform.position+new Vector3(0,-2.75,0), -Vector2.up,Color.green);
	// If it hits something...
	if (hit.rigidbody!=null) {
		if(hit.rigidbody.tag=="Platform")
			{
				// Calculate the distance from the surface and the "error" relative
				// to the floating height.
				
				var distance = Mathf.Abs(hit.point.y - transform.position.y);
				var heightError: float = floatHeight - distance;
				playerCheck = playerState.onLand;
				// The force is proportional to the height error, but we remove a part of it
				// according to the object's speed.
				var force = liftForce * heightError - rigidbody2D.velocity.y * damping;
				
				// Apply the force to the rigidbody.
				rigidbody2D.AddForce(Vector3.up * force);
		}
	}
	else
	{
		playerCheck = playerState.notOnLand;
	}

}

function moveLeft(){
		
		var tmpNum : int;
		var tmpBool: boolean;
		
		
		tmpNum = Random.Range(1,3);
		
		//bizkit made a booboo here.
		if(this.GetComponent(AudioController).currSFX == "walk1" ||	this.GetComponent(AudioController).currSFX == "walk2" ||this.GetComponent(AudioController).currSFX == "walk3")
		{
			
		}
		else{
			this.GetComponent(AudioController).playWalk(); 
		}
		
		
		anima.SetBool("move", true);
		
		
		transform.localScale.x = -x;
		transform.position.x += Vector3.left.x * forwardspeed;
		canjump = false;	
		anima.SetBool("move",false);

}
function sprintLeft(){
		transform.localScale.x = -x;
		transform.position.x += Vector3.left.x * forwardspeed*1.5;
		canjump = false;	
		anima.SetBool("move", true);
		
		if(this.GetComponent(AudioController).currSFX == "walk1" ||	this.GetComponent(AudioController).currSFX == "walk2" ||this.GetComponent(AudioController).currSFX == "walk3")
		{
			
		}
		else{
			this.GetComponent(AudioController).playWalk(); 
		}
		anima.SetBool("move",false);
}
function moveRight(){
	transform.localScale.x = x;
	transform.position.x += Vector3.right.x* forwardspeed;
	canjump = false;
	anima.SetBool("move", true);
	
	if(this.GetComponent(AudioController).currSFX == "walk1" ||	this.GetComponent(AudioController).currSFX == "walk2" ||this.GetComponent(AudioController).currSFX == "walk3")
		{
			
		}
		else{
			this.GetComponent(AudioController).playWalk(); 
		}
		anima.SetBool("move",false);

}
function sprintRight(){
		transform.localScale.x = x;
		transform.position.x += Vector3.right.x * forwardspeed*1.5;
		canjump = false;
		anima.SetBool("move", true);
		
		if(this.GetComponent(AudioController).currSFX == "walk1" ||	this.GetComponent(AudioController).currSFX == "walk2" ||this.GetComponent(AudioController).currSFX == "walk3")
		{
			
		}
		else{
			this.GetComponent(AudioController).playWalk(); 
		}	
		anima.SetBool("move",false);
}
function Jump(){
	if(playerCheck==playerState.onLand)
		{
		

			this.rigidbody2D.velocity.y += jumpspeed;
		}	
	
}

/*this will be the normal Punch Attack
*/

function normalPunch(){

					
		var tmpNum:int;
		tmpNum = Random.Range(1,3);
		switch(tmpNum){
			case 1:
				this.GetComponent(AudioController).playPlayerSFX("punch1");
				break;
			case 2:
				this.GetComponent(AudioController).playPlayerSFX("punch2");
				break;
			case 3:
				this.GetComponent(AudioController).playPlayerSFX("punch3");
				break;
		}
		anima.SetBool("Pattack", true);
		
		attackCollider.transform.localPosition.x+=5;
		yield WaitForSeconds(.2);
		attackCollider.transform.localPosition.x-=5;
		
		anima.SetBool("Pattack", false);
}

function extendedPunch(){
	
	var tmpNum:int;
	attackCollider.transform.localPosition.x+=.01;
	tmpNum = Random.Range(1,3);
	switch(tmpNum){
		case 1:
			this.GetComponent(AudioController).playPlayerSFX("big1");
			break;
		case 2:
			this.GetComponent(AudioController).playPlayerSFX("big2");
			break;
		case 3:
			this.GetComponent(AudioController).playPlayerSFX("big3");
			break;
	}
	
	anima.SetBool("Pattack", true);
		
			yield WaitForSeconds(.5);
	anima.SetBool("Pattack", false);		
	var goTemp:GameObject = Instantiate(goExtendedPunch,attackCollider.transform.position, Quaternion.identity);
	if(this.transform.localScale.x == -x)
		{
			goTemp.transform.localScale.x = -x;
		}
	playerHealth.playerEnergyDown(1);
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
	
	attackCollider.transform.localPosition.x-=2;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x-=2;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x-=2;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x-=2;
	Destroy(goTemp);
	attackCollider.transform.localPosition.x-=.01;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x = 0;
	
	
}
function Hadoken(){
	this.GetComponent(AudioController).playPlayerSFX("projectile");
	attackCollider.transform.localPosition.x+=.01;
	anima.SetBool("Pattack", true);
	anima.SetBool("move",false);
	yield WaitForSeconds(.5);
	anima.SetBool("Pattack", false);
	
	var goTemp:GameObject = Instantiate(goHadoken,attackCollider.transform.position, Quaternion.identity);
	if(this.transform.localScale.x == -x)
		{
			goTemp.transform.localScale.x = -x;
		}
	
	playerHealth.playerEnergyDown(1);
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
	attackCollider.transform.localPosition.x+=2;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x-=14;
	attackCollider.transform.localPosition.x-=.01;
	Destroy(goTemp);
	attackCollider.transform.localPosition.x = 0;
	
	
}
function Wave(){
	this.GetComponent(AudioController).playPlayerSFX("wave");
	attackCollider.transform.localPosition.x+=.01;
	anima.SetBool("Pattack", true);
	anima.SetBool("move",false);	
		
		yield WaitForSeconds(.5);
		anima.SetBool("Pattack", false);
	var goTemp:GameObject = Instantiate(goWave,attackCollider.transform.position, Quaternion.identity);
	if(this.transform.localScale.x == -x)
		{
			goTemp.transform.localScale.x = -x;
		}
	playerHealth.playerEnergyDown(1);
	attackCollider.transform.localScale.y+=1;
	attackCollider.transform.localPosition.y-=.8;
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
	attackCollider.transform.localPosition.x+=2;
	goTemp.transform.position = attackCollider.transform.position;
	yield WaitForSeconds(.1);
	attackCollider.transform.localPosition.x-=14;
	attackCollider.transform.localPosition.x = 0;
	Destroy(goTemp);

	attackCollider.transform.localScale.y-=1;
	attackCollider.transform.localPosition.y+=.8;
	
	
}