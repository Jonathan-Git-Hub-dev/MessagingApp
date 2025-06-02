import { useNavigate } from "react-router";
import $ from 'jquery';
import { useEffect, useState } from 'react';
import SearchResult from '../Component/SearchResult';
import SearchResultOld from '../Component/SearchResultOld';
import { Url } from '../variables.js';
import "../Css/SearchPage.css";

/*
    where users find other users
*/

export default function SearchPage()
{
    let navigate = useNavigate();

    const [user, setUser] = useState('');
    
    const [newResults, setNewResults] = useState([]);
    const [oldResults, setOldResults] = useState([]);
    const [error, setError] = useState("Enter a user's Name");

    function getResults()//searchs users through search term
    {
        $.ajax({
            method: "post",
            url: Url + "search.php",
            data: {u: localStorage.getItem("u"), p: localStorage.getItem("p"), search: user}
        })
        .done(function(data){
            console.log(data);
            if(data == "-2" || data == "-5")
            {
                localStorage.removeItem("u");
                localStorage.removeItem("p");
            
                navigate("../../");
            }
            else if(data == "-1")
            {
                //error
                setError("Server error try agian");
            }
            else if(data == "-3" || data == ":-3")
            {
                    setNewResults([]);
                setOldResults([]);
                setError("No users with this name exist");
            }
            else
            {
                let arr = data.split(":");
                let arr1 = arr[0].split(",");
                arr1.pop();
                
                let arr2 = arr[1].split(",");
                arr2.pop();
        
                setNewResults(arr1);
                setOldResults(arr2);
                setError("");
            }
        })
        .fail(function(data){
          console.log("Ajax error in SearchPage.js: " + data);
        });
    }

    function removeSearchResult(name)
    {
        getResults();
    }

    function back()
    {
        navigate("/user/"); 
    }

    useEffect(()=>{

        if(user.length<3)
        {
            //setResults([]);
            setNewResults([]);
            setOldResults([]);
            setError("Enter a user's Name");
        }
        else
        {
            getResults()
        }
    }, [user])
  
  return (
    <div className="searchPageFrame">
        <div className="searchPageHeader">
            <button className="searchPageButton" onClick={back}>Back</button>
        </div>
        <div className="searchPageContent">
            <div className="searchPageLabel">
                <p className="searchPageHeading">Search</p>
                <input  className="searchPageInput" id="name" type="text" value={user}
                onChange={(e) => {
                        setUser(e.target.value);
                }}
                />
            </div>
            <div className="searchPageResults">
                {error != "" ? error
                :   
                    newResults.map((n) => {
                        return(<SearchResult key={n} name={n} func={removeSearchResult} />);
                    })
                }
                {error != "" ? <></>
                :   
                    oldResults.map((o) => {
                        return(<SearchResultOld key={o} name={o}/>);
                    })
                }
            </div>
        </div>
        
    </div>
  );
}