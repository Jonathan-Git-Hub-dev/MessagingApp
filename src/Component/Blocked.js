import "../Css/Blocked.css";

/*
    instance of a blocked user with a button to unblock them
*/

export default function Friend(props)
{
    return (
        <div className="blockedFrame">
            <p className="blockedName">{props.name}</p>
            <button className="blockedButton" onClick={()=>{
                props.func(props.name)
            }}>unblock</button>
        </div>
    );
}