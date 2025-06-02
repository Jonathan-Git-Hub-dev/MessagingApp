import $ from 'jquery';
import { useNavigate } from "react-router";
import { Url } from '../variables.js';
import profile from '../Images/profile.jpg';
import { useState} from 'react';
import '../Css/CreateUserPage.css';
import {validateUsername, validatePassword} from '../functions.js';

/*
  This is where users are created requiring a name and password with a volentary profile picture
*/

export default function CreateUserPage()
{
    const [error, setError] = useState("");
    const [image, setImage] = useState(profile);
    let navigate = useNavigate();

    function back(e)
    {
      e.preventDefault();
      navigate("/");
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

    function handleSubmit(e)
    {
        
      e.preventDefault();
            
      var file_data = $('#file').prop('files')[0];   
      let name = document.getElementById("name").value;
      let pass = document.getElementById("pass").value;
      if(!validateUsername(name, setError))
      {
        return;
      }

      if(!validatePassword(pass, setError))
      {
        return;
      }


      var form_data = new FormData();                  
      form_data.append('file', file_data);
      form_data.append('u', name);
      form_data.append('p', pass);


     $.ajax({
          url: (Url + 'createUser.php'), // <-- point to server-side PHP script 
          dataType: 'text',  // <-- what to expect back from the PHP script, if anything
          cache: false,
          contentType: false,
          processData: false,
          data: form_data,                         
          type: 'post',
          
      }).done(function(data){
          console.log(data);

          //ignore -5 error code
          if(data == "-1" || data == "-5")
          {
            setError("Server Error, Try agian");
          }
          else if(data == "-2")
          {
            setError("Name already in use");
            console.log('er');
          }
          else if(data == "-3")
          {
            setError("Data format error");
          }
          else if (data == "1")
          {//success
            document.getElementById('error').innerHTML="";
                localStorage.setItem("u", name);
                localStorage.setItem("p", pass);
                navigate("../user");
          }
      })
      .fail(function(data){
          console.log("Ajax error in CreateUserPage.js: " + data);
          setError("Ajax error");
      });
    }

    return (
        <div className="createPageFrame">
          <h3 className="createPageHeading">Create a new acount</h3>
          <form action="createUser.php" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
            <br />

            <label htmlFor="file" >
              <input type="file" id="file" name="file" accept="image/jpg, image/jpeg" onChange={handleImage} hidden/>
              <img src={image} alt="Image" id="display-image" className="createPageImage"/>
            </label>
            <br />
            <div className="createPageHoldInput">
              <input  className="createPageInput" id="name" type="text" placeholder="Username" />
              <br />
              <input  className="createPageInput" id="pass" type="password" placeholder="Password"/>
            </div>
            <div className="createPageHoldButton">
              <button className="createPageButton" onClick={back}>Back</button>
              <button className="createPageButton" type="submit" name="submit">Create</button>
            </div>
          </form>
          <div id="error" className="createUserPageError">{error}</div>
        </div>
    );          
}