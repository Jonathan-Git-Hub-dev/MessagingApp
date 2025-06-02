import $ from 'jquery';
import { useNavigate } from "react-router";
import { Url } from '../variables.js';
import "../Css/InRequest.css";

/*
    component allowing user to accept or decline an inviation for friendship
*/

export default function InRequest(props)
{
    let navigate = useNavigate();
     
    function accept()
    {
        $.ajax({
            method: "post",
            url: Url + "acceptFriendRequest.php",
            data: {u: localStorage.getItem("u"), p: localStorage.getItem("p"), user2: props.name}
        })
        .done(function(data){
            console.log(data);
            if(data == "-1" || data == "-3" || data == "-5")
            {
                //implemnt error box at some point
                console.log("Server or data error");
            }
            else if(data == "-2")
            {//users credentials incorect so loggin out
                localStorage.removeItem("u");
                localStorage.removeItem("p");
                navigate("../");
            }
            else if(data == 1)
            {//success
                props.func(props.name);
            }
        })
        .fail(function(data){
            console.log("Ajax failier (InRequest.js)");
        })
    }

    function reject()
    {
        $.ajax({
            method: "post",
            url: Url + "declineFriendRequest.php",
            data: {u: localStorage.getItem("u"), p: localStorage.getItem("p"), user2: props.name}
        })
        .done(function(data){
            if(data == "-1" || data == "-3" || data == "-5")
            {
                //implemnt error box at some point
                console.log("Server or data error");
            }
            else if(data == "-2")
            {//user credentials wrong so log out
                localStorage.removeItem("u");
                localStorage.removeItem("p");
                navigate("../");
            }
            else if(data == 1)
            {
                console.log("now making good");
                //stop showing chat aswell
                props.func2(props.name);
            }
        })
        .fail(function(data){
            console.log("Ajax failier (InRequest.js)");
        })
    }

    return (
        <div className="inRequestFrame">
            <p className="inRequestName" >{props.name}</p>
            <div className="inRequestsButton">
                <button id="inRequestB1" className="inRequestUnfriendButton1" onClick={accept}>Accept Friendship</button>
                <button className="inRequestUnfriendButton2" onClick={reject}>Reject</button>
            </div>
        </div>
    );
}