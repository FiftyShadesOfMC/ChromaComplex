#pragma strict
import PlayerRelated;
public var targetPlayer:GameObject;
public var audioCont:AudioController;
public var damageAmount:float = 1;
public var timeDelay:float = 40;
public var readyBool:boolean = false;
public var triggerSound:String;

private var currDelay:float = 0;

function Start () {
	targetPlayer=GameObject.Find("Player");
	audioCont = targetPlayer.GetComponent(AudioController);
 	triggerSound = "blahblahblah";
}

function Update () {
	currDelay+=1;
	if(currDelay >= timeDelay){
		readyBool = true;
	}
}

public function changeDelay( newDelay:float){
	timeDelay = newDelay;
}

function OnTriggerEnter2D(col:Collider2D){
	//Debug.Log(col.gameObject.name);
	if(readyBool){
		if(col.gameObject.name=="Player"){
			readyBool = false;
			currDelay = 0;
			Debug.Log(damageAmount);
			var tempthang = col.GetComponent(PlayerRelated);
			tempthang.playerHealthDown(damageAmount);
			if(triggerSound != "blahblahblah"){
				Debug.Log("playing sound " + triggerSound);
				audioCont.playEnemySFX(triggerSound);
			}
		}
	}
	
}
