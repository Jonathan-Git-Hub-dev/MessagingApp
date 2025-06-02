import {useNavigate, useParams } from "react-router";
import $ from 'jquery';
import { useEffect, useState, useRef  } from 'react';

import BubbleLeft from '../Component/BubbleLeft';
import BubbleRight from '../Component/BubbleRight';
import { Url } from '../variables.js';
import "../Css/ChatPage.css";

/*
    chat page between two users
*/

function convert(str)//unwinds the encoding done by php
{
    let first = true;
    let arr = [];
    let arr2 = [];
    
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
            if(first)
            {
                arr.push(str.slice(i+1, i+len+1));
                first = false;
            }
            else
            {
                //elements of arr2 are a sub array
                arr2.push(convertMessage(str.slice(i+1, i+len+1)));
            }

            i = i + len;
            len = 0;
        }
    }
    arr.push(arr2);
    return arr;
}

function convertMessage(str)//splits a string into a message array
{//message is 5th parameter after 4 cvs values
    const elems = 4;
    const parts = str.split(",", elems);
    let total = 0;
    for (let i = 0; i < parts.length; i++) {
        total += parts[i].length;
    }
    total+=elems;
    parts.push(str.slice(total, str.length));
    return parts;
}

function intergrate(a, b)//orders current texts and new texts by chat-ID
{
    let arr = [];
    let ai = 0;
    let bi = 0;

    while(ai < a.length || bi < b.length)
    {
        if(ai < a.length && bi < b.length)//when both arrays intergrate in chat-Id order
        {

            if(Number(a[ai][3]) < Number(b[bi][3]))
            {
                arr.push(a[ai]);
                ai++;  
            }
            else if(Number(a[ai][3]) == Number(b[bi][3]))
            {
                //use a becuase b might have updated seen flags
                arr.push(a[ai]);
                ai++; 
                bi++;
            }
            else
            {
                arr.push(b[bi]);
                bi++;
            }

        }
        else if(ai < a.length)
        {
            arr.push(a[ai]);
            ai++;
        }
        else
        {
            arr.push(b[bi]);
            bi++;
        }
    }

    return arr;
}



export default function ChatPage()
{
    let navigate = useNavigate();
    let { friend } = useParams();//use user chatting with
    
    const [texts, setTexts] = useState([]);//text data
    const [complete, setComplete] = useState(false);//tracks if pagination has ended
    const [blocked, setBlocked] = useState(false);//tracks if user is blocked
    const [error, setError] = useState("");//diplays php error
    const [inputError, setInputError] = useState("");//diplays if user text is in correct format
  
    const first = useRef([0]);//used to focus on rerender
    const oldest = useRef(-1);//end of oldest page
    const newest = useRef(-1);//start of most recent page

    function logout()
    {
        localStorage.removeItem("u");
        localStorage.removeItem("p");
        navigate("/");
    }
    function back()
    {
        navigate("../user");
    }

    function block()//user can block this user
    {
        if(window.confirm("Are you sure you want to Block " + friend) == true)
        {
            $.ajax({
                method: "post",
                url: Url + "removeFriend.php",
                data: {u: localStorage.getItem("u"), p: localStorage.getItem("p"), user2: friend}
            })
            .done(function(data){
                if(data == "-5" || data == "-2")
                {
                    localStorage.removeItem("u");
                    localStorage.removeItem("p");
                    navigate("../");
                }
                else if(data == "-4" || data == "-3")
                {
                    back();
                }
                else if(data == 1 || data == 2)
                {
                    back();
                }
            })
            .fail(function(data){
                console.log("Ajax error in ChatPage.js: " + data);
                setError("Error removing friend");
            })
            
        }
    }

    function inputCheck(e)
    {
        //console.log(e.target.innerText);
        if(e.target.innerText.length > 1000)
        {
            setInputError("Max Message Length 1000");
        }
        else
        {
            setInputError("");
        }
    }
  

    function getNewChats() {
    $.ajax({
        method: "post",
        url: Url + "chatNew.php",
        data: {u: localStorage.getItem("u"), p: localStorage.getItem("p"), user2: friend, old: newest.current}
    })
    .done(function(data){
        console.log(data);
        if(data == "-8")
        {
            back();
        }
        else if(data == "-7")
        {
            setBlocked(true);
        }
        else if(data == "-5")
        {
            logout();
        }
        else if(data == "-2")
        {
            logout();
        }
        else if(data == "-1")
        {
            setError("Server Error");
        }
        else if(data == "0")
        {
            //nothing to do
        }
        else
        {
            let dd = convert(data);
            setTexts(prev => {
                let arr = intergrate(prev, dd[1]);

                newest.current = arr[arr.length-1][3];

                //if user at bottom scroll to bottom of new texts
                let scrollableDiv = document.getElementById('scrollableDiv');
                if (Math.abs(scrollableDiv.scrollHeight - (scrollableDiv.scrollTop + scrollableDiv.clientHeight)) <= 1)
                {
                    first.current.push(0);
                }
                return arr;
            })
        }
    })
    .fail(function(data){
        console.log("Ajax error in ChatPage.js: " + data);
        setError("Error getting new messages");
    })
}


    function getPage()
    {
        $.ajax({
            method: "post",
            url: Url + "chatPagination.php",
            data: {u: localStorage.getItem("u"), p: localStorage.getItem("p"), user2: friend, page: oldest.current}
        })
        .done(function(data){
            //process php errors
            if(data == "-7")
            {
                back();
            }
            else if(data == "-2" || data == "-5")
            {
                logout();
            }
            else if(data == "-1")
            {
                setError("SERVER ERROR");
            }
            if(data == "-4")
            {
                setComplete(true);
                setError("");
            }
            else
            {
                setError("");
                //console.log(data);
                //return;
                let dd = convert(data);
                if(dd[0] == "-7" || dd[0] == "-11")
                {
                    console.log("mega shade");
                    setBlocked(true);
                }
                if(dd[0] == '-4' || dd[0] == "-11")
                {
                    setComplete(true);
                }

                //new data changes focus so save divs position
                let scrollableDiv = document.getElementById('scrollableDiv');
                first.current.push(scrollableDiv.scrollHeight- scrollableDiv.scrollTop - scrollableDiv.clientHeight);

                dd[1].reverse();
                    
                setTexts(prev => [ ...dd[1], ...prev]);
                if(newest.current == -1)//first pagination need to get most recent, this is later tracked in the new page fucntion
                {
                    //console.log("THIS SHOULD ONLY HAPPEN ONCE");
                    newest.current = dd[1][dd[1].length-1][3];
                }
                oldest.current = dd[1][0][3];
            }           
        })
        .fail(function(data){
            console.log("Ajax error in ChatPage.js: " + data);
            setError("Error getting page");
        })
    }

    function isASCII(str) {
        return /^[\x00-\x7F]*$/.test(str);
    }


    function validateMessage(message)
    {
        if(!isASCII(message))
        {
            return false;
        }
        //message must be less then 1000 char and contain actual content
        if(message.length == 0 || message.length > 1000)
        {
            return false;
        }

        let check = false;
        for(let i=0; i<message.length; i++)
        {
            if(message[i] != ' ' && message[i] != '\n')
            {
                check = true;
            }
        }

        return check;
    }

    function send()
    {
        let message = document.getElementById('message').innerHTML;
        if(!validateMessage(message))
        {
            console.log("not sending for a reason");
            return;
        }
       
        $.ajax({
            method: "post",
            url: Url + "sendChat.php",
            data: {u: localStorage.getItem("u"), p: localStorage.getItem("p"), user2: friend, message: message}
        })
        .done(function(data){
            //check for php errors
            //console.log("this is our data: " + data);
            if(data == "-5" || data == "-3" || data == "-2")
            {
                logout();
            }
            else if(data == "-8")
            {
                back();
            }
            else if(data == "-7")
            {
                setBlocked(true);
            }
            else if(data == "-1")
            {
                setError("Error sending chat");
            }
            else
            {
                //if no errors use following to update our texts
                getNewChats();
                //reset message
                document.getElementById("message").innerText="";
            }
        })
        .fail(function(data){
            console.log("Ajax error in ChatPage.js: " + data);
            setError("Error sending chat");
        })
    }

    useEffect(()=>{//handles scrolling for after render only scrolls if array has a position
        if(first.current.length>0)
        {
            let scrollableDiv = document.getElementById('scrollableDiv');
            scrollableDiv.scrollTop = scrollableDiv.scrollHeight - scrollableDiv.clientHeight - first.current[0];
            first.current.shift();
        }
    },[texts]);


    useEffect(()=>{
        if(friend == null)//if no firend passed in to chat with go back to home screen
        {
            navigate("/");
        }

        getPage();//get initial texts
        let intervalId;
        intervalId = setInterval(() => {
            getNewChats();//update periodically
        }, 5000)

        return () => {console.log("finishing chat page interaval"); clearInterval(intervalId);};
    },[]);

  

  return (
    <div className="chatPageFrame">
        <div className="chatPageHeader">
            <button  onClick={back} className="chatPageButton">Back</button>
            <p>{friend}</p>
            <button onClick={block} className="chatPageButton">Block</button>
        </div>

        <div id="scrollableDiv" className="chatPageTexts">
            <br />
            {/*button to load more pages when pages available*/}
            {complete ? <div className="chatPageEnd">no more messages</div> : <button onClick={getPage}>Load More</button>}
            {texts.map((text) => {
                return (/*rendering each text*/
                    text[2] == 0 
                    ? <BubbleRight key={text[3]} time={text[1]} content={text[4]}/>
                    : <BubbleLeft key={text[3]} seen={text[0]} time={text[1]} content={text[4]}/>
                );
            })}
            <br />
        </div>

        {/*input locked when blocked by other user*/}
        <div className="chatPageFooter">
            {/*used to take up space*/blocked ? <></> :<button style={{visibility: "hidden"}}className="chatPageButton">send</button>}
            <div className="chatPageGroup"> 
                {blocked
                    ? <div>You are blocked</div>
                    : <div onInput={inputCheck} id="message" className="chatPageInput" contentEditable="plaintext-only"></div>
                }
                    
                <div className="chatPageError" >{inputError}{error}</div>
            </div>
            {blocked ? <></> :<button onClick={send} className="chatPageButton">send</button>}
        </div>
    </div>
  );
}