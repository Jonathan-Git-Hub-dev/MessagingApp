import $ from 'jquery';
import { useNavigate } from "react-router";

export default function InRequest(props)
{
    let navigate = useNavigate();

    return (
        <div>
            <p>{props.name} wants to be your friend</p>
            <button onClick={() => {
                //console.log(props.name);
                //send to php
                $.ajax({
                    method: "post",
                    url: "http://localhost/React/php/acceptFriendRequest.php",
                    data: {u: localStorage.getItem("u"), p: localStorage.getItem("p"), user2: props.name}
                })
                .done(function(data){
                    //console.log(data);
                    //data = "-4";
                    if(data == "-4" || data == "-2")
                    {
                        localStorage.removeItem("u");
                        localStorage.removeItem("p");
                        //setError(-2);
                        navigate("../");
                    }
                    else if(data == 1)
                    {
                        console.log("now making good");
                        //stop showing chat aswell
                        props.func(props.name);
                    }
                })
            }}>Accept</button>
            <button onClick={() => {
                $.ajax({
                    method: "post",
                    url: "http://localhost/ReactPhp/declineFriendRequest.php",
                    data: {u: localStorage.getItem("u"), p: localStorage.getItem("p"), user2: props.name}
                })
                .done(function(data){
                    //console.log(data);
                    //data = "-4";
                    if(data == "-2")
                    {
                        localStorage.removeItem("u");
                        localStorage.removeItem("p");
                        //setError(-2);
                        navigate("../");
                    }
                    else if(data == 1)
                    {
                        console.log("now making good");
                        //stop showing chat aswell
                        props.func2(props.name);
                    }
                })
                //console.log("rejecting");
            }}
            >Reject</button>
            <br />
            <br />
        </div>
    );
}//what if one user add while another declines