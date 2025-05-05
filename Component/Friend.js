import $ from 'jquery';
import { useNavigate } from "react-router";

export default function Friend(props)
{
    let navigate = useNavigate();

    return (
        <div onClick={() => {
            //console.log("clicked div fof " + props.name);
            navigate("../user/chat/" + props.name);
        }}>
            <p>{props.name}</p>
            <p>{props.message}</p>
            <button onClick={() => {
                //console.log(props.name);
                //send to php
                $.ajax({
                    method: "post",
                    url: "http://localhost/React/php/removeFriend.php",
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
                    else if(data == 1 || data == 2)
                    {
                        //stop showing chat aswell
                        props.func(props.name);
                    }
                    //-4 log out
                    //-2 log out
                    //-1
                    //1
                    //2
                    
                    //check if php removed it 


                    //if all g remove element
                    //props.func(props.id, name, role);
                })
            }} >Unfriend</button>
            <br />
            <br />
        </div>
    );
}//what if one user add while another declines