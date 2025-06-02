//import {useNavigate} from "react-router";

function checkCharacter(str){
  return new RegExp("^[a-zA-Z0-9-_]+$").test(str)
}

export function validateUsername(username, setError)
{
    //needs to be type string
    if(!(typeof username === "string"))
    {
        //input has been bypassed
        return false;
    }

    //needs to be at least 3 characters long but max 30
    if(username.length < 3)
    {
        setError("Username too short");
        return false;
    }
    if(username.length > 30)
    {
        setError("Username too long");
        return false;
    }

    //nees to only contain UpperCase, LowerCase, nums and or dash-  underscore_
    //console.log(checkCharacter(username));
    if(!checkCharacter(username))
    {
        setError("Username can only contain leters, numbers, dashes and underscores ");
        return false;
    }

    setError("");
    return true;
}
export function validatePassword(password, setError)
{
    //needs to be type string
    if(!(typeof password === "string"))
    {
        //input has been bypassed
        return false;
    }

    //needs to be at least 3 characters long but max 30
    if(password.length < 3)
    {
        setError("Password too short");
        return false;
    }
    if(password.length > 30)
    {
        setError("Password too long");
        return false;
    }

    setError("");
    return true;
}

