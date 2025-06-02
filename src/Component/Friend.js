import { useNavigate } from "react-router";
import '../Css/Friend.css';

/*
    instance of a friend from your friend list
    contains
        name, profile, and last text convo

    clicking on this friend allows user to converse with them
*/

export default function Friend(props)
{
    let navigate = useNavigate();

    function goToFriend()
    {
        navigate("../user/chat/" + props.name);
    }

    const myArray = props.time.split(" ");
    let time = myArray[0];
    let message = props.message.length > 27 ? props.message.slice(0, 27) + "..." : props.message; 

    return (
        <div className="friendFrame" onClick={goToFriend}>
            <img
                    src={require("../ProfilePic/" + props.profile)}
                    className={props.seen == 1 ? "friendIconA" : "friendIconB"}
            />
            
            <div className="frinedWrittenData">
                <div className="friendContent">
                    <div>{props.name}</div>
                    <div>{message}</div>
                </div>
                <div className="friendUtility">
                    <div>{time == "-1" ? "" : time}</div>
                </div>
            </div>
        </div>
    );
}