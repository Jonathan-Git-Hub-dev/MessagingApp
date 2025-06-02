import { useNavigate } from "react-router";
import $ from 'jquery';
import { Url } from '../variables.js';
import "../Css/SearchResult.css";

/*
    user who matches search term
*/

export default function SearchResult(props)
{
    let navigate = useNavigate();

    function friend()
    {
        $.ajax({
            method: "post",
            url: Url + "requestFriendship.php",
            data: {u: localStorage.getItem("u"), p: localStorage.getItem("p"), user2: props.name}
        })
        .done(function(data){
            console.log(data);
            if(data == "-2")//users credentials are wrong
            {
                localStorage.removeItem("u");
                localStorage.removeItem("p");
        
                navigate("../../");
            }
            else if(data == "-1" || data == "-3" || data == "-4" || data == "-5")
            {
                console.log("server or data error");
            }//-2 could be handled or not
            else if(data == "1")
            {
                props.func(props.name);
            }
        })
        .fail(function(data){
            console.log("Ajax error in SearchResult.js: " + data);
        })
    }

    return (
        <div className="searchResultFrame">
            <p className="searchResultName">{props.name}</p>
            <button className="searchResultButton"onClick={friend}>Add</button>
        </div>
    );
}