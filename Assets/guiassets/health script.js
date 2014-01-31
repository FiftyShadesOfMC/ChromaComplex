#pragma strict
var health=6;
var special=10;
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
var timer=0.0f;

function Start () {

}

function Update () {
if(Input.GetKeyDown("z") && health != 0){
health = health - 1;
Debug.Log("health dropped");
}
if(Input.GetKeyDown("x") && health != 6){
health = health + 1;
Debug.Log("health upped");
}
if(health==6){
healthbar.texture = six;
}
if(health==5){
healthbar.texture = five;
}
if(health==4){
healthbar.texture = four;
}
if(health==3){
healthbar.texture = three;
}
if(health==2){
healthbar.texture = two;
}
if(health==1){
healthbar.texture = one;
}
if(health==0){
healthbar.texture = zero;
}

timer=timer+Time.deltaTime;
Debug.Log(timer);

if(timer > 2.0f){
timer=0.0f;
if(special<11){
special=special+1;
}
}
if(Input.GetKeyDown("c")&& special!=0){
special = special -1;
}

if(special==0){
specialbar.texture = spzero;
}
if(special==1){
specialbar.texture = spone;
}
if(special==2){
specialbar.texture = sptwo;
}
if(special==3){
specialbar.texture = spthree;
}
if(special==4){
specialbar.texture = spfour;
}
if(special==5){
specialbar.texture = spfive;
}
if(special==6){
specialbar.texture = spsix;
}
if(special==7){
specialbar.texture = spseven;
}
if(special==8){
specialbar.texture = speight;
}
if(special==9){
specialbar.texture = spnine;
}
if(special==10){
specialbar.texture = spten;
}
}