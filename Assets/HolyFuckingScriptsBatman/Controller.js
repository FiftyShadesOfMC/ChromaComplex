#pragma strict
import XInputDotNetPure;

var state: GamePadState;
function Start () {

}

function Update () {
	state = GamePad.GetState(0);
	if(state.ThumbSticks.Left.X>.5)
		{
			Debug.Log("Right Stick");
		}
	if(state.ThumbSticks.Left.X<-.5)
		{
			Debug.Log("Left Stick");
		}
	if(state.Buttons.A==ButtonState.Pressed)
		{
			Debug.Log("Pressed A");
		}
	if(state.Buttons.B==ButtonState.Pressed)
		{
			Debug.Log("Pressed B");
		}
	if(state.Buttons.Y==ButtonState.Pressed)
		{
			Debug.Log("Pressed Y");
		}
	if(state.Buttons.X==ButtonState.Pressed)
		{
			Debug.Log("Pressed X");
		}
	if(state.Triggers.Right>.5)
		{
			Debug.Log("Right Trigger");
		}
	
}