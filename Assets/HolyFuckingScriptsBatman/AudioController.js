#pragma strict

enum Room{
	redRoom,
	blueRoom,
	yellowRoom,
	blackRoom
}

var currRoom:Room;

var currSFX:String; 
var currBGEx:AudioClip;
var sourceBG:AudioSource;
var sourceEX:AudioSource;
var sourcePlayerSFX:AudioSource;
var sourceEnemySFX:AudioSource;
var sourceRoomSFX:AudioSource;
var sourceNarrative:AudioSource;


var onWater:boolean = false;
//0:Red,1:Blue,2:Yellow,3:Black
var roomBGList:AudioClip[];
//0:Blue,1:Yellow
var roomExList:AudioClip[];
/*//player sounds for the blue room

*/
var playerBlue:AudioClip[];
//player sounds for the red room
var playerRed:AudioClip[];
//player sounds for the yellow room
var playerYellow:AudioClip[];

/*//player sounds for the black room

*/
var playerBlack:AudioClip[];
/*//environment sounds for blue room
0:Water Monster Attack,1:Water Monster Attack 2,2:Water Monster Walk 1
3:Water Monster Walk 2, 4:Water Monster Walk 3,5:Water Monster Walk 4
*/
var enemyBlueList:AudioClip[];
/*//environment sounds for the yellow room

*/
var enemyYellowList:AudioClip[];
/*//environment sounds for the red list

*/
var enemyRedList:AudioClip[];

var variousRoomList:AudioClip[];

var narrativeList:AudioClip[];

function Start () {
	currRoom = Room.blackRoom;
	switchBG();
}

function Update () {
	
}

function switchBG(){
//add shit here
	if(sourceBG.isPlaying){
		sourceBG.Stop();
	}
	if(sourceEX.isPlaying&&sourceEX!=null){
		sourceEX.Stop();
	}
	switch (currRoom){
		case Room.redRoom: 
			//play red room audio
			sourceBG.audio.clip = roomBGList[0];
			break;
		case Room.blueRoom:
			//play blue room audio
			sourceBG.audio.clip = roomBGList[1];
			sourceEX.audio.clip = roomExList[0];
			break;
		case Room.yellowRoom:
			//play yellow room audio
			sourceBG.audio.clip = roomBGList[2];
			sourceEX.audio.clip = roomExList[1];
			break;
		case Room.blackRoom:
			//play black room audio
			if(this.GetComponent(PlayerRelated).redSwitch && this.GetComponent(PlayerRelated).blueSwitch && this.GetComponent(PlayerRelated).yellowSwitch){
				sourceBG.audio.clip = roomBGList[6];
			}else if(this.GetComponent(PlayerRelated).redSwitch && this.GetComponent(PlayerRelated).yellowSwitch && !this.GetComponent(PlayerRelated).blueSwitch){
				sourceBG.audio.clip = roomBGList[5];
			}else if(this.GetComponent(PlayerRelated).redSwitch && !this.GetComponent(PlayerRelated).yellowSwitch && !this.GetComponent(PlayerRelated).blueSwitch){
				sourceBG.audio.clip = roomBGList[4];
			}else if(!this.GetComponent(PlayerRelated).redSwitch && !this.GetComponent(PlayerRelated).yellowSwitch && !this.GetComponent(PlayerRelated).blueSwitch){
				sourceBG.audio.clip = roomBGList[3];
			}
			break;
		default:
			break;
	}
	
	if(sourceEX.audio.clip != null){
		sourceEX.Play();
		Debug.Log("hey where the music");
	}
	if(sourceBG.audio.clip == roomBGList[3]){
		sourceBG.ignoreListenerVolume = true;
		sourceBG.volume = 3;
	}
	else {sourceBG.ignoreListenerVolume = false;}
	sourceBG.Play();
}

function playNarrative(sound:String){
	if(sourceNarrative.isPlaying){
		sourceNarrative.Stop();
	}
	switch(sound){
		case "NarrOne":
			sourceNarrative.audio.clip = narrativeList[0];
			break;
		case "NarrTwo":
			sourceNarrative.audio.clip = narrativeList[1];
			break;
		case "NarrThree":
			sourceNarrative.audio.clip = narrativeList[2];
			break;
		case "NarrFour":
			sourceNarrative.audio.clip = narrativeList[3];
			break;
		case "NarrFive":
			sourceNarrative.audio.clip = narrativeList[4];	
			break;
		case "NarrSix":
			sourceNarrative.audio.clip = narrativeList[5];
			break;
		case "NarrSeven":
			sourceNarrative.audio.clip = narrativeList[6];
			break;
		case "NarrEight":
			sourceNarrative.audio.clip = narrativeList[7];
			break;
		case "NarrNine":
			sourceNarrative.audio.clip = narrativeList[8];
			break;
	}
	sourceNarrative.Play();
}

function playWalk(){
	var tmpNum:int;
	tmpNum = Random.Range(1,3);
	if(!onWater){
		switch(tmpNum){
			case 1:
				playPlayerSFX("walk1");
				break;
			case 2:
				playPlayerSFX("walk2");
				break;
			case 3:
				playPlayerSFX("walk3");
				break;
			default:
				break;
		}
	}else{
		switch(tmpNum){
			case 1:
				playPlayerSFX("waterwalk1");
				break;
			case 2:
				playPlayerSFX("waterwalk2");
				break;
			case 3:
				playPlayerSFX("waterwalk3");
				break;
			default:
				break;
		}
	}
}

function enemyWalk(enemy:String){
	var tmpNum:int;
	if(enemy == "book"){
		tmpNum = Random.Range(1,3);
		playEnemySFX("bookMove" + tmpNum);
	}
	else if(enemy == "bush"){
		tmpNum = Random.Range(1,3);
		playEnemySFX("bushMove" + tmpNum);
	}
	else if(enemy == "water"){
		tmpNum = Random.Range(1,4);
		playEnemySFX("waterMove" + tmpNum);
	}
}

function playEnviroSFX(sound:String){
	if(sourceRoomSFX.isPlaying){
		sourceRoomSFX.Stop();
	}
	if(currRoom == Room.redRoom){
		if(sound == "chand"){
			sourceRoomSFX.audio.clip = variousRoomList[0];
		}
	}else if (currRoom == Room.blueRoom){
		if(sound == "elec"){
			sourceRoomSFX.audio.clip = variousRoomList[1];
		}
	}else if (currRoom == Room.yellowRoom){
		switch (sound){
			case "vine1":
				sourceRoomSFX.audio.clip = variousRoomList[2];
				break;
			case "vine2":
				sourceRoomSFX.audio.clip = variousRoomList[3];
				break;
			case "vine3":
				sourceRoomSFX.audio.clip = variousRoomList[4];
				break;
		}
	}
	sourceRoomSFX.Play();
}

function playEnemySFX(sound:String){
	if(sourceEnemySFX!=null){
		if(sourceEnemySFX.isPlaying){
			sourcePlayerSFX.Stop();
		}
	
	
	if(currRoom == Room.redRoom){
		switch(sound){
			case "bookAttack":
				sourceEnemySFX.audio.clip = enemyRedList[0];
				break;
			case "bookMove1":
				sourceEnemySFX.audio.clip = enemyRedList[1];
				break;
			case "bookMove2":
				sourceEnemySFX.audio.clip = enemyRedList[2];
				break;
			case "bookMove3":
				sourceEnemySFX.audio.clip = enemyRedList[3];
				break;
			default:
				break;
		}
	}else if (currRoom == Room.blueRoom){
		switch(sound){
			case "jacketAttack1":
				sourceEnemySFX.audio.clip = enemyBlueList[0];
				break;
			case "jacketAttack2":
				sourceEnemySFX.audio.clip = enemyBlueList[1];
				break;
			case "jacketDie":
				sourceEnemySFX.audio.clip = enemyBlueList[2];
				break;
			case "jacketMove":
				sourceEnemySFX.audio.clip = enemyBlueList[3];
				break;
			case "waterAttack1":
				sourceEnemySFX.audio.clip = enemyBlueList[4];
				break;
			case "waterAttack2":
				sourceEnemySFX.audio.clip = enemyBlueList[5];
				break;
			case "waterMove1":
				sourceEnemySFX.audio.clip = enemyBlueList[6];
				break;
			case "waterMove2":
				sourceEnemySFX.audio.clip = enemyBlueList[7];
				break;
			case "waterMove3":
				sourceEnemySFX.audio.clip = enemyBlueList[8];
				break;
			case "waterMove4":
				sourceEnemySFX.audio.clip = enemyBlueList[9];
				break;
			default:
				break;
		}	
	}else if (currRoom == Room.yellowRoom){
		switch(sound){
			case "bushAttack":
				sourceEnemySFX.audio.clip = enemyYellowList[0];
				break;
			case "bushMove1":
				sourceEnemySFX.audio.clip = enemyYellowList[1];
				break;
			case "bushMove2":
				sourceEnemySFX.audio.clip = enemyYellowList[2];
				break;
			case "bushMove3":
				sourceEnemySFX.audio.clip = enemyYellowList[3];
				break;
			case "venusAttack":
				sourceEnemySFX.audio.clip = enemyYellowList[4];
				break;
			default:
				break;
		}	
	}
	sourceEnemySFX.Play();
	}
}

function playPlayerSFX(sound:String){
	currSFX = sound;
	if(sourcePlayerSFX.isPlaying){
		if(sound != "walk1" || sound!= "walk2" || sound != "walk3" || sound != "waterwalk1" || sound != "waterwalk2" || sound!= "waterwalk3"){
			sourcePlayerSFX.Stop();
		}
	}
	if(currRoom == Room.redRoom){
		switch(sound){
			case "walk1":
				sourcePlayerSFX.audio.clip = playerRed[0];
				break;
			case "walk2":
				sourcePlayerSFX.audio.clip = playerRed[1];
				break;
			case "walk3":
				sourcePlayerSFX.audio.clip = playerRed[2];
				break;
			case "big1":
				sourcePlayerSFX.audio.clip = playerRed[3];
				break;
			case "big2":
				sourcePlayerSFX.audio.clip = playerRed[4];
				break;
			case "big3":
				sourcePlayerSFX.audio.clip = playerRed[5];
				break;
			case "punch1":
				sourcePlayerSFX.audio.clip = playerRed[6];
				break;
			case "punch2":
				sourcePlayerSFX.audio.clip = playerRed[7];
				break;
			case "punch3":
				sourcePlayerSFX.audio.clip = playerRed[8];
				break;
			case "dead1":
				sourcePlayerSFX.audio.clip = playerRed[9];
				break;
			case "dead2":
				sourcePlayerSFX.audio.clip = playerRed[10];
				break;
			case "crit1":
				sourcePlayerSFX.audio.clip = playerRed[11];
				break;
			case "crit2":
				sourcePlayerSFX.audio.clip = playerRed[12];	
				break;
			case "minor1":
				sourcePlayerSFX.audio.clip = playerRed[13];
				break;
			case "minor2":
				sourcePlayerSFX.audio.clip = playerRed[14];
				break;
			case "minor3":
				sourcePlayerSFX.audio.clip = playerRed[15];	
				break;
			default:
				break;
		}
	}else if(currRoom == Room.yellowRoom){
		switch (sound){
			case "walk1":
				sourcePlayerSFX.audio.clip = playerYellow[0];
				break;
			case "walk2":
				sourcePlayerSFX.audio.clip = playerYellow[1];
				break;
			case "walk3":
				sourcePlayerSFX.audio.clip = playerYellow[2];
				break;
			case "big1":
				sourcePlayerSFX.audio.clip = playerYellow[3];
				break;
			case "big2":
				sourcePlayerSFX.audio.clip = playerYellow[4];
				break;
			case "big3":
				sourcePlayerSFX.audio.clip = playerYellow[5];
				break;
			case "punch1":
				sourcePlayerSFX.audio.clip = playerYellow[6];
				break;
			case "punch2":
				sourcePlayerSFX.audio.clip = playerYellow[7];
				break;
			case "punch3":
				sourcePlayerSFX.audio.clip = playerYellow[8];
				break;
			case "dead1":
				sourcePlayerSFX.audio.clip = playerYellow[9];
				break;
			case "dead2":
				sourcePlayerSFX.audio.clip = playerYellow[10];
				break;
			case "crit1":
				sourcePlayerSFX.audio.clip = playerYellow[11];
				break;
			case "crit2":
				sourcePlayerSFX.audio.clip = playerYellow[12];	
				break;
			case "minor1":
				sourcePlayerSFX.audio.clip = playerYellow[13];
				break;
			case "minor2":
				sourcePlayerSFX.audio.clip = playerYellow[14];
				break;
			case "minor3":
				sourcePlayerSFX.audio.clip = playerYellow[15];	
				break;
			case "sunflowerMount":
				sourcePlayerSFX.audio.clip = playerYellow[16];
				break;
			case "sunflowerDismount":
				sourcePlayerSFX.audio.clip = playerYellow[17];
				break;
			case "projectile":
				sourcePlayerSFX.audio.clip = playerYellow[18];
				break;
			default:
				break;
		}
	}else if (currRoom == Room.blueRoom){
		switch (sound){
			case "walk1":
				sourcePlayerSFX.audio.clip = playerBlue[0];
				break;
			case "walk2":
				sourcePlayerSFX.audio.clip = playerBlue[1];
				break;
			case "walk3":
				sourcePlayerSFX.audio.clip = playerBlue[2];
				break;
			case "big1":
				sourcePlayerSFX.audio.clip = playerBlue[3];
				break;
			case "big2":
				sourcePlayerSFX.audio.clip = playerBlue[4];
				break;
			case "big3":
				sourcePlayerSFX.audio.clip = playerBlue[5];
				break;
			case "punch1":
				sourcePlayerSFX.audio.clip = playerBlue[6];
				break;
			case "punch2":
				sourcePlayerSFX.audio.clip = playerBlue[7];
				break;
			case "punch3":
				sourcePlayerSFX.audio.clip = playerBlue[8];
				break;
			case "dead1":
				sourcePlayerSFX.audio.clip = playerBlue[9];
				break;
			case "dead2":
				sourcePlayerSFX.audio.clip = playerBlue[10];
				break;
			case "crit1":
				sourcePlayerSFX.audio.clip = playerBlue[11];
				break;
			case "crit2":
				sourcePlayerSFX.audio.clip = playerBlue[12];	
				break;
			case "minor1":
				sourcePlayerSFX.audio.clip = playerBlue[13];
				break;
			case "minor2":
				sourcePlayerSFX.audio.clip = playerBlue[14];
				break;
			case "minor3":
				sourcePlayerSFX.audio.clip = playerBlue[15];	
				break;
			case "projectile":
				sourcePlayerSFX.audio.clip = playerBlue[16];
				break;
			case "waterwalk1":
				sourcePlayerSFX.audio.clip = playerBlue[17];
				break;
			case "waterwalk2":
				sourcePlayerSFX.audio.clip = playerBlue[18];
				break;
			case "waterwalk3":
				sourcePlayerSFX.audio.clip = playerBlue[19];
				break;
			case "wave":
				sourcePlayerSFX.audio.clip = playerBlue[20];
				break;
			default:
				break;	
		}
	}else if(currRoom == Room.blackRoom){
		switch (sound){
			case "walk1":
				sourcePlayerSFX.audio.clip = playerBlack[0];
				break;
			case "walk2":
				sourcePlayerSFX.audio.clip = playerBlack[1];
				break;
			case "walk3":
				sourcePlayerSFX.audio.clip = playerBlack[2];
				break;
			case "big1":
				sourcePlayerSFX.audio.clip = playerBlack[3];
				break;
			case "big2":
				sourcePlayerSFX.audio.clip = playerBlack[4];
				break;
			case "big3":
				sourcePlayerSFX.audio.clip = playerBlack[5];
				break;
			case "punch1":
				sourcePlayerSFX.audio.clip = playerBlack[6];
				break;
			case "punch2":
				sourcePlayerSFX.audio.clip = playerBlack[7];
				break;
			case "punch3":
				sourcePlayerSFX.audio.clip = playerBlack[8];
				break;
			case "dead1":
				sourcePlayerSFX.audio.clip = playerBlack[9];
				break;
			case "dead2":
				sourcePlayerSFX.audio.clip = playerBlack[10];
				break;
			case "crit1":
				sourcePlayerSFX.audio.clip = playerBlack[11];
				break;
			case "crit2":
				sourcePlayerSFX.audio.clip = playerBlack[12];	
				break;
			case "minor1":
				sourcePlayerSFX.audio.clip = playerBlack[13];
				break;
			case "minor2":
				sourcePlayerSFX.audio.clip = playerBlack[14];
				break;
			case "minor3":
				sourcePlayerSFX.audio.clip = playerBlack[15];	
				break;
			case "projectile":
				sourcePlayerSFX.audio.clip = playerBlack[16];
				break;
			case "wave":
				sourcePlayerSFX.audio.clip = playerBlack[17];
				break;
			default:
				break;	
		}
	}
	sourcePlayerSFX.Play();
}

function OnTriggerEnter2D(t:Collider2D){
Debug.Log(t.name+"Audio");
Debug.Log("Audio");


switch(t.name)
	{
	case "triLibrarytoHub":
		currRoom = Room.blackRoom;
		switchBG();
		yield WaitForSeconds(.5);
		t.name="triHubtoLibrary";
		break;
	case "triHubtoLibrary":
		currRoom = Room.redRoom;
		switchBG();
		yield WaitForSeconds(.5);
		t.name="triLibrarytoHub";
		break;
	case "triGardentoHub":
		currRoom = Room.blackRoom;
		switchBG();
		yield WaitForSeconds(.5);
		t.name = "triHubtoGarden";
		break;
	case "triHubtoGarden":
		currRoom = Room.yellowRoom;
		switchBG();
		yield WaitForSeconds(.5);
		t.name = "triGardentoHub";
		break;
	case "triBluetoHub":
		currRoom = Room.blackRoom;
		switchBG();
		yield WaitForSeconds(.5);
		t.name = "triHubtoBlue";
		break;
	case "triHubtoBlue":
		currRoom = Room.blueRoom;
		switchBG();
		yield WaitForSeconds(.5);
		t.name = "triBluetoHub";
		break;
	}
}