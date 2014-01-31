#pragma strict
var str:String;

function Start () {
str = "Colin Morris - Visionary - Game Designer\nBruce Schulz - Visionary - Game Design - Audio Director\nMorgan Schnell - Visionary - Game Design - Brogrammer\nCody Putz - Shirtless Brogramming\nAdam Ladwig - Brogrammer\nTravis Boyd - Brogrammer\nPatrick Annett - Brogrammer - Animation\nNicholas Goebel - Level Design - Narrative - Hella Choice Ass\nRyan Johnson- Level Design better than Bryan\nBryan Koch - Level Design\nTyler Klarenbeek - Level Design\nMariah Beem - Lead Artist\nDale Frewaldt - Art - Animation - Brogrammer\nAshley Burtz - Art\nLen Mutzenberger - Art\nNolan Moser - Audio\nKyle Vis - Audio\nJeramy De Vos - Optimism Enforcer\nBry Hoffer - Words and Stuff";


}

function Update () {

}
function OnGUI(){
GUI.TextArea(Rect(Screen.width/4,Screen.height/4-100,Screen.width/2,Screen.height/1.7),str);
}