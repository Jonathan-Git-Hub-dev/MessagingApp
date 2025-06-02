import { useNavigate } from "react-router";
import $ from 'jquery';
import { Url } from '../variables.js';
import { useState } from 'react';
import logo from '../Images/icon.jpeg';
import '../Css/LoginPage.css';
import {validateUsername, validatePassword} from '../functions.js';

export default function LoginPage()
{
    let navigate = useNavigate();

    const [error, setError] = useState("");

    function login(e)
    {
        e.preventDefault();

        let username = e.target[0].value;
        let password = e.target[1].value;
        if(!validateUsername(username, setError))
        {
            return;
        }

        if(!validatePassword(password, setError))
        {
            return;
        }

        $.ajax({
            method: "post",
            url: Url + "login.php",
            data: {u: username, p: password}
        })
        .done(function(data){
            if(data == "-1" || data == "-5")
            {
                setError("Server or Data Error");
            }
            else if(data == "0")
            {
                setError("Username or Password is incorrect");
            }
            else if (data == "1")
            {
                localStorage.setItem("u", e.target[0].value);
                localStorage.setItem("p", e.target[1].value);
                navigate("../user");
            }
        })
        .fail(function(data){
          console.log("Ajax error in LoginPage.js: " + data);
          setError("Ajax error");
        })
    }

    function back()
    {
        navigate("/");
    }

  return (
    <div className="loginPageFrame">
        <img className="loginPageIcon" src={logo} alt="icon"></img>
        <h1 className="loginPageHeading">login</h1>

        <form id="edit" onSubmit={login}>
                <input  className="loginPageInput" id="name" type="text" placeholder="Username" />
                <br /><br />
                <input  className="loginPageInput" id="pass" type="password" placeholder="Password"/>
        </form>

        <div className="loginPageHoldButton">
            <button className="loginPageButton" onClick={back}>Back</button>
            <button className="loginPageButton" form="edit">Login</button>
        </div>
        <div className="loginPageError">{error}</div>
    </div>
  );
}
