import $ from 'jquery';
import { useNavigate } from "react-router";

export default function OutRequest(props)
{
    let navigate = useNavigate();

    return (
        <div>
            <p>you are waiting for {props.name} response</p>
            <button onClick={() => {
                //console.log("doing");
                //send to php
                $.ajax({
                    method: "post",
                    url: "http://localhost/React/php/cancelFriendRequest.php",
                    data: {u: localStorage.getItem("u"), p: localStorage.getItem("p"), user2: props.name}
                })
                .done(function(data){
                    //console.log(data);
                    if(data == "-2")
                    {
                        localStorage.removeItem("u");
                        localStorage.removeItem("p");
                        //setError(-2);
                        navigate("../");
                    }
                    else if(data == 1)
                    {
                        //console.log("quick drop");
                        props.func(props.name);
                    }
                })
            }}>Cancel friend request</button>
            <br />
            <br />
        </div>
    );
}//what if one user add while another declines