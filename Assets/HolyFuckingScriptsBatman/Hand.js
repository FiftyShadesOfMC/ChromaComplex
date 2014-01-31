#pragma strict

function Start () {

}

function Update () {

}
function onTriggerEnter2D(t:Collider)
{
	if(t.collider.name=="Hand")
		{
			Destroy(this);
		}
		Debug.Log(t.collider.name);
}

function onTriggerExit2D(t:Collider)
{

}

