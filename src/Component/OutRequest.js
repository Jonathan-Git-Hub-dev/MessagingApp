import $ from 'jquery';
import { useNavigate } from "react-router";
import { Url } from '../variables.js';
import "../Css/OutRequest.css";


/*
    allows user to retract inviation to other user for frienship
*/

export default function OutRequest(props)
{
    let navigate = useNavigate();

    function cancel()
    {
       $.ajax({
            method: "post",
            url: Url + "cancelFriendRequest.php",
            data: {u: localStorage.getItem("u"), p: localStorage.getItem("p"), user2: props.name}
        })
        .done(function(data){
            console.log("data " + data);
            if(data == "-1" || data == "-3" || data == "-5")
            {
                console.log("Server or data error");
            }
            else if(data == "-2")//user is using incorect credentials
            {
                localStorage.removeItem("u");
                localStorage.removeItem("p");
                navigate("../");
            }
            else if(data == 1)
            {
                props.func(props.name);
            }
        })
        .fail(function(data){
            console.log("Ajax error OutRequest.js: " + data);
        })
    }

    return (
        <div className="outRequestFrame">
            <p className="outRequestName" >{props.name}</p>
            <button className="outRequestUnfriendButton" onClick={cancel}>Cancel friend request</button>
        </div>
    );
}