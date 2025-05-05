import { useNavigate } from "react-router";
import { useEffect, useState } from 'react';
import $ from 'jquery';

import Friend from '../Component/Friend';
import InRequest from '../Component/InRequest';
import OutRequest from '../Component/OutRequest';

export default function UserPage()
{
    const [error, setError] = useState(0);
    const [friends, setFriends] = useState([]);
    const [inRequests, setInRequests] = useState([]);
    const [outRequests, setOutRequests] = useState([]);

    function removeFriend(name)
    {

        const newList = friends.filter(friend => friend[0] != name);
        //console.log(newList);
        setFriends(newList);
    }

    function removeRequest(name)
    {
        const newList = outRequests.filter(outRequest => outRequest[0] != name);
        //console.log(newList);
        setOutRequests(newList);
    }

    function acceptFriend(name)
    {
        //const newList = inRequests.filter(inRequest => inRequest[0] != name);
        //console.log(newList);
        //setInRequests(newList);
        
        //have to updata both frineds list and in requests
        getConnections();
    }

    function rejectFriend(name)
    {
        const newList = inRequests.filter(inRequest => inRequest[0] != name);
        setInRequests(newList);
    }

    function getConnections()
    {
        $.ajax({
            method: "post",
            url: "http://localhost/React/php/connections.php",
            data: {u: localStorage.getItem("u"), p: localStorage.getItem("p")}
        })
        .done(function(data){
            //console.log(data);
            const myObj = JSON.parse(data);
            
            //check error
            if(myObj['num'] == -2)
            {
                //wrong creds
                localStorage.removeItem("u");
                localStorage.removeItem("p");
                //setError(-2);
                
                navigate("../");
            }
            
            setError(myObj['num']);
            setFriends(myObj['f']);
            setInRequests(myObj['i']);
            setOutRequests(myObj['o']);
        })
    }

    useEffect(()=>{//use effect on load to basically redo login
        let intervalId;

        if("u" in localStorage && "p" in localStorage)
        {
            //figure out neg later
        }
        else
        {
            navigate("../");
        }
        //this cred will be tested later but impossible to test if they dont exist
        //just cause have dosnt mean they are valid

        
        getConnections();
        //now in charge of updating passvely
        //fivesecond
        intervalId = setInterval(() => {
            getConnections();
            //console.log("itter");
        }, 5000)

        return () => {
            console.log("finishing");
            clearInterval(intervalId);
          };
    },[]);


    let navigate = useNavigate();

    return (
        (error != 0 ? <p> server side error</p> :
        <div>
            <button onClick ={() => {
                //console.log("navigating to add page");
                navigate("/user/search");
            }}>Add friend</button>
            <h3>Friends</h3>
            {friends.map((friend) => {
                return (/*<p key={friend[1]}>{friend[0]}</p>*/
                    <Friend key={friend[1]} name={friend[0]} message={friend[2]} func={removeFriend}/>
                );
            })}
            <h3>Wants to be your Frined</h3>
            {inRequests.map((inRequest) => {
                return (
                    <InRequest key={inRequest[1]} name={inRequest[0]} func={acceptFriend} func2={rejectFriend}/>
                );
            })}
            <h3>We are still waiting for a response</h3>
            {outRequests.map((outRequest) => {
                return (/*<p key={outRequest[1]}>{outRequest[0]}</p>*/
                    <OutRequest key={outRequest[1]} name={outRequest[0]} func={removeRequest}/>
                );
            })}






          
            
        </div>)
    );
}