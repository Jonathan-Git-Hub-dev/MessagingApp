import { useNavigate, useParams } from "react-router";
import $ from 'jquery';
import { useEffect, useState } from 'react';
import BubbleLeft from '../Component/BubbleLeft';
import BubbleRight from '../Component/BubbleRight';

/* 
on buttom get next page

if atTop when text comes in or out update what viewer sees
*/



function convert(str)
{
    //convert into error number and array of messages
    let first = true;
    let num;
    let arr = [];
    
    let len =0;
    for (let i = 0; i < str.length; i++)
    {
        if(str[i] != ':')
        {
            len = len * 10;
            //int intValue = str[i] - '0';
            len = len + str.charCodeAt(i) - 48
        }
        else
        {
            //console.log(len);
            //console.log(str.slice(i+1, i+len+1));
            arr.push(str.slice(i+1, i+len+1));
            
            i = i + len;
            len = 0;
        }
        //console.log(str[i]);
    }
    return arr;
}


export default function ChatPage()
{
    let pagination = 0;//counts how many messages we have loaded, -1 when php says no more messages to load
    //per page is 20?

  let navigate = useNavigate();
  let { friend } = useParams();
  //const [data, setData] = useState([[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22]]);
  const [dis, setDis] = useState('');
  //const [count, setCount] = useState(1);
  //const [check, seCheck] = useState(0);
  const [bc, setBc] = useState('false');
  const [tc, setTc] = useState('true');
   //temperary
    /*useEffect(()=>{
        setCheck();
        //const now = new Date();
        //const s = now.getSeconds();
        //const m = now.getMilliseconds();
        //console.log(s + " " + m);
    },[count]);*/


    useEffect(()=>{
        if(friend == null)//if no firend passed in to chat with go back to home screen
        {
            navigate("/");
        }
        //now validate users credentials and relations ship
        $.ajax({
            method: "post",
            url: "http://localhost/React/php/chat.php",
            data: {u: localStorage.getItem("u"), p: localStorage.getItem("p"), user2: friend}
        })
        .done(function(data){
            //console.log(data);
            if(data == "-2")
            {
                localStorage.removeItem("u");
                localStorage.removeItem("p");
                navigate("../");
            }
            if(data == "-5")
            {
                navigate("../user/");
            }
        })

        setDis(friend);
        $.ajax({
            method: "post",
            url: "http://localhost/React/php/chatPagination.php",
            data: {u: localStorage.getItem("u"), p: localStorage.getItem("p"), user2: friend}
        })
        .done(function(data){
            console.log(data);
            //let ddd = convert(data);
            //console.log(ddd);
            /*if(data == "-2")
            {
                localStorage.removeItem("u");
                localStorage.removeItem("p");
                navigate("../");
            }
            if(data == "-5")
            {
                navigate("../user/");
            }*/
        })



    },[]);

  return (
    <div>
        <p>this is where will will put passed name {dis}</p>
        <h2>Under here is a scroll div</h2>
        
        <p>at bottum: {bc}</p>
        <p>at top: {tc}</p>
        <br /> <br /><br /><br />
        
    </div>
  );
}

/*
//setCount(prev => prev + 1);


onScroll={(e) => {
                const { scrollTop, scrollHeight, clientHeight } = e.target;
                if (Math.abs(scrollHeight - (scrollTop + clientHeight)) <= 1)
                    {
                        //console.log('Reached bottom!');
                        //setCount(prev => prev + 1);
                        //console.log(count);
                        setBc('true');
                    }
                    else
                    {
                        setBc('false');
                    }
    
                    if (scrollTop === 0) {
                        setTc('true');
                    }
                    else
                    {
                        setTc('false');
                    }
                
            }}



*/


/**<div
            className="w-96 h-96 overflow-auto outline border-orange-700"
        >
            {data.map((datum) => {
                return (
                    <>
                        <BubbleLeft key={datum[0]} content={datum[0]}/>
                       
                    </> //<BubbleRight key={-1*datum[0]} content="some content old 3"/>
                );
            })}
            
        </div>
        <button
            onClick={() => {
                //console.log('clecl');
                //setData(oldArray => ['new one' ,...oldArray] );//puts at top
                setData(oldArray => [...oldArray, "new"] );
            }}
        >
            append new
        </button> */