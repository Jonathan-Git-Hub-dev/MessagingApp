import { useNavigate } from "react-router";
import { useEffect, useState } from 'react';
import $ from 'jquery';
import { Url } from '../variables.js';
import '../Css/UserPage.css';

import Friend from '../Component/Friend';
import InRequest from '../Component/InRequest';
import OutRequest from '../Component/OutRequest';

/*
    page lists all of users friends and friend requests
*/


function convertMessage(str)//splits php transmition into an array of friends and 2 arrays of requests
{
    //console.log(str)
    const elems = 5;
    const parts = str.split(",", elems);
    let total = 0;
    for (let i = 0; i < parts.length; i++) {
        total += parts[i].length;
    }
    total+=elems;
    parts.push(str.slice(total, str.length));
    //console.log(parts);
    return parts;
}

function convertStepTemp(str)//splits php transmition into an array of friends and 2 arrays of requests
{
    //convert into error number and array of messages
    let arr = [];
    
    let len =0;
    for (let i = 0; i < str.length; i++)
    {
        if(str[i] != ':')
        {
            len = len * 10;
            len = len + str.charCodeAt(i) - 48
        }
        else
        {
            arr.push(convertMessage(str.slice(i+1, i+len+1)));

            i = i + len;
            len = 0;
        }
    }
    return arr;
}

function convertStep(str)//splits php transmition into an array of friends and 2 arrays of requests
{
    //convert into error number and array of messages
    let arr = [];
    let index = 0;
    
    let len =0;
    for (let i = 0; i < str.length; i++)
    {
        if(str[i] != ':')
        {
            len = len * 10;
            len = len + str.charCodeAt(i) - 48
        }
        else
        {
            if(index == 0)
            {//second protion require special operation
                arr.push(convertStepTemp(str.slice(i+1, i+len+1)));
            }
            else
            {
                if(str.slice(i+1, i+len+1).length == 0)
                {
                    arr.push([]);
                }
                else
                {
                     arr.push(str.slice(i+1, i+len+1).split(','));
                }
            }

            index++;
            i = i + len;
            len = 0;
        }
    }
    return arr;
}


export default function UserPage()
{
    const [error, setError] = useState(0);
    const [friends, setFriends] = useState([]);
    const [inRequests, setInRequests] = useState([]);
    const [outRequests, setOutRequests] = useState([]);

    //when interacting with requests updating lists
    function removeRequest(name)
    {
        getConnections();
    }

    function acceptFriend(name)
    {
        //have to updata both frineds list and in requests
        getConnections();
    }

    function rejectFriend(name)
    {
        getConnections();
    }

    function getConnections()
    {
        $.ajax({
            method: "post",
            url: Url + "connections.php",
            data: {u: localStorage.getItem("u"), p: localStorage.getItem("p")}
        })
        .done(function(data){
            //console.log(data);
            if(data == "-2" || data == "-5")
            {
            console.log("top");
                //user data is incorrect or missing make user login agian
                localStorage.removeItem("u");
                localStorage.removeItem("p");
                navigate("../");
            }
            else if(data == "-1")
            {console.log("top2");
                //sever or sql error, display error until next interval
                setError(1);
            }
            else
            {
                let newData = convertStep(data);
                console.log("new data " + newData[0]);
                setFriends(newData[0]);
                setInRequests(newData[1]);
                setOutRequests(newData[2]);
            }
        })
        .fail(function(data){
          console.log("Ajax error in UserPage.js: " + data);
        });
    }

    useEffect(()=>{
        let intervalId;
        //continously updates friend list
        getConnections();
        intervalId = setInterval(() => {
            getConnections();
        }, 5000)

        return () => {
            console.log("finishing");
            clearInterval(intervalId);
          };
    },[]);


    let navigate = useNavigate();

    function logout()
    {
        localStorage.removeItem("u");
        localStorage.removeItem("p");
        navigate("/");
    }

    function add()
    {
        navigate("/user/search");
    }

    function profile()
    {
        navigate("/user/profile");
    }

    return (
        <div className="userPageFrameFull">
            <div className="userPageBanner">
                <button id="userPageLogout" className="userPageButton" onClick={logout}>Logout</button>
                <button className="userPageButton" onClick ={add}>Add Friends</button>
                <button className="userPageButton" onClick ={profile}>Profile</button>
            </div>



            <div className="userPageFrame">
                <div id="userPageFriendsFrame1" className="userPageFriendsFrame">
                    <h3 className="userHeading">Friends</h3>
                    <div className="userPageHolder">
                        {friends.map((friend) => {return (<Friend key={friend[0]} name={friend[0]} message={friend[5]} time={friend[1]} profile={friend[3]} seen={friend[4]} />);})}
                    </div>
                </div>
                <div id="userPageFriendsFrame2" className="userPageFriendsFrame">
                    <h3 className="userHeading">Requests</h3>
                    <div className="userPageHolder">    
                        {outRequests.map((outRequest) => {return (<OutRequest key={outRequest} name={outRequest} func={removeRequest}/>); })}
                        {outRequests.length > 0 ? <hr className="userPageLine" /> : <></>}
                        {inRequests.map((inRequest) => { return (<InRequest key={inRequest} name={inRequest} func={acceptFriend} func2={rejectFriend}/>);})}
                    </div>
                </div>
            </div>


        </div>
    );
}