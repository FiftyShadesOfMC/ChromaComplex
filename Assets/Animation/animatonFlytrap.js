#pragma strict
var animIdle : Animator ;


var inRange: boolean;
var Speed : int = 1;

function Start () {
animIdle = GetComponent(Animator);


}

function Update () {


if (inRange == true){
	animIdle.SetBool("Proximity",true);
	

}
if (inRange == false){
	animIdle.SetBool("Proximity",false);

}


}