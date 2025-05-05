import { useNavigate } from "react-router";
import $ from 'jquery';

export default function LoginPage()
{
  let navigate = useNavigate();
  return (
    <div>
        <p>login</p>
        <button
        onClick={() => {
            navigate(-1);
        }}
        >
            back
        </button>

        <p>Form</p>
        <form id="edit" onSubmit={(e) => {
                e.preventDefault();
                $.ajax({
                    method: "post",
                    url: "http://localhost/React/php/login.php",
                    data: {u: e.target[0].value, p: e.target[1].value}
                })
                .done(function(data){
                    console.log(data);
                    if(data == "-1")
                    {
                        console.log("server error");
                    }
                    else if(data == "-2")
                    {
                        console.log("wrong creds");
                    }
                    else
                    {
                        console.log("login success");
                        localStorage.setItem("u", e.target[0].value);
                        localStorage.setItem("p", e.target[1].value);
                        navigate("../user");
                    }
                    //console.log(data);
                })
            }}>
                <label htmlFor="name">Username:</label>
                <input  id="name" type="text"/>
                <label htmlFor="pass">Password:</label>
                <input  id="pass" type="password"/>
        </form>
        <button form="edit">Update</button>
           
    </div>
  );
}
