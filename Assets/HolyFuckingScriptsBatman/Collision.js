#pragma strict


   function OnTriggerEnter(t: Collider)
    {
        Debug.Log("On trigger enter in " + gameObject.name);
        if (t.gameObject.tag == "Platform")
        {
            this.gameObject.transform.parent = t.gameObject.transform;
            Debug.Log("Parented");
        }
    }

    function OnTriggerExit(t:Collider)
    {
        Debug.Log("On trigger exit in " + gameObject.name);
        if (t.gameObject.tag == "Platform")
        {
            this.gameObject.transform.parent = null;
            Debug.Log("Unparented");
        }
    }