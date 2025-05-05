import $ from 'jquery';
import { useNavigate } from "react-router";

export default function CreateUserPage()
{
    let navigate = useNavigate();

    return (
        <div>
            <p>createUser</p>
            <p>Form</p>
            <form id="edit" onSubmit={(e) => {
                    e.preventDefault();
                    $.ajax({
                        method: "post",
                        url: "http://localhost/React/php/createUser.php",
                        data: {u: e.target[0].value, p: e.target[1].value}
                    })
                    .done(function(data){
                        //console.log(data);
                        if(data == "-1")
                        {
                            console.log("fail");
                        }
                        else if(data == "-2")
                        {
                            console.log("name usef");
                        }
                        else
                        {
                            //console.log("Saved creds");
                            localStorage.setItem("u", e.target[0].value);
                            localStorage.setItem("p", e.target[1].value);
                            navigate("../user");
                            //localStorage.getItem("lastname");
                            
                        }
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