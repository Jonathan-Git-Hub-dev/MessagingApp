import { useNavigate } from "react-router";
import $ from 'jquery';
import { useEffect, useState } from 'react';
import SearchResult from '../Component/SearchResult';

export default function SearchPage()
{
    let navigate = useNavigate();

    const [user, setUser] = useState('');
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState("enter more char");

    function removeSearchResult(name)
    {
        //console.log("fdfs");
        if(results.length == 1)
        {
            setMessage("no users fourd");
        }
        const newList = results.filter(result => result != name);
        setResults(newList);
    }

    useEffect(()=>{
        //console.log("you typed so re searching");

        if(user.length<3)
        {
            setResults([]);
            setMessage("enter more char");
        }
        else
        {
            $.ajax({
                method: "post",
                url: "http://localhost/React/php/search.php",
                data: {u: localStorage.getItem("u"), p: localStorage.getItem("p"), search: user}
            })
            .done(function(data){
                console.log(data);
                const myObj = JSON.parse(data);
                if(myObj['num'] == -2)//log out
                {
                    localStorage.removeItem("u");
                    localStorage.removeItem("p");
                
                    navigate("../../");
                }
                else if(myObj['num'] == -1)
                {//error
                    setMessage("server error");
                }
                else
                {//handle results
                    setResults(myObj['f']);
                    if(myObj['num'] == -3 || myObj['f'].length == 0)
                    {
                        //message no results
                        setMessage("no users fourd");
                    }
                    else
                    {
                        setMessage("");
                    }
                }
            })
        }
    }, [user])
    //let navigate = useNavigate();
  
  return (
    <div>
        <button onClick={() =>{
           navigate("/user/"); 
        }}>|Back|</button>
        <p>Search</p>
        <input  id="name" type="text" value={user}
            onChange={(e) => {
                    setUser(e.target.value);
            }}
        />
        {message != "" ?<p>{message}</p>:
        (
            results.map((result) => {
                //return (<p key={result}>{result}</p>);
                return(<SearchResult key={result} name={result} func={removeSearchResult} />);
            })
        )}
    </div>
  );
}