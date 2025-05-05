import { useNavigate } from "react-router";
import $ from 'jquery';
//import { useEffect, useState } from 'react';
//import SearchResult from '../Component/SearchResult';

export default function SearchResult(props)
{
    let navigate = useNavigate();

    return (
        <div>
            <p>Name:{props.name}</p>
            <button onClick={() => {
                //console.log("button for stranger " + props.name);
                $.ajax({
                    method: "post",
                    url: "http://localhost/React/php/requestFriendship.php",
                    data: {u: localStorage.getItem("u"), p: localStorage.getItem("p"), user2: props.name}
                })
                .done(function(data){
                    //console.log(data);
                    if(data == "-4" || data == -2)
                    {
                        localStorage.removeItem("u");
                        localStorage.removeItem("p");
                
                        navigate("../../");
                    }
                    else if(data == "-1")
                    {
                        //sever error ignore
                    }
                    else if(data == "-19")
                    {
                        //user has already tried adding you ignore for now
                    }
                    else
                    {//success
                        //console.log("func");
                        props.func(props.name);
                    }
                    
                    
                })
            }}>|ADD|</button>
        </div>
    );
}