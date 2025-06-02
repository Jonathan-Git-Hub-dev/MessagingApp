import { useNavigate } from "react-router";
import {useState, useEffect} from 'react';
import $ from 'jquery';
import { Url } from '../variables.js';
import Blocked from '../Component/Blocked';
import profile from '../Images/profile.jpg';
import "../Css/ProfilePage.css";

/*
    where users can change thier profile picture and refriend users
*/


export default function ProfilePage()
{
    let navigate = useNavigate();

    function logout()
    {
        localStorage.removeItem("u");
        localStorage.removeItem("p");
        navigate("/");
    }

    function back()
    {
        navigate("/user");
    }
    let temp = "pp";

    function reAdd(name)
    {
        console.log(temp + " " + name);
        $.ajax({
            method: "post",
            url: Url + "unblock.php",//unblock.php gets you block list and allows user to refriend 
            data: {u: localStorage.getItem("u"), p: localStorage.getItem("p"), u2: name}
        })
        .done(function(data)
        {
            //console.log(data);
            if(data == "-1" || data == "4" || data == "-5")
            {
                setError(true);
            }
            else if(data == "-2")
            {

            }
            else
            {
                setError(false);
                let temp = [];
                const array = data.split(',');
                for(let i = 1; i<array.length; i++)
                {
                    //console.log("fd");
                    temp.push(array[i]);
                }
                //console.log(temp);
                setBlocking(temp);
            }
            //-2
        })
        .fail(function(data){
          console.log("Ajax error in ProfilePage.js: " + data);
        });

        //on success update state array
    }

    function handleImage()
    {
      //does not seem like there is the possiblity of a null input
      var image = document.getElementById("file").files[0];

      var reader = new FileReader();

      reader.onload = function(e)
      {
        setImage(e.target.result);
      }

      reader.readAsDataURL(image);
    }

    const [blocking, setBlocking] = useState([]);
    const [error, setError] = useState(false);
    const [errorImage, setErrorImage] = useState("");
    const [image, setImage] = useState(profile);

    function saveImage()
    {
      var file_data = $('#file').prop('files')[0];   
      var form_data = new FormData();                  
      form_data.append('file', file_data);
      form_data.append('u', localStorage.getItem("u"));
      form_data.append('p', localStorage.getItem("p"));


     $.ajax({
          url: (Url + 'setProfilePic.php'), // <-- point to server-side PHP script 
          dataType: 'text',  // <-- what to expect back from the PHP script, if anything
          cache: false,
          contentType: false,
          processData: false,
          data: form_data,                         
          type: 'post',
          
      }).done(function(data){
          console.log(data);
            if(data == "-2" || data == "-5")
            {
                logout();
            }
            else if(data == "-8")
            {
                setErrorImage("No File Selected.")
            }
            else if(data == "-6")
            {
                //should never happen
                setErrorImage("Wrong Image Type.");
            }
            else if(data == "-1")
            {
                setErrorImage("Server Error, try again.")
            }
            else if(data == "1")
            {
                setErrorImage("Image saved.");
            }
        })
        .fail(function(data){
          console.log("Ajax error in ProfilePage.js: " + data);
        });
            
    }

    useEffect(()=> {//gets block list on initail load

        $.ajax({
            method: "post",
            url: Url + "unblock.php",//unblock.php gets you block list and allows user to refriend 
            data: {u: localStorage.getItem("u"), p: localStorage.getItem("p")}
        })
        .done(function(data)
        {
            if(data == "-1" || data == "-4" || data == "-5")
            {
                setError(true);
            }
            else if(data == "-2")
            {

            }
            else
            {
                console.log(data);
                setError(false);
                let temp = [];
                const array = data.split(',');
                for(let i = 1; i<array.length; i++)
                {
                    //console.log("fd");
                    temp.push(array[i]);
                }
                //console.log(temp);
                setBlocking(temp);
            }
        })
        .fail(function(data){
          console.log("Ajax error in ProfilePage.js: " + data);
        });


        $.ajax({
            method: "post",
            url: Url + "getProfilePic.php",//unblock.php gets you block list and allows user to refriend 
            data: {u: localStorage.getItem("u"), p: localStorage.getItem("p")}
        })
        .done(function(data)
        {
            console.log(data);
            if(data == "-1", data == "-5")
            {
                //setError(true);
                setErrorImage("Error loading Picture");
            }
            else if(data == "-2")
            {
                logout();
            }
            else
            {
                setImage(require("../ProfilePic/" + data));
            }
        })
        .fail(function(data){
          console.log("Ajax error in ProfilePage.js: " + data);
        });
        

    }, [])


    return (
        <div className="profilePageFrame">
            <div className="profilePageBanner">
                <button className="userPageButton" onClick={back}>Back</button>
            </div>
            <div className="profilePageContent">

                <div className="profilePageUpdateIcon">
                    <label htmlFor="file" >
                        <input type="file" id="file" name="file" accept="image/jpg, image/jpeg" onChange={handleImage} hidden/>
                        <img className="profilePageIcon" src={image} alt="Image" id="display-image"/>
                    </label>

                    <button className="userPageButton" onClick={saveImage}>save it</button>
                    {errorImage == "" ? <></> : <p>{errorImage}</p>}
                </div>
                <div className="profilePageSection2">
                    <h3 className="profilePageHeading">Users you are blocking</h3>
                    <div className="profilePageBlockedList">
                        {error ? <p>server error</p> : blocking.map((b)=> {
                            return(<Blocked key={b} name={b} func={reAdd} />);
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}